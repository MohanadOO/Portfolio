import Image from 'next/image'
import urlFor from '../../utils/urlFor'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from './RichTextComponents'

import { useState, useEffect } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import getPageOG from '../../utils/getPageOG'

import { motion, useScroll } from 'framer-motion'

export function PostLayout({ post }: { post: Post }) {
  const { scrollYProgress } = useScroll()

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
          post.author.name,
          post.author.image,
          post.publishedAt,
          post.title[language]
        )}
      />
      <article
        className='mx-auto min-h-screen'
        dir={`${language === 'en' ? 'ltr' : 'rtl'}`}
      >
        <section className='space-y-2 mb-5 border-y-2 border-primary-400'>
          <section className='py-8 inset-0 w-full h-full'>
            <div className='max-w-5xl mx-auto'>
              {locale === 'ar' && language !== 'ar' ? (
                <div className='bg-orange-600 dark:bg-orange-600 text-primary-white p-2 flex justify-center items-center gap-2 text-sm mb-5'>
                  <AiOutlineWarning className='w-5 h-5' />
                  <span>الترجمة العربية غير متوفرة</span>
                </div>
              ) : (
                ''
              )}
              <div className='flex flex-col gap-2'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl text-primary-400 font-extrabold'>
                  {post.title[language]}
                </h1>
                <div className='max-w-md opacity-60 mt-1'>
                  <div className='flex flex-wrap items-center gap-4 text-xs sm:text-sm md:text-base'>
                    {post.author && <h3>{post.author.name}</h3>}
                    <div className='w-0.5 h-5 bg-primary-400' />
                    <p>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <h2 className='italic py-5 max-w-lg md:text-lg'>
                  {post.description && post.description[language]}
                </h2>
                <div className='flex flex-wrap gap-3'>
                  {post.categories &&
                    post.categories.map((category: Category) => (
                      <div
                        key={category._id}
                        className='flex justify-center items-center mt-auto space-x-2'
                      >
                        <p className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                          {category.title}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </section>
        <div className='mx-auto max-w-5xl selection:bg-primary-400/70 selection:text-white break-words'>
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className='fixed top-16 sm:top-[4.5rem] left-0 right-0 origin-left rtl:origin-right h-2 bg-gradient-to-r from-green-300 to-green-500 z-50 rounded-sm '
          ></motion.div>
          <PortableText
            value={post.body[language]}
            components={RichTextComponents}
          />
        </div>
      </article>
    </>
  )
}
