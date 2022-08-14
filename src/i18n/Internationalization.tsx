import { createContext, ReactNode, useContext, useState } from 'react'

type MessageProp = {
  [key: string]: { [key: string]: string }
}

type I18ProviderType = {
  children: ReactNode
  defaultLocale?: string
}

const I18nContext = createContext<{
  messages: MessageProp
  setMessages: (messages: MessageProp) => void
  locale: string
  setLocale: (local: string) => void
  loaded: boolean
  translate: (
    key: string,
    defaultMessage?: string,
    local?: string
  ) => string | undefined | any
}>({
  messages: {},
  setMessages: () => {},
  locale: 'en-US',
  setLocale: () => {},
  loaded: false,
  translate: () => '',
})

export const isEmpty = (val: any) => {
  return val == null || !(Object.keys(val) || val).length
}

export function I18nProvider({
  children,
  defaultLocale = 'en-US',
}: I18ProviderType) {
  const [messages, setMessages] = useState<any>({})
  const [locale, setLocale] = useState(defaultLocale)

  const message = messages[locale]
  const translate = (key: string, defaultMessage?: string, locale?: string) => {
    return (locale ? messages[locale][key] : message[key]) || defaultMessage
  }

  return (
    <I18nContext.Provider
      value={{
        messages,
        locale,
        setLocale,
        setMessages,
        loaded: !isEmpty(messages),
        translate,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
