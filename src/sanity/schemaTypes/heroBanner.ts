import { defineField, defineType } from 'sanity'

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal Reference)',
      type: 'string',
      description: 'For internal use only, e.g., "Main Homepage Banners".',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Banner Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text (SEO / Accessibility)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link URL (Optional)',
              type: 'url',
              description: 'Where the user goes when they click this banner.',
            }),
          ],
          preview: {
            select: {
              title: 'altText',
              media: 'image',
            },
          },
        },
      ],
      description: 'Upload and reorder banner slides. Drag to change order.',
    }),
  ],
})
