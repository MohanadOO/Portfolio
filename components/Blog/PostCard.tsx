import Link from 'next/link'
import React from 'react'
import CustomImage from '../CustomImage'
import urlFor from '../../utils/urlFor'
import { useRouter } from 'next/router'
import { AiOutlineWarning } from 'react-icons/ai'
import {
  HiExternalLink,
  HiEye,
  HiOutlineBookOpen,
  HiOutlineHeart,
} from 'react-icons/hi'
import {
  getDesc,
  getPostLanguage,
  getReadingTime,
  getTitle,
} from '../../utils/postUtils'
import PostCategories from './PostCategories'
import { useReducedMotion, motion } from 'framer-motion'

export default function PostCard({ post }: { post: Post }) {
  const reduce = useReducedMotion()
  const router = useRouter()
  const locale = router.locale

  const { readingTimeAR, readingTimeEN } = post
  const { category: currCategory } = router.query

  const language = getPostLanguage(post.title, post.description, locale)
  const title = getTitle(post.title, language)
  const desc = getDesc(post.description, language)
  const readingTime = getReadingTime(readingTimeAR, readingTimeEN, locale)

  const date = new Date(post.publishedAt)
  const dateFormate = new Intl.DateTimeFormat(language + '-u-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  return (
    <motion.div
      variants={child(reduce)}
      className='flex flex-col justify-between'
    >
      <Link
        href={`/blog/${post?.slug?.current}`}
        className='group overflow-hidden'
      >
        <div className='relative w-full aspect-video shadow-xl dark:shadow-white/5 overflow-hidden border border-black dark:border-white'>
          <CustomImage
            src={
              post.mainImage !== null && urlFor(post.mainImage).fit('max').url()
            }
            alt={
              post.author && post.author.name ? post.author.name : 'Anonymous'
            }
            fill
            style={{ objectFit: 'contain' }}
            className='group-hover:scale-105 group-hover:contrast-125 transition-transform ease-out motion-reduce:duration-75 duration-200'
          />{' '}
          {locale === 'ar' && language !== 'ar' ? (
            <div className='absolute top-0 bg-orange-600 dark:bg-orange-600 text-background p-2 flex justify-center items-center gap-2 text-sm'>
              <span>الترجمة العربية غير متوفرة</span>
              <AiOutlineWarning className='w-5 h-5' />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='my-2'>
          <div className='flex items-center gap-2 text-xs md:text-sm font-bold opacity-90 '>
            {readingTime > 0 && (
              <p className='flex items-center gap-2'>
                <HiOutlineBookOpen className='w-4 h-4 md:w-5 md:h-5' />{' '}
                <span>
                  {readingTime} {locale === 'ar' ? 'دقائق للقراءة' : 'min read'}
                </span>
              </p>
            )}
            {' - '}
            {post.publishedAt && <p>{dateFormate}</p>}
          </div>
          <p
            title={title || 'Title Not found'}
            className={`${
              title
                ? 'font-bold group-hover:text-primary'
                : 'text-red-400 uppercase'
            } flex gap-3 justify-between items-center sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 line-clamp-2 py-2 `}
          >
            {title || 'Title Not found'}{' '}
            <span>
              <HiExternalLink />
            </span>
          </p>
          <p
            title={desc || 'Description Not found'}
            className={`${
              desc ? 'opacity-90' : 'text-red-400 uppercase'
            } text-sm md:text-base mb-1 line-clamp-2 font-bold`}
          >
            {desc || 'Description Not found'}
          </p>
          <div className='flex mt-3 gap-5 text-gray-600 dark:text-gray-300 text-xs md:text-sm'>
            <p className='flex items-center gap-1 font-bold'>
              <HiEye className='w-4 h-4 text-primary' /> {post.viewCount || 0}
            </p>
            <p className='flex items-center gap-1 font-bold'>
              <HiOutlineHeart className='w-4 h-4 fill-primary text-primary dark:text-black' />{' '}
              {post.likeCount || 0}
            </p>
          </div>
        </div>
      </Link>
      <PostCategories
        categories={post.categories}
        currCategory={currCategory}
      />
    </motion.div>
  )
}

const child = (reduce: boolean) => ({
  initial: { opacity: 0, y: '20%' },
  animate: { opacity: 1, y: 0, transition: { type: 'spring' } },
})
