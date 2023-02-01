import type { NamespacesNeeded, Ni18nOptions } from 'ni18n'
import { i18n } from './next.config'
import { loadTranslations as ni18nLoadTranslations } from 'ni18n'
import path from 'path'

import HttpBackend from 'i18next-http-backend'
import ChainedBackend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

const isBrowser = typeof window !== 'undefined'

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: i18n?.locales,
  ns: ['home', 'projects', 'blog', 'common'],
  use: isBrowser ? [ChainedBackend] : undefined,
  backend: isBrowser
    ? {
        backends: [LocalStorageBackend, HttpBackend],
        backendOptions: [
          {
            expirationTime: 24 * 60 * 60 * 1000,
          },
          {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
          },
        ],
      }
    : undefined,
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
