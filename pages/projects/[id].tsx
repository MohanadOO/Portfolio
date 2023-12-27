import { getAllProjectsIds } from '../../utils/projectsUtils'
import { getProjectData } from '../../sanity/queries/projects'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'

import { client } from '../../sanity/sanity.client'

import ProjectDetailsLayout from '../../components/Projects/ProjectDetailsLayout'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewProjectDetails = lazy(
  () => import('../../components/Projects/PreviewProjectDetails')
)

export default function ProjectDetails({ projectDetails, id, preview }) {
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewProjectDetails id={id} />
      </PreviewSuspense>
    )
  }

  return <ProjectDetailsLayout projectDetails={projectDetails} id={id} />
}

export const getStaticProps = async ({ params, locale, preview = false }) => {
  const id = params.id

  if (preview) {
    return {
      props: {
        ...(await loadTranslations(ni18nConfig, locale, [
          'projects',
          'common',
        ])),
        id,
        preview,
      },
    }
  }

  const projectDetails: ProjectDetailsType = await client.fetch(
    getProjectData(id)
  )

  if (!projectDetails) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['projects', 'common'])),
      projectDetails,
      id,
    },
    revalidate: 300,
  }
}

export const getStaticPaths = async () => {
  const projectsSlug = await client.fetch(
    `*[_type == 'project']{slug{current}}`
  )
  const paths = getAllProjectsIds(projectsSlug)
  return {
    paths: paths,
    fallback: 'blocking',
  }
}
