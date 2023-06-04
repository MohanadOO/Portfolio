import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type assetsType = { [key: string]: HTMLImageElement | HTMLVideoElement }

type ContextType = {
  assets: assetsType
  setAssets: Dispatch<SetStateAction<assetsType>>
  cover: HTMLImageElement | HTMLVideoElement
  setCover: Dispatch<SetStateAction<HTMLImageElement | HTMLVideoElement>>
  position: number
  setPosition: Dispatch<SetStateAction<number>>
  showViewer: boolean
  setShowViewer: Dispatch<SetStateAction<boolean>>
  handleShowImage: (arg0: string | number, arg1?: boolean) => void
  handleCover: (arg0: number) => void
  assetsArrIndex: string[]
  setAssetsArrIndex: Dispatch<SetStateAction<string[]>>
}

const AssetsViewerContext = createContext<ContextType | null>(null)

export const useAssetViewer = () => {
  return useContext(AssetsViewerContext)
}

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const locale = useRouter().locale

  const [assets, setAssets] = useState<assetsType>()
  const [cover, setCover] = useState<HTMLImageElement | HTMLVideoElement>()
  const [position, setPosition] = useState(0)
  const [showViewer, setShowViewer] = useState(false)
  const [assetsArrIndex, setAssetsArrIndex] = useState<string[]>([])

  function handleShowImage(index: number | string, show = true) {
    setShowViewer(show)
    if (!show) {
      return document.documentElement.classList.remove('stop-scrolling')
    }

    setCover(() => assets[index])
    setPosition(() => Number(index))
    document.documentElement.classList.add('stop-scrolling')
  }

  function handleCover(val: number) {
    if (assetsArrIndex.length === 0) return
    if (!showViewer) return

    const currPosIndex = assetsArrIndex.findIndex(
      (el: string) => el === position.toString()
    )
    const total = assetsArrIndex.length

    if (currPosIndex + val >= total) {
      return handleShowImage(assetsArrIndex[0], true)
    } else if (currPosIndex + val < 0) {
      return handleShowImage(assetsArrIndex[total - 1], true)
    }
    return handleShowImage(assetsArrIndex[currPosIndex + val], true)
  }
  useEffect(() => {
    const assets = Array.from(document.querySelectorAll('.post-asset'))

    const obj = {}
    assets.forEach((asset: HTMLImageElement | HTMLVideoElement) => {
      obj[asset.dataset.index] = asset
    })

    setAssets(obj)
    setAssetsArrIndex(Object.keys(obj))
  }, [locale])

  const values = {
    assets,
    setAssets,
    cover,
    setCover,
    position,
    setPosition,
    showViewer,
    setShowViewer,
    handleShowImage,
    assetsArrIndex,
    setAssetsArrIndex,
    handleCover,
  }

  return (
    <AssetsViewerContext.Provider value={values}>
      {children}
    </AssetsViewerContext.Provider>
  )
}
