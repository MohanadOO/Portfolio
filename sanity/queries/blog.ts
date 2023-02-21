export const getPostsInfo = `*[_type=='post']{
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->
} | order(_createdAt desc)`

export const getPostData = (slug: string) => {
  return `*[_type=='post' && slug.current == '${slug}'][0]{
      ...,
      author->,
      categories[]->
    }`
}
