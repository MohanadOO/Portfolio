import Image from 'next/image'
import { useAssetViewer } from '../../hooks/useAssetViewer'

export default function AssetCover() {
  const { cover } = useAssetViewer()

  const { width, height } = cover

  const dataset = cover?.dataset
  const { src, alt, type } = dataset
  if (type === 'image') {
    return (
      <>
        <div
          className='relative flex flex-col mx-auto h-full overflow-hidden'
          style={{
            maxWidth: `${width}px`,
            aspectRatio: width / height,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            aria-hidden='true'
            className='m-auto'
          />
        </div>
        {alt !== 'Blog post image' && (
          <figcaption className='text-center text-lg text-gray-300 p-2 font-bold'>
            {alt}
          </figcaption>
        )}
      </>
    )
  }

  if (type === 'video') {
    return (
      <>
        <video
          controls
          poster={cover?.dataset.poster}
          autoPlay={cover?.dataset.autoplay === 'true' ? true : false}
          loop={cover?.dataset.loop === 'true' ? true : false}
          muted={
            cover?.dataset.autoplay === 'true' ||
            cover?.dataset.muted === 'true'
              ? true
              : false
          }
          playsInline={cover?.dataset.autoplay ? true : false}
          preload={cover?.dataset.autoplay ? 'auto' : 'metadata'}
          className='m-auto max-h-[80vh]'
        >
          <source src={cover?.dataset.src} />
          Browser don't support HTML5 Video.
        </video>
        {alt !== 'Blog post video' && (
          <p className='text-center text-lg text-gray-300 py-2 font-bold'>
            {alt}
          </p>
        )}
      </>
    )
  }

  return <div></div>
}
