import Link from 'next/link'
import urlFor from '../../utils/urlFor'
import Refractor from 'react-refractor'
import { HiExternalLink } from 'react-icons/hi'
import CodeInputLayout from '../CodeInputLayout'
import CustomImage from '../CustomImage'
import slugify from 'slugify'

function getText(text: any): string {
  return typeof text[0] === 'string' ? text[0] : text[0]?.props?.text
}

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
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
          className='relative mx-auto object-contain my-7 before:absolute before:w-full before:from-purple-600 before:to-pink-600 before:bg-gradient-to-r before:h-1 before:top-0 after:absolute after:w-full after:from-purple-600 after:to-pink-600 after:bg-gradient-to-r after:h-1 after:bottom-0 overflow-hidden isolate before:z-10'
        >
          <CustomImage
            src={imageSize && urlFor(value).url()}
            alt='Blog Post Image'
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
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className='ml-5 md:ml-10 rtl:mr-7 rtl:md:mr-10 py-3 list-disc marker:font-bold marker:text-primary-400 space-y-3'>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className='ml-5 md:ml-10 rtl:mr-7 rtl:md:mr-10 py-3 list-decimal marker:font-bold marker:text-primary-400 space-y-3'>
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <h1
          id={id}
          className='text-5xl md:text-6xl leading-tight md:leading-tight pt-10 pb-5 font-black text-primary-400 scroll-m-20 relative group'
        >
          {children}
        </h1>
      )
    },
    h2: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <h2
          id={id}
          className='text-4xl md:text-5xl leading-tight md:leading-tight pt-10 mb-5 pb-1 font-black text-teal-600 dark:text-teal-500 scroll-m-20 relative group'
        >
          {children}
        </h2>
      )
    },
    h3: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <h3
          id={id}
          className='text-2xl md:text-3xl pt-10 pb-5 font-black text-sky-600 dark:text-sky-500 scroll-m-20 relative group'
        >
          {children}
        </h3>
      )
    },
    h4: ({ children, value }: any) => {
      const id = slugify(`${getText(children)}-${value._key}`)
      return (
        <h4
          id={id}
          className='text-xl md:text-2xl pt-10 pb-5 font-black text-amber-600 dark:text-amber-500 scroll-m-20 relative group'
        >
          {children}
        </h4>
      )
    },
    normal: ({ children }: any) => <p className='py-2'>{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className='ltr:border-l-purple-500 rtl:border-r-purple-500 ltr:border-l-4 rtl:border-r-4 ltr:pl-5 rtl:pr-5 py-5 my-5'>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href?.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <Link
          href={value.href || ''}
          rel={rel}
          className='group inline hover:decoration-black border-b border-purple-700 hover:text-purple-700 hover:dark:text-purple-700 font-bold text-black dark:text-white underline-offset-2 ar:leading-loose'
        >
          {children}
          <HiExternalLink className='text-purple-700 rtl:-rotate-90 inline ml-1 rtl:mr-1' />
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
