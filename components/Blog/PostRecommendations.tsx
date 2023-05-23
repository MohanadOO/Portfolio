import React from 'react'
import PostCard from './PostCard'
import { useTranslation } from 'react-i18next'

export default function PostRecommendations({
  items,
}: {
  items: Post['recommend']
}) {
  const { t } = useTranslation('blog')

  return (
    <div
      id='recommendation'
      className='my-16 md:my-20 border-y-2 border-primary-400/40'
    >
      <h1 className='text-4xl md:text-6xl text-center font-bold my-16'>
        {t('recommendation')}
      </h1>
      <div className=''>
        {items && items.length > 0 ? (
          <div className='grid lg:grid-cols-2 gap-10 gap-y-16 pb-10'>
            {items.map((post: Post) => {
              return <PostCard key={post._id} post={post} />
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
