import type { Ni18nOptions } from 'ni18n'
const { i18n } = require('./next.config')

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: [...i18n.locales],
  ns: ['home', 'projects', 'blog', 'common'],
}
