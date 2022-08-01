import { useEffect } from 'react'
import { useI18n } from './i18n/Internationalization'

import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import AllProjects from './pages/AllProjects'
import Blog from './pages/Blog'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'

export default function App() {
  const { setMessages, loaded, setLocale } = useI18n()

  useEffect(() => {
    Promise.all([
      fetch('/i18n/ar-SA.json').then((x) => x.json()),
      fetch('/i18n/en-US.json').then((x) => x.json()),
    ]).then(([arSA, enUS]) => {
      setMessages({ 'ar-SA': arSA, 'en-US': enUS })
    })
  }, [setMessages])

  useEffect(() => {
    if (localStorage.getItem('language')) {
      const language = localStorage.getItem('language')
      if (language === 'ar-SA') {
        document.documentElement.dir = 'rtl'
        document.documentElement.lang = 'ar'
      }
      return setLocale(language)
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
      <div className='min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/projects' element={<AllProjects />} />
          {/* <Route path='/:projectID' element={<Project/>} */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
