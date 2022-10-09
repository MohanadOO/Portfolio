import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'a9lgvy57',
  dataset: 'production',
  apiVersion: '2022-10-06',
  useCdn: false,
})
