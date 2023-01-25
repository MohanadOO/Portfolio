import { lazy } from 'react'
import { BlogList } from '../components/Blog/BlogList'
import { client } from '../sanity/sanity.client'

import { PreviewSuspense } from 'next-sanity/preview'
import BlogLayout from '../components/Blog/BlogLayout'
import { getPostsInfo } from '../sanity/queries/blog'

type Props = {
  preview: boolean
  posts: Post[]
}

export const getStaticProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } }
  }

  const posts = await client.fetch(getPostsInfo)
  return { props: { preview, posts }, revalidate: 600 }
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
