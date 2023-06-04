import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { HiOutlineLink } from 'react-icons/hi'
import PostCard from './PostCard'

export function BlogList({
  viewBtn = false,
  posts,
}: {
  viewBtn?: boolean
  posts: Post[]
}) {
  const { t } = useTranslation(['blog', 'common'])

  return (
    <div className='mx-auto my-10'>
      {posts.length > 0 ? (
        <div className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-10 gap-y-16 pb-10'>
          {posts.map((post: Post) => {
            return <PostCard key={post._id} post={post} />
          })}
        </div>
      ) : (
        <div className='text-center my-10'>
          <h1 className='font-bold text-red-600 dark:text-red-400 uppercase text-2xl'>
            {t('noPost')}
          </h1>
        </div>
      )}

      {viewBtn && (
        <Link
          href='/blog'
          className='flex mb-12 items-center justify-center rounded-lg w-56 mx-auto py-2 px-8 gap-2 bg-primary-purple/80 hover:bg-primary-purple shadow-lg dark:shadow-primary-white/10 text-primary-white font-bold text-lg transition-colors'
        >
          {t('allPosts', { ns: 'common' })}
          <HiOutlineLink className='w-5 h-5' />
        </Link>
      )}
    </div>
  )
}
