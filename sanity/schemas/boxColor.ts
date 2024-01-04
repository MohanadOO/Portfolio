import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'boxColor',
  title: 'Box Color',
  type: 'object',
  fields: [
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'color',
    }),
    defineField({
      name: 'text',
      title: 'Text Color',
      type: 'color',
    }),
  ],
})
