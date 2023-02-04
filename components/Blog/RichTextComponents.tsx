import Image from 'next/image'
import Link from 'next/link'
import urlFor from '../../utils/urlFor'
import Refractor from 'react-refractor'

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className='relative w-full h-96 my-10'>
          <Image
            src={urlFor(value).url()}
            alt='Blog Post Image'
            fill
            style={{ objectFit: 'contain' }}
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
      Refractor.registerLanguage(require(`refractor/lang/${language}`))
      return (
        <div dir='ltr' className='text-xs sm:text-sm md:text-base py-5'>
          <Refractor language={language} value={code} />
        </div>
      )
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
      <h1 className='text-5xl md:text-6xl pt-10 pb-5 font-bold'>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='text-4xl md:text-5xl pt-10 pb-5 font-bold'>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='text-2xl md:text-3xl pt-10 pb-5'>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='text-xl md:text-2xl pt-10 pb-5'>{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className='md:text-lg py-2'>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className='ltr:border-l-purple-500 rtl:border-r-purple-500 text-lg ltr:border-l-4 rtl:border-r-4 ltr:pl-5 rtl:pr-5 py-5 my-5'>
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
          className='underline decoration-purple-700 hover:decoration-black line-clamp-2'
        >
          {children}
        </Link>
      )
    },
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => (
      <strong className='font-bold'>{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className='bg-gray-300 dark:bg-gray-800 text-primary-400 px-1 py-0.5 rounded-sm'>
        {children}
      </code>
    ),
    strike: ({ children }: any) => <del className='text-white'>{children}</del>,
  },
}
