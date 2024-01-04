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
    background{hex},
    text{hex}
  },
  link
}`

export const ALL_SKILLS = `*[_type == 'mySkill']{
  name,
  topSkill,
  skillType->{en, ar},
  icon {
    asset-> {
      url
    },
    alt
  },
  color {
    background{hex},
    text{hex}
  },
  link
} | order(topSkill desc)`
