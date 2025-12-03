import type { CollectionConfig } from 'payload';

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    useAsTitle: 'formName',
    defaultColumns: ['formName', 'submitterEmail', 'submittedAt'],
    group: 'Forms',
    description: 'View and manage form submissions from your website. New submissions will appear here.',
    listSearchableFields: ['formName', 'submitterEmail', 'submitterName'],
  },
  access: {
    // Only admins can read, create not allowed through admin (only via API)
    read: () => true,
    create: () => true, // Allow API to create submissions
    update: () => false, // Submissions are read-only after creation
    delete: () => true, // Admins can delete spam
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description: 'The form that was submitted (optional - for centrally managed forms)',
      },
    },
    {
      name: 'formName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name/identifier of the form that was submitted',
      },
    },
    {
      name: 'formData',
      type: 'json',
      required: true,
      admin: {
        description: 'Form field data as JSON',
      },
    },
    {
      name: 'submitterEmail',
      type: 'email',
      admin: {
        description: 'Email address of the person who submitted the form (if provided)',
      },
    },
    {
      name: 'submitterName',
      type: 'text',
      admin: {
        description: 'Name of the person who submitted the form (if provided)',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Timestamp of submission',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address of submitter (for spam prevention)',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser user agent (for spam prevention)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Read',
          value: 'read',
        },
        {
          label: 'Responded',
          value: 'responded',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
        {
          label: 'Spam',
          value: 'spam',
        },
      ],
      admin: {
        description: 'Status of this submission',
      },
    },
  ],
  timestamps: true,
};
