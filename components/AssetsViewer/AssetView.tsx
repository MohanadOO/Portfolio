import { HiOutlineChevronRight, HiX } from 'react-icons/hi'
import { useAssetViewer } from '../../hooks/useAssetViewer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import AssetCover from './AssetCover'
import AssetSlider from './AssetSlider'

export default function AssetView() {
  const locale = useRouter().locale
  const localeVal = locale === 'ar' ? -1 : 1
  const { showViewer, handleCover, handleShowImage } = useAssetViewer()

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
            <AssetCover />
            <button
              onClick={() => handleCover(-1 * localeVal)}
              className='absolute top-[50%] text-black dark:text-white bg-gray-300/60 dark:bg-gray-900/60 rounded-full left-6 sm:left-10 md:left-14 p-1 translate-y-[-50%] group z-[70]'
            >
              <HiOutlineChevronRight className='w-6 h-6 sm:w-9 md:h-9 group-hover:scale-125 transition-transform rotate-180' />
            </button>
            <AssetSlider />
          </div>
        </div>
      )}
    </>
  )
}
