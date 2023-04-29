import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import Projects from '../Home/Projects'
import { useTranslation } from 'next-i18next'
import pageSEO from '../../utils/pageSEO'

export default function ProjectsLayout({ projects }) {
  const { t } = useTranslation('projects')
  const { locale, pathName } = pageSEO('projects')

  return (
    <>
      <NextSeo
        title={locale === 'ar' ? 'كل المشاريع' : 'Projects'}
        description={
          locale === 'ar' ? 'قائمة بجميع المشاريع' : 'List of all my projects'
        }
        openGraph={{ url: pathName }}
      />
      <motion.section
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className='min-h-full flex flex-col mt-10 text-primary-400 w-full py-20'
        aria-label='projects'
      >
        <div className='flex items-center mb-10 mx-auto md:mx-0'>
          <h2 className='section_header'>{t('sectionHeader')}</h2>
        </div>
        <Projects projects={projects} />
      </motion.section>
    </>
  )
}
