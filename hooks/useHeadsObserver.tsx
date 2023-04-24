import { useEffect, useState, useRef } from 'react'

export function useHeadsObserver() {
  const observer = useRef<IntersectionObserver>()
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-0% 0% -80% 0px',
    })

    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4'))

    elements.forEach((elem) => observer.current.observe(elem))
    return () => observer.current?.disconnect()
  }, [])

  return { activeId }
}
