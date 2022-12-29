import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='font-lato scroll-smooth bg-primary-white text-primary-black'>
      <Head />
      <body className='dark:bg-slate-900 dark:text-primary-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
