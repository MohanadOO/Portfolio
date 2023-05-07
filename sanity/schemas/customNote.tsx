import { PortableText } from '@portabletext/react'
import { defineField, defineType } from 'sanity'
import { RichTextComponents } from '../../components/Blog/RichTextComponents'
import { Card, Flex, Text } from '@sanity/ui'
import { noteTone } from '../../utils/getNoteStyles'
import { getNoteIcon } from '../../utils/getNoteIcon'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function CustomNotePreview(props: any) {
  const type = props?.type
  const message = props?.message

  return (
    <Card tone={noteTone[type]}>
      <Flex direction={'column'}>
        <Flex align={'center'} margin={2} gap={2}>
          {getNoteIcon(type)}
          <Text size={2} muted={true} weight='bold' className='uppercase'>
            {type}
          </Text>
        </Flex>
        <Card
          flex={1}
          margin={2}
          padding={3}
          radius={2}
          shadow={1}
          tone={noteTone[type]}
        >
          <Text size={2}>
            <PortableText value={message} components={RichTextComponents} />
          </Text>
        </Card>
      </Flex>
    </Card>
  )
}

export default defineType({
  name: 'customNote',
  title: 'Note Field',
  type: 'document',
  icon: AiOutlineInfoCircle,
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      description: 'Callout type name',
      initialValue: 'warning',
      options: {
        list: [
          { title: 'Warning', value: 'warning' },
          { title: 'Tip', value: 'tip' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'Message',
      name: 'message',
      type: 'blockContent',
      description: 'Callout message',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      message: 'message' as any,
    },
    prepare({ type, message }): any {
      return {
        type,
        message,
      }
    },
  },
  components: { preview: CustomNotePreview },
})
