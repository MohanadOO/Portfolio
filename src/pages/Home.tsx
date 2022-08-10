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

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <div className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10'>
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
      className='self-center text-center flex justify-center items-center w-full h-screen'
    >
      <motion.div
        variants={fadeInContainer}
        initial='initial'
        animate='animate'
        className='flex flex-col gap-10'
      >
        <motion.h1
          variants={fadeInLeft}
          className='text-5xl md:text-6xl max-w-md xl:max-w-2xl lg:text-7xl xl:text-8xl bg-gradient-to-b from-primary-400 to-secondary-400 text-transparent bg-clip-text font-bold mx-auto py-7'
        >
          {hello}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className='cursor-pointer inline-block text-primary-black'
          >
            👋
          </motion.div>
        </motion.h1>
        <motion.p
          variants={fadeInLeft}
          className='sm:text-lg md:text-xl lg:text-2xl text-primary-black/80 italic max-w-sm lg:max-w-md mx-auto'
        >
          {subText}
        </motion.p>
        <motion.a
          variants={fadeInLeft}
          href='#about-me'
          className='flex items-center gap-3 self-center  py-3 px-6 border-2 border-primary-black rounded-md text-primary-400 shadow-primary-black hover:bg-primary-400 hover:text-primary-white transition-colors lg:text-xl en:shadow-[-7px_7px_0_black] ar:shadow-[7px_7px_0_black]'
        >
          <span>{about}</span>
          <HiArrowCircleDown className='w-6 h-6' />
        </motion.a>
      </motion.div>

      <motion.svg
        variants={shapesContainerVariant}
        initial='hidden'
        animate='visible'
        className='absolute -z-10 opacity-10'
        width='389'
        height='403'
        viewBox='0 0 389 403'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.path
          variants={fadeTop}
          d='M187.286 93.3333C187.286 144.88 145.499 186.667 93.9524 186.667C42.4058 186.667 0.619019 144.88 0.619019 93.3333C0.619019 41.7868 42.4058 0 93.9524 0C145.499 0 187.286 41.7868 187.286 93.3333Z'
          fill='#5F95D8'
          fillOpacity='0.3'
        />
        <motion.path
          variants={fadeTop}
          d='M187.286 309.167C187.286 360.713 145.499 402.5 93.9524 402.5C42.4058 402.5 0.619019 360.713 0.619019 309.167C0.619019 257.62 42.4058 215.833 93.9524 215.833C145.499 215.833 187.286 257.62 187.286 309.167Z'
          fill='#7257D1'
        />
        <motion.rect
          variants={fadeTop}
          x='202.286'
          width='186.667'
          height='186.667'
          rx='50'
          fill='#5F95D8'
        />
        <motion.path
          variants={fadeTop}
          d='M202.286 265.667C202.286 238.052 224.671 215.667 252.286 215.667H338.952C366.567 215.667 388.952 238.052 388.952 265.667V352.333C388.952 379.948 366.567 402.333 338.952 402.333H252.286C224.672 402.333 202.286 379.948 202.286 352.333V265.667Z'
          fill='#6B56EB'
          fillOpacity='0.5'
        />
      </motion.svg>
    </section>
  )
}

