import Header from './Header'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'

import { useRouter } from 'next/router'

export default function HomeLayout({ projects, skills }) {
  const router = useRouter()
  const locale = router.locale
  return (
    <main className='py-20'>
      <Header />
      <AboutMe locale={locale} />
      <Skills skills={skills} />
      <Projects locale={locale} projects={projects} viewBtn={true} />
    </main>
  )
}
