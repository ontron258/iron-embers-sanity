import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {
      name: 'translations',
      title: 'Translations',
    },
    {
      name: 'details',
      title: 'Details',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'translations',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'translations',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'details',
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'externalSku',
      title: 'External SKU',
      type: 'string',
      group: 'details',
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'translations',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      group: 'translations',
      fields: [
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              {title: 'CAD', value: 'CAD'},
              {title: 'USD', value: 'USD'},
              {title: 'EUR', value: 'EUR'},
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        },
        {
          name: 'compareAtPrice',
          title: 'Compare at Price',
          type: 'number',
          description: 'Original price for showing discounts',
          validation: (Rule) => Rule.positive(),
        },
        {
          name: 'taxRate',
          title: 'Tax Rate (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      group: 'details',
      options: {
        hotspot: true,
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sku: 'SKU',
      price: 'pricing.price',
      currency: 'pricing.currency',
      media: 'image',
      language: 'language',
    },
    prepare(selection) {
      const {title, sku, price, currency, media, language} = selection
      const languageLabels = {
        'en-ca': '🇨🇦 EN',
        'en-us': '🇺🇸 EN',
        fr: '🇫🇷 FR',
      }
      return {
        title: title,
        subtitle: `${languageLabels[language as keyof typeof languageLabels] || language} | ${currency}${price || 'No price'} | SKU: ${sku || 'No SKU'}`,
        media: media,
      }
    },
  },
})
