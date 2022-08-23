import ProjectCard from '../components/ProjectCard'
import { useI18n } from '../i18n/Internationalization'

export default function Home() {
  return (
    <>
      <Projects />
    </>
  )
}

function Projects() {
  const { translate } = useI18n()
  const { sectionHeader } = translate('projects')

  return (
    <section
      id='projects'
      className='flex items-center w-full scroll-mt-28 mt-24'
    >
      <div className='flex flex-col gap-5 w-screen'>
        <div className='bg-gradient-to-r  from-primary-400/60 to-secondary-400/60 pt-10 pb-32 flex flex-col gap-20'>
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 justify-center mx-12 md:mx-20 lg:mx-40 gap-10'>
            <ProjectCard link={'chat-application'} />
            <ProjectCard link={'half-life-2-home'} />
            <ProjectCard link={'manage-landing-page'} />
            <ProjectCard link={'bookmark-landing-page'} />
            <ProjectCard link={'room-home-page'} />
          </div>
        </div>
      </div>
    </section>
  )
}
