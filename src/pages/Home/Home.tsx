import AboutMe from './components/AboutMe'
import Header from './components/Header'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function Home() {
  return (
    <main>
      <div className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10'>
        <Header />
        <AboutMe />
        <Skills />
      </div>
      <Projects />
    </main>
  )
}
