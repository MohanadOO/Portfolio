import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import {
  fadeInContainer,
  fadeInLeft,
  fadeInRightIcons,
  fadeInRightText,
} from '../MotionVariants'
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { BsWhatsapp } from 'react-icons/bs'

export default function AboutMe() {
  const { t } = useTranslation('translation', { keyPrefix: 'aboutMe' })

  return (
    <section
      id='about-me'
      aria-label={t('sectionHeader')}
      className='flex flex-col gap-10 lg:gap-20 my-12 scroll-mt-28'
    >
      <div className='flex items-center mx-auto mb-10 md:mx-0 '>
        <h2 className='section_header'>{t('sectionHeader')}</h2>
      </div>

      <motion.div
        variants={fadeInContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        className='flex flex-col-reverse md:flex-row items-center md:items-start lg:items-center gap-10 lg:gap-20 pb-12'
      >
        <motion.div variants={fadeInLeft}>
          <motion.h3
            variants={fadeInRightText}
            className='font-bold font-pattaya text-xs lg:text-lg xl:text-xl text-center max-w-sm w-full mb-4'
          >
            {t('aboutMe')}
          </motion.h3>
          <picture>
            <source srcSet='/images/MyPicture.webp' type='image/webp' />
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 10,
              }}
              className='aspect-square md:aspect-[3/4] max-w-[15rem] lg:max-w-xs xl:max-w-sm rounded-md object-cover object-center ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 cursor-pointer'
              src='/images/MyPicture.png'
              alt={
                document.documentElement.lang === 'ar'
                  ? 'صورتي الشخصية'
                  : 'A Photo of Me'
              }
            />
          </picture>
        </motion.div>
        <motion.div
          variants={fadeInContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='flex flex-col gap-5 items-center md:items-start justify-evenly overflow-hidden py-5'
        >
          <motion.p
            variants={fadeInRightText}
            className='text-sm sm:text-base xl:text-xl first-letter:text-2xl md:first-letter:text-3xl lg:first-letter:text-4xl xl:first-letter:text-5xl 2xl:first-letter:text-6xl first-letter:text-primary-400 first-letter:font-pattaya ar:first-letter:font-lato first-letter:font-bold text-center en:md:text-left ar:md:text-right leading-7 max-w-md 2xl:max-w-2xl text-primary-black/80 border-b border-dashed border-primary-400 pb-5'
          >
            {t('descP1')}
          </motion.p>
          <motion.p
            variants={fadeInRightText}
            className='mb-7 text-sm sm:text-base xl:text-xl first-letter:text-2xl md:first-letter:text-3xl lg:first-letter:text-4xl xl:first-letter:text-5xl 2xl:first-letter:text-6xl first-letter:text-primary-400 first-letter:font-pattaya ar:first-letter:font-lato first-letter:font-bold text-center en:md:text-left ar:md:text-right leading-7 max-w-md 2xl:max-w-2xl text-primary-black/80 border-b border-dashed border-primary-400 pb-5'
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
