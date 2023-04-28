import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity/sanity.client'
import { INC_LIKE_COUNT, INC_VIEW_COUNT } from '../../sanity/mutation/blog'

export default async function Count(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.type
  const postID = req.query.postID

  if (typeof postID === 'string' && type === 'like') {
    await client.mutate(INC_LIKE_COUNT(postID), {
      token: process.env.SANITY_MUTATE_TOKEN,
      returnDocuments: false,
    })
    return res.status(200).json({ message: 'Increase like count successfully' })
  }

  if (typeof postID === 'string' && type === 'view') {
    await client.mutate(INC_VIEW_COUNT(postID), {
      token: process.env.SANITY_MUTATE_TOKEN,
      returnDocuments: false,
    })
    return res.status(200).json({ message: 'Increase view count successfully' })
  }

  return res.status(500).json({
    message: `${type ? 'Post ID not found' : 'Count Type is not specified'}`,
  })
}
