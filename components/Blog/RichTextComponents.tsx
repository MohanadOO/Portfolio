import Link from 'next/link'
import urlFor from '../../utils/urlFor'
import Refractor from 'react-refractor'
import { HiExternalLink } from 'react-icons/hi'
import CodeInputLayout from '../CodeInputLayout'
import CustomImage from '../CustomImage'
import slugify from 'slugify'
import { PortableText } from '@portabletext/react'
import { getUrlFromId } from '../../sanity/schemas/video'
import { usePost } from '../../hooks/usePost'
import { useAssetViewer } from '../../hooks/useAssetViewer'
import {
  BlockQuote,
  H1,
  H2,
  H3,
  H4,
  P,
} from '@/components/ui/Typography/headers'

function getText(text: any): string {
  return typeof text[0] === 'string' ? text[0] : text[0]?.props?.text
}

const DEFAULT_ITEMS = {
  types: {
    image: ({ value, index }: any) => {
      const { handleShowImage } = useAssetViewer()

      const imageSize = value.asset?._ref?.split('-')[2].split('x')
      const width = imageSize ? imageSize[0] : '1280'
      const height = imageSize ? imageSize[1] : '720'
      const aspectRatio = width / height
      return (
        <div
          style={{
            maxWidth: `${width}px`,
            maxHeight: '1000px',
          }}
          className='relative group mx-auto object-contain my-7 overflow-hidden group cursor-zoom-in'
          onClick={() => handleShowImage(index)}
        >
          <div className='relative group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity duration-300'>
            <CustomImage
              src={imageSize && urlFor(value).url()}
              alt={value?.alt || 'Blog post Image'}
              className='post-asset'
              data-index={index}
              data-src={imageSize && urlFor(value).url()}
              data-type='image'
              data-alt={value?.alt || 'Blog post image'}
              width={width}
              height={height}
              style={{
                objectFit: 'contain',
                borderRadius: '0.1rem',
                maxWidth: '100%',
                maxHeight: '1000px',
                aspectRatio: `${aspectRatio}`,
                zOrder: -1,
              }}
              aria-hidden='true'
            />
          </div>
        </div>
      )
    },

    video: ({ value, index }) => {
      const poster = value.poster ? urlFor(value.poster).url() : ''
      const video = getUrlFromId(value.video?.asset?._ref)
      const autoplay = value.autoplay
      const loop = value.loop
      const muted = value.muted
      return (
        <video
          controls
          poster={poster}
          data-index={index}
          data-poster={poster}
          data-src={video || ''}
          data-alt={value?.title || 'Blog post video'}
          data-type='video'
          data-autoplay={autoplay}
          data-loop={loop}
          data-muted={muted}
          autoPlay={autoplay ? autoplay : false}
          loop={loop ? loop : false}
          muted={autoplay === true || muted ? true : false}
          playsInline={autoplay ? true : false}
          preload={autoplay ? 'auto' : 'metadata'}
          className='max-h-[750px] my-7 mx-auto post-asset'
        >
          <source src={video} />
          Browser don't support HTML5 Video.
        </video>
      )
    },

    callToAction: ({ value, isInline }: any) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className='callToAction'>{value.text}</div>
      ),

    code: ({ value: { code, language, highlightedLines, filename } }: any) => {
      Refractor.registerLanguage(
        require(`refractor/lang/${language ? language : 'cshtml'}`)
      )
      return (
        <CodeInputLayout
          language={language ? language : 'cshtml'}
          code={code || ''}
          highlightedLines={highlightedLines}
          filename={filename}
        />
      )
    },

    customNote: ({ value: { type, message } }: any) => {
      type ColorType = {
        rgb: { r: string; g: string; b: string; a: string }
      }

      function getColor(color: ColorType | undefined, opacity?: string) {
        if (!color) return `rgb(255 0 0 / ${opacity ? opacity : 1})`
        const { rgb } = color
        const { r, g, b, a } = rgb

        return `rgb(${r} ${g} ${b} / ${opacity ? opacity : a})`
      }

      if (!type)
        return (
          <div
            style={{
              backgroundColor: getColor(undefined, '0.1'),
              borderColor: getColor(undefined),
              boxShadow: `0 4px 6px ${getColor(undefined, '0.2')}`,
            }}
            className='flex flex-col gap-2 pb-5 my-10 ltr:border-l-8 rtl:border-r-8 shadow-md rounded-lg'
          >
            <p
              style={{ color: getColor(undefined) }}
              className='capitalize text-xl md:text-2xl font-black flex gap-2 items-center py-4 border-b-2 border-black/30 dark:border-white/30 px-5'
            ></p>
          </div>
        )

      const { language } = usePost()
      const { typeName, icon, color } = type
      const title = language === 'ar' ? typeName?.ar : typeName?.en

      return (
        <div
          style={{
            backgroundColor: getColor(color, '0.1'),
            borderColor: getColor(color),
            boxShadow: `0 4px 6px ${getColor(color, '0.2')}`,
          }}
          className='flex flex-col gap-2 pb-5 my-10 ltr:border-l-8 rtl:border-r-8 shadow-md rounded-lg'
        >
          <p
            style={{ color: getColor(color) }}
            className='capitalize text-xl md:text-2xl font-black flex gap-2 items-center py-4 border-b-2 border-black/30 dark:border-white/30 px-5'
          >
            {icon && (
              <img
                src={urlFor(icon).width(60).height(60).url()}
                style={{
                  width: '30px',
                  height: '30px',
                }}
                alt='Icon'
              />
            )}
            <span>{title}</span>
          </p>
          <div className='px-5'>
            <PortableText value={message} components={RichTextComponents} />
          </div>
        </div>
      )
    },

    codeEmbed: ({ value }) => {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: value.code }}
          className='my-12'
        ></div>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className='ml-5 md:ml-10 rtl:mr-7 rtl:md:mr-10 py-3 list-disc marker:font-bold marker:text-primary space-y-3'>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className='ml-5 md:ml-10 rtl:mr-7 rtl:md:mr-10 py-3 list-decimal marker:font-bold marker:text-primary space-y-3'>
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <H1 data-header='true' id={id}>
          {children}
        </H1>
      )
    },
    h2: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <H2 data-header='true' id={id}>
          {children}
        </H2>
      )
    },
    h3: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <H3 data-header='true' id={id}>
          {children}
        </H3>
      )
    },
    h4: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <H4 data-header='true' id={id}>
          {children}
        </H4>
      )
    },
    normal: ({ children }: any) => <P>{children}</P>,
    blockquote: ({ children }: any) => <BlockQuote>{children}</BlockQuote>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = value.external === false ? '_self' : '_blank'
      const rel = !value.href?.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <Link
          href={value.href || ''}
          target={target}
          rel={rel}
          className='inline hover:decoration-black border-b border-purple-700 group-data-[header=true]:py-1  hover:text-purple-700 hover:dark:text-purple-700 font-bold underline-offset-2 ar:leading-loose text-black dark:text-white group-data-[header=true]:text-inherit group-data-[header=true]:hover:text-purple-700'
        >
          {children}
          <HiExternalLink className='group-data-[header=true]:text-inherit text-purple-700 rtl:-rotate-90 inline ml-1 rtl:mr-1' />
        </Link>
      )
    },
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => (
      <strong className='font-black'>{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className='font-light text-white from-purple-600 to-pink-600 bg-gradient-to-r p-0.5 rounded-sm'>
        {children}
      </code>
    ),
    strike: ({ children }: any) => <del>{children}</del>,
  },
}

