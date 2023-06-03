import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import '../styles/globals.css'
import '../styles/prism.css'
import '../styles/nprogress.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AppProps } from 'next/app'

import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import { MotionConfig } from 'framer-motion'

import NProgress from 'nprogress'
import Router from 'next/router'
import Script from 'next/script'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeError', NProgress.done)
Router.events.on('routeChangeComplete', NProgress.done)

function MyApp({ Component, pageProps, router }: AppProps) {
  const studioRoute = router.route.startsWith('/studio')

  const locale = router.locale
  const isPreview = router.isPreview
  const environment = process.env.NODE_ENV

  if (studioRoute) {
    return <Component {...pageProps} />
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ThemeProvider attribute='class'>
      <DefaultSeo {...SEO()} />

      {/* Google Analytics Scripts */}
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${
          environment !== 'development' && !isPreview
            ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
            : ''
        }`}
      />
      <Script strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${
                environment !== 'development' && !isPreview
                  ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
                  : ''
              }', {
              page_path: window.location.pathname,
              });
          `}
      </Script>

      <MotionConfig reducedMotion='user'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MotionConfig>
    </ThemeProvider>
  )
}
export default appWithI18Next(MyApp, ni18nConfig)
