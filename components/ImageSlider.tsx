import { usePostImages } from '../hooks/usePostImages'
import CustomImage from './CustomImage'

export default function ImageSlider() {
  const { images, setCover, position, setPosition } = usePostImages()

  return (
    <nav className='block relative max-w-full mx-auto mt-5'>
      <div className='flex items-center h-[7rem] overflow-x-auto overflow-y-hidden gap-3 px-5'>
        {Object.entries(images).map((image: [string, HTMLImageElement]) => {
          const [key, img] = image
          return (
            <button
              key={key}
              onClick={() => {
                setCover(images[key])
                setPosition(Number(key))
              }}
              className={`inline-block object-contain rounded-md grayscale group ${
                position === Number(key)
                  ? 'outline outline-4 outline-purple-600 grayscale-0 cursor-default'
                  : 'hover:outline hover:outline-4 focus-visible:outline focus-visible:outline-4 outline-purple-600 hover:grayscale-0'
              }`}
            >
              <div className='relative w-[5rem] h-[5rem] bg-gray-300 dark:bg-gray-800 rounded-md overflow-hidden'>
                <picture>
                  <CustomImage
                    src={img.dataset.src}
                    alt={img.alt}
                    width={120}
                    height={120}
                    className='my-auto object-cover object-center h-full rounded-md'
                  />
                </picture>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
