import { NextSeo } from 'next-seo'
import Projects from '../Home/Projects'
import { useTranslation } from 'next-i18next'
import { getURL } from '../../utils/helpers'
import { useRouter } from 'next/router'
import { H2 } from '@/components/ui/Typography/headers'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/sanity/sanity.client'
import {
  ALL_PROJECTS_CATEGORIES_QUERY,
  getProjects,
} from '@/sanity/queries/projects'
import { Skeleton } from '@/components/ui/skeleton'
import { ProjectCardSkeleton } from '@/components/Home/ProjectCard'

export default function ProjectsLayout({
  projects: projectsAPI,
  categories: categoriesAPI,
  preview = false,
}) {
  const locale = useRouter().locale
  const { t } = useTranslation('projects')

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: isErrorCategories,
  } = useQuery({
    queryKey: ['ProjectsCategories'],
    queryFn: () => client.fetch(ALL_PROJECTS_CATEGORIES_QUERY),
    initialData: categoriesAPI,
    enabled: !preview,
  })

  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: isErrorProjects,
  } = useQuery({
    queryKey: ['ProjectsAll'],
    queryFn: () => client.fetch(getProjects()),
    initialData: projectsAPI,
    enabled: !preview,
  })

  const BASE_CATEGORIES = [
    {
      title: t('sectionHeader'),
      description: t('sectionDescription'),
      projects: [...projects],
    },
  ]

  const sections = [
    ...categories.map((i) => {
      return {
        title: locale === 'ar' ? i.title.ar : i.title.en,
        description: locale === 'ar' ? i.description?.ar : i.description?.en,
        projects: [...i.projects],
      }
    }),
    ...BASE_CATEGORIES,
  ]

  if (isLoadingCategories || isLoadingProjects)
    return [1, 2, 3].map((_) => {
      return (
        <section className='my-32 min-h-full flex flex-col text-primary w-full px-4 sm:px-10 overflow-hidden'>
          <div className='flex flex-col  gap-3'>
            <Skeleton className='w-72 mx-auto py-4' />
            <Skeleton className='w-96 mx-auto p-2' />
            <Separator className='my-2' />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 items-center'>
            {[1, 2, 3, 4, 5, 6].map((_) => (
              <ProjectCardSkeleton />
            ))}
          </div>
        </section>
      )
    })

  return (
    <>
      <NextSeo
        title={t('title')}
        description={t('description')}
        openGraph={{ url: `${getURL(locale)}projects` }}
      />
      <div className='my-32'>
        {sections.map((section) => {
          const title = section.title
          const description = section.description
          const projects = section.projects

          return (
            <section
              className='min-h-full flex flex-col text-primary w-full px-4 sm:px-10 overflow-hidden'
              aria-label={`${title}`}
            >
              <div className='flex flex-col mx-auto md:mx-0 text-center'>
                <H2 className='my-0 border-none'>{title}</H2>
                {description && (
                  <p className='text-foreground text-lg p-2'>{description}</p>
                )}
                <Separator className='my-2' />
              </div>
              <Projects projects={projects} />
            </section>
          )
        })}
      </div>
    </>
  )
}
