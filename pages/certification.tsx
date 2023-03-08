import { loadTranslations } from 'ni18n'
import React from 'react'
import { ni18nConfig } from '../ni18n.config'
import { useTranslation } from 'react-i18next'
import { client } from '../sanity/sanity.client'
import urlFor from '../utils/urlFor'
import Image from 'next/image'
import { HiExternalLink } from 'react-icons/hi'

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
  locale,
  certificates,
}: {
  locale: string
  certificates: Certificate[]
}) {
  const { t } = useTranslation('certificate')

  return (
    <section
      id='certificate'
      aria-label={t('sectionHeader')}
      className='my-10 max-w-4xl mx-auto'
    >
      <h1 className='text-5xl font-bold my-5'>{t('sectionHeader')}</h1>
      <h2 className='text-xl opacity-70 mb-10'>{t('description')}</h2>
      <p className='text-xl opacity-70'>{t('p1')}</p>

      <div className='my-12 flex flex-col gap-5'>
        {certificates.map((item) => (
          <div
            className='flex flex-col md:flex-row text-center md:text-start items-center gap-5 py-3 px-5 bg-gray-100 shadow-md dark:bg-zinc-800 dark:shadow-primary-white/5 rounded-md'
            key={item.title}
          >
            <Image
              width={40}
              height={40}
              src={urlFor(item.provider.providerIcon).url()}
              alt={item.title}
            />
            <div>
              <a
                href={item.courseUrl ? item.courseUrl : '#'}
                target='_blank'
                title={item.title}
                className={`flex items-center justify-center gap-1 text-lg font-bold transition-colors ${
                  item.courseUrl ? 'hover:text-primary-400' : 'cursor-default'
                }`}
              >
                <span className='line-clamp-1'>{item.title}</span>
                {item.courseUrl && (
                  <HiExternalLink className='rtl:-rotate-90' />
                )}
              </a>
              <p className='opacity-80 text-sm'>
                {item.provider.provider} -{' '}
                {new Date(item.date).toLocaleDateString('en-us', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            {item.link && (
              <a
                href={item.link}
                target='_blank'
                className='flex gap-2 items-center mx-auto md:mx-0 md:ltr:ml-auto md:rtl:mr-auto rounded-full py-2 px-3 text-sm font-bold bg-primary-400/60 hover:bg-primary-400 transition-colors text-primary-white'
              >
                {t('credential')} <HiExternalLink className='rtl:-rotate-90' />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
