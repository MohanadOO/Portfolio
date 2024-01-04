import React from 'react'
import { usePreview } from '../../sanity/sanity.preview'
import {
  ALL_PROJECTS_CATEGORIES_QUERY,
  ALL_PROJECTS_QUERY,
} from '../../sanity/queries/projects'
import ProjectsLayout from './ProjectsLayout'

export default function PreviewProjects() {
  const projects = usePreview(null, ALL_PROJECTS_QUERY)
  const categories = usePreview(null, ALL_PROJECTS_CATEGORIES_QUERY)
  return (
    <ProjectsLayout
      preview={true}
      projects={projects}
      categories={categories}
    />
  )
}
