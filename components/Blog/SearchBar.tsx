import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { useDebounce } from '../../hooks/useDebounce'
import { useTranslation } from 'next-i18next'

export default function SearchBar() {
  const { t } = useTranslation('blog')
  const router = useRouter()
  const searchParams = router.query?.q
  const [initial, setInitial] = useState(false)
  const [search, setSearch] = useState(searchParams)
  const debounceSearch = useDebounce(search, 700)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (!initial) {
      setInitial(true)
      return
    }

    router.query.q = debounceSearch
    router.query.page = '1'
    router.push(router, undefined, {
      shallow: true,
    })
  }, [debounceSearch])

  return (
    <div className='w-full relative'>
      <HiSearch className='w-5 h-5 absolute start-2 top-[50%] translate-y-[-50%] text-primary-white' />
      <input
        type='text'
        value={search}
        onChange={handleChange}
        className='w-full py-2 ps-10 rounded-xl outline-none focus:ring-2 focus:ring-offset-transparent focus:ring-primary-purple focus:ring-offset-2 bg-neutral-800 text-primary-white'
        placeholder={t('searchPlaceholder')}
      />
    </div>
  )
}
