import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'module.services',
    title: 'Services Module',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'Services',
        }),
        defineField({
            name: 'miniTitle',
            title: 'Mini Title (Eyebrow)',
            type: 'string',
            description: 'Small text above content e.g. "01 / Services"',
        }),
        defineField({
            name: 'services',
            title: 'Services List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'icon', type: 'string', description: 'Lucide icon name e.g. "star", "code", "pen"' }),
                        defineField({ name: 'description', type: 'text', rows: 3 }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'actionButton',
            title: 'Action Button',
            type: 'object',
            fields: [
                defineField({ name: 'label', type: 'string', title: 'Label' }),
                defineField({ name: 'file', type: 'file', title: 'File Download' }),
                defineField({ name: 'url', type: 'url', title: 'External URL' }),
            ],
        }),
    ],
})
