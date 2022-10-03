import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { HiEye } from 'react-icons/hi'

import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import { getProjectData } from '../../utils/projectsUtils'

type ProjectCardType = {
  link: string
  locale: string
}

export default function ProjectCard({ link, locale }: ProjectCardType) {
  const { t } = useTranslation(['projects', 'common'])
  const { mainImgURL, skills, preview, github } = getProjectData(link)

  return (
    <motion.div
      className='text-start max-w-sm mx-auto'
      aria-label={t(`${link}.title`)}
      variants={cardVariant}
    >
      <motion.div
        variants={cardVariant}
        whileHover='hover'
        className='bg-white dark:bg-slate-900 border border-primary-black dark:border-primary-400 shadow-[7px_7px_0px_black] mx-auto pb-5 h-full flex flex-col'
      >
        <div className='overflow-hidden relative [&_a]:hover:opacity-100 [&_picture_img]:hover:scale-100 [&_picture_img]:hover:brightness-75 h-full'>
          <picture>
            <source srcSet={`${mainImgURL}.webp`} type='image/webp' />
            <img
              className='aspect-[16/11] object-cover object-top saturate-[1.3] scale-105 transition-transform duration-300'
              src={`${mainImgURL}.png`}
              alt={t('title')}
            />
          </picture>
          <a
            href={preview}
            target='_blank'
            title={locale === 'ar' ? 'عرض الصفحة' : 'Project Preview'}
            className='opacity-0 absolute top-[50%] translate-y-[-50%] left-[60%] translate-x-[-60%] z-20 bg-primary-400 p-2 rounded-full transition-opacity duration-200 cursor-pointer'
          >
            <HiEye aria-hidden='true' className='w-6 h-6 fill-primary-white' />
          </a>
          <a
            href={github}
            target='_blank'
            title={locale === 'ar' ? 'ملفات المشروع' : 'GitHub Repo'}
            className='opacity-0 absolute top-[50%] translate-y-[-50%] left-[40%] translate-x-[-40%] z-20 bg-primary-400 p-2 rounded-full transition-opacity duration-200 cursor-pointer'
          >
            <AiFillGithub
              aria-hidden='true'
              className='w-6 h-6 fill-primary-white'
            />
          </a>
        </div>
        <div className='p-5 h-full'>
          <ul className='w-full flex flex-wrap mb-7 gap-3 child:flex child:gap-2 child:py-1 child:px-3  child:items-center child:rounded-md child:bg-primary-black child:dark:bg-primary-white child:text-primary-white child:dark:text-primary-black child:font-semibold'>
            <li>
              <p className='text-xs lg:text-sm'>{skills[0].name}</p>
              <img
                className='w-4 h-4 bg-transparent'
                src={skills[0].icon}
                alt={`${skills[0].name}_icon`}
                aria-hidden='true'
              />
            </li>
            {skills[1] !== undefined && (
              <li>
                <p className='text-xs lg:text-sm'>{skills[1].name}</p>
                <img
                  className='w-4 h-4 bg-transparent'
                  src={skills[1].icon}
                  alt={`${skills[1].name}_icon`}
                  aria-hidden='true'
                />
              </li>
            )}
            {skills[2] !== undefined && (
              <li>
                <p className='text-xs lg:text-sm'>{skills[2].name}</p>
                <img
                  className='w-4 h-4 bg-transparent'
                  src={skills[2].icon}
                  alt={`${skills[2].name}_icon`}
                  aria-hidden='true'
                />
              </li>
            )}
          </ul>
          <h1 className='font-pattaya text-4xl mt-4 text-primary-400'>
            {t(`${link}.title`)}
          </h1>
          <p className='max-w-xs w-full text-sm leading-6 mt-3 text-primary-black dark:text-primary-white my-10 h-24  overflow-hidden'>
            {t(`${link}.desc`)}
          </p>
          <Link href={`projects/${link}`}>
            <a className='py-3 px-6 text-primary-400 dark:text-primary-white rounded-md font-bold border border-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors en:hover:shadow-[-4px_4px_0_black] ar:hover:shadow-[4px_4px_0_black] active:-translate-x-4 active:translate-y-4'>
              {t('common:checkBtn')}
            </a>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

const cardVariant = {
  initial: {
    scale: 0,
    x: '100%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.7,
      type: 'spring',
    },
  },
  hover: {
    scale: 1.1,
  },
}
