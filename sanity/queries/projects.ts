export const PROJECT_PER_PAGE = 6
const START_PAGE = (page: number) => page * PROJECT_PER_PAGE - PROJECT_PER_PAGE
const END_PAGE = (page: number) => page * PROJECT_PER_PAGE

export const ALL_PROJECTS_QUERY = `*[_type == 'project']{
  slug{current},
  _id,
  title,
  body,
  mainImage{
    alt,
    asset->{
      url,
    },
    ...
  },
  tools[0...3]->{name, icon{asset->{url}}, color{background, text}},
  github,
  preview
}`

export const ALL_PROJECTS_CATEGORIES_QUERY = `*[_type == 'projectsCategory' && show == true]{
  title,
  description,
  projects[]->{
    slug{current},
    _id,
    title,
    body,
    mainImage{
      alt,
      asset->{
        url,
      },
      ...
    },
    tools[0...3]->{name, icon{asset->{url}}, color{background, text}},
    github,
    preview
  }
} | order(title.en asc)`

export const PROJECTS_QUERY = `*[_type == 'project'][0...6]{
  slug{current},
  _id,
  title,
  body,
  mainImage{
    alt,
    asset->{
      url,
    },
    ...
  },
  tools[0...3]->{name, icon{asset->{url}}, color{background, text}},
  github,
  preview
}`

export const getProjectData = (slug: string) => {
  return `*[slug.current == '${slug}'][0]{
  title,
  body,
  mainImage{
    alt,
    asset->{
      url,
    },
    ...
  },
  images[]{
    alt,
    asset->{url}
  },
  tools[]->{name, icon{asset->{url}}, color{background, text}},
  github,
  preview
}`
}
