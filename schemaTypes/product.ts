import {defineType, defineField} from 'sanity'

// Define supported languages with regional variants
const supportedLanguages = [
  {id: 'en_us', title: 'English (US)', isDefault: true},
  {id: 'en_ca', title: 'English (Canada)'},
  {id: 'fr', title: 'French'},
  // Add more languages as needed
]

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      fields: supportedLanguages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: lang.isDefault ? undefined : 'translations',
      })),
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value?.en_us) return 'English (US) title is required'
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Preview)',
      type: 'slug',
      options: {
        source: (doc) => doc.title?.en_us || '',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      fields: supportedLanguages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'text',
        fieldset: lang.isDefault ? undefined : 'translations',
      })),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      fields: supportedLanguages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'object',
        fieldset: lang.isDefault ? undefined : 'translations',
        fields: [
          defineField({
            name: 'currency',
            title: 'Currency',
            type: 'string',
            options: {
              list: [
                {title: 'USD ($)', value: 'USD'},
                {title: 'EUR (€)', value: 'EUR'},
                {title: 'GBP (£)', value: 'GBP'},
                {title: 'CAD (C$)', value: 'CAD'},
                {title: 'AUD (A$)', value: 'AUD'},
              ],
            },
            initialValue: lang.id === 'en_us' ? 'USD' : lang.id === 'en_ca' ? 'CAD' : undefined,
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
            description: "Enter the price as a text value (e.g., '100.00')",
            validation: (Rule) => Rule.required(),
          }),
        ],
      })),
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value?.en_us?.price || !value?.en_us?.currency) {
            return 'English (US) pricing is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title.en_us',
      subtitle: 'pricing.en_us.price',
      currency: 'pricing.en_us.currency',
      media: 'image',
    },
    prepare({title, subtitle, currency, media}) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `${currency} ${subtitle}` : 'No price available',
        media,
      }
    },
  },
})
