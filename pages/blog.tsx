import { lazy } from 'react'
import { BlogList } from '../components/Blog/BlogList'
import { client } from '../sanity/sanity.client'

import { PreviewSuspense } from 'next-sanity/preview'
import BlogLayout from '../components/Blog/BlogLayout'
import { getCategories, getPostsQuery } from '../sanity/queries/blog'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

type Props = {
  preview: boolean
  posts: { items: Post[]; total: number }
  categories: Category[]
}

export const getServerSideProps = async ({
  query,
  preview = false,
  locale,
}) => {
  if (preview) {
    return {
      props: {
        ...(await loadTranslations(ni18nConfig, locale, ['blog', 'common'])),
        preview,
      },
    }
  }

  const { page, category, q } = query
  const posts: { items: Post[]; total: number } = await client.fetch(
    getPostsQuery(category, page, q)
  )
  const categories: Category[] = await client.fetch(getCategories())

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['blog', 'common'])),
      preview,
      posts,
      categories,
    },
  }
}

const PreviewBlogLayout = lazy(
  () => import('../components/Blog/PreviewBlogLayout')
)

export default function Blog({ preview, posts, categories }: Props) {
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewBlogLayout />
      </PreviewSuspense>
    )
  }
  return <BlogLayout categories={categories} posts={posts} />
}
