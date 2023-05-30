import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'customNoteType',
  title: 'Note Type',
  type: 'document',
  fields: [
    defineField({
      title: 'Type Name',
      name: 'typeName',
      type: 'localeString',
    }),
    defineField({
      title: 'Icon',
      description: 'Choose an icon to display on the callout',
      name: 'icon',
      type: 'image',
    }),
    defineField({
      title: 'Color',
      description: 'Choose a color for the callout',
      name: 'color',
      type: 'color',
    }),
  ],
  preview: {
    select: {
      type: 'typeName',
      icon: 'icon',
    },
    prepare(selection) {
      const { type, icon } = selection
      return { ...selection, title: type.en, media: icon }
    },
  },
})
