import { PortableText } from '@portabletext/react'
import { defineField, defineType } from 'sanity'
import { StudioRichTextComponents } from '../../components/Blog/RichTextComponents'
import { Card, Flex, Text } from '@sanity/ui'
import { AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai'
import urlFor from '../../utils/urlFor'

function CustomNotePreview(props: any) {
  const type = props?.type?.en
  const message = props?.message
  const color = props?.color
  const icon = props?.icon

  const backgroundColor =
    color?.rgb &&
    `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a / 5})`

  const textColor = color?.hex

  return (
    <Card style={{ backgroundColor }}>
      <Flex direction={'column'}>
        <Flex align={'center'} margin={2} gap={2}>
          {icon ? (
            <img
              src={urlFor(icon).width(20).height(20).url()}
              style={{
                width: '20px',
                height: '20px',
              }}
              alt='Icon'
            />
          ) : (
            <AiOutlineWarning />
          )}
          <Text
            size={2}
            muted={true}
            weight='bold'
            style={{ color: `${textColor || 'red'}` }}
            className='uppercase'
          >
            {type || 'Choose Type'}
          </Text>
        </Flex>
        <Card
          flex={1}
          margin={2}
          padding={3}
          radius={2}
          shadow={1}
          style={{ backgroundColor }}
        >
          <Text size={2}>
            <PortableText
              value={message}
              components={StudioRichTextComponents}
            />
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
      description: 'Choose the callout type',
      name: 'type',
      type: 'reference',
      to: { type: 'customNoteType' },
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
      type: 'type.typeName',
      color: 'type.color',
      icon: 'type.icon',
      message: 'message' as any,
    },
    prepare({ type, message, color, icon }): any {
      return {
        type,
        color,
        icon,
        message,
      }
    },
  },
  components: { preview: CustomNotePreview },
})
