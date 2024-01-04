import { useEffect, useState } from 'react'
import CustomImage from './CustomImage'
import urlFor from '../utils/urlFor'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useTranslation } from 'next-i18next'

type PropsType = {
  images: ImageType[]
}

export default function Swiper({ images }: PropsType) {
  const { t } = useTranslation('projects')
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        className='max-w-full w-full shadow-lg ring ring-primary/20 rounded-lg'
      >
        <CarouselContent className='flex aspect-video items-center shadow-lg rounded-lg'>
          {images.map((image, index) => (
            <CarouselItem key={index} className='w-full rounded-lg p-0'>
              <div className='relative aspect-video p-2 bg-transparent'>
                <CustomImage
                  src={image ? urlFor(image).fit('max').url() : ''}
                  alt={image?.alt || 'Cover Image'}
                  fill
                  style={{ objectFit: 'contain' }}
                  className='rounded-lg'
                  property='true'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>
      <div className='py-3 text-center text-sm text-muted-foreground'>
        {t('slug.slide', {
          current: current,
          count: count,
        })}
      </div>
    </>
  )
}
