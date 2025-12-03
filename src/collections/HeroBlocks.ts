import type { CollectionConfig } from 'payload';

export const HeroBlocks: CollectionConfig = {
  slug: 'hero-blocks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'height'],
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
      admin: {
        description: 'Main hero title text',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Hero subtitle or description',
      },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Full',
          value: 'full',
        },
      ],
    },
    {
      name: 'backgroundGradient',
      type: 'text',
      admin: {
        description: 'CSS gradient string for background (e.g., linear-gradient(135deg, #667eea 0%, #764ba2 100%))',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional background image (overrides gradient)',
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'ctaButtons',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
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
          ],
        },
      ],
    },
  ],
};
