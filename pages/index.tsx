import { loadTranslations } from 'ni18n'
import HomeLayout from '../components/Home/HomeLayout'
import { ni18nConfig } from '../ni18n.config'

export default function Home() {
  return <HomeLayout />
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, [
        'home',
        'projects',
        'common',
      ])),
    },
  }
}
