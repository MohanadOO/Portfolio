export const POSTS_PER_PAGE = 6
const START_PAGE = (page: number) => page * POSTS_PER_PAGE - POSTS_PER_PAGE
const END_PAGE = (page: number) => page * POSTS_PER_PAGE
export const LIMIT_CATEGORIES = 5
export const BASE_CATEGORIES = [
  {
    title: 'View All',
    _id: 'viewAll',
  },
  {
    title: 'Most Views',
    _id: 'mostViews',
  },
  {
    title: 'Most Liked',
    _id: 'mostLiked',
  },
]

export function getPage(page: string | string[]): number {
  return Number(page) >= 1 ? Number(page) : 1
}

export function getPostsQuery(
  category: string | string[],
  page: string | string[]
): string {
  if (category) {
    if (category === 'View All') return getPostsInfo(getPage(page))
    if (BASE_CATEGORIES.find((val) => val.title === category)) {
      return getPostsBySpecialCategory(getPage(page), category as string)
    }
    return getPostsByCategory(getPage(page), category as string)
  }
  return getPostsInfo(getPage(page))
}

export const getAllPosts = `*[_type=='post']{
  _id,
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
} | order(publishedAt desc)`

export const getPostsInfo = (page: number) => {
  return `{
  "items": *[_type=='post']{
  _id,
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->,
  likeCount,
  viewCount,
  "totalCharactersEN": length(pt::text(body.en)),
  "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body.ar)),
  "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
} | order(publishedAt desc) [${START_PAGE(page)}...${END_PAGE(page)}],
  "total": count(*[_type == 'post'])
}`
}

export const getPostsByCategory = (page: number, category: string) => {
  return `{
  "items": *[_type=='post' && '${category}' in categories[]->title]{
  _id,
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->,
  likeCount,
  viewCount,
  "totalCharactersEN": length(pt::text(body.en)),
  "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body.ar)),
  "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
} | order(publishedAt desc) [${START_PAGE(page)}...${END_PAGE(page)}], 
  'total': count(*[_type=='post' && '${category}' in categories[]->title])
}`
}

export const getPostsBySpecialCategory = (page: number, category: string) => {
  function getOrder(category: string) {
    switch (category) {
      case 'Most Views':
        return 'viewCount desc'
      case 'Most Liked':
        return 'likeCount desc'
      default:
        '_createdAT desc'
    }
  }

  const orderBy = getOrder(category)

  return `{
  "items": *[_type=='post']{
  _id,
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->,
  "likeCount": coalesce(likeCount, 1),
  viewCount,
  "totalCharactersEN": length(pt::text(body.en)),
  "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body.ar)),
  "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
} | order(${orderBy}) [${START_PAGE(page)}...${END_PAGE(page)}],
  'total': count(*[_type == 'post'])
}`
}

export const getCategories = () => `*[_type=='category' && show == true]{
  _id,
  _createdAt,
  title,
  "count": count(*[_type=='post' && references(^._id)])
} | order(count desc) [0...${LIMIT_CATEGORIES}]`

export const getPostsInfoHome = `*[_type=='post' && count(body.ar) > 0][0...6]{
  _id,
  title,
  description,
  _createdAt,
  _updatedAt,
  publishedAt,
  slug,
  mainImage,
  author->,
  categories[]->,
  likeCount,
  viewCount,
  "totalCharactersEN": length(pt::text(body.en)),
  "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body.ar)),
  "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
} | order(publishedAt desc)`

export const getPostData = (slug: string) => {
  return `*[_type=='post' && slug.current == '${slug}'][0]{
      ...,
     recommend[]->{  
        _id,
        title,
        description,
        _createdAt,
        _updatedAt,
        publishedAt,
        slug,
        mainImage,
        author->,
        categories[]->,
        likeCount,
        viewCount,
        "totalCharactersEN": length(pt::text(body.en)),
        "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
        "totalCharactersAR": length(pt::text(body.ar)),
        "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
      },
      author->,
      categories[]->,
      "totalCharactersEN": length(pt::text(body.en)),
      "readingTimeEN": round(length(pt::text(body.en)) / 5 / 180 ),
      "totalCharactersAR": length(pt::text(body.ar)),
      "readingTimeAR": round(length(pt::text(body.ar)) / 5 / 180 )
    }`
}
