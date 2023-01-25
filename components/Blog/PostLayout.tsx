import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import urlFor from '../../utils/urlFor'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from './RichTextComponents'

export function PostLayout({ post }) {
  const locale = useRouter().locale
  const title = locale === 'ar' ? post.title.ar : post.title.en
  return (
    <>
      <Head>
        <title>
          {locale === 'ar'
            ? `مهند الرويحي | ${title}`
            : `Mohanad Alrwaihy | ${title}`}
        </title>
      </Head>
      <article className='px-10 py-32 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 min-h-screen'>
        <section className='space-y-2 border border-primary-400 text-primary-white mb-12'>
          <div className='relative flex flex-col md:flex-row justify-between'>
            <div className='absolute top-0 w-full h-full opacity-10 blur-sm p-10'>
              <Image
                className='object-cover object-center mx-auto'
                src={post.mainImage && urlFor(post.mainImage).url()}
                alt={post.author && post.author.name}
                fill
              />
            </div>
            <section className='py-8 px-10 bg-primary-400 w-full h-full'>
              <div className='flex flex-col md:flex-row justify-between gap-y-5'>
                <div>
                  <h1 className='text-4xl font-extrabold'>{post.title.en}</h1>
                  {post.categories &&
                    post.categories.map((category) => (
                      <div
                        key={category._id}
                        className='flex items-center mt-auto space-x-2'
                      >
                        <p className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4'>
                          {category.title}
                        </p>
                      </div>
                    ))}
                </div>
                <p>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <h2 className='italic py-5 max-w-lg'>
                  {post.description && post.description.en}
                </h2>
                <div className='max-w-md'>
                  <div className='flex items-center space-x-2'>
                    {post.author && (
                      <>
                        <Image
                          className='rounded-full'
                          src={urlFor(post.author.image).url()}
                          alt={post.author.name}
                          width={35}
                          height={35}
                        />
                        <h3 className='text-md font-semibold'>
                          {post.author && post.author.name}
                        </h3>
                      </>
                    )}
                    {/* TODO: Add Author Bio */}
                    {/* <div>{post.author.bio}</div> */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <PortableText value={post.body.en} components={RichTextComponents} />
      </article>
    </>
  )
}
