import Image from 'next/image'
import urlFor from '../../utils/urlFor'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { AiOutlineWarning } from 'react-icons/ai'

export function BlogList({ posts }: { posts: Post[] }) {
  const { t } = useTranslation('blog')
  const locale = useRouter().locale

  return (
    <>
      <hr className='border-primary-400 mb-10' />
      <div className='grid grid-cols md:grid-cols-2 px-5 md:px-10 gap-10 gap-y-16 pb-24'>
        {posts.map((post) => {
          const language = post.title.ar === undefined ? 'en' : locale
          const title = post.title[language]
          const desc = post.description[language]
          return (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <div className='group cursor-pointer flex flex-col'>
                <div className='relative w-full h-80 shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out'>
                  <Image
                    className='object-cover object-left lg:object-center aspect-video'
                    src={
                      post.mainImage &&
                      urlFor(post.mainImage).auto('format').url()
                    }
                    alt={post.author && post.author.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {locale === 'ar' && language !== 'ar' ? (
                    <div className='absolute top-0  bg-orange-600 dark:bg-orange-600 text-primary-white p-2 flex justify-center items-center gap-2 text-sm'>
                      <span>الترجمة العربية غير متوفرة</span>
                      <AiOutlineWarning className='w-5 h-5' />
                    </div>
                  ) : (
                    ''
                  )}
                  <div className='absolute bottom-0 w-full bg-primary-white/90 dark:bg-primary-dark/90 text-primary-black dark:text-primary-white p-5 flex justify-between'>
                    <div>
                      <p
                        title={title}
                        className='underline underline-offset-4 decoration-primary-400 text-lg font-bold mb-1 line-clamp-1 max-w-xs'
                      >
                        {title}
                      </p>
                      <p className='text-xs'>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center'>
                      {post.categories &&
                        post.categories.map((category) => (
                          <div className='bg-primary-400 text-center px-2 py-1 rounded-full text-xs font-semibold'>
                            {category.title}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className='mt-5 flex-1'>
                  <p className='text-primary-gray-500 dark:text-primary-gray-300 line-clamp-2'>
                    {post.description && desc}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
