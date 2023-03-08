import { loadTranslations } from 'ni18n'
import HomeLayout from '../components/Home/HomeLayout'
import { ni18nConfig } from '../ni18n.config'

import { client } from '../sanity/sanity.client'
import { PROJECTS_QUERY } from '../sanity/queries/projects'
import { TOP_SKILLS } from '../sanity/queries/skills'
import { NextSeo } from 'next-seo'

export default function Home({ projects, skills, locale }) {
  return (
    <>
      <NextSeo title={locale === 'ar' ? 'الرئيسية' : 'Home'} />
      <HomeLayout projects={projects} skills={skills} />
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  const projects = await client.fetch(PROJECTS_QUERY)
  const skills = await client.fetch(TOP_SKILLS)

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['home', 'common'])),
      projects,
      skills,
      locale,
    },
  }
}
