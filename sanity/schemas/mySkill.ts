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
      title: 'Top Skill',
      name: 'topSkill',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'object',
      fields: [
        {
          title: 'Type (EN)',
          name: 'en',
          type: 'string',
          options: {
            list: [
              {
                title: 'Languages & Frameworks',
                value: 'Languages & Frameworks',
              },
              {
                title: 'Database & Related Tools',
                value: 'Database & Related Tools',
              },
              { title: 'System Tools', value: 'System Tools' },
              { title: 'Applications', value: 'Application' },
              { title: 'Services', value: 'Services' },
              { title: 'VS Extensions', value: 'VS Extension' },
              { title: 'Design & Style Tools', value: 'Design & Style Tools' },
              { title: 'Other', value: 'Other' },
            ],
          },
        },
        {
          title: 'Type (AR)',
          name: 'ar',
          type: 'string',
          options: {
            list: [
              {
                title: 'اللغات وأطر العمل',
                value: 'اللغات وأطر العمل',
              },
              {
                title: 'قواعد البيانات',
                value: 'قواعد البيانات',
              },
              { title: 'أدوات النظام', value: 'أدوات النظام' },
              { title: 'البرامج', value: 'البرامج' },
              { title: 'الخدمات', value: 'الخدمات' },
              { title: 'أضافات VS', value: 'أضافات VS' },
              { title: 'أدوات التصميم', value: 'أدوات التصميم' },
              { title: 'أخرى', value: 'أخرى' },
            ],
          },
        },
      ],
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
      title: 'Background Color',
      type: 'color',
    }),
  ],
})
