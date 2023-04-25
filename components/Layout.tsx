import Nav from './Nav'
import Footer from './Footer'
import { HiChevronUp, HiOutlineEye } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Layout({ children }) {
  const isPreview = useRouter().isPreview
  return (
    <div className='min-h-screen relative flex flex-col'>
      <Nav />
      <button
        onClick={() => window.scrollTo(0, 0)}
        className='fixed ltr:right-10 rtl:left-10 bottom-12 w-10 h-10 text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 border border-black/30 dark:border-white/30 shadow-lg rounded-full group z-50'
      >
        <HiChevronUp className='mx-auto w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform' />
      </button>
      <div className=' md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-4 sm:px-10'>
        {children}
      </div>
      <Footer />
      {isPreview && (
        <Link
          className='bg-red-600 hover:bg-red-700 text-white text-center py-4 px-4 fixed bottom-0 left-0 z-50 flex items-center justify-center gap-2 font-sriracha'
          href='/api/exit-preview'
        >
          <HiOutlineEye className='w-5 h-5' />
          Exit Preview
        </Link>
      )}
    </div>
  )
}
