import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_sanity_project_id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'mobile-shop-studio',
  title: 'Mobile Shop Studio',
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: schema.types,
  },
})
