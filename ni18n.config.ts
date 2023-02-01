import type { NamespacesNeeded, Ni18nOptions } from 'ni18n'
import { i18n } from './next.config'
import { loadTranslations as ni18nLoadTranslations } from 'ni18n'
import path from 'path'

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: i18n?.locales,
  ns: ['home', 'projects', 'blog', 'common'],
}

export const loadTranslations = async (
  initialLocale?: string | undefined,
  namespacesNeeded?: NamespacesNeeded | undefined
) => {
  const locales = path.resolve('./', './public/locales')

  return await ni18nLoadTranslations(
    ni18nConfig,
    initialLocale,
    namespacesNeeded
  )
}
