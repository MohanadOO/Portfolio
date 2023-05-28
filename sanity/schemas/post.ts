import { HiPencilAlt } from 'react-icons/hi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: HiPencilAlt,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      description: 'Enter a short snippet for the blog...',
      title: 'Description',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'imageType',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body_en',
      title: 'English Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'body_ar',
      title: 'Arabic Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'recommend',
      title: 'Recommendations',
      description: 'Recommendations of other related posts.',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
      hidden: true,
    }),
    defineField({
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      initialValue: 0,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
