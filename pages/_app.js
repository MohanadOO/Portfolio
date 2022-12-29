import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

import '@fontsource/pattaya'
import '@fontsource/lato'
import '@fontsource/lato/700.css'

import '@fontsource/cairo'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'

import '@fontsource/aref-ruqaa'
import '@fontsource/aref-ruqaa/700.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const locale = router.locale

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  const title = {
    ar: 'مهند الرويحي | الرئيسية',
    en: 'Mohanad Alrwaihy | Home',
  }

  const desc = {
    ar: 'أنا مهند الرويحي خريج هندسة إلكترونيات ومطور ويب, احاول مواكبة التقنية وأستخدم في أعمالي : React, Next JS, TailwindCSS والعديد من الأدوات 👋',
    en: "I'm Mohanad Alrwaihy an Electronics Engineer graduate and Web Developer, I try to adapt to the newest technologies and I use these tools: React, Next JS, TailwindCSS and many more tools .👋",
  }

  return (
    <ThemeProvider attribute='class' enableSystem={false}>
      <Head>
        <meta charSet='UTF-8' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{locale === 'ar' ? title.ar : title.en}</title>
        <meta
          name='description'
          content={locale === 'ar' ? desc.ar : desc.en}
          key='desc'
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
export default appWithI18Next(MyApp, ni18nConfig)
