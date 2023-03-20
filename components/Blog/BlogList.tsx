import Image from 'next/image'
import urlFor from '../../utils/urlFor'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { AiOutlineWarning } from 'react-icons/ai'
import { HiOutlineBookOpen } from 'react-icons/hi'

export function BlogList({ posts }: { posts: Post[] }) {
  const { t } = useTranslation('blog')
  const locale = useRouter().locale

  return (
    <div className='max-w-7xl mx-auto'>
      <hr className='border-primary-400 mb-10' />
      <div className='grid grid-cols sm:grid-cols-2 xl:grid-cols-3 px-5 md:px-0 gap-5 gap-y-16 pb-24 '>
        {posts.map((post) => {
          const language = post.title.ar === undefined ? 'en' : locale
          const title = post.title[language]
          const desc = post.description[language]
          const readingTime =
            locale === 'ar' ? post.readingTimeAR : post.readingTimeEN

          return (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <div className='group cursor-pointer flex'>
                <div className='relative w-full aspect-video shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out motion-reduce:duration-75'>
                  <Image
                    className='object-cover object-center aspect-video rounded-lg'
                    src={
                      post.mainImage !== null &&
                      urlFor(post.mainImage).auto('format').url()
                    }
                    alt={post.author && post.author.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className='absolute bottom-0 w-full h-full bg-primary-white/90 dark:bg-primary-dark/90 text-primary-black dark:text-primary-white p-5 flex justify-between items-center'>
                    <div>
                      {locale === 'ar' && language !== 'ar' ? (
                        <div className='absolute top-0  bg-orange-600 dark:bg-orange-600 text-primary-white p-2 flex justify-center items-center gap-2 text-sm'>
                          <span>الترجمة العربية غير متوفرة</span>
                          <AiOutlineWarning className='w-5 h-5' />
                        </div>
                      ) : (
                        ''
                      )}
                      <p
                        title={title}
                        className='text-primary-400 text-sm sm:text-base md:text-lg font-bold mb-1 line-clamp-2'
                      >
                        {title}
                      </p>
                      {readingTime > 0 && (
                        <p className='flex items-center gap-2 text-xs md:text-sm opacity-60'>
                          <HiOutlineBookOpen className='w-4 h-4 md:w-5 md:h-5' />{' '}
                          <span>
                            {readingTime}{' '}
                            {locale === 'ar' ? 'دقائق للقراءة' : 'min read'}
                          </span>
                        </p>
                      )}

                      <div className='mt-3 flex-1'>
                        <p className='text-primary-gray-500 text-xs sm:text-sm dark:text-primary-gray-300 line-clamp-2'>
                          {post.description && desc}
                        </p>
                      </div>
                      <div className='mt-2 gap-2'>
                        <p className='text-xs border-black'>
                          {new Date(post.publishedAt).toLocaleDateString(
                            'en-US',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            }
                          )}
                        </p>
                        <div className='flex mt-2 gap-2'>
                          {post.categories &&
                            post.categories.map((category) => (
                              <div
                                key={category.title}
                                className='bg-primary-400 text-center px-1 rounded-full text-[0.7rem] text-white'
                              >
                                {category.title}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
