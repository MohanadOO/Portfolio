import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  HiGlobeAlt,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi'
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
      <nav className='w-full fixed top-0 z-50 bg-primary-white font-bold'>
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md rounded-md shadow-primary-400/10 py-6 px-10 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 lg:text-lg'>
          <li className='font-pattaya font-normal text-primary-400 text-base md:text-lg lg:text-xl'>
            <Link to={ROUTE_PATHS.Home}>{name}</Link>
          </li>
          <ul className='flex items-center gap-3'>
            <li className='ml-auto'>
              <NavLink
                to={ROUTE_PATHS.Home}
                title={home}
                className={({ isActive }) =>
                  'py-3 px-5 rounded-md ' +
                  (isActive
                    ? 'border-b-2 border-primary-400 text-primary-400 rounded-none cursor-default'
                    : 'ring-1 ring-transparent hover:ring-primary-black en:hover:shadow-[-5px_5px_0_#042A44] ar:hover:shadow-[5px_5px_0_#042A44] transition-all')
                }
              >
                {home}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={(e) => e.preventDefault()}
                to={ROUTE_PATHS.AllProjects}
                title={projects}
                className={({ isActive }) =>
                  'py-3 px-5 rounded-md cursor-default text-gray-400 line-through ' +
                  (isActive
                    ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                    : 'ring-0 ring-transparent hover:ring-primary-black transition-all')
                }
              >
                {projects}...
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={(e) => e.preventDefault()}
                to={ROUTE_PATHS.Blog}
                title={blog}
                className={({ isActive }) =>
                  'py-3 px-5 rounded-md cursor-default text-gray-400 line-through ' +
                  (isActive
                    ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                    : 'ring-0 ring-transparent hover:ring-primary-black transition-all')
                }
              >
                {blog}...
              </NavLink>
            </li>
          </ul>
          <ul className='flex items-center gap-4'>
            <li>
              <button
                className='flex items-center gap-1'
                onClick={toggleLanguage}
              >
                <HiGlobeAlt className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-primary-400' />
                <span className='text-xs uppercase text-primary-400'>
                  {locale === 'en-US' ? 'AR' : 'EN'}
                </span>
              </button>
            </li>
            <li>
              <button className='flex items-center'>
                {/* <HiOutlineSun /> */}
                <HiOutlineMoon className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 stroke-primary-400 hover:fill-primary-400' />
              </button>
            </li>
          </ul>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center justify-between sm:hidden gap-5 shadow-md rounded-md  shadow-primary-400/10 py-5 px-10 mx-5 relative'>
          <li className='font-pattaya text-primary-400'>
            <Link to={ROUTE_PATHS.Home} title={name}>
              {name}
            </Link>
          </li>
          <li
            onClick={() => setOpenMenu((prevState) => !prevState)}
            className='cursor-pointer'
          >
            <HiOutlineMenu className='fill-primary-400' />
          </li>

          {openMenu && (
            <ul className='absolute flex flex-col gap-10 text-center top-20 left-0 w-full p-6 bg-primary-white rounded-md shadow-md'>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  to={ROUTE_PATHS.Home}
                  title={home}
                  className={({ isActive }) =>
                    'py-3 px-5 rounded-md gap-3 ' +
                    (isActive
                      ? 'border-b-2 border-primary-400 text-primary-400 rounded-none cursor-default'
                      : 'ring-1 ring-transparent hover:ring-primary-black en:hover:shadow-[-5px_5px_0_#042A44] ar:hover:shadow-[5px_5px_0_#042A44] transition-all')
                  }
                >
                  {home}
                </NavLink>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  onClick={(e) => e.preventDefault()}
                  to={ROUTE_PATHS.AllProjects}
                  title={projects}
                  className={({ isActive }) =>
                    'py-3 px-5 rounded-md cursor-default text-gray-400 line-through ' +
                    (isActive
                      ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                      : 'ring-0 ring-transparent hover:ring-primary-black en#042A44] transition-all')
                  }
                >
                  {projects}...
                </NavLink>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  onClick={(e) => e.preventDefault()}
                  to={ROUTE_PATHS.Blog}
                  title={blog}
                  className={({ isActive }) =>
                    'py-3 px-5 rounded-md cursor-default text-gray-400 line-through ' +
                    (isActive
                      ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                      : 'ring-0 ring-transparent hover:ring-primary-black en#042A44] transition-all')
                  }
                >
                  {blog}...
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
                    {/* <HiOutlineSun /> */}
                    <HiOutlineMoon className='w-5 h-5' />
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
