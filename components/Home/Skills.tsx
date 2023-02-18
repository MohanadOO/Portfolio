import Image from 'next/legacy/image'
import { useTranslation } from 'react-i18next'

export default function Skills({ skills }) {
  const { t } = useTranslation('home', { keyPrefix: 'skills' })

  return (
    <section
      id='skills'
      aria-label={t('sectionHeader')}
      className='flex flex-col scroll-mt-32 my-32'
    >
      <div className='flex items-center mb-12 mx-auto md:mx-0'>
        <h2 className='section_header first-letter:rounded-full first-letter:bg-secondary-400 text-secondary-400'>
          {t('sectionHeader')}
        </h2>
      </div>
      <ul className='max-w-5xl mt-10 flex items-center justify-center md:justify-start gap-x-5 gap-y-5 child:flex child:flex-col child:items-center child:gap-2 child:py-1 child:px-2 md:child:py-3 md:child:px-4 child:rounded-md flex-wrap'>
        {skills.map((skill: Skill) => {
          return (
            <li
              key={skill.name}
              title={skill.name}
              style={{
                borderColor: skill.color.hex,
                boxShadow: `0px 0px 10px ${skill.color.hex}`,
              }}
              className='border-2 child:w-28 child:text-center'
            >
              <Image
                width={32}
                height={32}
                src={skill.icon.asset.url}
                alt={skill.icon.alt}
                aria-hidden='true'
              />
              <span className='text-lg font-semibold'>{skill.name}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
