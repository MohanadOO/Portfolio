import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import '../styles/globals.css'
import '../styles/prism.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AppProps } from 'next/app'

import '@fontsource/pattaya'
import '@fontsource/lato'
import '@fontsource/lato/700.css'

import '@fontsource/cairo'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'

import '@fontsource/aref-ruqaa'
import '@fontsource/aref-ruqaa/700.css'

import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps, router }: AppProps) {
  const studioRoute = router.route.startsWith('/studio')
  const locale = useRouter().locale

  if (studioRoute) {
    return <Component {...pageProps} />
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ThemeProvider attribute='class' enableSystem={false}>
      <DefaultSeo {...SEO()} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
export default appWithI18Next(MyApp, ni18nConfig)
