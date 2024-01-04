import { HiBriefcase } from 'react-icons/hi'

export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: HiBriefcase,
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'title.ar',
      media: 'mainImage',
    },
  },
  fields: [
    {
      title: 'Featured',
      description: 'Toggle this to make the project as featured',
      name: 'features',
      type: 'boolean',
      defaultValue: 'false',
    },
    {
      title: 'Project Title',
      name: 'title',
      type: 'localeString',
      required: true,
    },
    {
      title: 'Body',
      name: 'body',
      description: 'Information about the project',
      type: 'localeText',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
    {
      title: 'Main image',
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Alternate Text',
          name: 'alt',
          type: 'string',
        },
      ],
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              title: 'Alternate Text',
              name: 'alt',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      title: 'Used Tools & Skills',
      name: 'tools',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'mySkill' } }],
    },
    {
      name: 'github',
      title: 'Github URL',
      type: 'url',
    },
    {
      name: 'preview',
      title: 'Preview URL',
      type: 'url',
    },
  ],
}
