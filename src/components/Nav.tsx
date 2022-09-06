import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  HiGlobeAlt,
  HiOutlineMenu,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi'
import { ROUTE_PATHS } from '../App'

import { useTranslation } from 'react-i18next'

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false)

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'navigation' })

  const currentLanguage = i18n.resolvedLanguage
  document.documentElement.dir = i18n.dir()
  document.documentElement.lang = currentLanguage
  document.title =
    currentLanguage === 'ar' ? 'مهند الرويحي' : 'Mohanad Alrwaihy'

  function toggleLanguage() {
    return currentLanguage === 'en'
      ? i18n.changeLanguage('ar')
      : i18n.changeLanguage('en')
  }

  return (
    <header>
      <nav
        aria-label={
          currentLanguage === 'ar' ? 'الأرشادات الرئيسية' : 'Primary Navigation'
        }
        className='w-full fixed top-0 z-50 bg-primary-white font-bold'
      >
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md rounded-md shadow-primary-400/10 py-6 px-10 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 lg:text-lg'>
          <li className='font-pattaya font-normal first-letter:text-primary-400 text-sm first-letter:text-xl md:text-base first-letter:md:text-2xl lg:text-lg first-letter:lg:text-3xl hover:text-primary-400 transition-colors duration-300 ar:font-bold'>
            <Link to={ROUTE_PATHS.Home}>{t('name')}</Link>
          </li>
          <ul className='flex items-center gap-3 xl:gap-6'>
            <li className='ml-auto'>
              <NavLink
                to={ROUTE_PATHS.Home}
                title={t('home')}
                className={({ isActive }) =>
                  'py-3 px-2 md:px-2 lg:px-5 xl:px-6 text-sm md:text-base rounded-md ' +
                  (isActive
                    ? 'border-b-2 border-primary-400 text-primary-400 rounded-none cursor-default'
                    : 'ring-1 ring-transparent hover:ring-primary-black en:hover:shadow-[-5px_5px_0_#042A44] ar:hover:shadow-[5px_5px_0_#042A44] transition-all')
                }
              >
                {t('home')}
              </NavLink>
            </li>
            <li>
              <a
                href='https://www.cakeresume.com/s--xFe5zn7_6pbOn71eYKrAOw--/mohanad-alrwaihy'
                target='_blank'
                title={t('resume')}
                className='py-3 px-2 md:px-2 lg:px-5 xl:px-6 text-sm md:text-base rounded-md gap-3 ring-1 ring-transparent hover:ring-primary-black en:hover:shadow-[-5px_5px_0_#042A44] ar:hover:shadow-[5px_5px_0_#042A44] transition-all'
              >
                {t('resume')}
              </a>
            </li>
            <li>
              <NavLink
                onClick={(e) => e.preventDefault()}
                to={ROUTE_PATHS.AllProjects}
                title={t('projects')}
                aria-disabled='true'
                className={({ isActive }) =>
                  'py-3 px-2 md:px-2 lg:px-5 xl:px-6 text-sm md:text-base rounded-md cursor-default text-gray-400 line-through ' +
                  (isActive
                    ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                    : 'ring-0 ring-transparent hover:ring-primary-black transition-all')
                }
              >
                <>{t('projects')}...</>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={(e) => e.preventDefault()}
                to={ROUTE_PATHS.Blog}
                title={t('blog')}
                aria-disabled='true'
                className={({ isActive }) =>
                  'py-3 px-2 md:px-2 lg:px-5 xl:px-6 text-sm md:text-base rounded-md cursor-default text-gray-400 line-through ' +
                  (isActive
                    ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                    : 'ring-0 ring-transparent hover:ring-primary-black transition-all')
                }
              >
                <>{t('blog')}...</>
              </NavLink>
            </li>
          </ul>
          <ul className='flex items-center gap-5'>
            <li>
              <button
                className='flex items-center gap-1'
                onClick={toggleLanguage}
                aria-label={
                  currentLanguage === 'ar'
                    ? 'تغيير اللغة للأنجليزية'
                    : 'Change Language Arabic'
                }
              >
                <HiGlobeAlt className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6  fill-primary-400' />
                <span className='text-xs text-primary-400'>
                  {currentLanguage === 'en' ? 'عربي' : 'English'}
                </span>
              </button>
            </li>
            <li>
              <button
                aria-label={
                  currentLanguage === 'ar'
                    ? `حول الثيم ال ${'المظلم'}`
                    : `Change to ${'dark'} mood`
                }
                className='flex items-center'
              >
                {/* <HiOutlineSun /> */}
                <HiOutlineMoon className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 stroke-primary-400 hover:fill-primary-400' />
              </button>
            </li>
          </ul>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center justify-between sm:hidden gap-5 shadow-md rounded-md  shadow-primary-400/10 py-5 px-10 mx-5 relative'>
          <li className='font-pattaya font-normal first-letter:text-primary-400 first-letter:text-2xl hover:text-primary-400 transition-colors duration-300 ar:font-bold'>
            <Link to={ROUTE_PATHS.Home} title={t('name')}>
              {t('name')}
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
                  title={t('home')}
                  className={({ isActive }) =>
                    'py-3 px-5 rounded-md gap-3 ' +
                    (isActive
                      ? 'border-b-2 border-primary-400 text-primary-400 rounded-none cursor-default'
                      : 'ring-1 ring-transparent hover:ring-primary-black en:hover:shadow-[-5px_5px_0_#042A44] ar:hover:shadow-[5px_5px_0_#042A44] transition-all')
                  }
                >
                  {t('home')}
                </NavLink>
              </li>
              <li>
                <a
                  href='https://www.cakeresume.com/s--xFe5zn7_6pbOn71eYKrAOw--/mohanad-alrwaihy'
                  target='_blank'
                  title={t('resume')}
                  className='py-3 px-5 rounded-md gap-3 ring-1 ring-transparent hover:ring-primary-black en:hover:shadow-[-5px_5px_0_#042A44] ar:hover:shadow-[5px_5px_0_#042A44] transition-all'
                >
                  {t('resume')}
                </a>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  onClick={(e) => e.preventDefault()}
                  to={ROUTE_PATHS.AllProjects}
                  title={t('projects')}
                  aria-disabled='true'
                  className={({ isActive }) =>
                    'py-3 px-5 rounded-md cursor-default text-gray-400 line-through ' +
                    (isActive
                      ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                      : 'ring-0 ring-transparent hover:ring-primary-black en#042A44] transition-all')
                  }
                >
                  <>{t('projects')}...</>
                </NavLink>
              </li>
              <li onClick={() => setOpenMenu(false)}>
                <NavLink
                  onClick={(e) => e.preventDefault()}
                  to={ROUTE_PATHS.Blog}
                  title={t('blog')}
                  aria-disabled='true'
                  className={({ isActive }) =>
                    'py-3 px-5 rounded-md cursor-default text-gray-400 line-through ' +
                    (isActive
                      ? 'border-b-0 border-primary-400 text-primary-400 rounded-none cursor-default'
                      : 'ring-0 ring-transparent hover:ring-primary-black en#042A44] transition-all')
                  }
                >
                  <>{t('blog')}...</>
                </NavLink>
              </li>
              <ul className='flex justify-center items-center gap-5 border-t border-primary-gray pt-5'>
                <li>
                  <button
                    className='flex items-center gap-1'
                    onClick={toggleLanguage}
                    aria-label={
                      currentLanguage === 'ar'
                        ? 'تغير اللغة'
                        : 'Change Language'
                    }
                  >
                    <HiGlobeAlt className='w-5 h-5' />
                    <span className='text-xs uppercase'>
                      {currentLanguage === 'en' ? 'عربي' : 'English'}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    aria-label={
                      currentLanguage === 'ar'
                        ? `حول الثيم ال ${'المظلم'}`
                        : `Change to ${'dark'} mood`
                    }
                    className='flex items-center'
                  >
                    {/* <HiOutlineSun /> */}
                    {/* <HiOutlineMoon className='w-5 h-5' /> */}
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
