import { useState, useEffect, useRef } from 'react'
import { CiViewList } from 'react-icons/ci'
import { useHeadsObserver } from '../hooks/useHeadsObserver'
import { HiX } from 'react-icons/hi'

export default function TableOfContent({ locale, scroll }) {
  const [showTable, setShowTable] = useState(false)
  const [headings, setHeadings] = useState([])
  const scrollRef = useRef<HTMLElement>(null)
  const { activeId } = useHeadsObserver()

  useEffect(() => {
    const findIndex = headings.findIndex((h) => h.id === activeId)
    scrollRef.current?.scrollTo(0, findIndex * 40)
  }, [activeId])

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

    setHeadings(() =>
      elements.filter((el) => el !== '' && el.id !== 'table-of-content')
    )
  }, [locale])

  if (headings.length < 2) return <div className='absolute'></div>

  function getClass(type: number): string {
    switch (type) {
      case 1:
        return `my-3 ltr:ml-2 sm:ltr:ml-1 rtl:mr-2 sm:rtl:mr-1 list-disc text-lg`
      case 2:
        return `my-2 ltr:ml-2 sm:ltr:ml-2 rtl:mr-2 sm:rtl:mr-2 list-disc text-lg`
      case 3:
        return `my-1 ltr:ml-8 sm:ltr:ml-4 rtl:mr-4 sm:rtl:mr-4 list-[circle]`
      case 4:
        return `my-1 ltr:ml-8 sm:ltr:ml-8 rtl:mr-8 sm:rtl:mr-8 list-[square] italic`
    }
  }

  return (
    <>
      <button
        onClick={() => setShowTable((prev) => !prev)}
        className='block xl:hidden fixed en:left-10 ar:right-10 bottom-12 p-3 text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 border border-black/30 dark:border-white/30 shadow-lg rounded-full group z-50'
      >
        <h1
          id='table-of-content'
          className='flex items-center gap-2 font-extrabold text-xs transition-colors'
        >
          {showTable ? (
            <HiX className=' w-6 h-6 group-hover:scale-110 transition-transform' />
          ) : (
            <CiViewList className=' w-6 h-6 group-hover:scale-110 transition-transform' />
          )}
        </h1>
      </button>
      <nav
        ref={scrollRef}
        className={` ${scroll ? 'top-20 xl:top-28' : 'top-2 xl:top-10'} ${
          showTable
            ? 'translate-x-0'
            : 'en:translate-x-[-100vh] ar:translate-x-[100vh]'
        } fixed en:left-0 ar:right-0 bottom-0 md:mx-10 lg:mx-20 p-5 transition-[top,transform] duration-500 ease-out xl:flex flex-col xl:sticky xl:mx-0 xl:p-0 xl:ar:translate-x-0 xl:en:translate-x-0 w-96 overflow-y-auto overflow-x-hidden xl:h-[85vh] mx-auto bg-primary-white dark:bg-primary-dark xl:bg-transparent z-30`}
      >
        <h1
          id='table-of-content'
          className='flex items-center gap-2 font-bold text-lg border-b pb-4 text-primary-400 uppercase'
        >
          <CiViewList className='w-6 h-6 fill-primary-400' />{' '}
          {locale === 'ar' ? 'جدول المحتويات' : 'Table of Contents'}
        </h1>
        <ul className='flex flex-col p-4'>
          {headings.map(({ text, type, id }) => (
            <li
              key={id}
              id={`${id}_table`}
              onClick={() => setShowTable(false)}
              className={`${getClass(
                type
              )} text-primary-dark dark:text-primary-white cursor-pointer ${
                activeId === id ? 'marker:text-primary-400' : 'opacity-70'
              }`}
            >
              <a
                href={`#${id}`}
                className={`${
                  activeId === id
                    ? ' marker:text-primary-400 font-extrabold'
                    : ''
                } block py-0.5 px-1 lg:px-2 hover:outline hover:outline-2 hover:shadow-lg hover:dark:shadow-white/10 rounded-lg`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
