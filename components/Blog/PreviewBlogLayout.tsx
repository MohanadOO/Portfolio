import React from 'react'
import BlogLayout from './BlogLayout'
import { useRouter } from 'next/router'
import { usePreview } from '../../sanity/sanity.preview'
import { getCategories, getPostsQuery } from '../../sanity/queries/blog'

export default function PreviewBlogLayout() {
  const router = useRouter()
  const { page, category, q } = router.query
  const posts = usePreview(null, getPostsQuery(category, page, q))
  const categories: Category[] = usePreview(null, getCategories())
  console.log('LOADING POSTS...', posts)
  console.log('LOADING CATEGORIES...', categories)

  return <BlogLayout categories={categories} posts={posts} preview={true} />
}
