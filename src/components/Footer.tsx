import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' })
  return (
    <footer className='absolute bottom-0 p-3 bg-primary-400 text-primary-white w-full text-center'>
      {t('text')}
      <span className='font-bold font-pattaya mx-1'> {t('name')}</span>
    </footer>
  )
}
