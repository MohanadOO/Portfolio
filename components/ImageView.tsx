import { HiOutlineChevronRight, HiX } from 'react-icons/hi'
import ImageSlider from './ImageSlider'
import { usePostImages } from '../hooks/usePostImages'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ImageView() {
  const locale = useRouter().locale
  const localeVal = locale === 'ar' ? -1 : 1
  const { cover, showViewer, handleCover, handleShowImage } = usePostImages()

  function handleKeys(e: KeyboardEvent) {
    if (e.key === 'Escape') return handleShowImage('', false)
    if (e.key === 'ArrowRight') return handleCover(1 * localeVal)
    if (e.key === 'ArrowLeft') return handleCover(-1 * localeVal)
    return
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeys)
    return () => {
      window.removeEventListener('keydown', handleKeys)
    }
  })

  return (
    <>
      {showViewer && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-md z-[60] p-2 sm:p-5 items-center'>
          <div className='flex flex-col h-full m-auto'>
            <button
              onClick={() => handleShowImage('', false)}
              className='absolute top-10 text-black dark:text-white bg-gray-300/60 dark:bg-gray-900/60 rounded-full right-[50%] translate-x-[50%] p-1 sm:p-2 group z-[70]'
            >
              <HiX className='w-6 h-6 group-hover:scale-125 transition-transform' />
            </button>
            <button
              onClick={() => handleCover(1 * localeVal)}
              className='absolute top-[50%] text-black dark:text-white bg-gray-300/60 dark:bg-gray-900/60 rounded-full right-6 sm:right-10 md:right-14 p-1 translate-y-[-50%] group z-[70]'
            >
              <HiOutlineChevronRight className='w-6 h-6 sm:w-9 md:h-9 group-hover:scale-125 transition-transform' />
            </button>
            <div
              className='relative flex flex-col mx-auto h-full w-full overflow-hidden '
              style={{
                maxWidth: `${cover?.width}px`,
                maxHeight: '1000px',
                aspectRatio: cover?.width / cover?.height,
              }}
            >
              <Image
                src={cover?.dataset?.src}
                alt='Blog Post Image'
                width={cover?.width}
                height={cover?.height}
                aria-hidden='true'
                style={{
                  borderRadius: '0.1rem',
                  maxWidth: '100%',
                  maxHeight: '1000px',
                  width: 'auto',
                  marginBlock: 'auto',
                }}
              />
            </div>
            <figcaption className='text-center text-lg text-gray-300 p-2'>
              {/* Add Image Alt Text */}
            </figcaption>
            <button
              onClick={() => handleCover(-1 * localeVal)}
              className='absolute top-[50%] text-black dark:text-white bg-gray-300/60 dark:bg-gray-900/60 rounded-full left-6 sm:left-10 md:left-14 p-1 translate-y-[-50%] group z-[70]'
            >
              <HiOutlineChevronRight className='w-6 h-6 sm:w-9 md:h-9 group-hover:scale-125 transition-transform rotate-180' />
            </button>
            <ImageSlider />
          </div>
        </div>
      )}
    </>
  )
}
