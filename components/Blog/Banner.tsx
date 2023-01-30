import { useTranslation } from 'react-i18next'

export default function Banner() {
  const { t } = useTranslation('blog', { keyPrefix: 'banner' })
  return (
    <div className='flex flex-col lg:flex-row lg:space-x-5 justify-between px-10 py-5 mb-5'>
      <div>
        <h1 className='text-primary-400 text-lg'>{t('title')}</h1>
        <h2 className='text-3xl'>{t('welcome')}</h2>
      </div>
      <p className='mt-5 text-primary-gray  max-w-sm'>{t('desc')}</p>
    </div>
  )
}
