import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import { useTranslation } from 'react-i18next'
import { client } from '../sanity/sanity.client'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '../components/Blog/RichTextComponents'

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
    <section
      id='aboutMe'
      aria-label={t('sectionHeader')}
      className='my-10 max-w-4xl mx-auto py-20'
    >
      <h1 className='text-5xl font-bold my-10'>{t('sectionHeader')}</h1>

      <div>
        <PortableText value={about[locale]} components={RichTextComponents} />
      </div>
    </section>
  )
}
