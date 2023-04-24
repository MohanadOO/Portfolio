import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import Projects from '../Home/Projects'
import { useTranslation } from 'react-i18next'
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
        className='min-h-full flex flex-col md:flex-row mt-10 text-primary-400 w-full py-20'
        aria-label='projects'
      >
        <Projects locale={locale} projects={projects} />
      </motion.section>
    </>
  )
}
