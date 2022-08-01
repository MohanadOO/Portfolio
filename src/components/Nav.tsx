import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiGlobeAlt, HiMoon, HiOutlineMenu, HiSun } from 'react-icons/hi'
import { useI18n } from '../i18n/Internationalization'

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false)

  const { setLocale, locale, translate } = useI18n()

  function toggleLanguage() {
    if (locale === 'en-US') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
      localStorage.setItem('language', 'ar-SA')
      return setLocale('ar-SA')
    }
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
    localStorage.setItem('language', 'en-US')
    return setLocale('en-US')
  }

  const { name, home, projects, blog } = translate('navigation')

  return (
    <header>
      <nav className='w-full fixed top-0 z-50 bg-primary-white'>
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md rounded-md shadow-primary-400/10 py-6 px-10 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 lg:text-lg'>
          <li className='font-pattaya text-primary-400 text-base md:text-lg lg:text-xl'>
            <Link to='/'>{name}</Link>
          </li>
          <ul className='flex items-center gap-5'>
            <li className='ml-auto py-1 px-4 rounded-md bg-primary-black text-primary-white'>
              <a href='#about-me'>{home}</a>
            </li>
            <li>
              <a href='#skills'>{projects}</a>
            </li>
            <li>
              <a href='#projects'>{blog}</a>
            </li>
          </ul>
          <ul className='flex items-center gap-5'>
            <li className='w-[0.10rem] h-7 bg-primary-400 rounded-lg ml-auto'></li>
            <li>
              <button
                className='flex items-center gap-1'
                onClick={toggleLanguage}
              >
                <HiGlobeAlt className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
                <span className='text-xs uppercase'>
                  {locale === 'en-US' ? 'AR' : 'EN'}
                </span>
              </button>
            </li>
            <li>
              <a href='#'>
                {/* <HiSun /> */}
                <HiMoon className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
              </a>
            </li>
          </ul>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center sm:hidden gap-5 shadow-md rounded-md  shadow-primary-400/10 py-5 px-10 mx-5 relative'>
          <li className='font-pattaya text-primary-400'>
            <Link to='/'>Mohanad Alrwaihy</Link>
          </li>
          <li
            onClick={() => setOpenMenu((prevState) => !prevState)}
            className='ml-auto cursor-pointer'
          >
            <HiOutlineMenu className='fill-primary-400' />
          </li>
          {openMenu && (
            <ul className='absolute flex flex-col gap-5 text-center top-20 left-0 w-full p-6 bg-primary-white rounded-md shadow-md'>
              <li onClick={() => setOpenMenu(false)}>
                <a href='#about-me'>About Me</a>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <a href='#skills'>Skills</a>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <a href='#projects'>My Work</a>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  )
}
