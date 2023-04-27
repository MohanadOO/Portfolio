import Header from './Header'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'

import { useRouter } from 'next/router'
import { BlogList } from '../Blog/BlogList'
import { useTranslation } from 'react-i18next'

export default function HomeLayout({ projects, skills, posts }) {
  const { t } = useTranslation('home')

  const list = [
    { component: <Header />, header: '' },
    { component: <AboutMe />, header: 'aboutMe' },
    {
      component: <Skills skills={skills} />,
      header: 'skills',
    },
    {
      component: <Projects projects={projects} viewBtn={true} />,
      header: 'projects',
    },
    { component: <BlogList posts={posts} viewBtn={true} />, header: 'blog' },
  ]

  return (
    <main className='py-20'>
      {list.map((item) => (
        <>
          {item.header && (
            <div className='flex justify-center items-center my-24 md:justify-start w-full'>
              <h2 className='section_header'>
                {t(`${item.header}.sectionHeader`)}
              </h2>
            </div>
          )}
          {item.component}
        </>
      ))}
    </main>
  )
}
