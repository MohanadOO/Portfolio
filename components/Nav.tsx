import { useState } from 'react'

import { HiCog, HiOutlineMenu, HiOutlineX, HiRss } from 'react-icons/hi'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'react-i18next'

import LanguageBtn from './LanguageBtn'
import ThemeBtn from './ThemeBtn'

import { Menu, Transition } from '@headlessui/react'

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false)

  const router = useRouter()
  const locale = router.locale
  const { t } = useTranslation('common', { keyPrefix: 'navigation' })

  let language = {
    ar: {
      title: 'عربي',
      change: 'تغيير اللغة للأنجليزية',
      label: 'الأرشادات الرئيسية',
    },
    en: {
      title: 'English',
      change: 'Change to Arabic',
      label: 'Primary Navigation',
    },
  }

  let navigation = [
    { title: 'Home', translate: 'home', URL: '/', disabled: false },
    { title: 'Blog', translate: 'blog', URL: '/blog', disabled: false },
    {
      title: 'Projects',
      translate: 'projects',
      URL: '/projects',
      disabled: true,
    },
    { title: 'About', translate: 'about', URL: '/about', disabled: false },
    { title: 'Skills', translate: 'skills', URL: '/skills', disabled: false },
    {
      title: 'Certification',
      translate: 'certification',
      URL: '/certification',
      disabled: false,
    },
  ]

  const navigationItems = navigation.map((item) => (
    <li key={item.title}>
      <Link
        href={item.URL}
        aria-disabled={item.disabled}
        onClick={(e) => (item.disabled ? e.preventDefault() : '')}
        className={`
                    py-3 px-2 sm:px-1 lg:px-3 xl:px-2 text-xs md:text-sm lg:text-base rounded-md font-bold rtl:font-semibold
                    ${
                      router.pathname == item.URL
                        ? ' border-b-2 border-primary-400 text-primary-400 dark:text-primary-white rounded-none cursor-default'
                        : item.disabled
                        ? 'cursor-default text-gray-400 line-through'
                        : 'ring-1 ring-transparent hover:ring-primary-black dark:hover:ring-primary-400 en:hover:shadow-left rtl:hover:shadow-right dark:hover:shadow-primary-400 transition-all'
                    }
                  `}
        title={t(item.translate)}
        target={item.title === 'Resume' ? '_blank' : '_parent'}
      >
        {t(item.translate)} {item.disabled ? '...' : ''}
      </Link>
    </li>
  ))

  return (
    <header>
      <nav
        aria-label={locale === 'ar' ? language.ar.label : language.en.label}
        className='w-full fixed top-0 left-0 z-50 bg-primary-white dark:bg-primary-dark md:px-10 lg:px-20 xl:px-32 2xl:px-40'
      >
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md rounded-md shadow-primary-400/10 dark:shadow-primary-400/50 py-6 px-8  transition-colors text-primary-dark dark:text-primary-white'>
          <li className='font-pattaya font-normal first-letter:text-primary-400 text-sm md:text-base hover:text-primary-400 transition-colors duration-100 rtl:font-bold'>
            <Link title={t('name')} href='/'>
              {t('name')}
            </Link>
          </li>
          <ul className='flex items-center gap-3 xl:gap-5'>
            {navigationItems}
          </ul>
          <ul className='flex items-center gap-4 relative'>
            <Menu>
              <Menu.Button>
                <HiCog className='w-5 h-5 hover:rotate-45 transition-transform' />
              </Menu.Button>
              <Transition
                className='absolute'
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Menu.Items
                  as='ul'
                  className='flex flex-col gap-4 absolute top-8 ltr:-right-10 rtl:-left-10 bg-primary-white dark:text-primary-dark shadow-lg border border-primary text-sm font-bold rounded-lg py-5 px-2 w-28'
                >
                  <Menu.Item as='li'>
                    <LanguageBtn locale={locale} language={language} />
                  </Menu.Item>
                  <Menu.Item as='li'>
                    <ThemeBtn locale={locale} />
                  </Menu.Item>
                  <Menu.Item
                    as='li'
                    className='opacity-70 hover:opacity-100 transition-opacity'
                  >
                    <a
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/rss/rss.xml`}
                      rel='noreferrer'
                      target='_blank'
                      aria-label='RSS Feed'
                      className='flex gap-2'
                    >
                      <HiRss className='w-4 h-4 md:w-5 md:h-5 fill-primary-400' />
                      <span>RSS</span>
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </ul>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center justify-between sm:hidden gap-5 shadow-md rounded-md shadow-primary-400/10 py-5 px-10 relative z-20 bg-primary-white dark:bg-primary-dark transition-colors'>
          <li className='font-pattaya font-normal rtl:font-bold first-letter:text-primary-400 hover:text-primary-400 transition-colors duration-300'>
            <Link href='/' title={t('name')}>
              {t('name')}
            </Link>
          </li>
          {!openMenu ? (
            <li onClick={() => setOpenMenu(true)} className='cursor-pointer'>
              <button
                aria-expanded={openMenu}
                aria-label={locale === 'ar' ? 'قائمة' : 'Menu'}
              >
                <HiOutlineMenu className='fill-primary-400 dark:fill-primary-white' />
              </button>
            </li>
          ) : (
            <li onClick={() => setOpenMenu(false)} className='cursor-pointer'>
              <button
                aria-expanded={openMenu}
                aria-label={locale === 'ar' ? 'قائمة' : 'Menu'}
              >
                <HiOutlineX className='fill-primary-400 dark:fill-primary-white' />
              </button>
            </li>
          )}

          {openMenu && (
            <ul className='absolute left-0 flex flex-col gap-10 text-center top-16 w-full p-6 bg-primary-white dark:bg-primary-dark shadow-md z-20 transition-colors border-t border-primary-400/50'>
              {navigationItems}
              <ul className='flex flex-wrap justify-center items-center font-bold gap-5 border-t border-primary-gray pt-5'>
                <li>
                  <LanguageBtn locale={locale} language={language} />
                </li>
                <li>
                  <ThemeBtn locale={locale} />
                </li>
                <li className='opacity-70 hover:opacity-100 transition-opacity'>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/rss/rss.xml`}
                    rel='noreferrer'
                    target='_blank'
                    className='flex gap-2 items-center'
                    aria-label='RSS Feed'
                  >
                    <HiRss className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-primary-400 dark:fill-primary-white' />
                    <span>RSS</span>
                  </a>
                </li>
              </ul>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  )
}
