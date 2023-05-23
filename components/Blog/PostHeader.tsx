import React, { useEffect } from 'react'
import { usePost } from '../../hooks/usePost'
import pageSEO from '../../utils/pageSEO'
import { AiOutlineWarning } from 'react-icons/ai'
import { HiEye, HiOutlineBookOpen, HiOutlineHeart } from 'react-icons/hi'
import PostCategories from './PostCategories'

type PropsType = {
  language: string
  title: string
  desc: string
}

export default function PostHeader({ language, title, desc }: PropsType) {
  const { post, viewCount, likeCount } = usePost()

  const { locale } = pageSEO(post.slug.current)
  const readingTime =
    language === 'ar' ? post.readingTimeAR : post.readingTimeEN

  return (
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
                <h3 className='text-red-400 uppercase'>Author Not Found</h3>
              )}
              <div className='w-0.5 h-5 bg-primary-400' />
              {post.publishedAt ? (
                <p>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
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
            <h2 className='italic max-w-lg pt-5 pb-1 md:text-lg'>{desc}</h2>
          ) : (
            <h2 className='max-w-lg pt-5 md:text-lg text-red-400 uppercase'>
              Description not found
            </h2>
          )}
          {readingTime > 0 && (
            <p className='flex items-center gap-2 md:text-lg text-primary-400'>
              <HiOutlineBookOpen className='w-4 h-4 md:w-5 md:h-5' />{' '}
              <span>
                {readingTime} {language === 'ar' ? 'دقائق للقراءة' : 'min read'}
              </span>
            </p>
          )}
          <PostCategories categories={post.categories} currCategory={'GIT'} />
        </div>
      </div>
    </section>
  )
}
