import { useScroll, motion } from 'framer-motion'
import { usePost } from '../hooks/usePost'

export default function ProgressBar() {
  const {isScrollDown} = usePost()
  
  const { scrollYProgress } = useScroll()
  return (
    <div
      className={`${
        isScrollDown ? 'top-16 sm:top-[4.5rem]' : 'top-0'
      } transition-[top] bg-neutral-200 dark:bg-neutral-800 duration-500 ease-out fixed top-0 left-0 right-0 h-2 z-40 origin-left rtl:origin-right rounded-sm`}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className={`${
          isScrollDown ? 'top-16 sm:top-[4.5rem]' : 'top-0'
        } transition-[top] duration-500 ease-out fixed top-0 left-0 right-0 origin-left rtl:origin-right h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-sm`}
      ></motion.div>
    </div>
  )
}
