import { useParams } from 'react-router-dom'
import { useI18n } from '../i18n/Internationalization'
import projects from '../data/projects.json'
import { AiFillGithub } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'

type SkillType = {
  name: string
  icon: string
}

export default function ProjectDetails() {
  const param = useParams()

  if (projects[param.id] === undefined) {
    return (
      <div className='h-screen mx-5 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10'>
        Wrong
      </div>
    )
  }

  const { title, mainImgURL, desc, images, skills, github, preview } =
    projects[param.id]
  const { locale } = useI18n()

  const allSkills = skills.map((skill: SkillType) => {
    return (
      <li key={`${skill.name}_key`}>
        <span className='text-base'>{skill.name}</span>
        <img
          className='w-6 h-6 bg-transparent'
          src={skill.icon}
          alt={`${skill.name}_icon`}
        />
      </li>
    )
  })

  return (
    <div className='mt-28 flex flex-col lg:flex-row md:gap-10  mx-5 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 md:px-10 lg:h-screen lg:items-center lg:justify-between'>
      <div>
        <picture className='max-w-4xl shadow-lg'>
          <source srcSet={`${mainImgURL}.webp`} type='image/webp' />
          <img
            className='aspect-video rounded-md'
            src={`${mainImgURL}.png`}
            alt={`${locale === 'ar-SA' ? title.ar : title.en}_Image`}
          />
        </picture>
        <div className='flex justify-between overflow-hidden mt-5 gap-3'>
          {images.map((image, index) => {
            return (
              <>
                <picture className='max-w-[200px] shadow-sm' key={index}>
                  <source srcSet={`${image}.webp`} type='image/webp' />
                  <img
                    className='aspect-[1/1] rounded-md contrast-75 object-cover'
                    alt={index}
                    src={`${image}.png`}
                  />
                </picture>
              </>
            )
          })}
        </div>
      </div>
      <div>
        <h1 className='font-pattaya text-4xl text-primary-400 mt-10 md:mt-0 mb-5'>
          {locale === 'ar-SA' ? title.ar : title.en}
        </h1>
        <ul className='w-full flex mb-7 gap-3 child:flex child:gap-2 child:py-1 child:px-4  child:items-center child:rounded-md child:bg-primary-black child:text-primary-white '>
          {allSkills}
        </ul>
        <p className='font-light text-justify'>
          {locale === 'ar-SA' ? desc.ar : desc.en}
        </p>
        <div className='flex my-10 gap-5'>
          <a
            className='flex items-center gap-1 py-1 px-4 border-2 border-primary-400 text-primary-400 rounded-md shadow-md'
            href={github}
            target='_blank'
          >
            <span>Github</span>
            <AiFillGithub className='w-5 h-5' />
          </a>
          <a
            className='flex items-center gap-1 py-1 px-4 bg-primary-400 text-primary-white rounded-md shadow-md'
            href={preview}
            target='_blank'
          >
            <span>Preview</span>
            <HiExternalLink className='w-5 h-5' />
          </a>
        </div>
      </div>
    </div>
  )
}
