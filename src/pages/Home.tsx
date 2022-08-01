import AboutMe from '../components/AboutMe'
import Header from '../components/Header'
import Skills from '../components/Skills'
import Projects from '../components/Projects'


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
