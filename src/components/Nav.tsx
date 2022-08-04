import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HiGlobeAlt, HiMoon, HiOutlineMenu, HiSun } from 'react-icons/hi'
import { useI18n } from '../i18n/Internationalization'
import { ROUTE_PATHS } from '../App'

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false)

  const { setLocale, locale, translate } = useI18n()
  const { name, home, projects, blog } = translate('navigation')

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

  return (
    <header>
      <nav className='w-full fixed top-0 z-50 bg-primary-white'>
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md rounded-md shadow-primary-400/10 py-6 px-10 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 lg:text-lg'>
          <li className='font-pattaya text-primary-400 text-base md:text-lg lg:text-xl'>
            <Link to={ROUTE_PATHS.Home}>{name}</Link>
          </li>
          <ul className='flex items-center gap-3'>
            <li className='ml-auto'>
              <NavLink
                to={ROUTE_PATHS.Home}
                className={({ isActive }) =>
                  'py-1 px-4 ' +
                  (isActive
                    ? 'rounded-md bg-primary-black text-primary-white'
                    : '')
                }
              >
                {home}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTE_PATHS.AllProjects}
                className={({ isActive }) =>
                  'py-1 px-4 ' +
                  (isActive
                    ? 'rounded-md bg-primary-black text-primary-white'
                    : '')
                }
              >
                {projects}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTE_PATHS.Blog}
                className={({ isActive }) =>
                  'py-1 px-4 ' +
                  (isActive
                    ? 'rounded-md bg-primary-black text-primary-white'
                    : '')
                }
              >
                {blog}
              </NavLink>
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
              <button className='flex items-center'>
                {/* <HiSun /> */}
                <HiMoon className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6' />
              </button>
            </li>
          </ul>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center justify-between sm:hidden gap-5 shadow-md rounded-md  shadow-primary-400/10 py-5 px-10 mx-5 relative'>
          <li className='font-pattaya text-primary-400'>
            <Link to={ROUTE_PATHS.Home}>{name}</Link>
          </li>
          <li
            onClick={() => setOpenMenu((prevState) => !prevState)}
            className='cursor-pointer'
          >
            <HiOutlineMenu className='fill-primary-400' />
          </li>

          {openMenu && (
            <ul className='absolute flex flex-col gap-5 text-center top-20 left-0 w-full p-6 bg-primary-white rounded-md shadow-md'>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  to={ROUTE_PATHS.Home}
                  className={({ isActive }) =>
                    'py-1 px-4 ' +
                    (isActive
                      ? 'rounded-md bg-primary-black text-primary-white'
                      : '')
                  }
                >
                  {home}
                </NavLink>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  to={ROUTE_PATHS.AllProjects}
                  className={({ isActive }) =>
                    'py-1 px-4 ' +
                    (isActive
                      ? 'rounded-md bg-primary-black text-primary-white'
                      : '')
                  }
                >
                  {projects}
                </NavLink>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  to={ROUTE_PATHS.Blog}
                  className={({ isActive }) =>
                    'py-1 px-4 ' +
                    (isActive
                      ? 'rounded-md bg-primary-black text-primary-white'
                      : '')
                  }
                >
                  {blog}
                </NavLink>
              </li>
              <ul className='flex justify-center items-center gap-5 border-t border-primary-gray pt-5'>
                <li>
                  <button
                    className='flex items-center gap-1'
                    onClick={toggleLanguage}
                  >
                    <HiGlobeAlt className='w-5 h-5' />
                    <span className='text-xs uppercase'>
                      {locale === 'en-US' ? 'AR' : 'EN'}
                    </span>
                  </button>
                </li>
                <li>
                  <button className='flex items-center'>
                    {/* <HiSun /> */}
                    <HiMoon className='w-5 h-5' />
                  </button>
                </li>
              </ul>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  )
}
