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
  skills[0...3]->{name, icon{asset->{url}}},
  github,
  preview
}`

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
  skills[0...3]->{name, icon{asset->{url}}},
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
  skills[]->{name, icon{asset->{url}}},
  github,
  preview
}`
}
