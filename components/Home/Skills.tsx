import Image from 'next/legacy/image'
import { useTranslation } from 'react-i18next'

export default function Skills() {
  const { t } = useTranslation('home', { keyPrefix: 'skills' })

  let mySkills = [
    {
      name: 'TypeScript',
      url: '/icons/typescript.svg',
      color: '#007ACC',
    },
    { name: 'React', url: '/icons/react.svg', color: '#00D8FF' },
    {
      name: 'Tailwind CSS',
      url: '/icons/tailwindcss.svg',
      color: '#1EA8BC',
    },
    {
      name: 'Firebase',
      url: '/icons/firebase.svg',
      color: '#F6820C',
    },
    {
      name: 'GraphQl',
      url: '/icons/graphql.svg',
      color: '#E535AB',
    },
  ]

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
          <ul className='mt-10 flex items-center justify-center md:justify-start gap-5 md:gap-12 child:flex child:flex-col child:items-center child:gap-4 child:py-1 child:px-2 md:child:py-5 md:child:px-6 child:rounded-md flex-wrap md:w-[80vw]'>
            {mySkills.map((skill) => {
              return (
                <li
                  key={skill.name}
                  className='ar:shadow-[7px_7px_0_black] en:shadow-[-7px_7px_0_black] border border-primary-black/20 dark:border-primary-white child:w-28 child:text-center'
                >
                  <span className='text-lg font-pattaya md:text-xl'>
                    {skill.name}
                  </span>
                  <Image
                    width={32}
                    height={32}
                    src={skill.url}
                    alt={`${skill.name}_icon`}
                    aria-hidden='true'
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
