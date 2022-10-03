import { loadTranslations } from 'ni18n'
import { useTranslation } from 'react-i18next'
import { ni18nConfig } from '../ni18n.config'

export default function Footer() {
  const { t } = useTranslation('common', { keyPrefix: 'footer' })
  return (
    <footer className='absolute bottom-0 p-3 bg-primary-400 text-primary-white w-full text-center'>
      {t('text')}
      <span className='font-bold font-pattaya mx-1'> {t('name')}</span>
    </footer>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
    },
  }
}
