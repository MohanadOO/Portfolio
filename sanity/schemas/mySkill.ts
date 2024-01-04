import { defineType, defineField } from 'sanity'

import { HiCode } from 'react-icons/hi'

export default defineType({
  name: 'mySkill',
  title: 'My Skills & Tools',
  type: 'document',
  icon: HiCode,
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Top Skill',
      name: 'topSkill',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Skill Type',
      name: 'skillType',
      type: 'reference',
      to: [{ type: 'skillCategory' }],
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
      title: 'Link',
      name: 'link',
      type: 'url',
    }),
    defineField({
      name: 'color',
      title: 'Skill Color',
      type: 'boxColor',
    }),
  ],
})
