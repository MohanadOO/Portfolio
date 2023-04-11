import React from 'react'
import { usePreview } from '../../sanity/sanity.preview'
import { ALL_PROJECTS_QUERY } from '../../sanity/queries/projects'
import ProjectsLayout from './ProjectsLayout'

export default function PreviewProjects() {
  const projects = usePreview(null, ALL_PROJECTS_QUERY)
  console.log(projects)
  return <ProjectsLayout projects={projects} />
}
