import projects from '../public/data/projectsDetails.json'
const { i18n } = require('../next.config')

export const getAllProjectsIds = () => {
  return i18n.locales
    .map((locale: string) => {
      return Object.keys(projects).map((id) => {
        return {
          params: { id: id },
          locale: locale,
        }
      })
    })
    .flat()
}

export const getProjectData = (id: string) => {
  const { mainImgURL, skills, preview, github, images } = projects[id]
  return { mainImgURL, skills, preview, github, images }
}

export const getAllProjects = () => {
  return projects
}
