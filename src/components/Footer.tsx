import { useI18n } from '../i18n/Internationalization'

export default function Footer() {
  const { translate } = useI18n()
  const { text, name } = translate('footer')
  return (
    <footer className='absolute bottom-0 p-3 bg-primary-400 text-primary-white w-full text-center'>
      {text}
      <span className='font-bold font-pattaya mx-1'> {name}</span>
    </footer>
  )
}
