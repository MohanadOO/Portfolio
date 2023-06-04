import { useTranslation } from 'next-i18next'

export default function Banner() {
  const { t } = useTranslation('blog', { keyPrefix: 'banner' })
  return (
    <div className='flex flex-col items-center text-center lg:space-x-5 justify-between py-5 mb-5 max-w-[90rem] mx-auto'>
      <div>
        <h1 className='text-primary-purple dark:text-primary-purple-400 text-sm uppercase'>
          {t('title')}
        </h1>
        <h2 className='text-4xl md:text-5xl font-bold py-6'>{t('welcome')}</h2>
      </div>
      <p className='mt-5 text-primary-gray-500 dark:text-primary-gray-300 max-w-sm font-medium'>
        {t('desc')}
      </p>
    </div>
  )
}
