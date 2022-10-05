import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='font-lato scroll-smooth bg-primary-white text-primary-black'>
      <Head>
        <meta charSet='UTF-8' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.ico'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.ico'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.ico'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Mohanad Alrwaihy</title>
      </Head>
      <body className='dark:bg-slate-900 dark:text-primary-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
