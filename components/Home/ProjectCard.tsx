import Link from 'next/link'

import { AiFillGithub } from 'react-icons/ai'
import { HiEye } from 'react-icons/hi'

import { useTranslation } from 'next-i18next'

import { motion, useReducedMotion } from 'framer-motion'
import { cardVariant } from '../../public/variants/MotionVariants'
import CustomImage from '../CustomImage'
import urlFor from '../../utils/urlFor'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

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
        className='bg-white dark:bg-background shadow-left-lg ar:shadow-right-lg dark:shadow-white/20 mx-auto pb-5 flex flex-col overflow-hidden border-2 border-black dark:border-white/20 rounded-md'
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
            className='opacity-0 absolute top-[50%] translate-y-[-50%] left-[60%] translate-x-[-60%] z-20 bg-primary p-2 rounded-full transition-opacity duration-200 cursor-pointer'
          >
            <HiEye aria-hidden='true' className='w-6 h-6 fill-white' />
          </a>
          <a
            href={github}
            target='_blank'
            title={locale === 'ar' ? 'ملفات المشروع' : 'GitHub Repo'}
            className='opacity-0 absolute top-[50%] translate-y-[-50%] left-[40%] translate-x-[-40%] z-20 bg-primary p-2 rounded-full transition-opacity duration-200 cursor-pointer'
          >
            <AiFillGithub aria-hidden='true' className='w-6 h-6 fill-white' />
          </a>
        </div>
        <div className='p-5 flex w-full h-full flex-col items-start'>
          <ul className='w-full flex flex-wrap mb-7 gap-3 rtl:sm:flex-row-reverse'>
            {skills?.map((skill) => (
              <li
                key={skill.name}
                title={skill.name}
                dir='ltr'
                style={{
                  backgroundColor:
                    skill.color?.background?.hex || 'hsl(var(--foreground))',
                  color: skill.color?.text?.hex || 'hsl(var(--background))',
                  boxShadow: `0px 0px 5px ${
                    skill.color?.text?.hex || 'hsl(var(--foreground))'
                  }`,
                }}
                className={
                  'gap-2 py-1 px-3 rounded-md font-bold h-7 flex items-center justify-center sm:flex-1 flex-[0.2_1_0%]'
                }
              >
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
            className='font-pattaya ar:font-arefRuqaa text-2xl leading-loose sm:text-3xl sm:leading-loose text-primary line-clamp-1 '
          >
            {title}
          </h1>
          <p className='max-w-lg w-full text-xs sm:text-sm leading-7 pt-3 mb-5 text-foreground line-clamp-3'>
            {body}
          </p>
          <Button size='lg' asChild>
            <Link href={`projects/${slug?.current}`} className='w-full text-lg'>
              {t('checkBtn')}
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className='w-full max-w-md rounded-md p-5'>
      <Skeleton className='aspect-[16/12] overflow-hidden' />
      <div className='flex justify-center gap-5 items-center py-3'>
        <Skeleton className='w-24 py-2' />
        <Skeleton className='w-24 py-2' />
        <Skeleton className='w-24 py-2' />
      </div>
      <Skeleton className='my-5 py-3 w-full' />
      <Skeleton className='py-7 w-full' />
    </div>
  )
}
