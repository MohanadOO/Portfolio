import { Feed } from 'feed'
import { getURL } from './helpers'

export default async function generateRssFeed(allPosts: Post[]) {

  const date = new Date()
  const author = {
    name: 'Mohanad Alrwaihy',
    email: 'mohanad.alrwaihy@gmail.com',
    link: 'https://twitter.com/MohanadOO_',
  }

  const feedOptions = {
    title: 'Mohanad Alrwaihy Blog',
    description:
      'Sharing My Journey in Web Development | Interesting Tools and Methods | And more...',
    id: getURL(),
    link: getURL(),
    image: `${getURL()}favicon/android-chrome-512x512.png`,
    favicon: `${getURL()}favicon/android-chrome-512x512.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Mohanad`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${getURL()}rss.xml`,
      json: `${getURL()}rss.json`,
    },
    author,
  }

  const feed = new Feed(feedOptions)

  allPosts.map((post: Post) => {
    const url = `${getURL()}blog/${post.slug.current}`
    feed.addItem({
      title: post.title.en,
      id: url,
      link: url,
      description: post.description.en,
      content: post.description.en,
      author: [author],
      contributor: [author],
      date: new Date(post.publishedAt),
    })
  })

  return [feed.rss2(), feed.json1()]
}
