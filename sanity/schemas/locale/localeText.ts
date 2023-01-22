import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'text',
    }),
    defineField({
      title: 'Arabic',
      name: 'ar',
      type: 'text',
    }),
  ],
})
