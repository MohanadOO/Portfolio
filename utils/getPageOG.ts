import { getURL } from './helpers'
import urlFor from './urlFor'

export default function getPageOG(
  url: string,
  type: string,
  title: string,
  desc: string,
  authorName: string,
  authorProfile: string,
  mainImage: Image,
  publishedAt: string,
  updatedAt: string,
  alt: string,
  categories: Category[]
) {

  const urlParams = `title=${encodeURIComponent(
    title
  )}&desc=${encodeURIComponent(
    desc
  )}&date=${publishedAt}&name=${authorName}&authorPic=${
    authorProfile ? urlFor(authorProfile).width(60).height(60).url() : ''
  }`

  const urlEncode = `${getURL()}api/postOG?` + encodeURI(urlParams)

  if (!authorName && !authorProfile) return undefined
  return {
    url: `${getURL()}${url}`,
    type,
    images: [
      {
        url: mainImage && urlFor(mainImage).url(),
        width: 1200,
        height: 600,
        alt,
      },
      {
        url: urlEncode,
        width: 1200,
        height: 600,
        alt,
      },
    ],
    article: {
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      section: 'Technology',
      tags: categories.map((category) => category.title),
    },
  }
}
