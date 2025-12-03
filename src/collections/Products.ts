import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'releaseDate', 'pinned', 'order'],
    description: 'Manage your product catalog. Add new products, update details, and showcase your offerings.',
    listSearchableFields: ['name', 'slug', 'tagline'],
    components: {
      beforeList: ['/node_modules/@qwickapps/cms/dist/admin/components/ProductsListHeader#ProductsListHeader'],
    },
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true, // Temporarily allow public create for POC
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly product identifier (e.g., framework, builder, cms-api)',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'Short product tagline',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
        ],
      }),
      admin: {
        description: 'Detailed product description',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Product icon/logo',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Product showcase image',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Product category (e.g., AI Development Platform, Development Framework)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Beta', value: 'beta' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Pin this product to appear first in the list',
        position: 'sidebar',
      },
    },
    {
      name: 'releaseDate',
      type: 'date',
      admin: {
        description: 'Product release date (used for sorting)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'technologies',
      type: 'text',
      admin: {
        description: 'Comma-separated list of technologies (e.g., React, TypeScript, Node.js)',
      },
    },
    {
      name: 'actions',
      type: 'array',
      admin: {
        description: 'Custom action buttons for the product card',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique identifier for this action',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Button label text',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'URL or path to navigate to',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'contained',
          options: [
            { label: 'Contained', value: 'contained' },
            { label: 'Outlined', value: 'outlined' },
            { label: 'Text', value: 'text' },
          ],
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Error', value: 'error' },
          ],
        },
        {
          name: 'disabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Open link in a new tab',
          },
        },
      ],
    },
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        description: 'GitHub repository URL',
      },
    },
    {
      name: 'docsUrl',
      type: 'text',
      admin: {
        description: 'Documentation URL',
      },
    },
    {
      name: 'demoUrl',
      type: 'text',
      admin: {
        description: 'Live demo URL',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order on products page',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (defaults to product name if not set)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description (defaults to tagline if not set)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords (comma-separated)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image for social sharing (defaults to product image if not set)',
          },
        },
      ],
    },
  ],
};
