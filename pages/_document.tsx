import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html
      className='scroll-smooth bg-primary-white text-primary-black'
      lang={props.locale === 'ar' ? 'ar' : 'en'}
      dir={props.locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Head />
      <body className='dark:bg-primary-dark dark:text-primary-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
