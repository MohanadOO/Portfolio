import { HiCode } from 'react-icons/hi'
export default {
  name: 'skill',
  title: 'Project Skills',
  type: 'document',
  icon: HiCode,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Icon',
      name: 'icon',
      type: 'image',
      fields: [
        {
          title: 'Alternate Text',
          name: 'alt',
          type: 'string',
        },
      ],
    },
  ],
}
