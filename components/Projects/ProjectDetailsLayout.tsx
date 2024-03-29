import { useReducedMotion, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { AiFillGithub } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'
import CustomImage from '../CustomImage'
import { NextSeo } from 'next-seo'
import { sectionVariant } from '../../public/variants/MotionVariants'
import Swiper from '../Swiper'
import { getURL } from '../../utils/helpers'
import { useRouter } from 'next/router'
import urlFor from '../../utils/urlFor'
import { Button } from '@/components/ui/button'

export default function ProjectDetailsLayout({ projectDetails, id }) {
  const reduce = useReducedMotion()

  const project: ProjectDetailsType = projectDetails
  const { t } = useTranslation(['common'])

  const { mainImage, images, tools, github, preview } = project
  const swiperImages = [mainImage]
  if (images && images.length > 0) {
    swiperImages.push(...images)
  }

  const locale = useRouter().locale
  const title = locale === 'ar' ? project.title?.ar : project.title?.en
  const body = locale === 'ar' ? project.body?.ar : project.body?.en

  const allSkills = tools?.map((skill: SkillType) => {
    return (
      <li
        key={skill.name}
        title={skill.name}
        dir='ltr'
        style={{
          backgroundColor:
            skill.color?.background?.hex || 'hsl(var(--foreground))',
          color: skill.color?.text?.hex || 'hsl(var(--background))',
        }}
        className={
          'gap-2 py-1 px-3 rounded-md font-bold h-7 flex items-center justify-center ring-2 ring-border shadow-md text-center'
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
    )
  })

  return (
    <>
      <NextSeo
        title={title}
        description={body}
        openGraph={{
          url: `${getURL(locale)}projects/${id}`,
          images: [
            {
              url: mainImage && urlFor(mainImage).url(),
              width: 1200,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
      <motion.section
        variants={sectionVariant(reduce)}
        initial='initial'
        animate='animate'
        id='project'
        className='flex flex-col px-4 sm:px-10'
        aria-label={title}
      >
        <div className='flex flex-col min-h-screen lg:flex-row-reverse my-auto md:gap-10 lg:gap-20 mx-auto lg:items-center lg:justify-between w-full child:flex-1'>
          <div className='mt-24 lg:mt-0'>
            <Swiper images={swiperImages} />
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='font-pattaya ar:font-arefRuqaa text-4xl lg:text-5xl xl:text-6xl text-primary dark:text-primary mt-10 lg:mt-0'>
              {title}
            </h1>
            <ul className='w-full my-4 flex flex-wrap gap-2 lg:max-h-32 lg:overflow-y-auto'>
              {allSkills}
            </ul>
            <p className='text-sm leading-loose sm:text-base sm:leading-loose md:text-lg md:leading-loose xl:text-lg xl:leading-loose lg:max-h-[150px] 2xl:max-h-[200px] overflow-y-auto xl:my-5'>
              {body}
            </p>
            <div className='flex mb-32 lg:mb-0 gap-5'>
              {github && (
                <Button asChild variant='outline'>
                  <a
                    className='flex items-center gap-2'
                    href={github}
                    target='_blank'
                  >
                    <span>{t('github')}</span>
                    <AiFillGithub className='w-5 h-5' />
                  </a>
                </Button>
              )}
              {preview && (
                <Button asChild>
                  <a
                    className='flex items-center gap-2'
                    href={preview}
                    target='_blank'
                  >
                    <span>{t('preview')}</span>
                    <HiExternalLink className='w-5 h-5' />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
