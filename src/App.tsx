import { useEffect } from 'react'
import { useI18n } from './i18n/Internationalization'

import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'

import ar from './i18n/ar-SA.json'
import en from './i18n/en-US.json'

export const ROUTE_PATHS = {
  Home: '/',
  AllProjects: '/projects',
  Blog: '/blog',
  ProjectDetails: '/projects/:id',
}

export const GOTO = {
  ProjectDetails: (id: string) => `/projects/${id}`,
}

export default function App() {
  const { setMessages, loaded, setLocale } = useI18n()

  useEffect(() => {
    setMessages({ 'ar-SA': ar, 'en-US': en })
  }, [setMessages])

  useEffect(() => {
    if (localStorage.getItem('language')) {
      const language = localStorage.getItem('language')
      if (language === 'ar-SA') {
        document.documentElement.dir = 'rtl'
        document.documentElement.lang = 'ar'
        return setLocale(language)
      }
      return setLocale('en-US')
    }
    const userLanguage = navigator.language.split('-')[0]
    if (userLanguage === 'ar') {
      localStorage.setItem('language', 'ar-SA')
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
      return setLocale('ar-SA')
    } else {
      localStorage.setItem('language', 'en-US')
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
      return setLocale('en-US')
    }
  }, [])

  if (!loaded) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Nav />
      <div className='min-h-screen relative'>
        <Home/>
        <Footer />
      </div>
    </>
  )
}
