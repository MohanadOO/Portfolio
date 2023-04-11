import { usePreview } from '../../sanity/sanity.preview'
import { getProjectData } from '../../sanity/queries/projects'
import ProjectDetailsLayout from './ProjectDetailsLayout'

export default function PreviewProjectDetails({ id }) {
  const projectDetails = usePreview(null, getProjectData(id))
  console.log('Loading...', projectDetails)
  return <ProjectDetailsLayout projectDetails={projectDetails} id={id} />
}
