import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiGlobeAlt } from 'react-icons/hi'

export default function LanguageBtn({ locale, language }) {
  const router = useRouter()
  return (
    <Link
      href={router.asPath}
      locale={locale === 'en' ? 'ar' : 'en'}
      aria-label={locale === 'ar' ? language.en.change : language.ar.change}
    >
      <a
        className='flex items-center gap-1'
        title={locale === 'ar' ? language.en.title : language.ar.title}
      >
        <HiGlobeAlt className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-primary-400 dark:fill-primary-white' />
        <span className='text-xs text-primary-400 dark:text-primary-white'>
          {locale === 'en' ? language.ar.title : language.en.title}
        </span>
      </a>
    </Link>
  )
}
