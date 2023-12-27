import { Category } from './../../components/Blog/Categories'
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
  page: string | string[],
  q?: string | string[]
): string {
  category = typeof category === 'string' ? category : ''
  q = typeof q === 'string' ? q : ''

  // Because there are no categories based from the BASE_CATEGORIES this is just for custom ordering
  if (BASE_CATEGORIES.map((val) => val.title).includes(category)) {
    category = ''
  }

  return getPostsInfo(getPage(page), category, q)
}

export const getAllPostsRSS = `*[_type=='post']{
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
  "totalCharactersEN": length(pt::text(body_en)),
  "readingTimeEN": round(length(pt::text(body_en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body_ar)),
  "readingTimeAR": round(length(pt::text(body_ar)) / 5 / 180 )
  }
  'total': count(*[_type == 'post'])
} | order(publishedAt desc)`

function getOrder(category: string) {
  switch (category) {
    case 'Most Views':
      return 'viewCount desc'
    case 'Most Liked':
      return 'likeCount desc'
    default:
      return 'publishedAt desc'
  }
}

export const getPostsInfo = (page: number, category = '', search = '') => {
  const isCategory =
    category !== '' ? `&& '${category}' in categories[]->title` : ''

  const isSearch =
    search !== ''
      ? `&& ([title.en, title.ar] match "${search}*" || body_en[].children[].text match "${search}*" || body_ar[].children[].text match "${search}*")`
      : ''

  const orderBy = getOrder(category)

  return `{
  "items": *[_type=='post' ${isCategory} ${isSearch}]{
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
  "totalCharactersEN": length(pt::text(body_en)),
  "readingTimeEN": round(length(pt::text(body_en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body_ar)),
  "readingTimeAR": round(length(pt::text(body_ar)) / 5 / 180 )
} | order(${orderBy}) [${START_PAGE(page)}...${END_PAGE(page)}],
  "total": count(*[_type == 'post' ${isCategory} ${isSearch}])
}`
}

export const getCategories = () => `*[_type=='category' && show == true]{
  _id,
  _createdAt,
  title,
  "count": count(*[_type=='post' && references(^._id)])
} | order(count desc)`

export const getPostsInfoHome = `{
  "items": *[_type=='post' && count(body_ar) > 0][0...6]{
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
  "totalCharactersEN": length(pt::text(body_en)),
  "readingTimeEN": round(length(pt::text(body_en)) / 5 / 180 ),
  "totalCharactersAR": length(pt::text(body_ar)),
  "readingTimeAR": round(length(pt::text(body_ar)) / 5 / 180 )
} | order(publishedAt desc)
}`

export const getPostData = (slug: string) => {
  return `*[_type=='post' && slug.current == '${slug}'][0]{
      ...,
     body_en[]{..., type->},
     body_ar[]{..., type->},
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
        "totalCharactersEN": length(pt::text(body_en)),
        "readingTimeEN": round(length(pt::text(body_en)) / 5 / 180 ),
        "totalCharactersAR": length(pt::text(body_ar)),
        "readingTimeAR": round(length(pt::text(body_ar)) / 5 / 180 )
      },
      author->,
      categories[]->,
      "totalCharactersEN": length(pt::text(body_en)),
      "readingTimeEN": round(length(pt::text(body_en)) / 5 / 180 ),
      "totalCharactersAR": length(pt::text(body_ar)),
      "readingTimeAR": round(length(pt::text(body_ar)) / 5 / 180 )
    }`
}
