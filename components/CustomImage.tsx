import Image from 'next/image'
import React, { useState } from 'react'
import cn from '../utils/cn'

export default function CustomImage({ ...rest }) {
  const [imageSrc, setImageSrc] = useState(rest.src)
  const [loading, setLoading] = useState(true)

  function handleError() {
    setImageSrc('https://bit.ly/placeholder-img')
  }

  return (
    <div className='overflow-hidden'>
      <Image
        {...rest}
        src={imageSrc}
        alt={rest.alt}
        className={cn(
          'group-hover:opacity-90 duration-700 ease-in-out',
          loading ? 'grayscale blur-2xl scale-110' : 'scale-100'
        )}
        onLoadingComplete={() => setLoading(false)}
        onError={handleError}
      />
    </div>
  )
}
