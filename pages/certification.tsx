import { loadTranslations } from 'ni18n'
import React from 'react'
import { ni18nConfig } from '../ni18n.config'
import { useTranslation } from 'next-i18next'
import { client } from '../sanity/sanity.client'
import urlFor from '../utils/urlFor'
import { HiExternalLink } from 'react-icons/hi'
import CustomImage from '../components/CustomImage'
import { NextSeo } from 'next-seo'
import { Button } from '@/components/ui/button'
import { H1, P } from '@/components/ui/Typography/headers'

export async function getStaticProps({ locale }) {
  const certificates: Certificate[] =
    await client.fetch(`*[_type == 'certificate']{
    title,
    date,
    link,
    courseUrl,
    provider -> {
      provider,
      providerIcon
    },
  } | order(provider.provider desc)`)

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, [
        'certificate',
        'common',
      ])),
      certificates,
    },
  }
}

export default function Certification({
  certificates,
}: {
  certificates: Certificate[]
}) {
  const { t } = useTranslation('certificate')

  return (
    <>
      <NextSeo title={t('title')} description={t('description')} />
      <section
        id='certificate'
        aria-label={t('sectionHeader')}
        className='my-10 max-w-4xl mx-auto py-20 px-4 sm:px-10'
      >
        <H1 className='my-5'>{t('sectionHeader')}</H1>
        <P className='text-xl opacity-70 mb-10'>{t('description')}</P>
        <P className='text-xl opacity-70'>{t('p1')}</P>

        <div className='my-12 flex flex-col gap-5'>
          {certificates.map((item) => (
            <div
              className='flex flex-col md:flex-row text-center md:text-start items-center justify-between gap-5 py-3 px-5 bg-gray-100 shadow-md dark:bg-zinc-800 dark:shadow-background/5 rounded-md'
              key={item.title}
            >
              <div className='flex flex-col md:flex-row gap-5 items-center'>
                <CustomImage
                  width={40}
                  height={40}
                  src={urlFor(item.provider.providerIcon).url()}
                  style={{ borderRadius: '50%' }}
                  alt={item.title}
                />
                <div className='flex flex-col items-center md:items-start max-w-xl'>
                  <a
                    href={item.courseUrl ? item.courseUrl : '#'}
                    className={`flex items-center gap-1 text-lg font-bold transition-colors ${
                      item.courseUrl ? 'hover:text-primary' : 'cursor-default'
                    }`}
                  >
                    {item.title}{' '}
                  </a>
                  <p className='opacity-80 text-sm'>
                    {item.provider.provider} -{' '}
                    {new Date(item.date).toLocaleDateString('en-us', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              {item.link && (
                <Button asChild className='rounded-full font-bold'>
                  <a
                    href={item.link}
                    target='_blank'
                    className='flex gap-2 items-center'
                  >
                    {t('credential')}
                    <HiExternalLink className='rtl:-rotate-90' />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
