import { groq } from 'next-sanity'
import { client } from '../../sanity/sanity.client'

import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'
import { getPostData } from '../../sanity/queries/blog'
import { getAllPostsIds } from '../../utils/blogUtils'

import { PreviewSuspense } from 'next-sanity/preview'
import { PostLayout } from '../../components/Blog/PostLayout'
import { lazy } from 'react'

const PreviewPostLayout = lazy(
  () => import('../../components/Blog/PreviewPostLayout')
)

type Props = {
  preview: boolean
  post: Post
  slug: string
}

function Post({ preview, post, slug }: Props) {
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewPostLayout slug={slug} />
      </PreviewSuspense>
    )
  }

  return <PostLayout post={post} />
}

export default Post

export const getStaticProps = async ({ preview = false, params, locale }) => {
  const slug = params.slug

  if (preview) {
    return {
      props: {
        ...(await loadTranslations(ni18nConfig, locale, ['blog'])),
        preview,
        slug,
      },
    }
  }

  const post: Post = await client.fetch(getPostData(slug), { slug })
  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['blog'])),
      post,
      slug,
    },
    revalidate: 300,
  }
}

export const getStaticPaths = async () => {
  const query = groq`*[_type == "post"]{
    slug{current}
  }`

  const slugs: Post[] = await client.fetch(query)
  const slugsRoutes = getAllPostsIds(slugs)

  return {
    paths: slugsRoutes,
    fallback: 'blocking',
  }
}
