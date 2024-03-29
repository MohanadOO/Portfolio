import { loadTranslations } from 'ni18n'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { ni18nConfig } from '../ni18n.config'
import { client } from '../sanity/sanity.client'
import { ALL_SKILLS } from '../sanity/queries/skills'
import CustomImage from '../components/CustomImage'
import { NextSeo } from 'next-seo'
import { getURL } from '../utils/helpers'
import { H1, P } from '@/components/ui/Typography/headers'

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
    const skillType = skills[i].skillType?.en
    if (!types.includes(skillType)) {
      types.push(skillType)
    }
  }

  const filterSkills = types.map((type) => {
    return skills.filter((skill) => skill.skillType?.en === type)
  })

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: `${getURL(locale)}skills` }}
      />
      <section
        id='mySkill'
        aria-label={t('sectionHeader')}
        className='my-10 max-w-4xl mx-auto py-20 px-4 sm:px-10'
      >
        <H1 className='text-5xl my-5'>{t('sectionHeader')}</H1>
        <P className='text-xl opacity-70 mb-24'>{t('description')}</P>

        {filterSkills.map((skills: Skill[]) => (
          <div key={skills[0].skillType?.en}>
            <h2 className='text-4xl text-center md:text-start font-bold text-primary pb-5 mt-12 border-b-2'>
              {skills[0].skillType?.[locale]}
            </h2>
            <ul className='flex my-8 items-center justify-center md:justify-start gap-x-5 gap-y-5 flex-wrap'>
              {skills.map((skill: Skill) => (
                <li
                  key={skill.name}
                  title={skill.name}
                  style={{
                    backgroundColor:
                      skill.color?.background?.hex || 'hsl(var(--foreground))',
                    color: skill.color?.text?.hex || 'hsl(var(--background))',
                    boxShadow: `0px 0px 5px ${skill.color?.text?.hex}`,
                  }}
                  className='border dark:border-foreground child:w-28 child:text-center hover:scale-110 transition-transform cursor-pointer child:flex child:flex-col child:items-center child:gap-2 child:py-1 child:px-1 md:child:py-3 md:child:px-3 rounded-md'
                >
                  <a href={skill.link} target='_blank'>
                    <CustomImage
                      width={32}
                      height={32}
                      src={skill.icon.asset.url}
                      alt={skill.icon.alt || `${skill.name} Icon`}
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
    </>
  )
}
