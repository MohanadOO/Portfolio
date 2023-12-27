import React from 'react'

type PropsType = {
  message: string
  children?: React.ReactNode
}

export default function ErrorMessage({ message, children }: PropsType) {
  return (
    <div className='text-center my-10'>
      <p className='font-bold text-red-600 dark:text-red-400 uppercase text-2xl'>
        {message}
      </p>
      {children}
    </div>
  )
}
