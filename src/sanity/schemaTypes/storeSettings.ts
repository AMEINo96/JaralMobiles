import { defineField, defineType } from 'sanity'

export const storeSettings = defineType({
  name: 'storeSettings',
  title: 'Store Settings',
  type: 'document',
  fields: [
    // --- BRANDING & SEO ---
    defineField({
      name: 'siteLogo',
      title: 'Website Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload your shop logo. Appears in the navbar and browser tab.',
      group: 'branding',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Website Title (Browser Tab)',
      type: 'string',
      description: 'The text shown in the browser tab and Google search results.',
      group: 'branding',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Website Description (SEO)',
      type: 'text',
      description: 'The description shown under your website title in Google search results.',
      group: 'branding',
    }),

    // --- PAYMENTS & WHATSAPP ---
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'payments',
    }),
    defineField({
      name: 'easypaisaDetails',
      title: 'EasyPaisa Details',
      type: 'string',
      group: 'payments',
    }),
    defineField({
      name: 'jazzcashDetails',
      title: 'JazzCash Details',
      type: 'string',
      group: 'payments',
    }),
    defineField({
      name: 'bankDetails',
      title: 'Bank Account Details',
      type: 'text',
      group: 'payments',
    }),

    // --- STORE INFO & LINKS ---
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      group: 'storeInfo',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'text',
      group: 'storeInfo',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Contact Email',
      type: 'string',
      group: 'storeInfo',
    }),
    defineField({
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url',
      group: 'storeInfo',
    }),
    defineField({
      name: 'facebookLink',
      title: 'Facebook Link',
      type: 'url',
      group: 'storeInfo',
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Embedded Link (iframe URL)',
      type: 'url',
      group: 'storeInfo',
    }),

    // --- EMAIL TEMPLATES ---
    defineField({
      name: 'orderEmailIntro',
      title: 'Order Confirmation Email (Intro)',
      type: 'text',
      description: 'Custom introductory message sent to customers when they place an order.',
      group: 'emails',
    }),
    defineField({
      name: 'repairEmailIntro',
      title: 'Repair Ticket Email (Intro)',
      type: 'text',
      description: 'Custom introductory message sent to customers when they book a repair.',
      group: 'emails',
    }),

    // --- ANNOUNCEMENT ---
    defineField({
      name: 'announcementActive',
      title: 'Activate Announcement?',
      type: 'boolean',
      initialValue: false,
      group: 'announcement',
    }),
    defineField({
      name: 'announcementType',
      title: 'Announcement Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Top Banner', value: 'banner' },
          { title: 'Popup Modal', value: 'popup' },
        ],
      },
      hidden: ({ parent }) => !parent?.announcementActive,
      group: 'announcement',
    }),
    defineField({
      name: 'announcementText',
      title: 'Announcement Text',
      type: 'text',
      hidden: ({ parent }) => !parent?.announcementActive,
      group: 'announcement',
    }),
    defineField({
      name: 'announcementLink',
      title: 'Announcement URL (Optional)',
      type: 'url',
      hidden: ({ parent }) => !parent?.announcementActive,
      group: 'announcement',
    }),
  ],
  groups: [
    { name: 'branding', title: 'Branding & SEO' },
    { name: 'payments', title: 'Payments & WhatsApp' },
    { name: 'storeInfo', title: 'Store Info & Links' },
    { name: 'emails', title: 'Email Templates' },
    { name: 'announcement', title: 'Announcements' },
  ]
})
