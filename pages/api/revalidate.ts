import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import type { NextApiRequest, NextApiResponse } from 'next'

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.headers[SIGNATURE_HEADER_NAME]
  const body = await readBody(req) // Read the body into a string
  if (!isValidSignature(body, signature as string, SANITY_WEBHOOK_SECRET)) {
    res.status(401).json({ success: false, message: 'Invalid signature' })
    return
  }

  try {
    const jsonBody = JSON.parse(body)
    const type = jsonBody?._type

    let pathToRevalidate = ''
    if (type === 'certificate') pathToRevalidate = '/certification'

    console.log(`===== Revalidating: ${pathToRevalidate} ====`)
    await res.revalidate(pathToRevalidate)

    return res.json({ message: `Revalidated "${pathToRevalidate}"` })
  } catch (err) {
    // Could not revalidate. The stale page will continue to be shown until
    // this issue is fixed.
    return res.status(500).send('Error while revalidating')
  }

  res.json({ success: true })
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

async function readBody(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}
