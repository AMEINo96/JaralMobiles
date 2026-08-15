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
              description: 'Tip: For the best look on desktop and mobile, use a wide aspect ratio (e.g., 1920x800px). Avoid extremely tall images to prevent destroying the layout.',
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
              type: 'string',
              description: 'Where the user goes when they click this banner (e.g., /shop or https://...).',
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
