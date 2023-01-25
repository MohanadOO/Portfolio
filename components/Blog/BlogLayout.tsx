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
      className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10 min-h-screen py-24'
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
