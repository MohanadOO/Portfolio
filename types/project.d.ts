type ProjectType = {
  _id: string
  slug: { current: string }
  title: { ar: string; en: string; _type: string }
  body: { ar: string; en: string; _type: string }
  mainImage: { alt: string; asset: { url: string } }
  skills: { name: string; icon: { asset: { url: string } } }[]
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
  skills: SkillType[]
  github: string
  preview: string
}
