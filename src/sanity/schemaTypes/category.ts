import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'iconName',
      title: 'Category Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Smartphone', value: 'smartphone' },
          { title: 'Headphones/Earbuds', value: 'headphones' },
          { title: 'Smartwatch', value: 'watch' },
          { title: 'Cable/Wire', value: 'cable' },
          { title: 'Charger/Battery', value: 'battery' },
          { title: 'Case/Protection', value: 'shield' },
          { title: 'Repair/Service', value: 'wrench' },
          { title: 'Camera/Lenses', value: 'camera' },
          { title: 'Laptop/Tablet', value: 'laptop' },
          { title: 'Speaker/Audio', value: 'speaker' },
        ],
      },
      description: 'Select an icon to represent this category.',
    }),
  ],
})
