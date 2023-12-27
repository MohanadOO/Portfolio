import { useReducedMotion, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

export default function Banner() {
  const reduce = useReducedMotion()

  const { t } = useTranslation('blog', { keyPrefix: 'banner' })
  return (
    <motion.div
      variants={variant(reduce)}
      initial='initial'
      animate='animate'
      className='flex flex-col items-center text-center lg:space-x-5 justify-between py-5 mb-5 max-w-[90rem] mx-auto w-full overflow-hidden'
    >
      <motion.div variants={child(reduce)}>
        <h1 className='text-primary text-sm uppercase'>{t('title')}</h1>
        <h2 className='text-4xl md:text-5xl font-bold py-6'>{t('welcome')}</h2>
      </motion.div>
      <motion.p
        variants={child(reduce)}
        className='mt-5 text-gray-500 dark:text-gray-300 max-w-sm font-medium'
      >
        {t('desc')}
      </motion.p>
    </motion.div>
  )
}

const variant = (reduce: boolean) => ({
  initial: { opacity: 0, x: '-20%' },
  animate: {
    opacity: 1,
    x: '0',
    transition: { delayChildren: 0.1, staggerChildren: 0.2, duration: 0.3 },
  },
})

const child = (reduce: boolean) => ({
  initial: { scale: 0, x: '100%' },
  animate: { scale: 1, x: 0 },
})
