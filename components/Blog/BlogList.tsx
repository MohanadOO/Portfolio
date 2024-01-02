import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { HiOutlineLink } from 'react-icons/hi'
import PostCard, { PostCardSkeleton } from './PostCard'
import { useReducedMotion, motion } from 'framer-motion'
import Pagination from './Pagination'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getPostsQuery } from '../../sanity/queries/blog'
import { client } from '../../sanity/sanity.client'
import { useEffect, useState } from 'react'
import { Spinner } from '../ui/Spinner'
import ErrorMessage from '../ui/ErrorMessage'

export function BlogList({
  viewBtn = false,
  posts,
  preview = false,
}: {
  viewBtn?: boolean
  posts: { items: Post[]; total: number }
  preview?: boolean
}) {
  const [initialRender, setInitialRender] = useState(false)

  const router = useRouter()
  const reduce = useReducedMotion()
  const { t } = useTranslation(['blog', 'common'])

  useEffect(() => {
    setInitialRender(true)
  }, [])

  const { page, category, q } = router.query
  const pathname = router.pathname
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', page || '1', category || 'View All', q || '', pathname],
    queryFn: () => client.fetch(getPostsQuery(category, page, q)),
    initialData: !initialRender ? posts : undefined,
    enabled: !preview,
  })

  if (isLoading)
    return (
      <motion.div
        variants={variant(reduce)}
        initial='initial'
        animate='animate'
        className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-10 gap-y-16 pb-10 my-10'
      >
        {[1, 2, 3, 4, 5, 6].map((_) => {
          return <PostCardSkeleton />
        })}
      </motion.div>
    )
  if (error) return <ErrorMessage message={t('noResult')} />

  /* 
     useQuery will not work in the preview since we are using the usePreview hook from Sanity.
     So we get the data from it which is passed to this component
  */
  const items = preview ? posts.items : data.items
  const total = preview ? posts.total : data.total

  return (
    <div className='mx-auto my-10'>
      {items.length > 0 ? (
        <motion.div
          variants={variant(reduce)}
          initial='initial'
          animate='animate'
          className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-10 gap-y-16 pb-10'
        >
          {items.map((post: Post) => {
            return <PostCard key={post._id} post={post} />
          })}
        </motion.div>
      ) : (
        <ErrorMessage message={t('noResult')} />
      )}

      {viewBtn && (
        <Link
          href='/blog'
          className='flex mb-12 items-center justify-center rounded-lg w-56 mx-auto py-2 px-8 gap-2 bg-primary/80 hover:bg-primary shadow-lg dark:shadow-background/10 text-background font-bold text-lg transition-colors'
        >
          {t('allPosts', { ns: 'common' })}
          <HiOutlineLink className='w-5 h-5' />
        </Link>
      )}

      {total ? <Pagination count={total} /> : ''}
    </div>
  )
}

const variant = (reduce: boolean) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
})
