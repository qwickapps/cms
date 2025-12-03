import type { CollectionConfig } from 'payload';

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Material UI icon name (e.g., Speed, Security, Cloud)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional feature image',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Core Feature', value: 'core' },
        { label: 'Benefit', value: 'benefit' },
        { label: 'Capability', value: 'capability' },
      ],
      admin: {
        description: 'Feature category for grouping',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional link to learn more',
      },
    },
  ],
};
