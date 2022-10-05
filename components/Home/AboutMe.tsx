import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import {
  fadeInContainer,
  fadeInLeft,
  fadeInRightIcons,
  fadeInRightText,
} from '../../public/variants/MotionVariants'

import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { BsWhatsapp } from 'react-icons/bs'
import Image from 'next/image'

export default function AboutMe({ locale }) {
  const { t } = useTranslation('home', { keyPrefix: 'aboutMe' })

  return (
    <section
      id='about-me'
      aria-label={t('sectionHeader')}
      className='flex flex-col gap-10 lg:gap-10 my-48 scroll-mt-32'
    >
      <div className='flex items-center mx-auto md:mx-0'>
        <h2 className='section_header'>{t('sectionHeader')}</h2>
      </div>

      <motion.div
        variants={fadeInContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        className='flex flex-col-reverse md:flex-row items-center md:items-start gap-10 lg:gap-20 pb-12 my-12 font-cairo overflow-hidden lg:overflow-visible'
      >
        <motion.div
          variants={fadeInLeft}
          className='relative aspect-square max-w-sm w-full rounded-sm ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 border-primary-black dark:border-white flex-1'
        >
          <Image
            src='/images/MyPicture.png'
            layout='fill'
            objectFit='cover'
            alt={locale === 'ar' ? 'صورتي الشخصية' : 'A Photo of Me'}
          />
        </motion.div>
        <motion.div
          variants={fadeInContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='about-me flex flex-1 flex-col gap-5 items-center md:items-start justify-evenly overflow-hidden max-w-md md:max-w-4xl text-center en:md:text-left ar:md:text-right'
        >
          <motion.h3
            variants={fadeInRightText}
            className='font-semibold font-pattaya text-base lg:text-lg xl:text-xl max-w-sm w-full'
          >
            {t('aboutMe')}
          </motion.h3>
          <motion.p
            variants={fadeInRightText}
            className='text-primary-black dark:text-primary-white border-b border-dashed border-primary-400 pb-5'
          >
            {t('descP1')}
          </motion.p>
          <motion.p
            variants={fadeInRightText}
            className='text-primary-black dark:text-primary-white border-b border-dashed border-primary-400 pb-5'
          >
            {t('descP2')}
          </motion.p>
          <motion.ul
            variants={fadeInContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='flex items-center gap-4 mt-auto child-hover:scale-110'
          >
            <motion.li variants={fadeInRightIcons}>
              <a
                aria-label='GitHub'
                href='https://github.com/MohanadOO'
                target='_blank'
              >
                <AiFillGithub
                  aria-hidden='true'
                  className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform'
                />
              </a>
            </motion.li>
            <motion.li variants={fadeInRightIcons}>
              <a
                aria-label='Twitter'
                href='https://twitter.com/MohanadOO_'
                target='_blank'
              >
                <AiOutlineTwitter
                  aria-hidden='true'
                  className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform'
                />
              </a>
            </motion.li>
            <motion.li variants={fadeInRightIcons}>
              <a
                aria-label='Linkedin'
                href='https://www.linkedin.com/in/mohanad-alrwahiy-176aa719b/'
                target='_blank'
              >
                <AiFillLinkedin
                  aria-hidden='true'
                  className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform'
                />
              </a>
            </motion.li>
            <motion.li variants={fadeInRightIcons}>
              <a
                aria-label='Whatsapp'
                href='https://wa.me/966532407160'
                target='_blank'
              >
                <BsWhatsapp
                  aria-hidden='true'
                  className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform'
                />
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  )
}