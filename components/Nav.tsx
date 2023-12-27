import { HiCog, HiOutlineMenu, HiOutlineX, HiRss } from 'react-icons/hi'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import LanguageBtn from './LanguageBtn'
import ThemeBtn from './ThemeBtn'

import { Menu, Transition } from '@headlessui/react'
import { useHandleScroll } from '../hooks/useHandleScroll'
import { getURL } from '../utils/helpers'

export default function Nav() {
  const { openMenu, setOpenMenu, isScrollDown } = useHandleScroll()

  const router = useRouter()
  const pathname = router.pathname

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
      disabled: false,
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
        onClick={(e) =>
          item.disabled || pathname === item.URL
            ? e.preventDefault()
            : setOpenMenu(false)
        }
        className={`
                    py-3 px-2 sm:px-1 lg:px-3 xl:px-2 text-xs md:text-sm lg:text-base 
                    ${
                      pathname === item.URL
                        ? ' border-b-2 border-primary text-primary dark:text-foreground rounded-none cursor-default'
                        : item.disabled
                        ? 'cursor-default text-gray-400 line-through'
                        : 'ring-1 ring-transparent hover:ring-foreground dark:hover:ring-primary en:hover:shadow-left rtl:hover:shadow-right dark:hover:shadow-primary transition-all'
                    }
                  `}
        title={t(item.translate, '')}
      >
        <span>
          {t(item.translate, '')} {item.disabled ? '...' : ''}
        </span>
      </Link>
    </li>
  ))

  return (
    <header
      className={`${
        isScrollDown ? 'translate-y-0' : 'translate-y-[-100px]'
      } w-full fixed top-0 left-0 z-50 bg-background transition-transform duration-500 ease-out`}
    >
      <nav aria-label={locale === 'ar' ? language.ar.label : language.en.label}>
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md shadow-primary/10 dark:shadow-primary/20 py-6 px-8 transition-colors md:px-10 lg:px-20 xl:px-32 2xl:px-40'>
          <li className='font-pattaya ar:font-arefRuqaa font-normal first-letter:text-primary text-sm md:text-base hover:text-primary transition-colors duration-100 rtl:font-bold z-10'>
            <Link title={t('name', '')} href='/'>
              {t('name', '')}
            </Link>
          </li>
          <li className='absolute left-[50%] translate-x-[-50%]'>
            <ul className='flex items-center justify-center w-full gap-3 xl:gap-5'>
              {navigationItems}
            </ul>
          </li>
          <li>
            <ul className='flex items-center gap-4 relative'>
              {isScrollDown ? (
                <Menu>
                  <Menu.Button as='li'>
                    <button aria-label='Menu Button'>
                      <HiCog className='w-5 h-5 hover:rotate-45 transition-transform' />
                    </button>
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
                      className='flex flex-col gap-4 absolute top-8 ltr:-right-10 rtl:-left-10 bg-background dark:text-foreground shadow-lg  text-sm font-bold rounded-lg py-5 px-2 w-28'
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
                          href={`${getURL()}rss.xml`}
                          rel='noreferrer'
                          target='_blank'
                          aria-label='RSS Feed'
                          className='flex gap-2'
                        >
                          <HiRss className='w-4 h-4 md:w-5 md:h-5 fill-primary' />
                          <span>RSS</span>
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <li className='w-5 h-5'></li>
              )}
            </ul>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center justify-between sm:hidden gap-5 shadow-md rounded-md shadow-primary/10 py-5 px-10 relative z-20 bg-background dark:bg-foreground transition-colors'>
          <li className='font-pattaya ar:font-arefRuqaa font-normal rtl:font-bold first-letter:text-primary hover:text-primary transition-colors duration-300'>
            <Link href='/' title={t('name', '')}>
              {t('name', '')}
            </Link>
          </li>
          {!openMenu ? (
            <li onClick={() => setOpenMenu(true)} className='cursor-pointer'>
              <button
                aria-expanded={openMenu}
                aria-label={locale === 'ar' ? 'قائمة' : 'Menu'}
              >
                <HiOutlineMenu className='fill-primary dark:fill-background' />
              </button>
            </li>
          ) : (
            <li onClick={() => setOpenMenu(false)} className='cursor-pointer'>
              <button
                aria-expanded={openMenu}
                aria-label={locale === 'ar' ? 'قائمة' : 'Menu'}
              >
                <HiOutlineX className='fill-primary dark:fill-background' />
              </button>
            </li>
          )}

          {openMenu && (
            <ul className='absolute left-0 flex flex-col gap-10 text-center top-16 w-full p-6 bg-background dark:bg-foreground shadow-md z-20 transition-colors border-t border-primary/50'>
              {navigationItems}
              <ul className='flex flex-wrap justify-center items-center font-bold gap-5 border-t border-border pt-5'>
                <li>
                  <LanguageBtn locale={locale} language={language} />
                </li>
                <li>
                  <ThemeBtn locale={locale} />
                </li>
                <li className='opacity-70 hover:opacity-100 transition-opacity'>
                  <a
                    href={`${getURL()}rss.xml`}
                    rel='noreferrer'
                    target='_blank'
                    className='flex gap-2 items-center'
                    aria-label='RSS Feed'
                  >
                    <HiRss className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-primary dark:fill-background' />
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
