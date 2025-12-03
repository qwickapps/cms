import { GlobalConfig } from 'payload';

/**
 * Integrations Settings - Third-party services (Analytics, CAPTCHA, etc.)
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
export const Integrations: GlobalConfig = {
  slug: 'integrations',
  label: 'Integrations',
  admin: {
    description: 'Configure third-party services and integrations',
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    // Analytics & Tracking
    {
      type: 'collapsible',
      label: 'Analytics & Tracking',
      admin: {
        description: 'Track visitor behavior and measure site performance with analytics tools.',
      },
      fields: [
        {
          name: 'googleAnalytics',
          type: 'group',
          label: 'Google Analytics (GA4)',
          admin: {
            description: 'Google Analytics 4 provides insights into user behavior and traffic sources. Get your Measurement ID from: https://analytics.google.com',
          },
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enable Google Analytics',
              defaultValue: false,
            },
            {
              name: 'measurementId',
              type: 'text',
              label: 'Measurement ID',
              admin: {
                description: 'Format: G-XXXXXXXXXX (found in Analytics Admin → Data Streams → Web Stream Details)',
                placeholder: 'G-XXXXXXXXXX',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
        {
          name: 'googleTagManager',
          type: 'group',
          label: 'Google Tag Manager',
          admin: {
            description: 'Manage all your marketing tags in one place. Create a container at: https://tagmanager.google.com',
          },
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enable Google Tag Manager',
              defaultValue: false,
            },
            {
              name: 'containerId',
              type: 'text',
              label: 'Container ID',
              admin: {
                description: 'Format: GTM-XXXXXXX (found in Tag Manager workspace)',
                placeholder: 'GTM-XXXXXXX',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
        {
          name: 'facebookPixel',
          type: 'group',
          label: 'Facebook Pixel',
          admin: {
            description: 'Track conversions and build audiences for Facebook Ads. Set up at: https://business.facebook.com/events_manager',
          },
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enable Facebook Pixel',
              defaultValue: false,
            },
            {
              name: 'pixelId',
              type: 'text',
              label: 'Pixel ID',
              admin: {
                description: 'Format: 15-16 digit number (found in Events Manager → Data Sources)',
                placeholder: '1234567890123456',
                condition: (data, siblingData) => siblingData?.enabled,
              },
            },
          ],
        },
      ],
    },

    // CAPTCHA Protection
    {
      type: 'collapsible',
      label: 'CAPTCHA Protection',
      admin: {
        description: 'Protect your forms from spam and bot submissions with CAPTCHA.',
      },
      fields: [
        {
          name: 'captcha',
          type: 'group',
          fields: [
            {
              name: 'provider',
              type: 'select',
              label: 'CAPTCHA Provider',
              defaultValue: 'none',
              admin: {
                description: 'Choose a CAPTCHA provider to protect forms from spam. Each has different privacy and UX tradeoffs.',
              },
              options: [
                {
                  label: 'None (Disabled)',
                  value: 'none',
                },
                {
                  label: 'Google reCAPTCHA v2 (Checkbox)',
                  value: 'recaptcha-v2',
                },
                {
                  label: 'Google reCAPTCHA v3 (Invisible)',
                  value: 'recaptcha-v3',
                },
                {
                  label: 'hCaptcha (Privacy-focused)',
                  value: 'hcaptcha',
                },
                {
                  label: 'Cloudflare Turnstile (Invisible)',
                  value: 'turnstile',
                },
              ],
            },
            {
              name: 'siteKey',
              type: 'text',
              label: 'Site Key (Public)',
              admin: {
                description: 'The public site key used in your forms. Get keys from your provider:\n• reCAPTCHA: https://www.google.com/recaptcha/admin\n• hCaptcha: https://dashboard.hcaptcha.com/signup\n• Turnstile: https://dash.cloudflare.com/?to=/:account/turnstile',
                placeholder: 'Enter your site key',
                condition: (data, siblingData) => siblingData?.provider && siblingData.provider !== 'none',
              },
            },
            {
              name: 'secretKey',
              type: 'text',
              label: 'Secret Key (Private)',
              admin: {
                description: '⚠️ IMPORTANT: This key is secret and used for server-side verification. Never expose this publicly. Found in the same admin panel as your site key.',
                placeholder: 'Enter your secret key',
                condition: (data, siblingData) => siblingData?.provider && siblingData.provider !== 'none',
              },
            },
            {
              name: 'threshold',
              type: 'number',
              label: 'Score Threshold (reCAPTCHA v3 only)',
              defaultValue: 0.5,
              min: 0,
              max: 1,
              admin: {
                description: 'Minimum score required (0.0-1.0). Lower = more lenient, Higher = more strict. Default: 0.5',
                condition: (data, siblingData) => siblingData?.provider === 'recaptcha-v3',
              },
            },
          ],
        },
      ],
    },

    // Email Configuration
    {
      type: 'collapsible',
      label: 'Email Configuration',
      admin: {
        description: 'Configure SMTP settings for sending emails from your site.',
      },
      fields: [
        {
          name: 'email',
          type: 'group',
          fields: [
            {
              name: 'provider',
              type: 'select',
              label: 'Email Provider',
              options: [
                { label: 'Console (Development)', value: 'console' },
                { label: 'SMTP', value: 'smtp' },
                { label: 'SendGrid', value: 'sendgrid' },
                { label: 'Mailgun', value: 'mailgun' },
                { label: 'Amazon SES', value: 'ses' },
              ],
              admin: {
                description: 'Choose how emails should be sent. Use Console for development, SMTP or a service for production.',
              },
            },
            {
              name: 'smtpHost',
              type: 'text',
              label: 'SMTP Host',
              admin: {
                description: 'SMTP server hostname (e.g., smtp.gmail.com)',
                condition: (data, siblingData) => siblingData?.provider === 'smtp',
              },
            },
            {
              name: 'smtpPort',
              type: 'number',
              label: 'SMTP Port',
              defaultValue: 587,
              admin: {
                description: 'SMTP port (587 for TLS, 465 for SSL)',
                condition: (data, siblingData) => siblingData?.provider === 'smtp',
              },
            },
            {
              name: 'smtpUser',
              type: 'text',
              label: 'SMTP Username',
              admin: {
                condition: (data, siblingData) => siblingData?.provider === 'smtp',
              },
            },
            {
              name: 'smtpPassword',
              type: 'text',
              label: 'SMTP Password',
              admin: {
                description: '⚠️ Stored securely in the database',
                condition: (data, siblingData) => siblingData?.provider === 'smtp',
              },
            },
            {
              name: 'fromEmail',
              type: 'email',
              label: 'From Email Address',
              admin: {
                description: 'Email address that appears in the "From" field of sent emails',
              },
            },
            {
              name: 'fromName',
              type: 'text',
              label: 'From Name',
              admin: {
                description: 'Name that appears in the "From" field (e.g., "QwickPress Support")',
              },
            },
          ],
        },
      ],
    },
  ],
};
