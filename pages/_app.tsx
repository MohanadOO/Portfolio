import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import '../styles/globals.css'
import '../styles/prism.css'
import '../styles/nprogress.css'
import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'

import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import { MotionConfig } from 'framer-motion'

import NProgress from 'nprogress'
import Router from 'next/router'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeError', NProgress.done)
Router.events.on('routeChangeComplete', NProgress.done)

function MyApp({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
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
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DefaultSeo {...SEO()} />

        {/* Google Analytics Scripts */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${
            environment !== "development" && !isPreview
              ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
              : ""
          }`}
        />
        <Script strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${
                environment !== "development" && !isPreview
                  ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
                  : ""
              }', {
              page_path: window.location.pathname,
              });
          `}
        </Script>

        <Script
          async
          src="http://localhost:3000/script.js"
          data-website-id="8c9a8cb1-b898-4696-b336-ed2927aa2420"
        ></Script>

        <Script type="text/javascript" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ocp3307e5z");`}
        </Script>

        <MotionConfig reducedMotion="user">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
export default appWithI18Next(MyApp, ni18nConfig)
