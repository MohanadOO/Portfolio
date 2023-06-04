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
      className='flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
      title={locale === 'ar' ? language.en.title : language.ar.title}
    >
      <HiGlobeAlt className='w-4 h-4 md:w-5 md:h-5 fill-primary-purple' />
      <span>{locale === 'ar' ? language.en.title : language.ar.title}</span>
    </Link>
  )
}
