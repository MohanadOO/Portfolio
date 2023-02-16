import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { HiOutlineCheckCircle, HiOutlineClipboardCopy } from 'react-icons/hi'
import Refractor from 'react-refractor'

export default function CodeInputLayout({ language, code }) {
  const [isCopied, setIsCopied] = useState(false)
  const locale = useRouter().locale

  function copyToClipBoard(code: string) {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
  }

  return (
    <div
      dir='ltr'
      className='text-xs sm:text-sm md:text-base py-5 relative group'
    >
      <Refractor language={language} value={code} />
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
