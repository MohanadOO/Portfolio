import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import Projects from '../Home/Projects'
import { useTranslation } from 'next-i18next'
import { getURL } from '../../utils/helpers'

export default function ProjectsLayout({ projects }) {
  const { t } = useTranslation('projects')

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: `${getURL()}projects` }}
      />
      <section
        className='min-h-full flex flex-col mt-10 text-primary-purple w-full py-20 px-4 sm:px-10 overflow-hidden'
        aria-label='projects'
      >
        <div className='flex items-center my-10 mx-auto md:mx-0'>
          <h2 className='section_header'>{t('sectionHeader')}</h2>
        </div>
        <Projects projects={projects} />
      </section>
    </>
  )
}
