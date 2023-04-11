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
      <section className='min-h-screen py-20' id='blog'>
        <Banner />
        {children}
      </section>
    </>
  )
}

export default BlogLayout
