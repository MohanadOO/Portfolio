import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { HiOutlineCheckCircle, HiOutlineClipboardCopy } from 'react-icons/hi'
import Refractor from 'react-refractor'

export default function CodeInputLayout({
  language,
  code,
  highlightedLines,
  filename,
}) {
  const [isCopied, setIsCopied] = useState(false)
  const locale = useRouter().locale

  function copyToClipBoard(code: string) {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
  }

  return (
    <div
      dir='ltr'
      className={`text-xs sm:text-sm md:text-base py-5 relative group ${
        filename && 'mt-14'
      }`}
    >
      {filename && (
        <code
          title={filename}
          className='absolute left-0 top-[-0px] md:-top-[5px] bg-slate-50 text-black dark:bg-[#0D1016] py-1 px-4 border-x border-t border-pink-600  dark:text-white font-black border-b border-b-slate-50 dark:border-b-[#0D1016] font-mono rounded-tl rounded-tr max-w-[80%] sm:max-w-sm line-clamp-1 '
        >
          {filename}
        </code>
      )}
      <code
        title={language}
        className='absolute right-0 md:right-6 top-[1px] md:-top-[5px] bg-slate-50 dark:bg-[#0D1016] py-1 px-2 border-x border-t border-pink-600 dark:text-white font-black border-b border-b-slate-50 dark:border-b-[#0D1016] font-mono rounded-tl rounded-tr'
      >
        {language.toUpperCase()}
      </code>
      <Refractor language={language} value={code} markers={highlightedLines} />
      <div className='absolute text-white p-5 top-6 right-4 sm:hidden group-hover:block'>
        {!isCopied ? (
          <HiOutlineClipboardCopy
            onClick={() => copyToClipBoard(code)}
            className='w-6 h-6 cursor-pointer hover:text-primary-400 active:scale-110 transition-opacity'
            title={locale === 'ar' ? 'نسخ الكود' : 'Copy Code'}
          />
        ) : (
          <HiOutlineCheckCircle
            onClick={() => copyToClipBoard(code)}
            className='w-6 h-6 cursor-pointer text-green-400 active:scale-110 transition-opacity'
            title={locale === 'ar' ? 'أنسخ مرة اخرى' : 'Copy Again'}
          />
        )}
      </div>
    </div>
  )
}
