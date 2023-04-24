import { PortableText } from '@portabletext/react'
import { RichTextComponents } from './RichTextComponents'

import { useState, useEffect, useRef } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import getPageOG from '../../utils/getPageOG'

import { motion, useScroll } from 'framer-motion'
import { HiOutlineBookOpen } from 'react-icons/hi'
import TableOfContent from '../TableOfContent'
export function PostLayout({ post }: { post: Post }) {
  const { scrollYProgress } = useScroll()
  const [progressBar, setProgressBar] = useState(false)
  const lastScrollY = useRef(0)

  const { locale, pathName } = pageSEO(post.slug.current)

  const [language, setLanguage] = useState<string>(locale)

  useEffect(() => {
    if (post.body) {
      if (post.body?.ar === undefined) {
        setLanguage('en')
      } else {
        setLanguage(locale)
      }
    }
  }, [locale])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  function handleScroll() {
    if (typeof window !== undefined) {
      if (window.scrollY > lastScrollY.current) {
        setProgressBar(false)
      } else {
        setProgressBar(true)
      }
      lastScrollY.current = window.scrollY
    }
  }

  const readingTime =
    language === 'ar' ? post.readingTimeAR : post.readingTimeEN

  const title = post.title ? post.title[language] : ''
  const desc = post.description ? post.description[language] : ''

  return (
    <>
      <NextSeo
        title={title}
        description={desc}
        openGraph={getPageOG(
          pathName,
          'article',
          post.title?.en,
          post.description?.en,
          post.author?.name,
          post.author?.image,
          post.publishedAt,
          title
        )}
      />
      <article
        className='mx-auto min-h-screen py-24'
        dir={`${language === 'en' ? 'ltr' : 'rtl'}`}
      >
        <section className='space-y-2 mb-5 border-y-2 border-primary-400'>
          <section className='py-8 inset-0 w-full h-full'>
            <div className='max-w-6xl mx-auto'>
              {locale === 'ar' && language !== 'ar' ? (
                <div className='bg-orange-600 dark:bg-orange-600 text-primary-white p-2 flex justify-center items-center gap-2 text-sm mb-5'>
                  <AiOutlineWarning className='w-5 h-5' />
                  <span>الترجمة العربية غير متوفرة</span>
                </div>
              ) : (
                ''
              )}
              <div className='flex flex-col gap-2'>
                {title ? (
                  <h1 className='text-4xl md:text-5xl lg:text-6xl text-primary-400 font-extrabold'>
                    {title}
                  </h1>
                ) : (
                  <h1 className='text-4xl md:text-5xl lg:text-6xl text-red-400 font-extrabold uppercase'>
                    Title Not Found!
                  </h1>
                )}
                <div className='max-w-md opacity-70 dark:opacity-60 mt-1'>
                  <div className='flex flex-wrap items-center gap-4 text-xs sm:text-sm md:text-base'>
                    {post.author ? (
                      <h3>{post.author.name}</h3>
                    ) : (
                      <h3 className='text-red-400 uppercase'>
                        Author Not Found
                      </h3>
                    )}
                    <div className='w-0.5 h-5 bg-primary-400' />
                    {post.publishedAt ? (
                      <p>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    ) : (
                      <p className='text-red-400 uppercase'>No Date</p>
                    )}
                  </div>
                </div>
                {desc ? (
                  <h2 className='italic max-w-lg pt-5 pb-1 md:text-lg'>
                    {desc}
                  </h2>
                ) : (
                  <h2 className='max-w-lg pt-5 md:text-lg text-red-400 uppercase'>
                    Description not found
                  </h2>
                )}
                {readingTime > 0 && (
                  <p className='flex items-center gap-2 md:text-lg pb-5 text-primary-400'>
                    <HiOutlineBookOpen className='w-4 h-4 md:w-5 md:h-5' />{' '}
                    <span>
                      {readingTime}{' '}
                      {language === 'ar' ? 'دقائق للقراءة' : 'min read'}
                    </span>
                  </p>
                )}
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
        <div
          className={`${
            progressBar
              ? 'top-16 sm:top-[4.5rem]'
              : 'top-0 bg-neutral-300 dark:bg-neutral-800'
          } transition-[top] duration-500 ease-out fixed top-0 left-0 right-0 h-2 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 z-40 origin-left rtl:origin-right rounded-sm`}
        >
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className={`${
              progressBar ? 'top-16 sm:top-[4.5rem]' : 'top-0'
            } transition-[top] duration-500 ease-out fixed top-0 left-0 right-0 origin-left rtl:origin-right h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-sm md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40`}
          ></motion.div>
        </div>
        <div className='flex justify-start items-start gap-10 selection:bg-primary-400/70 selection:text-white break-words pt-5 pb-10'>
          {post.body && (
            <div className='w-full overflow-hidden'>
              <PortableText
                value={post.body[language]}
                components={RichTextComponents}
              />
            </div>
          )}
          <TableOfContent locale={language} scroll={progressBar} />
        </div>
      </article>
    </>
  )
}
