export const ALL_SKILLS = `*[_type == 'mySkill']{
  name,
  icon {
    asset-> {
      url
    },
    alt
  },
  color {
    hex
  }
}`
