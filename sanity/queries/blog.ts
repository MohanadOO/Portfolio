export const getPostsInfo = `*[_type=='post']{
  ...,
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
