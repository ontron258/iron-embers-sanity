import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'string'},
        {name: 'fr', title: 'Français', type: 'string'},
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Preview)',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text'},
        {name: 'fr', title: 'Français', type: 'text'},
      ],
    }),
    defineField({
      name: 'prices',
      title: 'Prices',
      type: 'object',
      fields: [
        {name: 'usd', title: 'USD ($)', type: 'number'},
        {name: 'eur', title: 'EUR (€)', type: 'number'},
        {name: 'gbp', title: 'GBP (£)', type: 'number'},
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'prices.usd',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `$${subtitle}` : 'No price available',
        media,
      }
    },
  },
})