function AboutMe() {
  const { translate } = useI18n()
  const { sectionHeader, aboutMe, descP1, descP2 } = translate('aboutMe')

  return (
    <section
      id='about-me'
      className='flex flex-col gap-10 lg:gap-20 my-12 scroll-mt-28'
    >
      <div className='flex items-center mx-auto mb-10 md:mx-0 '>
        <h2 className='section_header'>{sectionHeader}</h2>
      </div>

      <motion.div
        variants={fadeInContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        className='flex flex-col-reverse md:flex-row items-center md:items-start justify-around gap-10 lg:gap-20 pb-12'
      >
        <motion.div variants={fadeInLeft}>
          <motion.h3
            variants={fadeInRight}
            className='font-bold font-pattaya text-xs lg:text-lg xl:text-xl text-center max-w-sm w-full mb-4'
          >
            {aboutMe}
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
              className='aspect-square max-w-[15rem] lg:max-w-xs xl:max-w-sm rounded-md object-cover object-center ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 cursor-pointer'
              src='/images/MyPicture.png'
              alt='Mohanad Alrwaihy Picture'
            />
          </picture>
        </motion.div>
        <motion.div
          variants={fadeInContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='flex flex-col gap-5 items-center md:items-start justify-evenly overflow-hidden'
        >
          <motion.p
            variants={fadeInRight}
            className='text-sm sm:text-base xl:text-xl 2xl:text-2xl first-letter:text-3xl md:first-letter:text-4xl lg:first-letter:text-5xl xl:first-letter:text-6xl 2xl:first-letter:text-7xl first-letter:text-primary-400 first-letter:font-pattaya first-letter:font-bold text-center en:md:text-left ar:md:text-right leading-7 max-w-md 2xl:max-w-2xl text-primary-black font-light'
          >
            {descP1}
          </motion.p>
          <motion.p
            variants={fadeInRight}
            className='mb-7 text-sm sm:text-base xl:text-xl 2xl:text-2xl first-letter:text-3xl md:first-letter:text-4xl lg:first-letter:text-5xl xl:first-letter:text-6xl 2xl:first-letter:text-7xl first-letter:text-primary-400 first-letter:font-pattaya first-letter:font-bold text-center en:md:text-left ar:md:text-right leading-7 max-w-md 2xl:max-w-2xl text-primary-black font-light'
          >
            {descP2}
          </motion.p>
          <motion.ul
            variants={fadeInContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='flex items-center gap-4 mt-auto child-hover:scale-110'
          >
            <motion.li variants={fadeInRight}>
              <a href='https://github.com/MohanadOO' target='_blank'>
                <AiFillGithub className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform' />
              </a>
            </motion.li>
            <motion.li variants={fadeInRight}>
              <a href='https://twitter.com/Mohanad_OOO' target='_blank'>
                <AiOutlineTwitter className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform' />
              </a>
            </motion.li>
            <motion.li variants={fadeInRight}>
              <a
                href='https://www.linkedin.com/in/mohanad-alrwahiy-176aa719b/'
                target='_blank'
              >
                <AiFillLinkedin className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform' />
              </a>
            </motion.li>
            <motion.li variants={fadeInRight}>
              <a href='' target='_blank'>
                <BsWhatsapp className='w-7 h-7 lg:w-10 lg:h-10 fill-primary-400 cursor-pointer scale-75 hover:scale-100 transition-transform' />
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Skills() {
  const { translate } = useI18n()
  const { sectionHeader, subText } = translate('skills')

  return (
    <section
      id='skills'
      className='flex flex-col md:flex-row justify-center md:justify-start items-center w-full scroll-mt-28 my-48'
    >
      <div className='flex flex-col gap-5 max-w-md lg:max-w-lg w-full'>
        <div className='flex items-center mb-10 mx-auto md:mx-0'>
          <h2 className='section_header first-letter:rounded-full first-letter:bg-secondary-400 text-secondary-400'>
            {sectionHeader}
          </h2>
        </div>
        <div className='lg:child:ml-[4.7rem] text-center md:text-left'>
          <h3 className='text-xl first-letter:font-pattaya first-letter:text-5xl mt-3 first-letter:text-secondary-400 first-letter:font-medium leading-8 '>
            {subText}
          </h3>
          <ul className='mt-10 flex items-center justify-center md:justify-evenly gap-10 md:gap-5 child:flex child:flex-col child:items-center child:gap-4 child:py-3 child:px-5 lg:child:py-5 lg:child:px-10 child:rounded-md flex-wrap md:w-[80vw]'>
            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 en:shadow-[#007ACC]/60 ar:shadow-[#007ACC]/60'>
              <span className='text-xl text-[#007ACC]'>TypeScript</span>
              <SiTypescript className='w-8 h-8 fill-[#007ACC]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 en:shadow-[#00D8FF]/60 ar:shadow-[#00D8FF]/60'>
              <span className='text-xl text-[#00D8FF]'>React</span>
              <SiReact className='w-8 h-8 fill-[#00D8FF]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 en:shadow-[#1EA8BC]/60 ar:shadow-[#1EA8BC]/60'>
              <span className='text-xl bg-gradient-to-r from-[#1EA8BC] to-[#12CEB7] bg-clip-text text-transparent'>
                Tailwind
              </span>
              <SiTailwindcss className='w-8 h-8 fill-[#1EA8BC]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 en:shadow-[#F6820C]/60 ar:shadow-[#F6820C]/60'>
              <span className='text-xl bg-gradient-to-r from-[#F6820C] to-[#FCCA3F] bg-clip-text text-transparent'>
                Firebase
              </span>
              <SiFirebase className='w-8 h-8  fill-[#F6820C]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border-2 en:shadow-[#E535AB]/60 ar:shadow-[#E535AB]/60'>
              <span className='text-xl text-[#E535AB] '>GraphQl</span>
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

        <div className='bg-gradient-to-r  from-primary-400/60 to-secondary-400/60 pt-10 pb-32 flex flex-col gap-20'>
          <motion.div
            variants={projectsContainer}
            initial='initial'
            whileInView='animate'
            className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 justify-center mx-12 md:mx-20 lg:mx-40 gap-10'
          >
            <ProjectCard link={'chat-application'} />
            <ProjectCard link={'half-life-2-home'} />
            <ProjectCard link={'manage-landing-page'} />
            <ProjectCard link={'bookmark-landing-page'} />
            <ProjectCard link={'room-home-page'} />
          </motion.div>
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

const shapesContainerVariant = {
  hidden: {
    scale: 0.9,
  },
  visible: {
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
      duration: 1.2,
      when: 'afterChildren',
      repeat: Infinity,
      repeatType: 'reverse',
      type: 'tween',
    },
  },
}

const fadeInContainer = {
  initial: {
    y: -100,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.7,
    },
  },
}

const projectsContainer = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.7,
    },
  },
}

const fadeTop = {
  hidden: {
    scale: 0,
    y: '-100%',
  },
  visible: {
    scale: 1,
    y: 0,
  },
}

const fadeInLeft = {
  initial: {
    scale: 0,
    x: '-100%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const fadeInRight = {
  initial: {
    scale: 0,
    x: '200%',
  },
  animate: {
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}
