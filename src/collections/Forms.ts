/**
 * Forms Collection
 *
 * Central repository for reusable form definitions.
 * Forms can be referenced from Form blocks across multiple pages.
 *
 * AI-First Design:
 * - REST API: /api/forms (GET, POST, PUT, DELETE)
 * - Form submission: /api/forms/:id/submit
 * - Analytics: /api/forms/:id/submissions
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { CollectionConfig } from 'payload';

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'formName',
    defaultColumns: ['formName', 'description', 'createdAt', 'updatedAt'],
    group: 'Forms',
    description: 'Create and manage reusable forms that can be used across your site',
    listSearchableFields: ['formName', 'title', 'description'],
  },
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  access: {
    read: () => true, // Public forms can be read by anyone
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'formName',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this form (e.g., "contact-form", "newsletter-signup")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display title for the form',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description shown above the form',
      },
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Form Fields',
      minRows: 1,
      required: true,
      admin: {
        description: 'Define the fields for this form',
        components: {
          RowLabel: {
            path: '/src/admin/components/FormFieldRowLabel#FormFieldRowLabel',
            clientProps: {},
          },
        },
      },
      fields: [
        {
          name: 'fieldName',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal field name (e.g., "email", "firstName") - must be unique within form',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Label displayed to users',
          },
        },
        {
          name: 'inputType',
          type: 'select',
          required: true,
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'tel' },
            { label: 'Number', value: 'number' },
            { label: 'Multiline Text', value: 'textarea' },
            { label: 'Select Dropdown', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make this field required',
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          admin: {
            description: 'Placeholder text shown in the input',
          },
        },
        {
          name: 'options',
          type: 'array',
          label: 'Options (for select fields)',
          admin: {
            description: 'Options for select dropdown fields',
            condition: (data, siblingData) => siblingData?.inputType === 'select',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'validation',
          type: 'group',
          label: 'Validation Rules',
          admin: {
            description: 'Additional validation rules for this field',
          },
          fields: [
            {
              name: 'minLength',
              type: 'number',
              admin: {
                description: 'Minimum character length',
                condition: (data, siblingData) =>
                  ['text', 'email', 'tel', 'textarea'].includes(siblingData?.inputType),
              },
            },
            {
              name: 'maxLength',
              type: 'number',
              admin: {
                description: 'Maximum character length',
                condition: (data, siblingData) =>
                  ['text', 'email', 'tel', 'textarea'].includes(siblingData?.inputType),
              },
            },
            {
              name: 'min',
              type: 'number',
              admin: {
                description: 'Minimum value',
                condition: (data, siblingData) => siblingData?.inputType === 'number',
              },
            },
            {
              name: 'max',
              type: 'number',
              admin: {
                description: 'Maximum value',
                condition: (data, siblingData) => siblingData?.inputType === 'number',
              },
            },
            {
              name: 'pattern',
              type: 'text',
              admin: {
                description: 'Regular expression pattern for validation (e.g., [0-9]{3}-[0-9]{4} for phone)',
                condition: (data, siblingData) =>
                  ['text', 'email', 'tel'].includes(siblingData?.inputType),
              },
            },
            {
              name: 'errorMessage',
              type: 'text',
              admin: {
                description: 'Custom error message shown when validation fails',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: 'Submit',
      admin: {
        description: 'Text displayed on the submit button',
      },
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thank you for your submission!',
      admin: {
        description: 'Message shown after successful submission',
      },
    },
    {
      name: 'redirectUrl',
      type: 'text',
      admin: {
        description: 'Optional URL to redirect to after successful submission (leave empty to show success message)',
      },
    },
    {
      name: 'notifications',
      type: 'group',
      label: 'Email Notifications',
      admin: {
        description: 'Configure email notifications for form submissions',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Email Notifications',
        },
        {
          name: 'recipients',
          type: 'text',
          admin: {
            description: 'Comma-separated list of email addresses to notify',
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
        {
          name: 'subject',
          type: 'text',
          defaultValue: 'New Form Submission',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
        {
          name: 'replyTo',
          type: 'text',
          admin: {
            description: 'Field name to use for reply-to email (e.g., "email")',
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Form Settings',
      fields: [
        {
          name: 'allowMultipleSubmissions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow users to submit this form multiple times',
          },
        },
        {
          name: 'requireAuth',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Require users to be logged in to submit',
          },
        },
        {
          name: 'enableCaptcha',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable CAPTCHA protection (requires configuration)',
          },
        },
        {
          name: 'storeSubmissions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Store submissions in the database',
          },
        },
      ],
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};
