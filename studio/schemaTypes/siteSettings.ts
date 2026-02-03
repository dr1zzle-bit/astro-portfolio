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
            name: 'about',
            title: 'About Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'icon', type: 'string', description: 'Lucide icon name' }),
                        defineField({ name: 'description', type: 'text' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
        }),
    ],
})
