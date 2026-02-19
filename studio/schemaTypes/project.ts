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
                defineField({
                    name: 'useCrop',
                    title: 'Use Crop in Lightbox',
                    type: 'boolean',
                    description: 'If checked, the lightbox will use the cropped version. If unchecked, it shows the full uncropped image.',
                    initialValue: false,
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
            name: 'youtubeEmbed',
            title: 'Featured YouTube Video',
            description: 'Full-width video displayed above the gallery. Optional.',
            type: 'url',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            options: {
                layout: 'grid',
            },
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
                        defineField({
                            name: 'useCrop',
                            title: 'Use Crop in Lightbox',
                            type: 'boolean',
                            description: 'If checked, the lightbox will use the cropped version. If unchecked, it shows the full uncropped image.',
                            initialValue: false,
                        }),
                    ],
                }),
                defineField({
                    name: 'video',
                    type: 'file',
                    title: 'Video File',
                    options: {
                        accept: 'video/mp4,video/webm',
                    },
                    fields: [
                        defineField({
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text (Hidden)',
                        }),
                    ],
                }),
                defineField({
                    name: 'youtube',
                    type: 'object',
                    title: 'YouTube Video',
                    fields: [
                        defineField({
                            name: 'url',
                            type: 'url',
                            title: 'YouTube URL',
                        }),
                        defineField({
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'caption',
                            subtitle: 'url',
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'galleryColumns',
            title: 'Gallery Columns',
            type: 'number',
            description: 'Number of columns for the gallery grid (default: 3)',
            initialValue: 3,
            validation: (Rule) => Rule.min(1).max(5),
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
