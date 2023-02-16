import Image from 'next/image'
import Link from 'next/link'
import urlFor from '../../utils/urlFor'
import Refractor from 'react-refractor'
import { HiExternalLink } from 'react-icons/hi'
import CodeInputLayout from '../CodeInputLayout'

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageSize = value.asset._ref.split('-')[2].split('x')
      const width = imageSize[0]
      const height = imageSize[1]
      const aspectRatio = width / height
      return (
        <div
          className='relative w-full object-contain my-5 before:absolute before:w-full before:from-purple-600 before:to-pink-600 before:bg-gradient-to-r before:h-1 before:-top-1 after:absolute after:w-full after:from-purple-600 after:to-pink-600 after:bg-gradient-to-r after:h-1 after:-bottom-0.5'
          style={{ aspectRatio }}
        >
          <Image
            src={urlFor(value).url()}
            alt='Blog Post Image'
            fill
            style={{ objectFit: 'contain', borderRadius: '0.1rem' }}
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

    code: ({ value: { code, language } }: any) => {
      switch (language) {
        case 'sh':
          language = 'powershell'
          break
      }
      Refractor.registerLanguage(require(`refractor/lang/${language}`))
      return <CodeInputLayout language={language} code={code} />
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className='ml-5 md:ml-10 rtl:mr-5 md:mr-5 py-3 list-disc marker:font-bold marker:text-primary-400 text-lg space-y-3'>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className='ml-5 md:ml-10 rtl:mr-5 md:mr-5 py-3 list-decimal marker:font-bold marker:text-primary-400 text-lg space-y-3'>
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className='text-5xl md:text-6xl pt-10 pb-5 font-bold text-primary-400'>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='text-4xl md:text-5xl pt-10 pb-5 font-bold text-primary-400'>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='text-2xl md:text-3xl pt-10 pb-5 font-bold text-primary-400'>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='text-xl md:text-2xl pt-10 pb-5 font-bold text-primary-400'>
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className='md:text-lg py-2 text-gray-600 dark:text-gray-300'>
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className='ltr:border-l-purple-500 rtl:border-r-purple-500 text-lg ltr:border-l-4 rtl:border-r-4 ltr:pl-5 rtl:pr-5 py-5 my-5 text-gray-600 dark:text-gray-300'>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <Link
          href={value.href}
          rel={rel}
          className='group inline underline-offset-2 hover:decoration-black border-b border-purple-700 hover:text-purple-700 text-black dark:text-white hover:dark:text-purple-700 font-bold'
        >
          {children}
          <HiExternalLink className='text-purple-700 rtl:-rotate-90 inline ml-1 rtl:mr-1' />
        </Link>
      )
    },
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => (
      <strong className='font-bold'>{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className='font-light from-purple-600 to-pink-600 bg-gradient-to-r text-white px-0.5 rounded-sm'>
        {children}
      </code>
    ),
    strike: ({ children }: any) => (
      <del className='text-black dark:text-white'>{children}</del>
    ),
  },
}
