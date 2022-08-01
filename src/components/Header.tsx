import { HiArrowCircleDown } from 'react-icons/hi'
import { useI18n } from '../i18n/Internationalization'

type Translation = {
  message: { [key: string]: { [key: string]: string } }
}

export default function Header() {
  const { translate } = useI18n()
  const header: Translation = translate('header')
  return (
    <section
      id='header'
      className='self-center text-center md:text-left ar:md:text-right flex flex-col gap-10 md:flex-row justify-center md:justify-between items-center w-full'
    >
      <div className='flex flex-col gap-10'>
        <h1 className='text-7xl lg:text-8xl 2xl:text-9xl text-primary-400 font-bold max-w-lg'>
          {header['hello']}
        </h1>
        <p className='font-light text-2xl lg:text-3xl 2xl:text-4xl text-primary-black/70 italic'>
          {header['subText']}
        </p>
        <a
          href='#about-me'
          className='flex items-center gap-3 self-center md:self-start py-3 px-6 border-2 border-primary-400 rounded-md text-primary-400 shadow-md shadow-secondary-400/40'
        >
          <span>{header['about']}</span>
          <HiArrowCircleDown className='w-6 h-6' />
        </a>
      </div>

      <svg
        className='absolute -z-10 opacity-10 md:relative md:opacity-100'
        width='389'
        height='403'
        viewBox='0 0 389 403'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M187.286 93.3333C187.286 144.88 145.499 186.667 93.9524 186.667C42.4058 186.667 0.619019 144.88 0.619019 93.3333C0.619019 41.7868 42.4058 0 93.9524 0C145.499 0 187.286 41.7868 187.286 93.3333Z'
          fill='#5F95D8'
          fillOpacity='0.3'
        />
        <path
          d='M187.286 309.167C187.286 360.713 145.499 402.5 93.9524 402.5C42.4058 402.5 0.619019 360.713 0.619019 309.167C0.619019 257.62 42.4058 215.833 93.9524 215.833C145.499 215.833 187.286 257.62 187.286 309.167Z'
          fill='#7257D1'
        />
        <rect
          x='202.286'
          width='186.667'
          height='186.667'
          rx='50'
          fill='#5F95D8'
        />
        <path
          d='M202.286 265.667C202.286 238.052 224.671 215.667 252.286 215.667H338.952C366.567 215.667 388.952 238.052 388.952 265.667V352.333C388.952 379.948 366.567 402.333 338.952 402.333H252.286C224.672 402.333 202.286 379.948 202.286 352.333V265.667Z'
          fill='#6B56EB'
          fillOpacity='0.5'
        />
        <path
          d='M202.286 265.667C202.286 238.052 224.671 215.667 252.286 215.667H338.952C366.567 215.667 388.952 238.052 388.952 265.667V352.333C388.952 379.948 366.567 402.333 338.952 402.333H252.286C224.672 402.333 202.286 379.948 202.286 352.333V265.667Z'
          fill='#7257D1'
          fillOpacity='0.3'
        />
      </svg>
    </section>
  )
}
