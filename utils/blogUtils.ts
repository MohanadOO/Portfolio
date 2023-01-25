const { i18n } = require('../next.config')

export const getAllPostsIds = (slugs) =>
  i18n.locales
    .map((locale: string) => {
      return slugs.map((slug) => {
        return {
          params: { slug: slug.slug.current },
          locale: locale,
        }
      })
    })
    .flat()
