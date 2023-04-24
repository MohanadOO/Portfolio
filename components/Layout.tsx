import Nav from './Nav'
import Footer from './Footer'
import { HiChevronUp } from 'react-icons/hi'

export default function Layout({ children }) {
  return (
    <div className='min-h-screen relative flex flex-col'>
      <Nav />
      <button
        onClick={() => window.scrollTo(0, 0)}
        className='fixed ltr:right-10 rtl:left-10 bottom-12 w-12 h-12 text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 border border-black/30 dark:border-white/30 shadow-lg rounded-full group z-50'
      >
        <HiChevronUp className='mx-auto w-10 h-10 group-hover:scale-110 transition-transform' />
      </button>
      <div className=' md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-4 sm:px-10'>
        {children}
      </div>
      <Footer />
    </div>
  )
}
