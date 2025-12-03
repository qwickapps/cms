import type { CollectionConfig } from 'payload';

/**
 * Footer Collection
 *
 * Configurable footer sections and links for the website.
 * Supports multiple footer columns with customizable content.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
export const Footer: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this footer configuration (e.g., "Main Footer", "Minimal Footer")',
      },
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      defaultValue: 'main',
      options: [
        {
          label: 'Main Footer',
          value: 'main',
        },
        {
          label: 'Alternative Footer',
          value: 'alternative',
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Footer Sections',
      admin: {
        description: 'Define footer columns/sections with links and content',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Section heading (e.g., "Company", "Resources", "Contact")',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Section Items',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Display text for the link or item',
              },
            },
            {
              name: 'href',
              type: 'text',
              admin: {
                description: 'URL for the link (optional for plain text items)',
              },
            },
            {
              name: 'external',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Open link in new tab',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'orientation',
      type: 'select',
      defaultValue: 'horizontal',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      admin: {
        description: 'Layout orientation for footer sections',
      },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' },
      ],
      admin: {
        description: 'Visual style variant',
      },
    },
    {
      name: 'showDivider',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show divider line above footer',
      },
    },
  ],
};
