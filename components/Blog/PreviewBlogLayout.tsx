import React from 'react'
import BlogLayout from './BlogLayout'
import { BlogList } from './BlogList'
import { useRouter } from 'next/router'
import { usePreview } from '../../sanity/sanity.preview'
import { getCategories, getPostsQuery } from '../../sanity/queries/blog'

export default function PreviewBlogLayout() {
  const router = useRouter()
  const { page, category } = router.query
  const posts = usePreview(null, getPostsQuery(category, page))
  const categories: Category[] = usePreview(null, getCategories())
  console.log('LOADING POSTS...', posts)
  console.log('LOADING CATEGORIES...', categories)

  return (
    <BlogLayout categories={categories} count={posts.total}>
      <BlogList posts={posts.items} />
    </BlogLayout>
  )
}
