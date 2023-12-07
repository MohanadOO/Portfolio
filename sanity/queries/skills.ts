export const TOP_SKILLS = `*[_type == 'mySkill' && topSkill == true]{
  name,
  topSkill,
  icon {
    asset-> {
      url
    },
    alt
  },
  color {
    hex
  },
  link
}`

export const ALL_SKILLS = `*[_type == 'mySkill']{
  name,
  topSkill,
  type,
  icon {
    asset-> {
      url
    },
    alt
  },
  color {
    hex
  },
  link
} | order(topSkill desc)`
