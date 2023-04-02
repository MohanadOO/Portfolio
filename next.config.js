module.exports = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    domains: ['bit.ly'],
  },
  rewrites: async () => [
    {
      source: '/rss.xml',
      destination: '/api/rss',
    },
  ],
}
