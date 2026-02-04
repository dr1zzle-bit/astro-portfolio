import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'module.about',
    title: 'About Module',
    type: 'object',
    fields: [
        defineField({
            name: 'miniTitle',
            title: 'Mini Title (Eyebrow)',
            type: 'string',
            description: 'Small text above content e.g. "01 / Profile"',
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'content',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'facts',
            title: 'Facts List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string', title: 'Label' }),
                        defineField({ name: 'value', type: 'string', title: 'Value' }),
                    ],
                },
            ],
        }),
    ],
})
