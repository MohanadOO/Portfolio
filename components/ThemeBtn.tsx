import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

export default function ThemeBtn({ locale }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  function changeTheme() {
    if (theme === 'dark') return setTheme('light')
    return setTheme('dark')
  }

  useEffect(() => {
    setMounted(true)
    if (theme === 'system') {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(dark ? 'dark' : 'light')
    }
  }, [])

  if (!mounted) return null

  let currentTheme = {
    dark: {
      title: 'Dark',
      titleAR: 'وضع الليل',
    },
    light: {
      title: 'Light',
      titleAR: 'وضع النهار',
    },
  }

  const title =
    locale === 'ar'
      ? theme === 'dark'
        ? currentTheme.light.titleAR
        : currentTheme.dark.titleAR
      : theme === 'dark'
      ? currentTheme.light.title
      : currentTheme.dark.title

  return (
    <button
      onClick={changeTheme}
      title={title}
      aria-label={title}
      className='flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity group'
    >
      {theme === 'dark' ? (
        <HiOutlineSun className='w-4 h-4 md:w-5 md:h-5 stroke-primary-purple group-hover:fill-primary-purple' />
      ) : (
        <HiOutlineMoon className='w-4 h-4 md:w-5 md:h-5 stroke-primary-purple group-hover:fill-primary-purple' />
      )}
      <span>{title}</span>
    </button>
  )
}
