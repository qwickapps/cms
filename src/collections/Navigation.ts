import type { CollectionConfig } from 'payload';

export const Navigation: CollectionConfig = {
  slug: 'navigation',
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
        description: 'Internal name for this navigation menu (e.g., "Main Menu", "Footer Menu")',
      },
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      defaultValue: 'main',
      options: [
        {
          label: 'Main Navigation',
          value: 'main',
        },
        {
          label: 'Footer Navigation',
          value: 'footer',
        },
        {
          label: 'Mobile Menu',
          value: 'mobile',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Navigation Items',
      required: true,
      admin: {
        components: {
          RowLabel: {
            path: '/src/admin/components/NavigationItemRowLabel#NavigationItemRowLabel',
            clientProps: {},
          },
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'route',
          type: 'text',
          required: true,
          admin: {
            description: 'URL path (e.g., "/" or "/pages/about")',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name (optional)',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Sub-menu Items',
          admin: {
            components: {
              RowLabel: {
                path: '/src/admin/components/NavigationSubItemRowLabel#NavigationSubItemRowLabel',
                clientProps: {},
              },
            },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'route',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
