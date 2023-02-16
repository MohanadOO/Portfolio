import Image from 'next/image'
import urlFor from '../../utils/urlFor'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from './RichTextComponents'

import { useState, useEffect } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import getPageOG from '../../utils/getPageOG'

export function PostLayout({ post }: { post: Post }) {
  const { locale, pathName } = pageSEO(post.slug.current)

  const [language, setLanguage] = useState<string>(locale)

  useEffect(() => {
    if (post.body.ar === undefined) {
      setLanguage('en')
    } else {
      setLanguage(locale)
    }
  }, [locale])

  return (
    <>
      <NextSeo
        title={post.title[language]}
        description={post.description[language]}
        openGraph={getPageOG(
          pathName,
          'article',
          post.title.en,
          post.description.en,
          post.mainImage,
          post.author.name,
          post.author.image,
          post.publishedAt,
          post.title[language]
        )}
      />
      <article
        className='py-24 mx-auto min-h-screen'
        dir={`${language === 'en' ? 'ltr' : 'rtl'}`}
      >
        <section className='space-y-2 border border-primary-400 text-primary-white mb-10'>
          <div className='relative flex flex-col md:flex-row justify-between'>
            <div className='absolute top-0 w-full h-full opacity-10 blur-sm p-10'>
              <Image
                className='object-cover object-center mx-auto'
                src={post.mainImage && urlFor(post.mainImage).url()}
                alt={post.author && post.author.name}
                fill
              />
            </div>
            <section className='py-8 px-5 md:px-10 bg-primary-400 w-full h-full'>
              <div className='max-w-5xl mx-auto md:px-10'>
                {locale === 'ar' && language !== 'ar' ? (
                  <div className='bg-orange-600 dark:bg-orange-600 text-primary-white p-2 flex justify-center items-center gap-2 text-sm mb-5'>
                    <AiOutlineWarning className='w-5 h-5' />
                    <span>الترجمة العربية غير متوفرة</span>
                  </div>
                ) : (
                  ''
                )}
                <div className='flex flex-col md:flex-row justify-between gap-y-5 '>
                  <div>
                    <h1 className='text-4xl font-extrabold'>
                      {post.title[language]}
                    </h1>
                    {post.categories &&
                      post.categories.map((category: Category) => (
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
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <h2 className='italic py-5 max-w-lg'>
                    {post.description && post.description[language]}
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
                          <h3 className='font-semibold'>{post.author.name}</h3>
                        </>
                      )}
                      {/* TODO: Add Author Bio */}
                      {/* <div>{post.author.bio}</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <div className='mx-auto px-5 md:px-10 max-w-5xl selection:bg-primary-400/70 selection:text-white break-words'>
          <PortableText
            value={post.body[language]}
            components={RichTextComponents}
          />
        </div>
      </article>
    </>
  )
}
