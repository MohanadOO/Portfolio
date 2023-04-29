import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export function useHandleScroll() {
  const router = useRouter()
  const locale = router.locale
  const path = router.pathname

  const [openMenu, setOpenMenu] = useState(false)
  const [isScrollDown, setIsScrollDown] = useState(true)
  const [scrollPosition, setScrollPosition] = useState('')
  const [up, setUp] = useState(false)

  const lastScrollY = useRef(0)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  useEffect(() => {
    const article = document.getElementById('article_post')
    if (article) {
      setScrollPosition(article.dir === 'rtl' ? 'rtl' : 'ltr')
    } else {
      setScrollPosition(locale === 'ar' ? 'rtl' : 'ltr')
    }
  }, [locale, path])

  function handleScroll() {
    if (typeof window !== undefined) {
      if (window.scrollY > lastScrollY.current) {
        setIsScrollDown(false)
      } else {
        setIsScrollDown(true)
      }
      lastScrollY.current = window.scrollY
    }

    if (window.scrollY !== 0) {
      setOpenMenu(false)
    }

    if (window.scrollY >= 700) setUp(true)
    else setUp(false)
  }

  return {
    openMenu,
    setOpenMenu,
    isScrollDown,
    lastScrollY,
    up,
    scrollPosition,
  }
}
