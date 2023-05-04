import { PortableText } from '@portabletext/react'
import { RichTextComponents } from './RichTextComponents'

import { useState, useEffect, useRef } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import getPageOG from '../../utils/getPageOG'

import { motion, useScroll } from 'framer-motion'
import { HiEye, HiOutlineBookOpen, HiOutlineHeart } from 'react-icons/hi'
import TableOfContent from '../TableOfContent'
import { useHandleScroll } from '../../hooks/useHandleScroll'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function PostLayout({ post }: { post: Post }) {
  const [isLike, setIsLike] = useState<boolean | string>('loading')
  const [likeCount, setLikeCount] = useState(post.likeCount || 0)
  const [viewCount, setViewCount] = useState(post.viewCount || 0)

  const { scrollYProgress } = useScroll()
  const { locale, pathName } = pageSEO(post.slug.current)
  const { isScrollDown } = useHandleScroll()

  async function handleLikeCount() {
    setLikeCount((count) => count + (!isLike ? 1 : -1))
    setIsLike((prev) => !prev)

    const like = await fetch(
      `${BASE_URL}/api/count?postID=${post._id}&type=like&val=${
        !isLike ? 1 : -1
      }`,
      {
        method: 'POST',
      }
    )

    if (like.ok) {
      const getItem = JSON.parse(localStorage.getItem('like')) || []
      if (!isLike) {
        localStorage.setItem('like', JSON.stringify([...getItem, post._id]))
      } else {
        const index = getItem.indexOf(post._id)
        localStorage.setItem(
          'like',
          JSON.stringify([
            ...getItem.slice(0, index),
            ...getItem.slice(index + 1),
          ])
        )
      }
    }
  }

  useEffect(() => {
    async function increaseViewCount() {
      await fetch(`${BASE_URL}/api/count?postID=${post._id}&type=view`, {
        method: 'POST',
      })
    }
    if (process.env.NODE_ENV === 'production') {
      setViewCount((count) => count + 1)
      increaseViewCount()
    }
    const getItem = JSON.parse(localStorage.getItem('like')) || []
    setIsLike(getItem.includes(post._id))
  }, [])

  const language = post.body?.ar ? locale : 'en'
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
        className='mx-auto min-h-screen py-24 max-w-7xl'
        id='article_post'
        dir={`${language === 'en' ? 'ltr' : 'rtl'}`}
      >
        <section className='space-y-2 mb-5 border-y-2 border-primary-400/20'>
          <section className='py-8 inset-0 w-full h-full'>
            <div className='mx-auto'>
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
                  <h1 className='text-4xl ar:leading-snug md:text-5xl md:ar:leading-snug lg:text-6xl lg:ar:leading-snug max-w-4xl text-primary-400 font-extrabold'>
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
                <div className='flex gap-5 mt-3'>
                  <p className='flex items-center gap-2 font-bold'>
                    <HiEye className='w-5 h-5 text-primary-400' /> {viewCount}
                  </p>
                  <p className='flex items-center gap-2 font-bold'>
                    <HiOutlineHeart className='w-5 h-5 fill-primary-400 text-primary-400 dark:text-black' />{' '}
                    {likeCount}
                  </p>
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
        {isLike === 'loading' ? (
          ''
        ) : (
          <button
            title={isLike ? 'Unlike Post' : 'Like Post'}
            onClick={handleLikeCount}
            className={`fixed ltr:right-[5%] rtl:left-[5%] bottom-36 md:bottom-44 xl:bottom-28 w-8 h-8 md:w-10 md:h-10 text-black dark:text-white border dark:border-white/10 shadow-lg rounded-full group z-50 ${
              isLike
                ? 'bg-pink-600 transition-colors'
                : 'bg-neutral-100 dark:bg-neutral-800'
            }`}
          >
            <HiOutlineHeart
              className={`w-4 h-4 md:w-6 md:h-6  mx-auto group-hover:scale-110 transition-all ${
                isLike ? 'text-white' : 'text-pink-700'
              }`}
            />{' '}
          </button>
        )}
        <div
          className={`${
            isScrollDown ? 'top-16 sm:top-[4.5rem]' : 'top-0'
          } transition-[top] bg-neutral-200 dark:bg-neutral-800 duration-500 ease-out fixed top-0 left-0 right-0 h-2 z-40 origin-left rtl:origin-right rounded-sm`}
        >
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className={`${
              isScrollDown ? 'top-16 sm:top-[4.5rem]' : 'top-0'
            } transition-[top] duration-500 ease-out fixed top-0 left-0 right-0 origin-left rtl:origin-right h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-sm`}
          ></motion.div>
        </div>
        <div className='flex justify-start items-start gap-10 selection:bg-primary-400/70 selection:text-white break-words pt-5 pb-10'>
          {post.body && (
            <div className='w-full overflow-hidden text-gray-700 dark:text-gray-300 leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9'>
              <PortableText
                value={post.body[language]}
                components={RichTextComponents}
              />
            </div>
          )}
          <TableOfContent locale={language} scroll={isScrollDown} />
        </div>
      </article>
    </>
  )
}
