import { NextSeo } from 'next-seo'
import getPageOG from '../../utils/getPageOG'

import PostBody from './PostBody'
import ProgressBar from '../ProgressBar'
import LikeButton from './LikeButton'
import { PostContextProvider, usePost } from '../../hooks/usePost'
import PostHeader from './PostHeader'
import PostRecommendations from './PostRecommendations'
import { useRouter } from 'next/router'

export function PostLayout({
  post,
  preview = false,
}: {
  post: Post
  preview?: boolean
}) {
  const {
    title: postTitle,
    description,
    slug,
    author,
    mainImage,
    publishedAt,
    _updatedAt,
    categories,
    body_ar,
    recommend,
  } = post
  const locale = useRouter().locale
  const language = body_ar ? locale : 'en'
  
  const title = postTitle ? postTitle[language] : ''
  const desc = description ? description[language] : ''

  return (
    <PostContextProvider post={post} preview={preview} language={language}>
      <NextSeo
        title={title}
        description={desc}
        openGraph={getPageOG(
          `blog/${slug.current}`,
          'article',
          post.title?.en,
          post.description?.en,
          author?.name,
          author?.image,
          mainImage,
          publishedAt,
          _updatedAt,
          title,
          categories || []
        )}
      />
      <article
        className='mx-auto min-h-screen py-24 max-w-7xl px-4 sm:px-10'
        id='article_post'
        dir={`${language === 'en' ? 'ltr' : 'rtl'}`}
      >
        <section className='space-y-2 mb-5 border-y-2 border-primary-purple/40'>
          <PostHeader title={title} desc={desc} language={language} />
        </section>

        <LikeButton />
        <ProgressBar />
        <PostBody language={language} />
        {recommend && recommend.length > 0 && (
          <PostRecommendations items={recommend} />
        )}
      </article>
    </PostContextProvider>
  )
}
