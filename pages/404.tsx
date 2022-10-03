import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ErrorPage() {
  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10 mx-auto min-h-screen flex flex-col md:flex-row items-center justify-around py-24 text-red-500'
      aria-labelledby='error-page'
    >
      <div className='flex flex-col items-center gap-5 xl:gap-10 max-w-sm xl:max-w-md'>
        <h1
          id='error-page'
          className='text-4xl lg:text-5xl xl:text-6xl text-center md:text-left'
        >
          404 Page Not Found
        </h1>
        <Link
          className='md:self-start md:ar:self-end py-2 px-5 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-white transition-colors xl:text-lg font-pattaya'
          href='/'
        >
          Back to Home Page
        </Link>
      </div>
      <div>
        <img
          className='max-w-xs xl:max-w-sm -red-500'
          src='/images/404.png'
          alt='Not Found Illustration'
        />
      </div>
    </motion.section>
  )
}
