import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'module.contact',
    title: 'Contact Module',
    type: 'object',
    fields: [
        defineField({
            name: 'miniTitle',
            title: 'Mini Title (Eyebrow)',
            type: 'string',
            description: 'Small text above content e.g. "03 / Contact"',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            description: 'Main heading e.g. "Let\'s create something together."',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: 'Short description below the heading',
        }),

        defineField({
            name: 'formName',
            title: 'Netlify Form Name',
            type: 'string',
            initialValue: 'contact',
        }),
        defineField({
            name: 'showHoneypot',
            title: 'Enable Spam Protection (Honeypot)',
            type: 'boolean',
            initialValue: true,
        }),
    ],
})
