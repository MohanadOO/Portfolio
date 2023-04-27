import { lazy } from 'react'
import { BlogList } from '../components/Blog/BlogList'
import { client } from '../sanity/sanity.client'

import { PreviewSuspense } from 'next-sanity/preview'
import BlogLayout from '../components/Blog/BlogLayout'
import { getPostsInfo } from '../sanity/queries/blog'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

type Props = {
  preview: boolean
  posts: Post[]
}

export const getStaticProps = async ({ preview = false, locale }) => {
  if (preview) {
    return {
      props: {
        ...(await loadTranslations(ni18nConfig, locale, ['blog', 'common'])),
        preview,
      },
    }
  }

  const posts = await client.fetch(getPostsInfo)
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rss`, {
    method: 'PUT',
    body: JSON.stringify(posts),
  })
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['blog', 'common'])),
      preview,
      posts,
    },
    revalidate: 300,
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
