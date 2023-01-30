import React from 'react'
import Banner from './Banner'
import Head from 'next/head'
import { useRouter } from 'next/router'

function BlogLayout({ children }) {
  const locale = useRouter().locale
  const title = {
    ar: 'مهند الرويحي | المدونة',
    en: 'Mohanad Alrwaihy | Blog',
  }
  return (
    <section
      className='sm:px-5 md:px-10 lg:px-24 xl:px-32 2xl:px-44 min-h-screen py-24'
      id='blog'
    >
      <Head>
        <title>{locale === 'ar' ? title.ar : title.en}</title>
      </Head>
      <Banner />
      {children}
    </section>
  )
}

export default BlogLayout
