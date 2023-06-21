import React from 'react'
import { AssetsProvider } from '../../hooks/useAssetViewer'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from './RichTextComponents'
import AssetView from '../AssetsViewer/AssetView'
import TableOfContent from '../TableOfContent'
import { usePost } from '../../hooks/usePost'

type PropsType = {
  language: string
}

export default function PostBody({ language }: PropsType) {
  const { post, isScrollDown } = usePost()
  const { body_ar, body_en } = post
  const body = language === 'ar' ? body_ar : body_en

  return (
    <div className='flex justify-start items-start gap-10 break-words pt-5 pb-10'>
      <AssetsProvider>
        {body && (
          <div className='w-full overflow-hidden text-gray-700 dark:text-gray-300 leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9'>
            <PortableText value={body} components={RichTextComponents} />
          </div>
        )}
        <AssetView />
      </AssetsProvider>
      <TableOfContent locale={language} scroll={isScrollDown} />
    </div>
  )
}
