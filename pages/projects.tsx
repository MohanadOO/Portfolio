import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import { client } from '../sanity/sanity.client'
import { ALL_PROJECTS_QUERY } from '../sanity/queries/projects'
import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'
import ProjectsLayout from '../components/Projects/ProjectsLayout'

const PreviewProjects = lazy(
  () => import('../components/Projects/PreviewProjects')
)

export default function ProjectsPage({ projects, preview }) {
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewProjects />
      </PreviewSuspense>
    )
  }

  return <ProjectsLayout projects={projects} />
}

export const getStaticProps = async ({ preview = false, locale }) => {
  if (preview) {
    return {
      props: {
        ...(await loadTranslations(ni18nConfig, locale, [
          'projects',
          'common',
        ])),
        preview,
      },
    }
  }

  const projects = await client.fetch(ALL_PROJECTS_QUERY)
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['projects', 'common'])),
      projects,
    },
    revalidate: 600,
  }
}
