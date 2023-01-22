export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
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
