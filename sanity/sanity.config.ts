import { defineConfig } from 'sanity'
import { StructureBuilder, deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { myTheme } from './theme'
import StudioNavbar from '../components/SanityStudio/StudioNavbar'
import Logo from '../components/SanityStudio/Logo'
import { getDefaultDocumentNode } from './deskStructure'
import { codeInput } from '@sanity/code-input'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { colorInput } from '@sanity/color-input'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['aboutPage'])

const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string
) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

const projects = [
  { typeName: 'project', title: 'Projects' },
  { typeName: 'skill', title: 'Project Skills' },
]

const certificate = [
  { typeName: 'certificate', title: 'Certificate' },
  { typeName: 'provider', title: 'Provider' },
  { typeName: 'mySkill', title: 'My Skills' },
]

const blog = [
  { typeName: 'post', title: 'post' },
  { typeName: 'author', title: 'Author', hidden: true },
  { typeName: 'category', title: 'Category' },
  { typeName: 'customNoteType', title: 'Note Types' },
]

const pages = [{ typeName: 'aboutPage', title: 'About Page' }]

const others = [{ typeName: 'assets', title: 'Assets' }]

const documentCategories = [projects, certificate, blog]

export default defineConfig({
  basePath: '/studio',
  name: 'Mohanad_Blog_Studio',
  title: 'Mohanad Blog Studio',
  projectId,
  dataset,

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            ...projects.map((type) => S.documentTypeListItem(type.typeName)),
            S.divider(),
            ...certificate.map((type) => S.documentTypeListItem(type.typeName)),
            S.divider(),
            ...blog
              .filter((item) => item.hidden !== true)
              .map((type) => S.documentTypeListItem(type.typeName)),
            S.divider(),
            ...pages.map((page) =>
              singletonListItem(S, page.typeName, page.title)
            ),
            S.divider(),
            ...others.map((type) => S.documentTypeListItem(type.typeName)),
          ])
      },
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool(),
    codeInput(),
    vercelDeployTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      // Filter out singleton types from the global “New document” menu options
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },

  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  theme: myTheme,
})
