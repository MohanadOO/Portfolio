import { useTranslation } from 'react-i18next'
import {
  SiFirebase,
  SiGraphql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

export default function Skills() {
  const { t } = useTranslation('home', { keyPrefix: 'skills' })

  return (
    <section
      id='skills'
      aria-label={t('sectionHeader')}
      className='flex flex-col md:flex-row justify-center md:justify-start items-center w-full scroll-mt-28 my-48'
    >
      <div className='flex flex-col gap-5 max-w-md lg:max-w-lg w-full'>
        <div className='flex items-center mb-12 mx-auto md:mx-0'>
          <h2 className='section_header first-letter:rounded-full first-letter:bg-secondary-400 text-secondary-400'>
            {t('sectionHeader')}
          </h2>
        </div>
        <div className='lg:child:ml-[4.7rem] text-center md:text-left'>
          <h3 className='text-xl leading-8'>{t('subText')}</h3>
          <ul className='mt-10 flex items-center justify-center md:justify-start gap-5 md:gap-12 child:flex child:flex-col child:items-center child:gap-4 child:py-1 child:px-2 md:child:py-5 md:child:px-6 child:rounded-md flex-wrap md:w-[80vw] child:font-bold'>
            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border border-primary-black/20 dark:border-primary-white en:shadow-[#007ACC]/60 ar:shadow-[#007ACC]/60'>
              <span className='text-lg md:text-xl text-[#007ACC]'>
                TypeScript
              </span>
              <SiTypescript className='w-7 h-7 md:w-8 md:h-8 fill-[#007ACC]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border border-primary-black/20 dark:border-primary-white en:shadow-[#00D8FF]/60 ar:shadow-[#00D8FF]/60'>
              <span className='text-lg md:text-xl text-[#00D8FF]'>React</span>
              <SiReact className='w-7 h-7 md:w-8 md:h-8 fill-[#00D8FF]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border border-primary-black/20 dark:border-primary-white en:shadow-[#1EA8BC]/60 ar:shadow-[#1EA8BC]/60'>
              <span className='text-lg md:text-xl bg-gradient-to-r from-[#1EA8BC] to-[#12CEB7] bg-clip-text text-transparent'>
                Tailwind
              </span>
              <SiTailwindcss className='w-7 h-7 md:w-8 md:h-8 fill-[#1EA8BC]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border border-primary-black/20 dark:border-primary-white en:shadow-[#F6820C]/60 ar:shadow-[#F6820C]/60'>
              <span className='text-lg md:text-xl bg-gradient-to-r from-[#F6820C] to-[#FCCA3F] bg-clip-text text-transparent'>
                Firebase
              </span>
              <SiFirebase className='w-7 h-7 md:w-8 md:h-8  fill-[#F6820C]' />
            </li>

            <li className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border border-primary-black/20 dark:border-primary-white en:shadow-[#E535AB]/60 ar:shadow-[#E535AB]/60'>
              <span className='text-lg md:text-xl text-[#E535AB] '>
                GraphQl
              </span>
              <SiGraphql className='w-7 h-7 md:w-8 md:h-8 fill-[#E535AB]' />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
