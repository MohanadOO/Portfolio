import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const locale = router.locale

  const dir = locale === 'ar' ? 'rtl' : 'ltl'
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ThemeProvider attribute='class' enableSystem={false}>
      <Head>
        <title>{locale === 'ar' ? 'مهند الرويحي' : 'Mohanad Alrwaihy'}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
export default appWithI18Next(MyApp, ni18nConfig)
