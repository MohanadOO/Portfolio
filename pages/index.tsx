import { loadTranslations } from 'ni18n'
import HomeLayout from '../components/Home/HomeLayout'
import { ni18nConfig } from '../ni18n.config'

import { client } from '../sanity/sanity.client'
import { PROJECTS_QUERY } from '../sanity/queries/projects'
import { TOP_SKILLS } from '../sanity/queries/skills'
import { NextSeo } from 'next-seo'
import { getPostsInfoHome } from '../sanity/queries/blog'
import { useTranslation } from 'next-i18next'
import { getURL } from '../utils/helpers'

export default function Home({ projects, skills, locale, posts }) {
  const { t } = useTranslation('home')
  return (
    <>
      <NextSeo title={t('title')} />
      <HomeLayout projects={projects} skills={skills} posts={posts} />
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  const projects = await client.fetch(PROJECTS_QUERY)
  const skills = await client.fetch(TOP_SKILLS)
  const posts = await client.fetch(getPostsInfoHome)

  fetch(`${getURL()}api/rss`, {
    method: 'PUT',
    body: JSON.stringify(posts),
  })
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, [
        'home',
        'blog',
        'common',
      ])),
      projects,
      skills,
      locale,
      posts,
    },
    revalidate: 300,
  }
}
