export function getPostLanguage(
  title: Post['title'],
  description: Post['description'],
  locale: string
) {
  return title.ar === undefined || description.ar === undefined ? 'en' : locale
}

export function getTitle(title: Post['title'], language: string) {
  return title && title[language] ? title[language] : ''
}

export function getDesc(description: Post['description'], language: string) {
  return description && description[language] ? description[language] : ''
}

export function getReadingTime(
  readAr: Post['readingTimeAR'],
  readEn: Post['readingTimeEN'],
  locale: string
) {
  return locale === 'ar' ? readAr : readEn
}
