import { useTranslation } from 'next-i18next'

import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from 'react-icons/ai'

export default function Footer() {
  const { t } = useTranslation('common', { keyPrefix: 'footer' })
  return (
    <footer className='absolute mt-auto bottom-0 bg-background w-full'>
      <ul className='shadow-[0px_-5px_15px_transparent] shadow-primary/10 dark:shadow-primary/20 inset-0 p-4 flex justify-evenly items-center'>
        <li>
          <ul>
            <li className='text-xs sm:text-sm md:text-base'>
              {t('text')}
              <span className='font-bold font-pattaya ar:font-arefRuqaa mx-1'>
                {t('name')}
              </span>
            </li>
            <li>
              <p className='flex flex-row items-center gap-1 text-primary font-light'>
                <span className='text-xs'>
                  {' '}
                  {t('copyRight')} ({new Date().getFullYear()})
                </span>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <ul className='flex gap-3 sm:gap-4'>
            <li>
              <a aria-label='Github' href='https://github.com/MohanadOO'>
                <AiFillGithub className='w-5 h-5 sm:w-6 sm:h-6 hover:fill-primary transition-colors' />
              </a>
            </li>
            <li>
              <a aria-label='Twitter' href='https://twitter.com/MohanadOO_'>
                <AiFillTwitterCircle className='w-5 h-5 sm:w-6 sm:h-6 hover:fill-primary transition-colors' />
              </a>
            </li>
            <li>
              <a
                aria-label='Linkedin'
                href='https://www.linkedin.com/in/mohanad-alrwahiy-176aa719b'
              >
                <AiFillLinkedin className='w-5 h-5 sm:w-6 sm:h-6 hover:fill-primary transition-colors' />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}
