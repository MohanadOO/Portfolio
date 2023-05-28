import { defineField, defineType } from 'sanity'

function PreviewEmbed(props: any) {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: props.code }}
        className='my-5'
      ></div>
    </div>
  )
}

export default defineType({
  name: 'codeEmbed',
  title: 'Code Embed',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code Embed Code',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      code: 'code',
    },
  },
  components: { preview: PreviewEmbed },
})
