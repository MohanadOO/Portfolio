import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'string',
    }),
    defineField({
      title: 'Arabic',
      name: 'ar',
      type: 'string',
    }),
  ],
})
