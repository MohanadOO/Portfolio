import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { POSTS_PER_PAGE, getPage } from '../../sanity/queries/blog'
import { HiArrowLeft, HiArrowRight, HiDotsHorizontal } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { usePagination } from '../../hooks/usePagination'

export default function Pagination({ count }: { count: number }) {
  const { t } = useTranslation('blog')

  const router = useRouter()
  const query = router.query
  const { page, category } = query

  const totalCount = Math.ceil(count / POSTS_PER_PAGE)

  const paginationRange = usePagination({
    totalCount,
    pageSize: POSTS_PER_PAGE,
    siblingCount: 1,
    currentPage: getPage(page),
  })

  if (getPage(page) === 0 || paginationRange.length < 2) return null

  function getLink(num: number) {
    return `/blog?page=${getPage(page) + num}${
      category ? `&category=${category}` : ''
    }`
  }

  return (
    <>
      {paginationRange.length > 1 && (
        <div className='flex flex-wrap items-center w-full font-bold text-lg relative'>
          {getPage(page) > 1 && (
            <Link
              title='Previous Page'
              className='flex items-center gap-2 hover:text-primary-purple'
              href={getLink(-1)}
            >
              <HiArrowLeft className='ar:rotate-180' />
              {t('previous')}
            </Link>
          )}
          <div className='absolute left-[50%] translate-x-[-50%] hidden sm:flex gap-2'>
            {paginationRange.map((num, index) => (
              <ul key={`${num}_${index}}`} className='flex'>
                {getPage(page) === num ? (
                  <li className='rounded-md shadow-md py-2 px-4 bg-primary-purple text-white cursor-auto'>
                    {num}
                  </li>
                ) : num === '...' ? (
                  <li className='flex items-center rounded-md text-primary-purple text-center shadow-md py-2 px-4  cursor-auto'>
                    <HiDotsHorizontal className='w-6 h-6' />
                  </li>
                ) : (
                  <li className='flex items-center'>
                    <Link
                      className='rounded-md shadow-md py-2 px-4 hover:bg-gray-200 hover:text-black'
                      href={getLink(Number(num) - getPage(page))}
                    >
                      {num}
                    </Link>
                  </li>
                )}
              </ul>
            ))}
          </div>
          {paginationRange.length > getPage(page) && (
            <Link
              href={getLink(1)}
              title='Next Page'
              className='flex ms-auto items-center gap-2 hover:text-primary-purple'
            >
              {t('next')}
              <HiArrowRight className='ar:rotate-180' />
            </Link>
          )}
        </div>
      )}
    </>
  )
}
