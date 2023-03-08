import { HiAcademicCap } from 'react-icons/hi'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Certificate',
  name: 'certificate',
  type: 'document',
  icon: HiAcademicCap,
  fields: [
    defineField({
      title: 'Certificate Name',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Course Link',
      name: 'courseUrl',
      type: 'url',
    }),
    defineField({
      title: 'Credential Link',
      name: 'link',
      type: 'url',
    }),
    defineField({
      title: 'Date',
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
    }),
    defineField({
      title: 'Provider',
      name: 'provider',
      type: 'reference',
      to: { type: 'provider' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'provider.provider',
      media: 'provider.providerIcon',
    },
  },
})
