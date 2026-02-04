import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'sheet',
    title: 'Sheet / Menu Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Menu Title',
            type: 'string',
            description: 'The label on the menu button (e.g. "About", "Services")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (ID)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            description: 'Unique identifier for the sheet (e.g. "about", "contact")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'modules',
            title: 'Content Modules',
            type: 'array',
            of: [
                { type: 'module.about' },
                { type: 'module.services' },
                { type: 'module.contact' },
                { type: 'module.text' },
            ],
        }),
    ],
})
