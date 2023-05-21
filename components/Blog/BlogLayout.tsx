import React from 'react'
import Banner from './Banner'

import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import { useTranslation } from 'next-i18next'
import Categories from './Categories'
import Pagination from './Pagination'

function BlogLayout({ children, categories, count }) {
  const { t } = useTranslation('blog')
  const { pathName } = pageSEO('blog')

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: pathName }}
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
