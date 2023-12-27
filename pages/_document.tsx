import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html
      className='scroll-smooth'
      lang={props.locale === 'ar' ? 'ar' : 'en'}
      dir={props.locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
