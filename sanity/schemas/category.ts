import { HiCollection } from 'react-icons/hi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: HiCollection,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'show',
      type: 'boolean',
      title: 'Show this category',
      description: 'Show this category in Blog Page',
    }),
  ],
})
