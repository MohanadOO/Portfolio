import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ErrorPage() {
  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className=' px-10 mx-auto min-h-screen flex flex-col md:flex-row items-center justify-around py-24 text-primary-400'
      aria-labelledby='error-page'
    >
      <div className='flex flex-col items-center gap-5 xl:gap-10 max-w-sm xl:max-w-md'>
        <h1
          id='error-page'
          className='text-3xl lg:text-4xl xl:text-5xl text-center md:text-left uppercase'
        >
          <span className='font-bold block mb-3 text-5xl lg:text-6xl xl:text-7xl'>
            500
          </span>
          Server Error
        </h1>
        <Link
          className='md:self-start md:rtl:self-end py-2 px-5 rounded-md border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors xl:text-lg'
          href='/'
        >
          Home Page
        </Link>
      </div>
      <div>
        <img
          className='max-w-xs xl:max-w-sm'
          src='/images/404.png'
          alt='Not Found Illustration'
        />
      </div>
    </motion.section>
  )
}
