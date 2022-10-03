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
  }, [])

  if (!mounted) return null

  let currentTheme = {
    dark: {
      title: 'Dark Mood',
      titleAR: 'الوضع الليلي',
    },
    light: {
      title: 'Light Mood',
      titleAR: 'وضع النهار',
    },
  }

  return (
    <button
      onClick={changeTheme}
      title={
        locale === 'ar'
          ? theme === 'dark'
            ? currentTheme.light.titleAR
            : currentTheme.dark.titleAR
          : theme === 'dark'
          ? currentTheme.light.title
          : currentTheme.dark.title
      }
      aria-label={
        locale === 'ar'
          ? `${
              theme === 'dark'
                ? currentTheme.light.titleAR
                : currentTheme.dark.titleAR
            }`
          : `${
              theme === 'dark'
                ? currentTheme.light.title
                : currentTheme.dark.title
            }`
      }
      className='flex items-center'
    >
      {theme === 'dark' ? (
        <HiOutlineSun className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 stroke-primary-400 hover:fill-primary-400 dark:stroke-primary-white dark:fill-primary-white' />
      ) : (
        <HiOutlineMoon className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 stroke-primary-400 hover:fill-primary-400 dark:stroke-primary-white dark:fill-primary-white' />
      )}
    </button>
  )
}
