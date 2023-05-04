import React from 'react'
import Banner from './Banner'

import { NextSeo } from 'next-seo'
import pageSEO from '../../utils/pageSEO'
import { useTranslation } from 'next-i18next'

function BlogLayout({ children }) {
  const { t } = useTranslation('blog')
  const { pathName } = pageSEO('blog')

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: pathName }}
      />
      <section className='min-h-screen py-20' id='blog'>
        <Banner />
        <hr className='border-primary-400' />
        {children}
      </section>
    </>
  )
}

export default BlogLayout
