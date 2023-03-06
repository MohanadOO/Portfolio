import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'

import { motion, useReducedMotion } from 'framer-motion'
import { projectsContainer } from '../../public/variants/MotionVariants'

export default function Projects({ locale, projects }) {
  const reduce = useReducedMotion()
  const { t } = useTranslation('home', { keyPrefix: 'projects' })
  return (
    <section
      id='projects'
      aria-label={t('sectionHeader')}
      className='flex items-center scroll-mt-28'
    >
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex items-center mb-10 mx-auto md:mx-0'>
          <h2 className='section_header'>{t('sectionHeader')}</h2>
        </div>

        <div className='pt-10 pb-32 flex flex-col gap-20 w-full shadow-lg'>
          <motion.div
            variants={projectsContainer(reduce)}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mx-5 gap-10'
          >
            {projects.map((project: ProjectType) => (
              <ProjectCard
                key={project._id}
                locale={locale}
                project={project}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
