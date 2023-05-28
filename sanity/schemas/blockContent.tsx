import { HiVideoCamera } from 'react-icons/hi'
import { SiCodepen } from 'react-icons/si'
import { defineType, defineArrayMember } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

const CodeDecorator = (props) => (
  <span
    className='text-purple-900'
    style={{
      fontFamily: 'monospace',
      backgroundColor: 'rgb(88 28 135)',
    }}
  >
    {props.children}
  </span>
)

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code', component: CodeDecorator },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternate Text',
          description: 'Description for the image (optional)',
        },
      ],
    }),
    {
      type: 'code',
      title: 'Code Block',
      options: {
        language: 'cshtml',
        languageAlternatives: [
          { title: 'HTML', value: 'cshtml', mode: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'SCSS', value: 'scss' },
          { title: 'SASS', value: 'sass' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JSON', value: 'json' },
          { title: 'JSX', value: 'jsx' },
          { title: 'TSX', value: 'tsx' },
          { title: 'Python', value: 'python' },
          { title: 'Groq', value: 'javascript' },
          { title: 'SQL', value: 'sql' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Shell', value: 'powershell', mode: 'sh' },
        ],
        withFilename: true,
      },
    },
    {
      type: 'customNote',
      title: 'Callout',
    },
    {
      name: 'video',
      type: 'video',
      title: 'Video',
      icon: HiVideoCamera,
    },
    {
      type: 'codeEmbed',
      title: 'Embed Code',
      icon: SiCodepen,
    },
  ],
})
