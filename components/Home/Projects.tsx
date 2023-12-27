import { useTranslation } from 'next-i18next'
import ProjectCard from './ProjectCard'

import { motion, useReducedMotion } from 'framer-motion'
import { projectsContainer } from '../../public/variants/MotionVariants'
import Link from 'next/link'
import { HiOutlineLink } from 'react-icons/hi'
import { useRouter } from 'next/router'

export default function Projects({ projects, viewBtn = false }) {
  const locale = useRouter().locale
  const reduce = useReducedMotion()

  const { t } = useTranslation(['projects', 'common'])
  return (
    <section
      id='projects'
      aria-label={t('headers.projects', { ns: 'common' })}
      className='flex items-center mb-20'
    >
      <div className='flex flex-col gap-5 w-full'>
        <div className='pt-10 pb-20 flex flex-col gap-20 w-full'>
          <motion.div
            variants={projectsContainer(reduce)}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 items-center'
          >
            {projects.map((project: ProjectType) => (
              <ProjectCard
                key={project._id}
                locale={locale}
                project={project}
              />
            ))}
          </motion.div>
          {viewBtn && (
            <Link
              href='/projects'
              className='flex items-center rounded-lg mx-auto py-2 px-8 gap-2 bg-primary/90 hover:bg-primary
              k:shadow-background/10 text-background font-bold text-lg transition-colors'
            >
              {t('viewAll', { ns: 'common' })}{' '}
              <HiOutlineLink className='w-5 h-5' />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
