import { lazy } from 'react'
import { BlogList } from '../components/Blog/BlogList'
import { client } from '../sanity/sanity.client'

import { PreviewSuspense } from 'next-sanity/preview'
import BlogLayout from '../components/Blog/BlogLayout'
import { getPostsInfo } from '../sanity/queries/blog'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import generateRssFeed from '../utils/generateRSSFees'

type Props = {
  preview: boolean
  posts: Post[]
}

export const getStaticProps = async ({ preview = false, locale }) => {
  if (preview) {
    return {
      props: {
        ...(await loadTranslations(ni18nConfig, locale, ['blog'])),
        preview,
      },
    }
  }

  const posts = await client.fetch(getPostsInfo)
  await generateRssFeed(posts)
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['blog'])),
      preview,
      posts,
    },
    revalidate: 600,
  }
}

const PreviewBlogList = lazy(() => import('../components/Blog/PreviewBlogList'))

export default function Blog({ preview, posts }: Props) {
  if (preview) {
    return (
      <BlogLayout>
        <PreviewSuspense fallback='Loading...'>
          <PreviewBlogList />
        </PreviewSuspense>
      </BlogLayout>
    )
  }
  return (
    <BlogLayout>
      <BlogList posts={posts} />
    </BlogLayout>
  )
}
