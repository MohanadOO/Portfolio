import { useTranslation } from 'next-i18next'
import CustomImage from '../CustomImage'

export default function Skills({ skills }) {
  const { t } = useTranslation('home', { keyPrefix: 'skills' })

  return (
    <section
      id='skills'
      aria-label={t('sectionHeader')}
      className='flex flex-col scroll-mt-32 mb-32'
    >
      <ul className='max-w-7xl flex items-center justify-center md:justify-start gap-x-5 gap-y-5 child:flex child:flex-col child:items-center child:gap-2 child:py-1 child:px-2 md:child:py-1 md:child:px-2 child:rounded-md flex-wrap'>
        {skills.map((skill: Skill) => (
          <li
            key={skill.name}
            title={skill.name}
            style={{
              boxShadow: `0px 0px 5px ${skill.color.hex}`,
            }}
            className='max-w-7xl border dark:border-foreground child:w-28 child:text-center bg-gray-50 dark:bg-gray-800 hover:scale-110 transition-transform cursor-pointer child:flex child:flex-col child:items-center child:gap-2 child:py-1 child:px-1 md:child:py-3 md:child:px-3 rounded-md'
          >
            <a href={skill.link} target='_blank'>
              <CustomImage
                width={32}
                height={32}
                src={skill.icon.asset.url}
                alt={skill.icon.alt}
                aria-hidden='true'
              />
              <span className='text-sm font-semibold opacity-80 line-clamp-1'>
                {skill.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
