import { AiFillGithub } from 'react-icons/ai'
import { HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'
import { getAllProjectsIds } from '../../utils/projectsUtils'
import { getProjectData } from '../../sanity/queries/projects'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

import { client } from '../../sanity/sanity.client'
import { useState } from 'react'
import Head from 'next/head'

export default function ProjectDetails({ projectDetails }) {
  const project: ProjectDetailsType = projectDetails
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const locale = router.locale

  const { mainImage, images, skills, github, preview } = project

  const [mainPic, setMainPic] = useState(mainImage)
  const [pics, setPics] = useState([mainImage, ...images])
  const [active, setActive] = useState(0)

  function handleSwitchImages(dir: number) {
    if (dir === -1 && active === 0) {
      setActive(pics.length - 1)
      setMainPic(pics[pics.length - 1])
      return
    }
    const index = (dir + active) % pics.length
    setActive(index)
    setMainPic(pics[index])
  }

  const title = locale === 'ar' ? project.title.ar : project.title.en
  const body = locale === 'ar' ? project.body.ar : project.body.en

  const allSkills = skills.map((skill: SkillType) => {
    return (
      <li
        className='cursor-pointer relative group'
        title={skill.name}
        key={`${skill.name}_key`}
      >
        <Image
          width={18}
          height={18}
          src={skill.icon.asset.url}
          alt={`${skill.name}_icon`}
          aria-hidden='true'
        />
      </li>
    )
  })

  return (
    <>
      <Head>
        <title>
          {locale === 'ar'
            ? `مهند الرويحي | ${title}`
            : `Mohanad Alrwaihy | ${title}`}
        </title>
      </Head>
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
            <div className='relative max-w-4xl aspect-video rounded-sm ring ring-primary-400 shadow-lg group hover:bg-black/30 transition-all'>
              <div className='absolute top-[50%] translate-y-[-50%] flex justify-between w-full p-5 z-10'>
                <HiChevronRight
                  onClick={() => handleSwitchImages(-1)}
                  className='w-10 h-10 text-transparent ltr:rotate-180 group-hover:text-primary-400 dark:text-primary-400 cursor-pointer'
                />
                <HiChevronLeft
                  onClick={() => handleSwitchImages(1)}
                  className='w-10 h-10 text-transparent ltr:rotate-180 group-hover:text-primary-400 dark:text-primary-400 cursor-pointer'
                />
              </div>
              <Image
                className='group-hover:brightness-75 transition-all select-none'
                fill
                property='true'
                style={{ objectFit: 'cover' }}
                src={`${mainPic.asset.url}`}
                alt={`${mainPic.alt}`}
                aria-hidden='true'
                priority
              />
            </div>
            <div className='flex justify-between mt-5 gap-3'>
              {pics.map((image: ImageType, index: number) => {
                return (
                  <div
                    onClick={() => {
                      setActive(index)
                      setMainPic(image)
                    }}
                    key={index}
                    className='relative w-full aspect-[2/1] rounded-sm object-cover object-top ring-2 ring-primary-400/40 cursor-pointer max-w-xs'
                  >
                    <Image
                      className={`transition-all ${
                        index === active
                          ? 'brightness-50'
                          : 'hover:brightness-75 hover:scale-105'
                      }`}
                      fill
                      style={{ objectFit: 'cover' }}
                      alt={index.toString()}
                      src={image.asset.url}
                      aria-hidden='true'
                      priority
                    />
                  </div>
                )
              })}
            </div>
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

export const getStaticProps = async ({ params, locale }) => {
  const id = params.id
  const projectDetails: ProjectDetailsType = await client.fetch(
    getProjectData(id)
  )
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
      projectDetails,
      id,
    },
    revalidate: 600,
  }
}

export const getStaticPaths = async () => {
  const projectsSlug = await client.fetch(
    `*[_type == 'project']{slug{current}}`
  )
  const paths = getAllProjectsIds(projectsSlug)
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
