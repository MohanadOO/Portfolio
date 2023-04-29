import Nav from './Nav'
import Footer from './Footer'
import { HiChevronUp, HiOutlineEye } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Aref_Ruqaa, Cairo, Lato, Pattaya } from '@next/font/google'
import { useEffect, useState } from 'react'
import { useHandleScroll } from '../hooks/useHandleScroll'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  fallback: ['Lato'],
  adjustFontFallback: false,
  weight: ['400', '600', '700', '900'],
})
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  fallback: ['Cairo'],
  adjustFontFallback: false,
  variable: '--font-lato',
})

const pattaya = Pattaya({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pattaya',
})

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-arefRuqaa',
})

export default function Layout({ children }) {
  const router = useRouter()
  const isPreview = router.isPreview

  const { up } = useHandleScroll()
  const [scrollPosition, setScrollPosition] = useState('')
  useEffect(() => {
    const article = document.getElementById('article_post').dir
    setScrollPosition(article === 'rtl' ? 'rtl' : 'ltr')
  }, [])

  return (
    <main
      className={`min-h-screen relative flex flex-col ${lato.variable} ${cairo.variable} ${pattaya.variable} ${arefRuqaa.variable} en:font-lato ar:font-cairo`}
    >
      <Nav />
      <button
        onClick={() => window.scrollTo(0, 0)}
        className={`${up || scrollPosition === '' ? 'fixed' : 'hidden'} ${
          scrollPosition === 'rtl' ? 'left-[5%]' : 'right-[5%]'
        }   bottom-12 w-8 h-8 md:w-10 md:h-10 text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 border dark:border-white/10 shadow-lg rounded-full group z-50`}
      >
        <HiChevronUp className='mx-auto w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform' />
      </button>
      <div className=' md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-4 sm:px-10'>
        {children}
      </div>
      <Footer />
      {isPreview && (
        <Link
          className='bg-red-600 hover:bg-red-700 text-white text-center py-4 px-4 fixed bottom-0 left-0 z-50 flex items-center justify-center gap-2'
          href='/api/exit-preview'
        >
          <HiOutlineEye className='w-5 h-5' />
          Exit Preview
        </Link>
      )}
    </main>
  )
}
