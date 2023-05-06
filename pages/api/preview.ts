import type { NextApiRequest, NextApiResponse } from 'next'

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  const callback = req.query.callback
  res.setPreviewData({})
  res.writeHead(307, { Location: callback ? `/${callback}` : '/' })
  res.end()
}
