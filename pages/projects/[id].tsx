import { AiFillGithub } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'
import { getAllProjectsIds, getProjectData } from '../../utils/projectsUtils'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

type SkillType = {
  name: string
  icon: string
}

export default function ProjectDetails({ projectDetails }) {
  const router = useRouter()
  const id = router.query.id
  const { t } = useTranslation(['projects', 'common'])
  const title = t(`${id}.title`)
  const desc = t(`${id}.desc`)

  const { mainImgURL, images, skills, github, preview } = projectDetails

  const allSkills = skills.map((skill: SkillType) => {
    return (
      <li
        className='cursor-pointer relative group'
        title={skill.name}
        key={`${skill.name}_key`}
      >
        {/* <span className='absolute text-xs sm:text-sm hidden group-hover:flex bg-black left-5 items-center justify-center'>
          {skill.name}
        </span> */}
        <Image
          width={18}
          height={18}
          src={skill.icon}
          alt={`${skill.name}_icon`}
          aria-hidden='true'
        />
      </li>
    )
  })

  return (
    <motion.section
      variants={sectionVariant}
      initial='initial'
      animate='animate'
      id='project'
      className='min-h-screen flex'
      aria-label={title}
    >
      <div className='flex flex-col lg:flex-row-reverse md:gap-10 lg:gap-20 mx-auto px-5 md:px-12 lg:px-24 xl:px-36 2xl:px-44 lg:items-center lg:justify-between w-full mt-28 lg:mt-0 child:flex-1'>
        <div>
          <div className='relative max-w-4xl aspect-video rounded-sm ring ring-primary-400 shadow-lg'>
            <Image
              layout='fill'
              objectFit='cover'
              src={`${mainImgURL}.png`}
              alt={`${title}_Image`}
              aria-hidden='true'
              priority
            />
          </div>
          <div className='flex justify-between mt-5 gap-3'>
            {images.map((image: string, index: number) => {
              return (
                <div
                  key={index}
                  className='relative w-full aspect-[2/1] rounded-sm object-cover object-top ring-2 ring-primary-400/40'
                >
                  <Image
                    layout='fill'
                    objectFit='cover'
                    alt={index.toString()}
                    src={`${image}.png`}
                    aria-hidden='true'
                    priority
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='font-pattaya text-4xl lg:text-5xl xl:text-6xl text-primary-400 mt-10 lg:mt-0'>
            {title}
          </h1>
          <ul className='w-full mb-2 flex flex-wrap gap-2 child:flex child:gap-2 child:py-2 child:px-5 child:items-center child:rounded-md child:bg-primary-black/10 child:dark:bg-primary-white/10 child:text-primary-white lg:max-h-32 lg:overflow-y-auto'>
            {allSkills}
          </ul>
          <p className='text-sm leading-loose sm:text-base sm:leading-loose md:text-lg md:leading-loose xl:text-lg xl:leading-loose lg:max-h-[150px] 2xl:max-h-[200px] overflow-y-auto xl:my-5'>
            {desc}
          </p>
          <div className='flex mb-32 lg:mb-0 gap-5'>
            <a
              className='flex items-center gap-1 py-1 px-4 border-2 border-primary-black dark:border-primary-white rounded-md shadow-md text-sm'
              href={github}
              target='_blank'
            >
              <span>{t('common:github')}</span>
              <AiFillGithub className='w-5 h-5' />
            </a>
            <a
              className='flex items-center gap-1 py-1 px-4 bg-primary-400 text-primary-white rounded-md shadow-md text-sm'
              href={preview}
              target='_blank'
            >
              <span>{t('common:preview')}</span>
              <HiExternalLink className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export const getStaticProps = async ({ params, locale }) => {
  const id = params.id
  const projectDetails = getProjectData(id)
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['projects', 'common'])),
      projectDetails,
      id,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllProjectsIds()
  return {
    paths: paths,
    fallback: false,
  }
}

const sectionVariant = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
}
