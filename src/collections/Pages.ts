import type { CollectionConfig } from 'payload';
import { contentBlocks } from '../blocks/ContentBlocks.js';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    description: 'Create and manage pages for your website. Pages are standalone content like Home, About, Contact, etc.',
    listSearchableFields: ['title', 'slug'],
    group: 'Content',
    components: {
      beforeList: ['/node_modules/@qwickapps/cms/dist/admin/components/PagesListHeader#PagesListHeader'],
    },
  },
  access: {
    read: () => true,
    create: () => true, // Temporarily allow public create for seeding
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for this page (e.g., "home", "about", "contact")',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Content',
      blocks: contentBlocks,
      admin: {
        description: 'Build your page using content blocks',
        initCollapsed: false,
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'keywords',
          type: 'text',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
};
