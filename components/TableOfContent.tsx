import { useState, useEffect, useRef } from 'react'
import { CiViewList } from 'react-icons/ci'
import { useHeadsObserver } from '../hooks/useHeadsObserver'
import { HiX } from 'react-icons/hi'

export default function TableOfContent({ locale, scroll }) {
  const [showTable, setShowTable] = useState(false)
  const [headings, setHeadings] = useState([])
  const [isCurrentHead, setIsCurrentHead] = useState('')
  const [allowScroll, setAllowScroll] = useState(false)
  const scrollRef = useRef<HTMLElement>(null)
  const { activeId } = useHeadsObserver()

  useEffect(() => {
    if (isCurrentHead === activeId) setAllowScroll(false)
    if (!allowScroll) {
      const findIndex = headings.findIndex((h) => h.id === activeId)
      scrollRef.current?.scrollTo(0, findIndex * 40)
    }
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

  useEffect(() => {
    if (showTable === true) {
      document.documentElement.classList.add('stop-scrolling')
    } else {
      document.documentElement.classList.remove('stop-scrolling')
    }
  }, [showTable])

  if (headings.length < 2) return <div className='absolute'></div>

  function getClass(type: number): string {
    switch (type) {
      case 1:
        return `my-2 ltr:ml-1 sm:ltr:ml-0.5 rtl:mr-1 sm:rtl:mr-0.5 text-lg list-disc marker:text-base-purple`
      case 2:
        return `my-1 ltr:ml-1 sm:ltr:ml-0.5 rtl:mr-1 sm:rtl:mr-0.5 text-lg list-disc marker:text-teal-600 marker:dark:text-teal-500`
      case 3:
        return `my-0.5 ltr:ml-2 sm:ltr:ml-2 rtl:mr-2 sm:rtl:mr-2 list-disc marker:text-sky-600 marker:dark:text-sky-500`
      case 4:
        return `my-0.5 ltr:ml-2 sm:ltr:ml-4 rtl:mr-4 sm:rtl:mr-4 italic list-disc marker:text-amber-600 marker:dark:text-amber-500`
    }
  }

  function handleLink(id: string) {
    setShowTable(false)
    setAllowScroll(true)
    setIsCurrentHead(id)
  }

  return (
    <>
      <button
        aria-label='Table of contents'
        title='Table of contents'
        onClick={() => setShowTable((prev) => !prev)}
        className='fixed xl:hidden ltr:right-[5%] rtl:left-[5%] bottom-24 md:bottom-28  w-8 h-8 md:w-10 md:h-10 text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 border  dark:border-white/10 shadow-lg rounded-full group z-50'
      >
        {showTable ? (
          <HiX className='mx-auto w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform' />
        ) : (
          <CiViewList className='mx-auto w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform' />
        )}
      </button>
      <nav
        ref={scrollRef}
        className={` ${scroll ? 'top-16 xl:top-28' : 'top-2 xl:top-10'} ${
          showTable
            ? 'translate-x-0'
            : 'en:translate-x-[-150%] ar:translate-x-[150%]'
        } fixed en:left-0 ar:right-0 bottom-0 md:mx-10 lg:mx-20 p-5 transition-[top,transform] duration-500 ease-out xl:flex flex-col xl:sticky xl:mx-0  xl:ar:translate-x-0 xl:en:translate-x-0 w-full md:w-96 overflow-y-auto overflow-x-hidden xl:h-[85vh] mx-auto bg-background xl:bg-transparent z-30 custom-thin-scrollbar ltr:border-l rtl:border-r dark:border-white/10`}
      >
        <h1
          id='table-of-content'
          className='flex items-center gap-2 font-bold text-lg border-b border-foreground/80 pb-4 text-primary uppercase'
        >
          <CiViewList className='w-6 h-6 fill-base-purple' />{' '}
          {locale === 'ar' ? 'جدول المحتويات' : 'Table of Contents'}
        </h1>
        <ul className='flex flex-col p-4'>
          {headings.map(({ text, type, id }) => (
            <li
              key={id}
              id={`${id}_table`}
              onClick={() => handleLink(id)}
              className={`${getClass(type)} text-foreground cursor-pointer ${
                activeId === id ? '' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <a
                href={`#${id}`}
                className={`${
                  activeId === id
                    ? ' marker:text-base-purple font-extrabold cursor-default underline underline-offset-4 text-base'
                    : 'text-sm'
                } block py-0.5 px-0.5 `}
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
