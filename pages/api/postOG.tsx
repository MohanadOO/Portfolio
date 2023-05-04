import { ImageResponse } from '@vercel/og'

import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const font = fetch(
  new URL('../../public/fonts/LATOWEB-REGULAR.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const OgImageHandler = async (req: NextRequest) => {
  const fontData = await font
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title') || ''
    const desc = searchParams.get('desc') || ''
    const date = searchParams.get('date') || ''
    const authorPic = searchParams.get('authorPic') || ''
    return new ImageResponse(
      (
        <div
          tw='flex flex-col w-[1200px] h-[600px] justify-center items-start text-left px-44'
          style={{
            background:
              'linear-gradient(63.22deg, #1A152B 14.65%, #0E0D11 81.11%)',
          }}
        >
          <h1 tw='uppercase text-2xl text-purple-400'>Blog Post</h1>
          <h2
            tw='text-5xl max-w-3xl py-1'
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #AB98F0 100%)',
              color: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h2>
          {date && (
            <p tw='text-gray-200 font-light text-sm'>
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
          <p tw='text-xl text-white max-w-4xl'>{desc}</p>
          {authorPic && (
            <div tw='my-5 flex items-center'>
              <img
                src={authorPic}
                alt='Author Profile'
                tw='rounded-full w-[60px] h-[60px] border-2 border-white mr-3'
              />
              <p tw='text-gray-200 text-xl'>
                by <span tw='font-bold ml-1'> Mohanad Alrwaihy</span>
              </p>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: 'Lato',
            data: fontData,
            style: 'normal',
          },
        ],
        emoji: 'fluentFlat',
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

export default OgImageHandler
