const { i18n } = require('../next.config')

export const getAllProjectsIds = (slugs) => {
  return i18n.locales
    .map((locale: string) => {
      return slugs.map((slug) => {
        return {
          params: { id: slug.slug.current },
          locale: locale,
        }
      })
    })
    .flat()
}