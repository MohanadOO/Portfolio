import Image from 'next/image'
import { HiOutlineChevronRight } from 'react-icons/hi'
import urlFor from '../../utils/urlFor'
import Link from 'next/link'

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <hr className='border-primary-400 mb-10' />
      <div className='grid grid-cols md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24'>
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <div className='group cursor-pointer flex flex-col'>
              <div className='relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out'>
                <Image
                  className='object-cover object-left lg:object-center aspect-video'
                  src={
                    post.mainImage &&
                    urlFor(post.mainImage).auto('format').url()
                  }
                  alt={post.author && post.author.name}
                  fill
                />
                <div className='absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-primary-white p-5 flex justify-between'>
                  <div>
                    <p className='font-bold'>{post.title.en}</p>
                    <p>
                      {new Date(post._updatedAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className='flex flex-col md:flex-row gap-y-2 md:gab-x-2 items-center'>
                    {post.categories &&
                      post.categories.map((category) => (
                        <div className='bg-primary-400 text-center text-white px-3 py-1 rounded-full text-sm font-semibold'>
                          {category.title}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className='mt-5 flex-1'>
                <p className='underline text-lg font-bold'>{post.title.en}</p>
                <p className='text-primary-gray line-clamp-2'>
                  {post.description && post.description.en}
                </p>
              </div>

              <p className='flex gap-2 items-center mt-5 group-hover:underline'>
                Read Post
                <HiOutlineChevronRight />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
