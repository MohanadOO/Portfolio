import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  //   icon: "",
  fields: [
    defineField({
      title: 'Type (EN)',
      name: 'en',
      type: 'string',
    }),
    defineField({
      title: 'Type (AR)',
      name: 'ar',
      type: 'string',
    }),
  ],
})
