import { useReducedMotion, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { AiFillGithub } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'
import pageSEO from '../../utils/pageSEO'
import CustomImage from '../CustomImage'
import { NextSeo } from 'next-seo'
import { sectionVariant } from '../../public/variants/MotionVariants'
import Swiper from '../Swiper'

export default function ProjectDetailsLayout({ projectDetails, id }) {
  const reduce = useReducedMotion()

  const project: ProjectDetailsType = projectDetails
  const { t } = useTranslation(['common'])

  const { mainImage, images, skills, github, preview } = project
  const swiperImages = [mainImage]
  if (images && images.length > 0) {
    swiperImages.push(...images)
  }

  const { locale, pathName } = pageSEO(id)
  const title = locale === 'ar' ? project.title?.ar : project.title?.en
  const body = locale === 'ar' ? project.body?.ar : project.body?.en

  const allSkills = skills?.map((skill: SkillType) => {
    return (
      <li
        className='cursor-pointer relative group'
        title={skill?.name}
        key={`${skill?.name}_key`}
      >
        <CustomImage
          width={18}
          height={18}
          src={skill?.icon.asset.url}
          alt={`${skill?.name}_icon`}
          aria-hidden='true'
        />
      </li>
    )
  })

  return (
    <>
      <NextSeo title={title} description={body} openGraph={{ url: pathName }} />
      <motion.section
        variants={sectionVariant(reduce)}
        initial='initial'
        animate='animate'
        id='project'
        className='flex flex-col'
        aria-label={title}
      >
        <div className='flex flex-col min-h-screen lg:flex-row-reverse my-auto md:gap-10 lg:gap-20 mx-auto lg:items-center lg:justify-between w-full child:flex-1'>
          <div className='mt-24 lg:mt-0'>
            <Swiper images={swiperImages} />
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='font-pattaya text-4xl lg:text-5xl xl:text-6xl text-primary-400 dark:text-primary-400 mt-10 lg:mt-0'>
              {title}
            </h1>
            <ul className='w-full mb-2 flex flex-wrap gap-2 child:flex child:gap-2 child:py-2 child:px-5 child:items-center child:rounded-md child:bg-primary-black/10 child:dark:bg-primary-white/10 child:text-primary-white lg:max-h-32 lg:overflow-y-auto'>
              {allSkills}
            </ul>
            <p className='text-sm leading-loose sm:text-base sm:leading-loose md:text-lg md:leading-loose xl:text-lg xl:leading-loose lg:max-h-[150px] 2xl:max-h-[200px] overflow-y-auto xl:my-5'>
              {body}
            </p>
            <div className='flex mb-32 lg:mb-0 gap-5'>
              <a
                className='flex items-center gap-1 py-1 px-4 border-2 border-primary-black dark:border-primary-white rounded-md shadow-md text-sm'
                href={github}
                target='_blank'
              >
                <span>{t('github')}</span>
                <AiFillGithub className='w-5 h-5' />
              </a>
              <a
                className='flex items-center gap-1 py-1 px-4 bg-primary-400 text-primary-white rounded-md shadow-md text-sm'
                href={preview}
                target='_blank'
              >
                <span>{t('preview')}</span>
                <HiExternalLink className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
