import Link from 'next/link'
import Image from 'next/image'

import { AiFillGithub } from 'react-icons/ai'
import { HiEye } from 'react-icons/hi'

import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'

export default function ProjectCard({ project, locale }: ProjectCardType) {
  const { t } = useTranslation(['common'])
  const { slug, mainImage, skills, github, preview } = project
  const title = locale === 'ar' ? project.title.ar : project.title.en
  const body = locale === 'ar' ? project.body.ar : project.body.en

  return (
    <motion.div
      className='text-start max-w-sm mx-auto'
      aria-label={title}
      variants={cardVariant}
    >
      <motion.div
        variants={cardVariant}
        whileHover='hover'
        className='bg-white dark:bg-slate-900 shadow-[7px_7px_0px_black] mx-auto pb-5 flex flex-col overflow-hidden border-2 border-black dark:border-primary-400 rounded-md'
      >
        <div className='relative [&_a]:hover:opacity-100 border-b-2 border-black group'>
          <div className='relative aspect-[16/12] saturate-[1.3] group-hover:scale-110 group-hover:brightness-75 transition-transform duration-300'>
            <Image
              layout='fill'
              objectFit='contain'
              src={mainImage.asset.url}
              alt={mainImage.alt}
            />
          </div>
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
        <div className='p-5 flex h-full flex-col items-start'>
          <ul className='w-full flex flex-wrap mb-7 gap-3 child:flex child:gap-2 child:py-1 child:px-3  child:items-center child:rounded-md child:bg-primary-black child:dark:bg-primary-white child:text-primary-white child:dark:text-primary-black child:font-bold'>
            {skills.map((skill) => (
              <li key={skill.name}>
                <p className='text-xs lg:text-sm'>{skill.name}</p>
                <Image
                  width={18}
                  height={18}
                  src={skill.icon.asset.url}
                  alt={`${skill.name}`}
                  aria-hidden='true'
                />
              </li>
            ))}
          </ul>
          <h1 className='font-pattaya text-4xl mt-4 text-primary-400'>
            {title}
          </h1>
          <p className='max-w-xs w-full text-sm leading-7 mt-3 text-primary-black dark:text-primary-white my-10 line-clamp-3'>
            {body}
          </p>
          <Link href={`projects/${slug.current}`}>
            <a className='py-3 px-6 text-primary-400 dark:text-primary-white rounded-md font-bold border border-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors en:hover:shadow-[-4px_4px_0_black] ar:hover:shadow-[4px_4px_0_black] mt-auto'>
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
