import { defineType, defineField } from 'sanity'

import { HiCode } from 'react-icons/hi'

export default defineType({
  name: 'mySkill',
  title: 'My Skills',
  type: 'document',
  icon: HiCode,
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'image',
      fields: [
        defineField({
          title: 'Alternate Text',
          name: 'alt',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'color',
      title: 'Background Color',
      type: 'color',
    }),
  ],
})
