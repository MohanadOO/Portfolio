import { useTranslation } from 'react-i18next'

import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from 'react-icons/ai'

export default function Footer() {
  const { t } = useTranslation('common', { keyPrefix: 'footer' })
  return (
    <footer className='absolute mt-auto bottom-0 bg-primary-white dark:bg-primary-dark w-full'>
      <ul className='shadow-[0px_-5px_15px_transparent] shadow-primary-400/10 dark:shadow-primary-400/20 inset-0 p-4 flex justify-evenly items-center'>
        <div>
          <li className='text-xs sm:text-sm md:text-base'>
            {t('text')}
            <span className='font-bold font-pattaya ar:font-arefRuqaa mx-1'>
              {t('name')}
            </span>
          </li>
          <li>
            <p className='flex flex-row items-center gap-1 text-primary-400 font-light'>
              <span className='text-xs'>
                {' '}
                {t('copyRight')} ({new Date().getFullYear()})
              </span>
            </p>
          </li>
        </div>
        <div className='flex gap-3 sm:gap-4'>
          <li>
            <a href='https://github.com/MohanadOO'>
              <AiFillGithub className='w-5 h-5 sm:w-6 sm:h-6 hover:fill-primary-400 transition-colors' />
            </a>
          </li>
          <li>
            <a href='https://twitter.com/MohanadOO_'>
              <AiFillTwitterCircle className='w-5 h-5 sm:w-6 sm:h-6 hover:fill-primary-400 transition-colors' />
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/mohanad-alrwahiy-176aa719b'>
              <AiFillLinkedin className='w-5 h-5 sm:w-6 sm:h-6 hover:fill-primary-400 transition-colors' />
            </a>
          </li>
        </div>
      </ul>
    </footer>
  )
}
