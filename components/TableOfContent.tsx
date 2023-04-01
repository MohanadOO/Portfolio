import { useState, useEffect } from 'react'
import { CiViewList } from 'react-icons/ci'

export default function TableOfContent({ locale }) {
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4')
    ).map((e: HTMLHeadingElement) => ({
      text: e.innerText,
      type: Number(e.localName.charAt(1)),
    }))

    setHeadings(() => elements.slice(3))
  }, [locale])

  if (headings.length < 2) return <div></div>

  function getClass(type: number): string {
    switch (type) {
      case 1:
        return `my-3 list-disc text-2xl lg:text-3xl font-bold`
      case 2:
        return `my-2 ltr:ml-4 rtl:mr-4 list-disc text-xl lg:text-2xl font-bold`
      case 3:
        return `my-1 ltr:ml-8 rtl:mr-8 list-[circle] text-lg lg:text-xl`
      case 4:
        return `ltr:ml-14 rtl:mr-14 list-[square] lg:text-lg`
    }
  }

  return (
    <nav className='flex flex-col py-10 px-2 lg:p-10 mb-5 rounded-md border border-black dark:border-white'>
      <h1
        id='table-of-content'
        className='flex items-center gap-2 font-bold text-2xl lg:text-3xl border-b pb-4'
      >
        <CiViewList className='w-7 h-7 lg:w-8 lg:h-8' />{' '}
        {locale === 'ar' ? 'جدول المحتويات' : 'Table of Contents'}
      </h1>
      <ul className='flex flex-col p-4'>
        {headings.map(({ text, type }) => (
          <li
            key={text}
            className={`${getClass(
              type
            )} text-primary-400 dark:opacity-90 cursor-pointer`}
          >
            <a
              href={`#${text}`}
              className='block py-0.5 px-1 hover:font-bold hover:outline hover:outline-2 hover:shadow-lg hover:dark:shadow-white/10 rounded-sm '
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
