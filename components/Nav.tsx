import { useState } from 'react'

import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'react-i18next'

import LanguageBtn from './LanguageBtn'
import ThemeBtn from './ThemeBtn'

import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

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
    {
      title: 'Resume',
      translate: 'resume',
      URL: 'https://www.cakeresume.com/s--xFe5zn7_6pbOn71eYKrAOw--/mohanad-alrwaihy',
      disabled: false,
    },
    {
      title: 'Projects',
      translate: 'projects',
      URL: '/projects',
      disabled: true,
    },
    { title: 'Blog', translate: 'blog', URL: '/blog', disabled: true },
  ]

  const navigationItems = navigation.map((item) => (
    <li key={item.title}>
      <Link
        href={item.URL}
        aria-disabled={item.disabled}
        onClick={(e) => (item.disabled ? e.preventDefault() : '')}
        className={`
                    py-3 px-5 sm:px-2 lg:px-5 xl:px-6 text-sm md:text-base rounded-md font-bold ar:font-semibold
                    ${
                      router.pathname == item.URL
                        ? ' border-b-2 border-primary-400 text-primary-400 dark:text-primary-white rounded-none cursor-default'
                        : item.disabled
                        ? 'cursor-default text-gray-400 line-through'
                        : 'ring-1 ring-transparent hover:ring-primary-black dark:hover:ring-primary-400 en:hover:shadow-left ar:hover:shadow-right dark:hover:shadow-primary-400 transition-all'
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
        className='w-full fixed top-0 left-0 z-50 bg-primary-white dark:bg-slate-900'
      >
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center justify-between gap-5 shadow-md rounded-md shadow-primary-400/10 dark:shadow-primary-400/50 py-6 px-10 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 lg:text-lg'>
          <li className='font-pattaya font-normal first-letter:text-primary-400 text-sm md:text-base lg:text-lg  hover:text-primary-400 transition-colors duration-300 ar:font-bold'>
            <Link title={t('name')} href='/'>
              {t('name')}
            </Link>
          </li>
          <ul className='flex items-center gap-3 xl:gap-6'>
            {navigationItems}
          </ul>
          <ul className='flex items-center gap-5'>
            <li>
              <LanguageBtn locale={locale} language={language} />
            </li>
            <li>
              <ThemeBtn locale={locale} />
            </li>
          </ul>
        </ul>

        {/* Mobile Navigation */}
        <ul className='flex items-center justify-between sm:hidden gap-5 shadow-md rounded-md shadow-primary-400/10 py-5 px-10  relative z-20 bg-primary-white dark:bg-slate-900 transition-colors'>
          <li className='font-pattaya font-normal ar:font-bold first-letter:text-primary-400 hover:text-primary-400 transition-colors duration-300'>
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
            <ul className='absolute left-0 flex flex-col gap-10 text-center top-16 w-full p-6 bg-primary-white dark:bg-slate-900 shadow-md z-20 transition-colors border-t border-primary-400/50'>
              {navigationItems}
              <ul className='flex justify-center items-center gap-5 border-t border-primary-gray pt-5'>
                <li>
                  <LanguageBtn locale={locale} language={language} />
                </li>
                <li>
                  <ThemeBtn locale={locale} />
                </li>
              </ul>
            </ul>
          )}
        </ul>
      </nav>
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className='fixed sm:hidden inset-0 bg-black opacity-50 z-30'
        />
      )}
    </header>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
    },
  }
}
