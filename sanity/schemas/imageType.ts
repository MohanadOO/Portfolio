import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageType',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternate Text',
      description: 'Description for the image (optional)',
    }),
  ],
})
