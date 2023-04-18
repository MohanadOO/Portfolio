import { useState, useEffect } from 'react'
import { CiViewList } from 'react-icons/ci'

export default function TableOfContent({ locale }) {
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    const duplicate = {}
    const elements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4')
    ).map((e: HTMLHeadingElement) => {
      if (!e.id) return ''
      const text = e.innerText
      let id = e.id
      const type = Number(e.localName.charAt(1))

      if (!duplicate[id]) duplicate[id] = [id, 0]
      else {
        duplicate[id] = [id, duplicate[id][1] + 1]
        id = `${duplicate[id][0]}-${duplicate[id][1]}`
      }

      return {
        text,
        type,
        id,
      }
    })

    setHeadings(() => elements.filter((el) => el !== '').slice(1))
  }, [locale])

  if (headings.length < 2) return <div></div>

  function getClass(type: number): string {
    switch (type) {
      case 1:
        return `my-3 ltr:ml-2 sm:ltr:ml-4 rtl:mr-2 sm:rtl:mr-4 list-disc text-2xl lg:text-3xl font-bold`
      case 2:
        return `my-2 ltr:ml-2 sm:ltr:ml-4 rtl:mr-2 sm:rtl:mr-4 list-disc text-xl lg:text-2xl font-bold`
      case 3:
        return `my-1 ltr:ml-8 sm:ltr:ml-8 rtl:mr-4 sm:rtl:mr-8 list-[circle] text-lg lg:text-xl`
      case 4:
        return `my-1 ltr:ml-8 sm:ltr:ml-14 rtl:mr-8 sm:rtl:mr-14 list-[square] lg:text-lg italic`
    }
  }

  return (
    <nav className='flex flex-col py-10 px-2 lg:p-10 mb-5 rounded-md border border-black dark:border-white'>
      <h1
        id='table-of-content'
        className='flex items-center gap-2 font-bold text-2xl lg:text-3xl border-b pb-4 text-primary-400'
      >
        <CiViewList className='w-7 h-7 lg:w-8 lg:h-8 fill-primary-400' />{' '}
        {locale === 'ar' ? 'جدول المحتويات' : 'Table of Contents'}
      </h1>
      <ul className='flex flex-col p-4'>
        {headings.map(({ text, type, id }) => (
          <li
            key={id}
            className={`${getClass(
              type
            )} text-primary-dark/80 dark:text-primary-white/80 cursor-pointer`}
          >
            <a
              href={`#${id}`}
              className='block py-0.5 px-1 lg:px-2 hover:outline hover:outline-2 hover:shadow-lg hover:dark:shadow-white/10 rounded-lg'
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
