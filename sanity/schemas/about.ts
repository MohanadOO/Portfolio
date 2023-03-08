import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'About Page',
  name: 'aboutPage',
  type: 'document',
  fields: [
    defineField({
      title: 'About (EN)',
      name: 'en',
      type: 'blockContent',
    }),
    defineField({
      title: 'About (AR)',
      name: 'ar',
      type: 'blockContent',
    }),
  ],
})