const STUDIO_ITEMS = {
  image: ({ value }) => {
    const imageSize = value.asset?._ref?.split('-')[2].split('x')
    const width = imageSize ? imageSize[0] : '1280'
    const height = imageSize ? imageSize[1] : '720'
    const aspectRatio = width / height
    return (
      <div
        style={{
          maxWidth: `${width}px`,
          maxHeight: '1000px',
        }}
        className='relative group mx-auto object-contain my-7 overflow-hidden group cursor-zoom-in'
      >
        <div className='relative group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity duration-300'>
          <CustomImage
            src={imageSize && urlFor(value).url()}
            alt={value?.alt || 'Blog post Image'}
            className='post-asset'
            width={width}
            height={height}
            style={{
              objectFit: 'contain',
              borderRadius: '0.1rem',
              maxWidth: '100%',
              maxHeight: '1000px',
              aspectRatio: `${aspectRatio}`,
              zOrder: -1,
            }}
            aria-hidden='true'
          />
        </div>
      </div>
    )
  },
  video: ({ value }) => {
    const poster = value.poster ? urlFor(value.poster).url() : ''
    const video = getUrlFromId(value.video?.asset?._ref)
    const autoplay = value.autoplay
    const loop = value.loop
    const muted = value.muted
    return (
      <video
        controls
        poster={poster}
        autoPlay={autoplay ? autoplay : false}
        loop={loop ? loop : false}
        muted={autoplay === true || muted ? true : false}
        playsInline={autoplay ? true : false}
        preload={autoplay ? 'auto' : 'metadata'}
        className='max-h-[750px] my-7 mx-auto post-asset'
      >
        <source src={video} />
        Browser don't support HTML5 Video.
      </video>
    )
  },
}

const { types, list, block, marks } = DEFAULT_ITEMS
export const RichTextComponents = {
  types,
  list,
  block,
  marks,
}

export const StudioRichTextComponents = {
  types: { ...types, image: STUDIO_ITEMS.image, video: STUDIO_ITEMS.video },
  list,
  block,
  marks,
}
