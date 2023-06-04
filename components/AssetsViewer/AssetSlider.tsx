import { HiVideoCamera } from 'react-icons/hi'
import { useAssetViewer } from '../../hooks/useAssetViewer'
import CustomImage from '../CustomImage'

export default function AssetSlider() {
  const { assets, setCover, position, setPosition } = useAssetViewer()

  return (
    <nav className='block relative max-w-full mx-auto mt-5'>
      <div className='flex items-center h-[7rem] overflow-x-auto overflow-y-hidden gap-3 px-5'>
        {Object.entries(assets).map(
          (asset: [string, HTMLImageElement | HTMLVideoElement]) => {
            const [key, element] = asset

            const dataset = element?.dataset
            const { type, alt, poster } = dataset

            return (
              <button
                key={key}
                onClick={() => {
                  setCover(assets[key])
                  setPosition(Number(key))
                }}
                className={`inline-block object-contain rounded-md grayscale group ${
                  position === Number(key)
                    ? 'outline outline-4 outline-purple-600 grayscale-0 cursor-default'
                    : 'hover:outline hover:outline-4 focus-visible:outline focus-visible:outline-4 outline-purple-600 hover:grayscale-0'
                }`}
              >
                <div className='flex relative w-[5rem] h-[5rem] bg-gray-300 dark:bg-gray-800 rounded-md overflow-hidden'>
                  {type === 'image' ? (
                    <picture>
                      <CustomImage
                        src={element.dataset.src}
                        alt={alt}
                        width={120}
                        height={120}
                        className='my-auto object-cover object-center h-full rounded-md'
                      />
                    </picture>
                  ) : type === 'video' ? (
                    <>
                      {poster ? (
                        <picture>
                          <CustomImage
                            src={element.dataset.src}
                            alt={alt}
                            width={120}
                            height={120}
                            className='my-auto object-cover object-center h-full rounded-md'
                          />
                        </picture>
                      ) : (
                        <HiVideoCamera className='w-7 h-7 m-auto fill-primary-purple' />
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </button>
            )
          }
        )}
      </div>
    </nav>
  )
}
