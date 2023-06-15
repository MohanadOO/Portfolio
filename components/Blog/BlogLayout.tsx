import React from 'react'
import Banner from './Banner'

import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import Categories from './Categories'
import Pagination from './Pagination'
import { getURL } from '../../utils/helpers'

function BlogLayout({ children, categories, count }) {
  const { t } = useTranslation('blog')

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: `${getURL()}blog` }}
      />
      <section
        className='min-h-screen pt-24 pb-44 max-w-[90rem] mx-auto'
        id='blog'
      >
        <Banner />
        <Categories categories={categories} />
        {children}
        <Pagination count={count} />
      </section>
    </>
  )
}

export default BlogLayout
