import { useRouter } from 'next/router'

const defaultTitle = {
  ar: 'مهند الرويحي',
  en: 'Mohanad Alrwaihy',
}

const defaultDesc = {
  ar: 'أنا مهند الرويحي خريج هندسة إلكترونيات ومطور ويب, احاول مواكبة التقنية وأستخدم في أعمالي : React, Next JS, TailwindCSS والعديد من الأدوات 👋',
  en: "I'm Mohanad Alrwaihy an Electronics Engineer graduate and Web Developer, I try to adapt to the newest technologies and I use these tools: React, Next JS, TailwindCSS and many more tools .👋",
}

export default function SEO() {
  const router = useRouter()
  const locale = router.locale

  const headTitle = defaultTitle[locale] || defaultTitle.en
  const headDesc = defaultDesc[locale] || defaultDesc.en

  return {
    titleTemplate: `${headTitle} | %s`,
    defaultTitle: headTitle,
    description: headDesc,
    openGraph: {
      url: 'https://www.mohanad.in',
      type: 'website',
      locale,
      siteName: 'Mohanad Portfolio',
      images: [
        {
          url: 'https://www.example.ie/og-image-01.jpg',
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      handle: '@MohanadOO_',
      site: '@MohanadOO_',
      cardType: 'summary_large_image',
    },
    additionalLinkTags: [
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-16x16.png',
        sizes: '16x16',
      },
    ],
  }
}
