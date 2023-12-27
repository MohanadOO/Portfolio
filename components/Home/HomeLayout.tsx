import Header from './Header'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'


import { BlogList } from '../Blog/BlogList'
import { useTranslation } from 'next-i18next'
import React from 'react'

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
            <div className='flex justify-center items-center my-24 md:justify-start w-full '>
              <h2 className='section_header'>
                {t(`${item.header}.sectionHeader`, '')}
              </h2>
            </div>
          )}
          {item.component}
        </React.Fragment>
      ))}
    </div>
  )
}
