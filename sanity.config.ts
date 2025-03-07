import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {defineField} from 'sanity'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Iron Embers Sanity',

  projectId: '7i47lgnj',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      // Required: supported languages
      supportedLanguages: [
        {id: 'en-ca', title: 'English (Canada)'},
        {id: 'en-us', title: 'English (USA)'},
        {id: 'fr', title: 'French'},
      ],
      // Required: document types to enable translations for
      schemaTypes: ['product'],

      // Optional configurations
      languageField: 'language', // matches your schema
      weakReferences: true,
      bulkPublish: true,
      apiVersion: '2024-02-20', // Current API version

      // Enable management of translations for existing documents
      allowCreateMetaDoc: true,

      // Optional: Additional metadata fields
      metadataFields: [
        defineField({
          name: 'slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
        }),
      ],

      // Optional: Callback after translation creation
      callback: async ({
        sourceDocument,
        newDocument,
        sourceLanguageId,
        destinationLanguageId,
        metaDocumentId,
        client,
      }) => {
        console.log(`Created translation: ${destinationLanguageId} from ${sourceLanguageId}`)
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
