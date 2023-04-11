import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import cn from '../utils/cn'

export default function CustomImage({ ...rest }) {
  const [imageSrc, setImageSrc] = useState(rest.src)
  const [loading, setLoading] = useState(true)

  function handleError() {
    setImageSrc('https://bit.ly/placeholder-img')
  }

  useEffect(() => {
    setImageSrc(rest.src)
  }, [rest.src])

  return (
    <Image
      {...rest}
      src={imageSrc}
      alt={rest.alt}
      className={cn(
        'duration-700 ease-in-out',
        loading ? 'grayscale blur-2xl scale-110 border-gray-900' : 'scale-100',
        rest.className
      )}
      onLoadingComplete={() => setLoading(false)}
      onError={handleError}
    />
  )
}
