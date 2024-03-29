import { useTranslation } from 'next-i18next'

import { motion, useReducedMotion } from 'framer-motion'
import {
  fadeInContainer,
  fadeInLeft,
  fadeTop,
  shapesContainerVariant,
} from '../../public/variants/MotionVariants'
import { HiArrowCircleDown, HiDownload } from 'react-icons/hi'

export default function Header({ resume }) {
  const reduce = useReducedMotion()

  const { t } = useTranslation('home', { keyPrefix: 'header' })

  return (
    <section
      id='header'
      aria-label={t('sectionHeader')}
      className='self-center text-center flex justify-center items-center pb-28 w-full h-screen relative overflow-hidden'
    >
      <motion.div
        variants={fadeInContainer(reduce)}
        initial='initial'
        animate='animate'
        className='flex flex-col gap-10 z-20'
      >
        <motion.h1
          variants={fadeInLeft(reduce)}
          className='text-5xl md:text-6xl max-w-md xl:max-w-2xl lg:text-7xl xl:text-8xl bg-gradient-to-b from-primary to-primary/60 text-transparent bg-clip-text font-bold mx-auto py-7'
        >
          {t('hello')}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className='cursor-pointer inline-block text-foreground'
          >
            👋
          </motion.div>
        </motion.h1>
        <motion.p
          variants={fadeInLeft(reduce)}
          className='sm:text-lg md:text-xl lg:text-2xl text-foreground/80 italic max-w-sm lg:max-w-md mx-auto'
        >
          {t('subText')}
        </motion.p>
        <div className='flex flex-wrap justify-center gap-5'>
          <motion.a
            variants={fadeInLeft(reduce)}
            href='#about-me'
            className='flex items-center gap-3 self-center py-3 px-6 border-2 border-foreground rounded-md dark:text-foreground dark:bg-background shadow-foreground hover:bg-primary dark:hover:bg-primary hover:text-background transition-colors lg:text-xl en:shadow-left rtl:shadow-right dark:shadow-white'
          >
            <span>{t('about')}</span>
            <HiArrowCircleDown className='w-6 h-6' />
          </motion.a>
          {resume?.file?.asset?.url && (
            <motion.div variants={fadeInLeft(reduce)}>
              <a
                href={resume.file?.asset?.url}
                download={resume.downloadName}
                title={resume.downloadName}
                target='_blank'
                className='flex items-center gap-3 self-center py-3 px-6 border-2 border-foreground rounded-md dark:text-foreground dark:bg-background shadow-foreground hover:bg-primary dark:hover:bg-primary hover:text-background transition-colors lg:text-xl en:shadow-left rtl:shadow-right dark:shadow-white'
              >
                <span>{t('resume')}</span>
                <HiDownload className='w-6 h-6' />
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.svg
        variants={shapesContainerVariant(reduce)}
        initial='hidden'
        animate='visible'
        className='absolute z-10 opacity-10 max-w-[300px] md:max-w-sm xl:max-w-lg'
        width='389'
        height='403'
        viewBox='0 0 389 403'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.path
          variants={fadeTop(reduce)}
          d='M187.286 93.3333C187.286 144.88 145.499 186.667 93.9524 186.667C42.4058 186.667 0.619019 144.88 0.619019 93.3333C0.619019 41.7868 42.4058 0 93.9524 0C145.499 0 187.286 41.7868 187.286 93.3333Z'
          fill='#5F95D8'
          fillOpacity='0.3'
        />
        <motion.path
          variants={fadeTop(reduce)}
          d='M187.286 309.167C187.286 360.713 145.499 402.5 93.9524 402.5C42.4058 402.5 0.619019 360.713 0.619019 309.167C0.619019 257.62 42.4058 215.833 93.9524 215.833C145.499 215.833 187.286 257.62 187.286 309.167Z'
          fill='#7257D1'
        />
        <motion.rect
          variants={fadeTop(reduce)}
          x='202.286'
          width='186.667'
          height='186.667'
          rx='50'
          fill='#5F95D8'
        />
        <motion.path
          variants={fadeTop(reduce)}
          d='M202.286 265.667C202.286 238.052 224.671 215.667 252.286 215.667H338.952C366.567 215.667 388.952 238.052 388.952 265.667V352.333C388.952 379.948 366.567 402.333 338.952 402.333H252.286C224.672 402.333 202.286 379.948 202.286 352.333V265.667Z'
          fill='#6B56EB'
          fillOpacity='0.5'
        />
      </motion.svg>
    </section>
  )
}
