import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { storeSettings } from './storeSettings'
import { heroBanner } from './heroBanner'
import { repairSettings } from './repairSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, storeSettings, heroBanner, repairSettings],
}
