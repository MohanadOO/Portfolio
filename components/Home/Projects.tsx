import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'

import { motion } from 'framer-motion'
import { projectsContainer } from '../../public/variants/MotionVariants'

export default function Projects({ locale }) {
  const { t } = useTranslation('home', { keyPrefix: 'projects' })

  return (
    <section
      id='projects'
      aria-label={t('sectionHeader')}
      className='flex items-center w-full scroll-mt-28'
    >
      <div className='flex flex-col gap-5 w-screen'>
        <div className='flex items-center mb-10 mx-auto md:mx-20 lg:mx-40'>
          <h2 className='section_header'>{t('sectionHeader')}</h2>
        </div>

        <div className='bg-gradient-to-r from-primary-400/20 to-secondary-400/20 pt-10 pb-32 flex flex-col gap-20 shadow-lg'>
          <motion.div
            variants={projectsContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mx-12 md:mx-20 lg:mx-40 gap-10'
          >
            <ProjectCard locale={locale} link={'chat-application'} />
            <ProjectCard locale={locale} link={'half-life-2-home'} />
            <ProjectCard locale={locale} link={'manage-landing-page'} />
            <ProjectCard locale={locale} link={'bookmark-landing-page'} />
            <ProjectCard locale={locale} link={'room-home-page'} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}