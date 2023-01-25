import { getPostsInfo } from '../../sanity/queries/blog'
import { usePreview } from '../../sanity/sanity.preview'
import { BlogList } from './BlogList'

function PreviewBlogList() {
  const posts = usePreview(null, getPostsInfo)
  console.log('LOADING POSTS...', posts)
  return <BlogList posts={posts} />
}

export default PreviewBlogList
