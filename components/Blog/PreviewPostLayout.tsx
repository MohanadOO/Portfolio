import { getPostData } from '../../sanity/queries/blog'
import { usePreview } from '../../sanity/sanity.preview'
import { PostLayout } from './PostLayout'

function PreviewPostLayout({ slug }) {
  const post = usePreview(null, getPostData(slug))
  console.log('Loading Post', post)
  return <PostLayout post={post} />
}
export default PreviewPostLayout
