import { defineType, defineField } from 'sanity'
import { HiDownload } from 'react-icons/hi'

export default defineType({
  name: 'assets',
  type: 'document',
  title: 'Assets',
  icon: HiDownload,
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
    }),
    defineField({
      name: 'downloadName',
      title: 'Download Name',
      description:
        'This is the name shown when downloading the asset (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),
  ],
})
