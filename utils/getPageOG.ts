import urlFor from './urlFor'

export default function getPageOG(
  url: string,
  type: string,
  title: string,
  desc: string,
  imageURL: Image,
  authorName: string,
  authorProfile: string,
  publishedAt: string,
  alt: string
) {
  const pathName = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
  return {
    url,
    type,
    images: [
      {
        url: `${pathName}/api/postOG?title=${title}&desc=${desc}&image=${urlFor(
          imageURL
        )
          .width(1200)
          .height(600)
          .url()}&date=${publishedAt}&name=${authorName}&authorPic=${urlFor(
          authorProfile
        )
          .width(150)
          .height(150)
          .url()}`,
        width: 800,
        height: 600,
        alt,
        type: 'image/jpeg',
      },
    ],
  }
}
