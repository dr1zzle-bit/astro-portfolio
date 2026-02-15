import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }),
            ],
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            description: 'Shown on hover in the grid',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [
                defineField({
                    name: 'image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'details',
            title: 'Project Details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title Override',
            description: 'Overrides the default title (Project Title | Site Title). Optional.',
            type: 'string',
            fieldset: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description Override',
            description: 'Overrides the short description for search engines. Optional.',
            type: 'text',
            rows: 3,
            fieldset: 'seo',
        }),
        defineField({
            name: 'seoImage',
            title: 'SEO Share Image Override',
            description: 'Overrides the main image for social sharing. Optional.',
            type: 'image',
            fieldset: 'seo',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }),
            ],
        }),
    ],
    fieldsets: [
        {
            name: 'seo',
            title: 'SEO & Social Sharing',
            options: { collapsible: true, collapsed: true },
        },
    ],
})
