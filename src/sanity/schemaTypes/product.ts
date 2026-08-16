import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (Rs)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1),
      description: 'Upload one or multiple images for the product.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature in Top Deals',
      type: 'boolean',
      initialValue: false,
      description: 'Turn this on to prioritize showing this product in the Top Deals section.',
    }),
    defineField({
      name: 'hasWarranty',
      title: 'Has Warranty?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'warrantyDuration',
      title: 'Warranty Duration',
      type: 'string',
      hidden: ({ document }) => !document?.hasWarranty,
      description: 'e.g., "6 Months", "1 Year"',
    }),
    defineField({
      name: 'hasReturn',
      title: 'Has Return Policy?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'returnDuration',
      title: 'Return Duration',
      type: 'string',
      hidden: ({ document }) => !document?.hasReturn,
      description: 'e.g., "7 Days", "30 Days"',
    }),
  ],
})
