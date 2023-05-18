import { HiVideoCamera } from 'react-icons/hi'
import { defineType, defineField } from 'sanity'
import urlFor from '../../utils/urlFor'
import { dataset, projectId } from '../sanity.client'

export function getUrlFromId(ref: string) {
  if (!ref) return ''
  const [_file, id, extension] = ref.split('-')
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`
}

function VideoPreview(props: any) {
  const media = props.media?.asset ? urlFor(props?.media).url() : ''
  const video = getUrlFromId(props.video?.asset?._ref)
  const loop = props.loop
  const auto = props.autoPlay
  const muted = props.muted
  return (
    <div>
      {props.renderDefault(props)}
      <video
        controls
        poster={media}
        autoPlay={auto ? auto : false}
        loop={loop ? loop : false}
        muted={auto === false && muted ? true : false}
        playsInline={auto ? true : false}
        preload={auto ? 'auto' : 'metadata'}
        className='w-full'
      >
        <source src={video} />
      </video>
    </div>
  )
}

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
    }),
    defineField({
      name: 'poster',
      title: 'Video Poster',
      type: 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
    }),
  ],
  icon: HiVideoCamera,
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      video: 'video',
      autoplay: 'autoplay',
      loop: 'loop',
      muted: 'muted',
    },
  },
  components: { preview: VideoPreview },
})
