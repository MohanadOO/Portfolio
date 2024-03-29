import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import { useTranslation } from 'next-i18next'
import { client } from '../sanity/sanity.client'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '../components/Blog/RichTextComponents'
import { NextSeo } from 'next-seo'
import { getURL } from '../utils/helpers'
import { H1 } from '@/components/ui/Typography/headers'

export async function getStaticProps({ locale }) {
  const about = await client.fetch(
    `*[_type == 'aboutPage'][0]{${locale === 'ar' ? 'ar' : 'en'}}`
  )
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['about', 'common'])),
      about,
      locale,
    },
  }
}

export default function About({ about, locale }) {
  const { t } = useTranslation('about')
  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: `${getURL(locale)}about` }}
      />
      <section
        id='aboutMe'
        aria-label={t('sectionHeader')}
        className='my-10 max-w-4xl mx-auto py-20 px-4 sm:px-10'
      >
        <H1 className='my-12'>{t('sectionHeader')}</H1>

        <div className='w-full overflow-hidden text-gray-700 dark:text-gray-300 leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9'>
          <PortableText value={about[locale]} components={RichTextComponents} />
        </div>
      </section>
    </>
  )
}
