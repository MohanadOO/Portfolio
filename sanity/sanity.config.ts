import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
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

export default defineConfig({
  basePath: '/studio',
  name: 'Mohanad_Blog_Studio',
  title: 'Mohanad Blog Studio',
  projectId,
  dataset,

  plugins: [
    deskTool({
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    visionTool(),
    codeInput(),
    vercelDeployTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  theme: myTheme,
})
