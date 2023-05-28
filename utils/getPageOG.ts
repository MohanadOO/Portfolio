import urlFor from './urlFor'

export default function getPageOG(
  url: string,
  type: string,
  title: string,
  desc: string,
  authorName: string,
  authorProfile: string,
  publishedAt: string,
  alt: string
) {
  const vercelUrl = process.env.VERCEL_URL
  let pathName = process.env.NEXT_PUBLIC_BASE_URL || `https://${vercelUrl}`

  const urlParams = `title=${title}&desc=${desc}&date=${publishedAt}&name=${authorName}&authorPic=${
    authorProfile ? urlFor(authorProfile).width(60).height(60).url() : ''
  }`

  const urlEncode = `${pathName}/api/postOG?` + encodeURI(urlParams)

  if (!authorName && !authorProfile) return undefined
  return {
    url,
    type,
    images: [
      {
        url: urlEncode,
        width: 1200,
        height: 600,
        alt,
      },
    ],
  }
}
