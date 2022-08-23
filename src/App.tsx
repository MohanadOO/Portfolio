import { useEffect } from 'react'
import { useI18n } from './i18n/Internationalization'

import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'

import ar from './i18n/ar-SA.json'
import en from './i18n/en-US.json'


export default function App() {
  const { setMessages, loaded, setLocale } = useI18n()

  useEffect(() => {
    setMessages({ 'ar-SA': ar, 'en-US': en })
  }, [setMessages])


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
