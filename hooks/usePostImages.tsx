import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type ImagesType = { [key: string]: HTMLImageElement }

type ContextType = {
  images: ImagesType
  setImages: Dispatch<SetStateAction<ImagesType>>
  cover: HTMLImageElement
  setCover: Dispatch<SetStateAction<HTMLImageElement>>
  position: number
  setPosition: Dispatch<SetStateAction<number>>
  showViewer: boolean
  setShowViewer: Dispatch<SetStateAction<boolean>>
  handleShowImage: (arg0: string | number, arg1?: boolean) => void
  handleCover: (arg0: number) => void
  imageIndexArr: string[]
  setImageIndexArr: Dispatch<SetStateAction<string[]>>
}

const imageViewerContext = createContext<ContextType | null>(null)

export const usePostImages = () => {
  return useContext(imageViewerContext)
}

export function ImagesProvider({ children }: { children: React.ReactNode }) {
  const locale = useRouter().locale
  const localeVal = locale === 'ar' ? -1 : 1

  const [images, setImages] = useState<ImagesType>()
  const [cover, setCover] = useState<HTMLImageElement>()
  const [position, setPosition] = useState(0)
  const [showViewer, setShowViewer] = useState(false)
  const [imageIndexArr, setImageIndexArr] = useState<string[]>([])

  function handleShowImage(index: number | string, show = true) {
    setShowViewer(show)
    if (!show) {
      return document.documentElement.classList.remove('stop-scrolling')
    }

    setCover(() => images[index])
    setPosition(() => Number(index))
    document.documentElement.classList.add('stop-scrolling')
  }

  function handleCover(val: number) {
    console.log(val)
    console.log(imageIndexArr)
    if (imageIndexArr.length === 0) return
    if (!showViewer) return

    const currPosIndex = imageIndexArr.findIndex(
      (el: string) => el === position.toString()
    )
    const total = imageIndexArr.length

    if (currPosIndex + val >= total) {
      return handleShowImage(imageIndexArr[0], true)
    } else if (currPosIndex + val < 0) {
      return handleShowImage(imageIndexArr[total - 1], true)
    }
    return handleShowImage(imageIndexArr[currPosIndex + val], true)
  }
  useEffect(() => {
    const images = Array.from(document.querySelectorAll('#post-image'))

    const obj = {}
    images.forEach((img: HTMLImageElement) => {
      obj[img.dataset.index] = img
    })

    setImages(obj)
    setImageIndexArr(Object.keys(obj))
  }, [locale])

  const values = {
    images,
    setImages,
    cover,
    setCover,
    position,
    setPosition,
    showViewer,
    setShowViewer,
    handleShowImage,
    imageIndexArr,
    setImageIndexArr,
    handleCover,
  }

  return (
    <imageViewerContext.Provider value={values}>
      {children}
    </imageViewerContext.Provider>
  )
}
