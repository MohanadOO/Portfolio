import projects from '../data/projects.json'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/Internationalization'
import { GOTO } from '../App'

type ProjectCardType = {
  link: string
}

type SkillType = {
  name: string
  icon: string
}

export default function ProjectCard({ link }: ProjectCardType) {
  const { translate } = useI18n()
  const { checkProject } = translate('projects')
  const { title, desc, mainImgURL, skills } = projects[link]
  const { locale } = useI18n()

  const allSkills = skills.map((skill: SkillType) => {
    return (
      <li key={`${skill.name}_key`}>
        <span className='text-sm lg:text-base'>{skill.name}</span>
        <img
          className='w-4 h-4 bg-transparent'
          src={skill.icon}
          alt={`${skill.name}_icon`}
        />
      </li>
    )
  })

  

  return (
    <div className='bg-white border-[1px] rounded-md border-primary-black shadow-[7px_7px_0px_black] max-w-sm mx-auto pb-5'>
      <img
        className='max-w-sm w-full aspect-[16/11] object-cover object-center contrast-75 cursor-pointer'
        src={`${mainImgURL}.png`}
        alt={`${locale === 'ar-SA' ? title.ar : title.en}_preview`}
      />
      <div className='p-5'>
        <ul className='w-full flex mb-7 gap-3 child:flex child:gap-2 child:py-1 child:px-3  child:items-center child:rounded-md child:bg-primary-black child:text-primary-white'>
          {allSkills}
        </ul>
        <h1 className='font-pattaya text-2xl mt-4 text-primary-400'>
          {locale === 'ar-SA' ? title.ar : title.en}
        </h1>
        <p className='max-w-xs w-full text-sm mt-3 text-primary-black/60 my-10'>
          {locale === 'ar-SA' ? desc.ar : desc.en}
        </p>
        <Link
          to={GOTO.ProjectDetails(link)}
          className='py-3 px-6 text-primary-400 rounded-md shadow-md font-bold border border-primary-400'
        >
          {checkProject}
        </Link>
      </div>
    </div>
  )
}
