import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  description: 'Site general settings, header and footer configuration.',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
      group: 'content',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'content',
    }),
    defineField({
      name: 'gridScale',
      title: 'Grid Layout Scale',
      description: 'Scale factor for the home page grid items (e.g. 1.0 = 100%, 1.3 = 130%).',
      type: 'number',
      initialValue: 1.0,
      validation: (Rule) => Rule.min(0.5).max(2.0).precision(1),
      group: 'content',
    }),
    defineField({
      name: 'gridScaleMobile',
      title: 'Mobile Grid Layout Scale',
      description: 'Scale factor for grid items on mobile devices (<768px).',
      type: 'number',
      initialValue: 1.0,
      validation: (Rule) => Rule.min(0.5).max(2.0).precision(1),
      group: 'content',
    }),
    defineField({
      name: 'gridResolution',
      title: 'Grid Layout Resolution',
      description: 'Multiplier for thumbnail resolution (1.0 = 400x500px). Increase for sharper images on large screens.',
      type: 'number',
      initialValue: 1.0,
      validation: (Rule) => Rule.min(0.5).max(3.0).precision(1),
      group: 'content',
    }),
    defineField({
      name: 'titleSuffix',
      title: 'Suffix for page titles',
      description:
        'Suffix to append to the title tag of all pages, except in pages where the this behavior is disabled.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Global SEO Description',
      description: 'Default meta description for the site. 150-160 characters recommended.',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Global SEO Share Image',
      description: 'Default image used for social sharing (Open Graph / Twitter). Recommended size: 1200x630px.',
      type: 'image',
      group: 'seo',
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
      name: 'seoKeywords',
      title: 'Global SEO Keywords',
      description: 'Keywords separated by commas.',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})
