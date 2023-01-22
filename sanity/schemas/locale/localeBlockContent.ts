import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeBlockContent',
  title: 'Localized Blockcontent',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'blockContent',
    }),
    defineField({
      title: 'Arabic',
      name: 'ar',
      type: 'blockContent',
    }),
  ],
})
