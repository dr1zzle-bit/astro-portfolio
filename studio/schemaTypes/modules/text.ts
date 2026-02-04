import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'module.text',
    title: 'Text Content Module',
    type: 'object',
    fields: [
        defineField({
            name: 'miniTitle',
            title: 'Mini Title (Eyebrow)',
            type: 'string',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Rich Text Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})
