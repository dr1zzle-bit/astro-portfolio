import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'mainMenu',
            title: 'Main Menu',
            description: 'Order and select visible sheets',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'sheet' }] }],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Global Contact Email (Fallback)',
            type: 'string',
        }),
    ],
})
