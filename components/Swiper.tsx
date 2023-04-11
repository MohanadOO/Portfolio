import React, { useState } from 'react'
import { HiOutlineChevronRight } from 'react-icons/hi'
import CustomImage from './CustomImage'

type PropsType = {
  images: ImageType[]
}

export default function Swiper({ images }: PropsType) {
  const [cover, setCover] = useState(0)
  const [total, setTotal] = useState(
    new Array(images.length).fill(0).map((_, index) => index)
  )

  function handleCover(val: number) {
    if (cover + val >= total.length) return setCover(0)
    else if (cover + val < 0) return setCover(total.length - 1)
    return setCover((cover) => cover + val)
  }

  return (
    <div className='relative aspect-video max-w-full rounded-lg shadow-lg w-full ring ring-primary-400 overflow-hidden'>
      <CustomImage
        src={images[cover]?.asset?.url || ''}
        alt={images[cover]?.alt || 'Cover Image'}
        fill
        style={{ objectFit: 'contain' }}
        property='true'
        className='rounded-lg'
      />
      <div className='absolute bottom-7 group w-full left-[50%] translate-x-[-50%] flex gap-1 items-center justify-center'>
        {total.map((_, i) => (
          <div
            key={i}
            onClick={() => setCover(i)}
            className={`rounded-full bg-primary-400 select-none cursor-pointer ${
              i === cover
                ? 'w-7 h-4 sm:w-12 sm:h-5'
                : 'w-4 h-4 sm:w-5 sm:h-5 opacity-70'
            } transition-all`}
          />
        ))}
      </div>
      <button
        onClick={() => handleCover(1)}
        className='absolute top-[50%] bg-black/70 rounded-full right-6 p-1 translate-y-[-50%] group'
      >
        <HiOutlineChevronRight className='w-6 h-6 sm:w-9 md:h-9 text-primary-400 group-hover:scale-125 transition-transform' />
      </button>
      <button
        onClick={() => handleCover(-1)}
        className='absolute top-[50%] bg-black/70 rounded-full left-6 p-1 translate-y-[-50%] group'
      >
        <HiOutlineChevronRight className='w-6 h-6 sm:w-9 md:h-9 text-primary-400 rotate-180 group-hover:scale-125 transition-transform' />
      </button>
    </div>
  )
}
