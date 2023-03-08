import { HiUserGroup } from 'react-icons/hi'
import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Provider',
  name: 'provider',
  type: 'document',
  icon: HiUserGroup,
  fields: [
    defineField({
      title: 'Provider Name',
      name: 'provider',
      type: 'string',
    }),
    defineField({
      title: 'Provider Icon',
      name: 'providerIcon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
