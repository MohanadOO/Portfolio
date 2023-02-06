import React from 'react'
import Banner from './Banner'

import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'

function BlogLayout({ children }) {
  const { locale, pathName } = pageSEO('blog')

  return (
    <>
      <NextSeo
        title={locale === 'ar' ? 'المدونة' : 'Blog'}
        openGraph={{ url: pathName }}
      />
      <section
        className='sm:px-5 md:px-10 lg:px-24 xl:px-32 2xl:px-44 min-h-screen py-24'
        id='blog'
      >
        <Banner />
        {children}
      </section>
    </>
  )
}

export default BlogLayout
