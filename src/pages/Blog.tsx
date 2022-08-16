import { motion } from 'framer-motion'
import { IoTimerOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Blog() {
  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      id='all-projects'
      className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10 mx-auto min-h-screen flex flex-col md:flex-row items-center justify-around py-24'
    >
      <div className='flex flex-col items-center gap-5 xl:gap-10 max-w-xs xl:max-w-md'>
        <h1 className='text-4xl lg:text-5xl xl:text-6xl text-center md:text-left text-primary-400'>
          Page is not available yet <IoTimerOutline className='inline' />
        </h1>
        <button className='md:self-start py-2 px-5 rounded-md border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors xl:text-lg font-pattaya'>
          <Link to='/'>Back to Home Page</Link>
        </button>
      </div>
      <div>
        <img
          className='max-w-xs xl:max-w-sm'
          src='/images/InProgress.png'
          alt='Not Found Illustration'
        />
      </div>
    </motion.section>
  )
}
