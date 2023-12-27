import type { NextApiRequest, NextApiResponse } from 'next'
import generateRssFeed from '../../utils/generateRSSFees'
import { client } from '../../sanity/sanity.client'
import { getAllPostsRSS } from '../../sanity/queries/blog'

export default async function Rss(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = req.body
      ? JSON.parse(req.body)
      : await client.fetch(getAllPostsRSS)

    const [xml, json] = await generateRssFeed(posts)
    res.setHeader('Content-Type', 'text/xml')
    return res.status(200).send(xml)
  } catch (err) {
    res.status(500).json(err)
  }
}
