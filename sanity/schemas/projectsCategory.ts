import { HiCollection } from 'react-icons/hi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectsCategory',
  title: 'Categories',
  type: 'document',
  icon: HiCollection,
  preview: {
    select: {
      title: 'title.en',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      description: 'Enter a description for this projects category',
      title: 'Description',
      type: 'localeString',
    }),
    defineField({
      name: 'show',
      title: 'Show this category',
      description: 'Show this category in the projects page',
      type: 'boolean',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    }),
  ],
})
