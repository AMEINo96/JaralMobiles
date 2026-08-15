import { defineField, defineType } from 'sanity'

export const repairSettings = defineType({
  name: 'repairSettings',
  title: 'Repair Menu Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'repairBrands',
      title: 'Repair Brands Menu',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add brands available for repair (e.g., Apple, Samsung, etc.)',
      initialValue: [
        'Apple',
        'Samsung',
        'Google Pixel',
        'OnePlus',
        'Xiaomi',
        'Oppo',
        'Vivo'
      ],
    }),
    defineField({
      name: 'repairIssues',
      title: 'Repair Issues Menu',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add issues available for repair (e.g., Screen Replacement, Battery)',
      initialValue: [
        'Screen Replacement',
        'Battery Replacement',
        'Charging Port Repair',
        'Water Damage Diagnostic',
        'Camera Repair',
        'Speaker / Microphone Repair',
        'Software / Firmware Issue'
      ],
    }),
  ],
})
