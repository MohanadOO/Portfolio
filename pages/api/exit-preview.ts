import type { NextApiRequest, NextApiResponse } from 'next'

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  const callback = req.query.callback
  res.clearPreviewData()
  res.writeHead(307, { Location: callback ? callback : '/' })
  res.end()
}
