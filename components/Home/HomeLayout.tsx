import Header from './Header'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'


import { BlogList } from '../Blog/BlogList'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { H2 } from '@/components/ui/Typography/headers'

export default function HomeLayout({ projects, skills, posts, resume }) {
  const { t } = useTranslation('home')

  const list = [
    { component: <Header resume={resume} />, header: '', id: 'header' },
    { component: <AboutMe />, header: 'aboutMe', id: 'aboutMe' },
    {
      component: <Skills skills={skills} />,
      header: 'skills',
      id: 'skills',
    },
    {
      component: <Projects projects={projects} viewBtn={true} />,
      header: 'projects',
      id: 'projects',
    },
    {
      component: <BlogList posts={posts} viewBtn={true} />,
      header: 'blog',
      id: 'blog',
    },
  ]

  return (
    <div className='py-20 px-4 sm:px-10 overflow-hidden'>
      {list.map((item) => (
        <React.Fragment key={item.id}>
          {item.header && (
            <H2 className='w-full my-10 text-center md:text-start'>
              {t(`${item.header}.sectionHeader`, '')}
            </H2>
          )}
          {item.component}
        </React.Fragment>
      ))}
    </div>
  )
}
