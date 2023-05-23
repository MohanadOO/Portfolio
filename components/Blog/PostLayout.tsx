import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import getPageOG from '../../utils/getPageOG'

import { useHandleScroll } from '../../hooks/useHandleScroll'
import PostBody from './PostBody'
import ProgressBar from '../ProgressBar'
import LikeButton from './LikeButton'
import { PostContextProvider, usePost } from '../../hooks/usePost'
import PostHeader from './PostHeader'
import PostRecommendations from './PostRecommendations'

export function PostLayout({
  post,
  preview = false,
}: {
  post: Post
  preview?: boolean
}) {
  const { locale, pathName } = pageSEO(post.slug.current)

  const language = post.body?.ar ? locale : 'en'
  const title = post.title ? post.title[language] : ''
  const desc = post.description ? post.description[language] : ''

  return (
    <PostContextProvider post={post} preview={preview}>
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
        <section className='space-y-2 mb-5 border-y-2 border-primary-400/40'>
          <PostHeader title={title} desc={desc} language={language} />
        </section>

        <LikeButton />
        <ProgressBar />
        <PostBody language={language} />
        {post.recommend && post.recommend.length > 0 && (
          <PostRecommendations items={post.recommend} />
        )}
      </article>
    </PostContextProvider>
  )
}
