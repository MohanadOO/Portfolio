import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../App'

import { HiArrowCircleDown } from 'react-icons/hi'
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { BsWhatsapp } from 'react-icons/bs'
import {
  SiFirebase,
  SiGraphql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { useI18n } from '../i18n/Internationalization'

export default function Home() {
  return (
    <>
      <div className='mx-5 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10 child:my-64'>
        <Header />
        <AboutMe />
        <Skills />
      </div>
      <Projects />
    </>
  )
}

function Header() {
  const { translate } = useI18n()
  const { hello, subText, about } = translate('header')

  return (
    <section
      id='header'
      className='self-center text-center md:text-left ar:md:text-right flex flex-col gap-10 md:flex-row justify-center md:justify-between items-center w-full'
    >
      <div className='flex flex-col gap-10'>
        <h1 className='text-7xl lg:text-8xl 2xl:text-9xl text-primary-400 font-bold max-w-lg'>
          {hello}
        </h1>
        <p className='font-light text-2xl lg:text-3xl 2xl:text-4xl text-primary-black/70 italic'>
          {subText}
        </p>
        <a
          href='#about-me'
          className='flex items-center gap-3 self-center md:self-start py-3 px-6 border-2 border-primary-400 rounded-md text-primary-400 shadow-md shadow-secondary-400/40'
        >
          <span>{about}</span>
          <HiArrowCircleDown className='w-6 h-6' />
        </a>
      </div>

      <svg
        className='absolute -z-10 opacity-10 md:relative md:opacity-100'
        width='389'
        height='403'
        viewBox='0 0 389 403'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M187.286 93.3333C187.286 144.88 145.499 186.667 93.9524 186.667C42.4058 186.667 0.619019 144.88 0.619019 93.3333C0.619019 41.7868 42.4058 0 93.9524 0C145.499 0 187.286 41.7868 187.286 93.3333Z'
          fill='#5F95D8'
          fillOpacity='0.3'
        />
        <path
          d='M187.286 309.167C187.286 360.713 145.499 402.5 93.9524 402.5C42.4058 402.5 0.619019 360.713 0.619019 309.167C0.619019 257.62 42.4058 215.833 93.9524 215.833C145.499 215.833 187.286 257.62 187.286 309.167Z'
          fill='#7257D1'
        />
        <rect
          x='202.286'
          width='186.667'
          height='186.667'
          rx='50'
          fill='#5F95D8'
        />
        <path
          d='M202.286 265.667C202.286 238.052 224.671 215.667 252.286 215.667H338.952C366.567 215.667 388.952 238.052 388.952 265.667V352.333C388.952 379.948 366.567 402.333 338.952 402.333H252.286C224.672 402.333 202.286 379.948 202.286 352.333V265.667Z'
          fill='#6B56EB'
          fillOpacity='0.5'
        />
        <path
          d='M202.286 265.667C202.286 238.052 224.671 215.667 252.286 215.667H338.952C366.567 215.667 388.952 238.052 388.952 265.667V352.333C388.952 379.948 366.567 402.333 338.952 402.333H252.286C224.672 402.333 202.286 379.948 202.286 352.333V265.667Z'
          fill='#7257D1'
          fillOpacity='0.3'
        />
      </svg>
    </section>
  )
}

function AboutMe() {
  const { translate } = useI18n()
  const { sectionHeader, aboutMe, desc } = translate('aboutMe')

  return (
    <section
      id='about-me'
      className='flex flex-col gap-10 lg:gap-20 my-12 scroll-mt-28'
    >
      <div className='flex items-center mb-10 md:mx-0'>
        <h2 className='section_header'>{sectionHeader}</h2>
      </div>

      <hr className='border-primary-black/40' />

      <div className='flex flex-col-reverse md:flex-row items-center md:items-stretch gap-10'>
        <div>
          <img
            className='aspect-[1/1] max-w-[15rem] xl:max-w-sm 3xl:max-w-md rounded-md object-cover object-center'
            src='/images/MyPicture.png'
            alt='Mohanad Alrwaihy Picture'
          />
        </div>
        <div className='flex flex-col gap-5 items-center md:items-start justify-evenly'>
          <h3 className='font-bold py-2 px-5 bg-primary-black text-primary-white rounded-md shadow-lg lg:text-lg xl:text-xl'>
            {aboutMe}
          </h3>
          <p className='text-sm md:text-base xl:text-lg 2xl:text-xl font-light first-letter:text-3xl md:first-letter:text-4xl lg:first-letter:text-5xl xl:first-letter:text-6xl 2xl:first-letter:text-7xl first-letter:text-primary-black first-letter:font-bold text-center en:md:text-left ar:md:text-right leading-7 2xl:max-w-2xl text-primary-black'>
            {desc}
          </p>
          <ul className='flex items-center gap-4 '>
            <li>
              <AiFillGithub className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
            <li>
              <AiOutlineTwitter className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
            <li>
              <AiFillLinkedin className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
            <li>
              <BsWhatsapp className='w-6 h-6 lg:w-8 lg:h-8 fill-primary-400 cursor-pointer' />
            </li>
          </ul>
        </div>
      </div>

      <hr className='border-primary-black/40' />
    </section>
  )
}

function Skills() {
  const { translate } = useI18n()
  return (
    <section
      id='skills'
      className='flex flex-col md:flex-row justify-center md:justify-start items-center w-full scroll-mt-28'
    >
      <div className='flex flex-col gap-5 max-w-md lg:max-w-lg w-full'>
        <div className='flex items-center mb-10 mx-auto md:mx-0'>
          <h2 className='section_header first-letter:rounded-full first-letter:bg-secondary-400 text-secondary-400'>
            {translate('skills')['sectionHeader']}
          </h2>
        </div>
        <div className='lg:child:ml-[4.7rem] text-center md:text-left'>
          {/* <h3 className='uppercase text-3xl'>My Best Skills</h3>
          <p className='text-sm first-letter:text-3xl mt-3 first-letter:text-secondary-400 first-letter:font-medium leading-8 text-primary-gray'>
            These are the most tools I'm Comfortable Using
          </p> */}
          <ul className='mt-10 flex items-center justify-evenly gap-5 child:flex child:flex-col child:items-center child:gap-4 child:py-3 child:px-5 lg:child:py-5 lg:child:px-10 child:rounded-md flex-wrap md:w-[70vw]'>
            <li className='shadow-md shadow-[#007ACC]/10'>
              <span className='font-light text-lg tracking-wider text-[#007ACC]'>
                TypeScript
              </span>
              <SiTypescript className='w-8 h-8 fill-[#007ACC]' />
            </li>

            <li className='shadow-md shadow-[#00D8FF]/10'>
              <span className='font-light text-lg tracking-wider text-[#00D8FF]'>
                React
              </span>
              <SiReact className='w-8 h-8 fill-[#00D8FF]' />
            </li>

            <li className='shadow-md shadow-[#1EA8BC]/10'>
              <span className='font-light text-lg tracking-wider bg-gradient-to-r from-[#1EA8BC] to-[#12CEB7] bg-clip-text text-transparent'>
                Tailwind
              </span>
              <SiTailwindcss className='w-8 h-8 fill-[#1EA8BC]' />
            </li>

            <li className='shadow-md shadow-[#F6820C]/10'>
              <span className='font-light text-lg tracking-wider bg-gradient-to-r from-[#F6820C] to-[#FCCA3F] bg-clip-text text-transparent'>
                Firebase
              </span>
              <SiFirebase className='w-8 h-8  fill-[#F6820C]' />
            </li>

            <li className='shadow-md shadow-[#E535AB]/10'>
              <span className='font-light text-lg tracking-wider text-[#E535AB] '>
                GraphQl
              </span>
              <SiGraphql className='w-8 h-8 fill-[#E535AB]' />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const { translate } = useI18n()
  const { sectionHeader, viewAll } = translate('projects')

  return (
    <section id='projects' className='flex items-center w-full scroll-mt-28'>
      <div className='flex flex-col gap-5 w-screen'>
        <div className='flex items-center mb-10 mx-auto md:mx-20 lg:mx-40'>
          <h2 className='section_header'>{sectionHeader}</h2>
        </div>

        <div className='bg-primary-400/40 pt-10 pb-32 flex flex-col gap-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mx-12 md:mx-20 lg:mx-40 gap-10'>
            <ProjectCard link={'chat-application'} />
            <ProjectCard link={'shop-application'} />
          </div>

          <Link
            to={ROUTE_PATHS.AllProjects}
            className='py-3 px-6 w-32 bg-primary-white text-primary-black self-center rounded-lg shadow-lg font-pattaya text-center'
          >
            {viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}
