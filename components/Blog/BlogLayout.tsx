import React from 'react'
import Banner from './Banner'

import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import Categories, { Category } from './Categories'
import { getURL } from '../../utils/helpers'
import { useRouter } from 'next/router'
import SearchBar from './SearchBar'
import { BlogList } from './BlogList'

type PropsType = {
  children?: React.ReactNode
  categories: Category[]
  posts: { items: Post[]; total: number }
  preview?: boolean
}

function BlogLayout({
  children,
  categories,
  posts,
  preview = false,
}: PropsType) {
  const router = useRouter()
  const locale = router.locale

  const { t } = useTranslation('blog')

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: `${getURL(locale)}blog` }}
      />
      <section
        className='min-h-screen pt-24 pb-44 max-w-[90rem] mx-auto px-4 sm:px-10 overflow-hidden'
        id='blog'
      >
        <Banner />
        <Categories categories={categories} />
        <SearchBar />
        <BlogList posts={posts} preview={preview} />
        {children}
      </section>
    </>
  )
}

export default BlogLayout
