import { GlobalConfig } from 'payload';

/**
 * Advanced Settings - Custom scripts, SEO, and maintenance mode
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
export const AdvancedSettings: GlobalConfig = {
  slug: 'advanced-settings',
  label: 'Advanced',
  admin: {
    description: 'Advanced configuration for custom scripts, SEO defaults, and maintenance mode',
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    // SEO Defaults
    {
      type: 'collapsible',
      label: 'SEO Defaults',
      admin: {
        description: 'Default SEO settings used when pages don\'t have their own meta tags.',
      },
      fields: [
        {
          name: 'seo',
          type: 'group',
          fields: [
            {
              name: 'defaultTitle',
              type: 'text',
              label: 'Default Page Title',
              admin: {
                description: 'Used as fallback when page doesn\'t have a custom title (e.g., "Your Site Name - Tagline")',
              },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              label: 'Default Meta Description',
              admin: {
                description: 'Used as fallback for meta description tag (150-160 characters recommended)',
              },
            },
            {
              name: 'defaultKeywords',
              type: 'text',
              label: 'Default Keywords',
              admin: {
                description: 'Comma-separated keywords (note: most search engines ignore this now)',
              },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default Open Graph Image',
              admin: {
                description: 'Default image for social media shares (recommended: 1200x630 pixels)',
              },
            },
          ],
        },
      ],
    },

    // Custom Scripts & CSS
    {
      type: 'collapsible',
      label: 'Custom Scripts & CSS',
      admin: {
        description: 'Add custom JavaScript and CSS to your site. ⚠️ Use with caution - incorrect code can break your site.',
      },
      fields: [
        {
          name: 'customScripts',
          type: 'group',
          fields: [
            {
              name: 'headerScripts',
              type: 'code',
              label: 'Header Scripts',
              admin: {
                description: 'JavaScript code injected in <head> section. Runs before page content loads. Use for critical scripts, custom analytics, or third-party integrations.',
                language: 'javascript',
              },
            },
            {
              name: 'footerScripts',
              type: 'code',
              label: 'Footer Scripts',
              admin: {
                description: 'JavaScript code injected before </body>. Runs after page content loads. Recommended for non-critical scripts to improve page load speed.',
                language: 'javascript',
              },
            },
            {
              name: 'customCss',
              type: 'code',
              label: 'Custom CSS',
              admin: {
                description: 'Custom CSS styles applied globally across your site. Use for minor style tweaks without editing theme files.',
                language: 'css',
              },
            },
          ],
        },
      ],
    },

    // Maintenance Mode
    {
      type: 'collapsible',
      label: 'Maintenance Mode',
      admin: {
        description: 'Temporarily take your site offline while you perform updates or maintenance.',
      },
      fields: [
        {
          name: 'maintenance',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enable Maintenance Mode',
              defaultValue: false,
              admin: {
                description: '⚠️ When enabled, visitors will see a maintenance page. Admin users can still access the site.',
              },
            },
            {
              name: 'message',
              type: 'textarea',
              label: 'Maintenance Message',
              defaultValue: 'We are currently performing scheduled maintenance. We\'ll be back soon!',
              admin: {
                description: 'Message displayed to visitors during maintenance',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'allowedIPs',
              type: 'textarea',
              label: 'Allowed IP Addresses',
              admin: {
                description: 'Comma-separated list of IP addresses that can bypass maintenance mode (e.g., 192.168.1.1, 10.0.0.5)',
                placeholder: '192.168.1.1, 10.0.0.5',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
      ],
    },
  ],
};
