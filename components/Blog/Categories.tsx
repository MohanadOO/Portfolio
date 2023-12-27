import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import { BASE_CATEGORIES } from '../../sanity/queries/blog'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, motion } from 'framer-motion'

export type Category = {
  title: string
  _id: string
}

export default function Categories({ categories }: { categories: Category[] }) {
  const reduce = useReducedMotion()
  const [showArrows, setShowArrows] = useState(false)
  const { t } = useTranslation('blog', { keyPrefix: 'categories' })

  const ulRef = useRef<HTMLUListElement | null>(null)
  const router = useRouter()
  let { category } = router.query

  category = category || 'View All'
  categories = [...BASE_CATEGORIES, ...categories]

  function handleScroll(val: number) {
    if (ulRef.current) {
      ulRef.current.scrollLeft = ulRef.current.scrollLeft + val
    }
  }

  function handleResize() {
    if (ulRef.current) {
      if (ulRef.current.scrollWidth > ulRef.current.clientWidth + 10) {
        return setShowArrows(true)
      }

      return setShowArrows(false)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className='flex justify-center w-full my-5 text-sm md:text-base lg:text-lg relative px-2 md:px-6'>
      {showArrows && (
        <button
          title='Scroll Left'
          onClick={() => handleScroll(-100)}
          className='bg-black/60 dark:bg-white/40 p-1 absolute left-0 top-[50%] translate-y-[-50%] rounded-full'
        >
          <HiArrowLeft className='md:w-5 md:h-5 fill-white' />
        </button>
      )}
      <motion.ul
        variants={variant(reduce)}
        initial='initial'
        animate='animate'
        ref={ulRef}
        className='flex py-5 mx-4 items-center overflow-x-auto scrollbar-none relative'
      >
        {categories.map(({ _id, title }, index) => (
          <motion.li variants={child(reduce)} key={_id}>
            <button
              onClick={() => {
                router.query.category = title
                router.query.page = '1'
                router.push(router, undefined, {
                  shallow: true,
                })
              }}
              // shallow={true}
              className={`${
                category === title
                  ? 'border-b-black dark:border-b-white text-black dark:text-white cursor-auto'
                  : 'border-b-gray-400 text-primary-gray-500 dark:text-primary-gray-400 hover:border-b-black hover:text-black hover:dark:text-white hover:dark:border-b-white'
              } whitespace-nowrap px-3 py-2 font-bold border-b-2`}
            >
              {index < BASE_CATEGORIES.length ? t(_id) : title}
            </button>
          </motion.li>
        ))}
      </motion.ul>
      {showArrows && (
        <button
          title='Scroll Right'
          onClick={() => handleScroll(100)}
          className='bg-black/60 dark:bg-white/40 p-1 absolute right-0 top-[50%] translate-y-[-50%] rounded-full'
        >
          <HiArrowRight className='md:w-5 md:h-5 fill-white' />
        </button>
      )}
    </nav>
  )
}

const variant = (reduce: boolean) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
})

const child = (reduce: boolean) => ({
  initial: { scale: 0, y: '50%' },
  animate: { scale: 1, y: 0, transition: { type: 'spring' } },
})
