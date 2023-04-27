export const getPostsInfo = `*[_type=='post']{
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->,
  "totalCharactersEN": length(pt::text(body.en)),
  "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body.ar)),
  "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
} | order(_createdAt desc)`

export const getPostsInfoHome = `*[_type=='post' && count(body.ar) > 0][0...6]{
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->,
  "totalCharactersEN": length(pt::text(body.en)),
  "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body.ar)),
  "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
} | order(_createdAt desc)`

export const getPostData = (slug: string) => {
  return `*[_type=='post' && slug.current == '${slug}'][0]{
      ...,
      author->,
      categories[]->,
      "totalCharactersEN": length(pt::text(body.en)),
      "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
      "totalCharactersAR": length(pt::text(body.ar)),
      "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
    }`
}
