import Link from 'next/link'

type PropsType = {
  categories: Category[]
  currCategory: string | string[]
}

export default function PostCategories({
  categories,
  currCategory,
}: PropsType) {
  if (!categories) return <div id='categories'></div>

  return (
    <div
      id='categories'
      className='flex mt-5 gap-2 overflow-x-auto overflow-y-hidden'
    >
      {categories.map((category: Category) => (
        <Link
          href={`/blog?category=${category.title}`}
          key={category.title}
          className={`text-center px-2 text-sm rounded-full font-bold text-gray-600 dark:text-gray-500 border border-gray-600  ${
            currCategory === category.title
              ? 'bg-gray-600 dark:bg-gray-200 dark:text-black text-white'
              : 'hover:bg-gray-600 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white'
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}
