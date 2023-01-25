import Image from 'next/image'
import Link from 'next/link'
import urlFor from '../../utils/urlFor'

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
    code: ({ children }: any) => <h1>{children}</h1>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className='ml-10 py-5 list-disc space-y-5'>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className='mt-10 list-decimal'>{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className='text-5xl py-10 font-bold'>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='text-4xl py-8 font-bold'>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='text-3xl py-6 font-bold'>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='text-2xl py-4 font-bold'>{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className='border-l-purple-500 border-l-4 pl-5 py-5 my-5'>
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
          className='underline decoration-purple-700 hover:decoration-black'
        >
          {children}
        </Link>
      )
    },
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => <strong className='bold'>{children}</strong>,
    code: ({ children }: any) => (
      <code className='bg-gray-300 p-1  rounded-md'>{children}</code>
    ),
    strike: ({ children }: any) => <del className='text-white'>{children}</del>,
  },
}
