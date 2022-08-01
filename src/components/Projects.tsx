import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'

export default function Projects() {
  return (
    <section id='projects' className='flex items-center w-full scroll-mt-28'>
      <div className='flex flex-col gap-5 w-screen'>
        <div className='flex items-center mb-10 mx-auto md:mx-20 lg:mx-40'>
          <div className='flex items-center max-w-[80px] h-[80px] md:max-w-[100px] md:h-[100px] lg:max-w-[115px] lg:h-[115px] w-full bg-primary-400 rounded-md shadow-lg absolute'></div>
          <h2 className='mx-auto text-3xl md:text-4xl lg:text-5xl first-letter:tracking-widest tracking-wider uppercase text-primary-400 font-bold first-letter:text-primary-white z-10 ml-[3.5rem] md:ml-[4.2rem]'>
            My Work
          </h2>
        </div>

        <div className='bg-primary-400/40 pt-10 pb-32 flex flex-col gap-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-12 md:mx-20 lg:mx-40 gap-10'>
            <ProjectCard
              title={'Chat Application'}
              imgURL={'/images/chat_application.png'}
            />
            <ProjectCard
              title={'Shop Application'}
              imgURL={'/images/chat_application.png'}
            />
            <ProjectCard
              title={'Shop Application'}
              imgURL={'/images/chat_application.png'}
            />
          </div>

          <Link
            to='/projects'
            className='py-3 px-6 w-32 bg-primary-white text-primary-black self-center rounded-lg shadow-lg font-pattaya'
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}
