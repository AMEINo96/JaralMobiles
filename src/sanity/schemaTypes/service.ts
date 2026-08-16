import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Digital & In-Store Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., Document Printouts, Photo Printing',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'A brief description of what this service includes.',
    }),
    defineField({
      name: 'iconName',
      title: 'Service Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Printer / Printouts', value: 'printer' },
          { title: 'Camera / Photos', value: 'camera' },
          { title: 'Smartphone / Mobile', value: 'smartphone' },
          { title: 'File / Document', value: 'file-text' },
          { title: 'Image / Picture', value: 'image' },
          { title: 'Wifi / Network', value: 'wifi' },
          { title: 'Credit Card / Top-up', value: 'credit-card' },
          { title: 'Download', value: 'download' },
          { title: 'Monitor / Computer', value: 'monitor' },
          { title: 'Scissors / Cut', value: 'scissors' },
        ],
      },
      description: 'Select an icon to represent this service.',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Pre-filled WhatsApp Message',
      type: 'text',
      description: 'The exact message that will be pre-filled when the customer clicks the WhatsApp button. (e.g., "Hi, I need some document printouts. Here are my files:")',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Turn off to temporarily hide this service from the website without deleting it.',
      initialValue: true,
    }),
  ],
})
