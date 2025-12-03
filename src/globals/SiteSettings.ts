import { GlobalConfig } from 'payload';

/**
 * Site Settings - Basic site information and contact details
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site',
  admin: {
    description: 'Basic site information, branding, and contact details',
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    // Basic Site Information
    {
      type: 'collapsible',
      label: 'Site Information',
      admin: {
        description: 'Basic information about your site that appears in browser tabs, search results, and social media shares.',
      },
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'QwickPress',
          admin: {
            description: 'The name of your website (used in page titles and branding)',
          },
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          admin: {
            description: 'A brief description of your site (used in meta tags and search results)',
          },
        },
        {
          name: 'siteUrl',
          type: 'text',
          admin: {
            description: 'The full URL of your site (e.g., https://example.com)',
          },
        },
      ],
    },

    // Branding
    {
      type: 'collapsible',
      label: 'Branding',
      admin: {
        description: 'Visual branding elements that appear across your site.',
      },
      fields: [
        {
          name: 'logoIcon',
          type: 'radio',
          defaultValue: 'qwick-icon',
          options: [
            {
              label: 'QwickIcon (Default)',
              value: 'qwick-icon',
            },
            {
              label: 'Custom Icon/Image',
              value: 'custom-icon',
            },
            {
              label: 'No Icon',
              value: 'none',
            },
          ],
          admin: {
            description: 'Icon to display alongside your logo text',
            layout: 'horizontal',
          },
        },
        {
          name: 'customLogoIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload a custom icon/image for your logo',
            condition: (data: any) => data.logoIcon === 'custom-icon',
          },
        },
        {
          name: 'logoText',
          type: 'text',
          admin: {
            description: 'Text to display in the logo (uses siteName if not provided). Use "wick" prefix for product logos (e.g., "wick Press")',
            placeholder: 'Leave empty to use Site Name',
          },
        },
        {
          name: 'logoBadge',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Top Right', value: 'top-right' },
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Center', value: 'top-center' },
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Center', value: 'bottom-center' },
            { label: 'Start', value: 'start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'end' },
          ],
          admin: {
            description: 'Optional badge/indicator position on the logo',
          },
        },
        {
          name: 'logoBadgeShape',
          type: 'select',
          defaultValue: 'circle',
          options: [
            { label: 'Circle', value: 'circle' },
            { label: 'Star', value: 'star' },
            { label: 'Square', value: 'square' },
            { label: 'Heart', value: 'heart' },
          ],
          admin: {
            description: 'Shape of the badge',
            condition: (data: any) => data.logoBadge && data.logoBadge !== 'none',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Small icon that appears in browser tabs (recommended: 32x32 PNG or ICO)',
          },
        },
        {
          name: 'copyrightText',
          type: 'text',
          admin: {
            description: 'Copyright text shown in footer (e.g., "© 2025 Your Company. All rights reserved.")',
            placeholder: '© {year} {siteName}. All rights reserved.',
          },
        },
      ],
    },

    // Contact Information
    {
      type: 'collapsible',
      label: 'Contact Information',
      admin: {
        description: 'Contact details displayed on your site and used for communications.',
      },
      fields: [
        {
          name: 'adminEmail',
          type: 'email',
          required: true,
          admin: {
            description: 'Primary admin email for system notifications and important messages',
          },
        },
        {
          name: 'supportEmail',
          type: 'email',
          admin: {
            description: 'Public support email displayed on contact pages',
          },
        },
        {
          name: 'contactPhone',
          type: 'text',
          admin: {
            description: 'Contact phone number (e.g., +1-555-123-4567)',
          },
        },
        {
          name: 'businessAddress',
          type: 'group',
          admin: {
            description: 'Physical business address (used for contact pages and schema markup)',
          },
          fields: [
            { name: 'street', type: 'text', label: 'Street Address' },
            { name: 'city', type: 'text' },
            { name: 'state', type: 'text', label: 'State / Province' },
            { name: 'postalCode', type: 'text', label: 'Postal / Zip Code' },
            { name: 'country', type: 'text' },
          ],
        },
      ],
    },

    // Social Media
    {
      type: 'collapsible',
      label: 'Social Media',
      admin: {
        description: 'Links to your social media profiles (displayed in footer and used for social sharing).',
      },
      fields: [
        {
          name: 'socialMedia',
          type: 'group',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              admin: {
                description: 'Full URL to your Facebook page (e.g., https://facebook.com/yourpage)',
              },
            },
            {
              name: 'twitter',
              type: 'text',
              admin: {
                description: 'Full URL to your Twitter/X profile (e.g., https://twitter.com/yourhandle)',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              admin: {
                description: 'Full URL to your Instagram profile',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: {
                description: 'Full URL to your LinkedIn company page or profile',
              },
            },
            {
              name: 'youtube',
              type: 'text',
              admin: {
                description: 'Full URL to your YouTube channel',
              },
            },
            {
              name: 'github',
              type: 'text',
              admin: {
                description: 'Full URL to your GitHub organization or profile',
              },
            },
          ],
        },
      ],
    },
  ],
};
