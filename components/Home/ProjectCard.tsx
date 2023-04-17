import Link from 'next/link'

import { AiFillGithub } from 'react-icons/ai'
import { HiEye } from 'react-icons/hi'

import { useTranslation } from 'react-i18next'

import { motion, useReducedMotion } from 'framer-motion'
import { cardVariant } from '../../public/variants/MotionVariants'
import CustomImage from '../CustomImage'
import urlFor from '../../utils/urlFor'

export default function ProjectCard({ project, locale }: ProjectCardType) {
  const reduce = useReducedMotion()
  const { t } = useTranslation(['common'])
  const { slug, mainImage, skills, github, preview } = project
  const title = locale === 'ar' ? project.title?.ar : project.title?.en
  const body = locale === 'ar' ? project.body?.ar : project.body?.en

  return (
    <motion.div
      className='text-start w-full max-w-md mx-auto'
      aria-label={title}
      variants={cardVariant(reduce)}
    >
      <motion.div
        variants={cardVariant(reduce)}
        whileHover='hover'
        className='bg-white dark:bg-primary-dark shadow-left-lg ar:shadow-right-lg dark:shadow-white/20 mx-auto pb-5 flex flex-col overflow-hidden border-2 border-black dark:border-white/20 rounded-md'
      >
        <div className='relative [&_a]:hover:opacity-100 border-b-2 border-black group overflow-hidden'>
          <div className='relative aspect-[16/12] max-w-md saturate-[1.3] group-hover:scale-110 group-hover:brightness-75 transition-transform duration-300'>
            <CustomImage
              fill
              style={{ objectFit: 'contain' }}
              src={mainImage ? urlFor(mainImage).fit('max').url() : ''}
              alt={mainImage?.alt ?? 'Cover Image'}
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
        <div className='p-5 flex w-full h-full flex-col items-start'>
          <ul className='w-full flex flex-wrap mb-7 gap-3 child:gap-2 child:py-1 child:px-3 child:rounded-md child:bg-primary-black child:dark:bg-primary-white child:text-primary-white child:dark:text-primary-black child:font-bold child:h-7 child:flex child:items-center child:justify-center child:sm:flex-1 child:flex-[0.2_1_0%] rtl:sm:flex-row-reverse'>
            {skills?.map((skill) => (
              <li key={skill.name} title={skill.name} dir='ltr'>
                <p className='hidden text-xs lg:text-sm sm:line-clamp-1'>
                  {skill.name}
                </p>
                <CustomImage
                  width={18}
                  height={18}
                  src={skill.icon.asset.url}
                  alt={`${skill.name}`}
                  aria-hidden='true'
                />
              </li>
            ))}
          </ul>
          <h1
            title={title}
            className='font-pattaya text-3xl sm:text-4xl  text-primary-400 line-clamp-1 pt-2'
          >
            {title}
          </h1>
          <p className='max-w-lg w-full text-xs sm:text-sm leading-7 pt-3 mb-5 text-primary-black dark:text-primary-white line-clamp-3'>
            {body}
          </p>
          <Link
            href={`projects/${slug?.current}`}
            className='py-3 px-6 text-primary-400 dark:text-primary-white rounded-md font-bold border border-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors en:hover:shadow-[-4px_4px_0_black] rtl:hover:shadow-[4px_4px_0_black] mt-auto'
          >
            {t('checkBtn')}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
