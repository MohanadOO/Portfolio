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
          {authorPic && (
            <img
              src={authorPic}
              alt='Author Profile'
              tw='rounded-full w-[75px] h-[75px] border-2 border-white'
            />
          )}
          <h1
            tw='text-6xl max-w-3xl'
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #AB98F0 100%)',
              color: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h1>
          {date && (
            <p tw='text-gray-300 font-light text-sm pb-2'>
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
          <p tw='text-2xl text-white max-w-4xl'>{desc}</p>
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
