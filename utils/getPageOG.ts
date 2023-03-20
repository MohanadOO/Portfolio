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
  let pathName = process.env.NEXT_PUBLIC_BASE_URL
  if (!authorName && !authorProfile) return undefined
  return {
    url,
    type,
    images: [
      {
        url: `${pathName}/api/postOG?title=${title}&desc=${desc}&date=${publishedAt}&name=${authorName}&authorPic=${urlFor(
          authorProfile
        )
          .width(150)
          .height(150)
          .url()}`,
        width: 1200,
        height: 600,
        alt,
        type: 'image/png',
      },
    ],
  }
}
