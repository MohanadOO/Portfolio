import { loadTranslations } from 'ni18n'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ni18nConfig } from '../ni18n.config'
import { client } from '../sanity/sanity.client'
import { ALL_SKILLS } from '../sanity/queries/skills'
import Image from 'next/legacy/image'

export async function getStaticProps({ locale }) {
  const skills = await client.fetch(ALL_SKILLS)
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['skills', 'common'])),
      skills,
      locale,
    },
  }
}

export default function Skills({
  skills,
  locale,
}: {
  skills: Skill[]
  locale: string
}) {
  const { t } = useTranslation('skills')

  const types: string[] = []
  for (let i = 0; i < skills.length; i++) {
    const skillType = skills[i].type.en
    if (!types.includes(skillType)) {
      types.push(skillType)
    }
  }

  const filterSkills = types.map((type) => {
    return skills.filter((skill) => skill.type.en === type)
  })

  return (
    <section
      id='mySkill'
      aria-label={t('sectionHeader')}
      className='my-10 max-w-4xl mx-auto'
    >
      <h1 className='text-5xl font-bold my-5'>{t('sectionHeader')}</h1>
      <p className='text-xl opacity-70 mb-24'>{t('description')}</p>

      {filterSkills.map((skills: Skill[]) => (
        <div key={skills[0].type.en}>
          <h2 className='text-4xl text-center md:text-start font-bold text-primary-400 pb-5 mt-12 border-b-2'>
            {skills[0].type[locale]}
          </h2>
          <ul className='flex my-8 items-center justify-center md:justify-start gap-x-5 gap-y-5 flex-wrap'>
            {skills.map((skill: Skill) => (
              <li
                key={skill.name}
                title={skill.name}
                style={{
                  boxShadow: `0px 0px 5px ${skill.color.hex}`,
                }}
                className='border dark:border-primary-black child:w-28 child:text-center bg-gray-50 dark:bg-gray-800 hover:scale-110 transition-transform cursor-pointer child:flex child:flex-col child:items-center child:gap-2 child:py-1 child:px-1 md:child:py-3 md:child:px-3 rounded-md'
              >
                <a href={skill.link} target='_blank'>
                  <Image
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
        </div>
      ))}
    </section>
  )
}
