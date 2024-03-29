type ProjectType = {
  _id: string
  slug: { current: string }
  title: { ar: string; en: string; _type: string }
  body: { ar: string; en: string; _type: string }
  mainImage: { alt: string; asset: { url: string } }
  tools: {
    color: any
    name: string
    icon: { asset: { url: string } }
  }[]
  github: string
  preview: string
}

type ProjectCardType = {
  project: ProjectType
  locale: string
}

type SkillType = {
  name: string
  icon: { asset: { url: string } }
  color?: {
    background?: {
      hex: string
    }
    text?: {
      hex: string
    }
  }
}

type Skill = {
  name: string
  topSkill: boolean
  skillType: { en: string; ar: string }
  icon: {
    asset: {
      url: string
    }
    alt: string
  }
  color: {
    background: { hex: string }
    text: { hex: string }
  }
  link: string
}

type ImageType = {
  alt: string
  asset: { url: string }
}

type TextType = {
  ar: string
  en: string
  _type: string
}

type ProjectDetailsType = {
  title: TextType
  body: TextType
  mainImage: ImageType
  images: ImageType[]
  tools: SkillType[]
  github: string
  preview: string
}

type Base = {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

interface Post extends Base {
  author: Author
  body_en: Block[]
  body_ar: Block[]
  categories: Category[]
  mainImage: Image
  slug: Slug
  publishedAt: string
  title: { ar: string; en: string }
  description: { ar: string; en: string }
  readingTimeAR: number
  readingTimeEN: number
  totalCharactersEN: number
  totalCharactersAR: number
  likeCount: number
  viewCount: number
  recommend: Post[]
}

interface Author extends Base {
  bio: Block[]
  image: string
  name: string
  slug: Slug
}

interface Image {
  _type: 'image'
  asset: Reference
}

interface Reference {
  _ref: string
  _type: 'reference'
}

interface Slug {
  _type: 'slug'
  current: string
}

interface Block {
  _key: string
  _type: 'block'
  children: Span[]
  markDefs: any[]
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
}

interface Span {
  _key: string
  _type: 'span'
  marks: string[]
  text: string
}

interface Category extends Base {
  description: string
  title: string
}

interface MainImage {
  _type: 'image'
  asset: Reference
}

interface Title {
  _type: 'string'
  current: string
}

type Certificate = {
  title: string
  courseUrl: string | null
  date: string
  link: string | null
  provider: {
    provider: string
    providerIcon: {
      asset: {
        _ref: string
        _type: string
      }
      _type: string
    }
  }
}
