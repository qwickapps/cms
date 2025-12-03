/**
 * Automations Collection
 *
 * Stores automation definitions for the QwickApps automation framework.
 * Each automation defines a trigger (event that starts the automation) and
 * a series of actions to execute when triggered.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { CollectionConfig, Field } from 'payload';

/**
 * Payload Hook Trigger Configuration Fields
 * Shown when trigger type is 'payload-hook'
 */
const payloadHookFields: Field[] = [
  {
    name: 'collection',
    type: 'select',
    required: true,
    options: [
      { label: 'Pages', value: 'pages' },
      { label: 'Posts', value: 'posts' },
      { label: 'Media', value: 'media' },
      { label: 'Users', value: 'users' },
      { label: 'Forms', value: 'forms' },
      { label: 'Form Submissions', value: 'form-submissions' },
      { label: 'Products', value: 'products' },
      { label: 'Navigation', value: 'navigation' },
      { label: 'Footer', value: 'footer' },
    ],
    admin: {
      description: 'Which collection should trigger this automation?',
      condition: (data) => data?.trigger?.type === 'payload-hook',
    },
  },
  {
    name: 'event',
    type: 'select',
    required: true,
    options: [
      { label: 'After Create', value: 'afterCreate' },
      { label: 'After Update', value: 'afterUpdate' },
      { label: 'After Delete', value: 'afterDelete' },
      { label: 'Before Create', value: 'beforeCreate' },
      { label: 'Before Update', value: 'beforeUpdate' },
      { label: 'Before Delete', value: 'beforeDelete' },
    ],
    admin: {
      description: 'Which event should trigger this automation?',
      condition: (data) => data?.trigger?.type === 'payload-hook',
    },
  },
];

/**
 * Schedule Trigger Configuration Fields
 * Shown when trigger type is 'schedule'
 */
const scheduleFields: Field[] = [
  {
    name: 'scheduleType',
    type: 'select',
    required: true,
    options: [
      { label: 'Every Hour', value: 'hourly' },
      { label: 'Every Day', value: 'daily' },
      { label: 'Every Week', value: 'weekly' },
      { label: 'Every Month', value: 'monthly' },
      { label: 'Custom (Cron)', value: 'custom' },
    ],
    admin: {
      description: 'How often should this automation run?',
      condition: (data) => data?.trigger?.type === 'schedule',
    },
  },
  {
    name: 'scheduleTime',
    type: 'text',
    admin: {
      description: 'Time to run (e.g., "09:00" for 9 AM)',
      placeholder: '09:00',
      condition: (data) =>
        data?.trigger?.type === 'schedule' &&
        ['daily', 'weekly', 'monthly'].includes(data?.trigger?.scheduleType),
    },
  },
  {
    name: 'scheduleDayOfWeek',
    type: 'select',
    options: [
      { label: 'Monday', value: '1' },
      { label: 'Tuesday', value: '2' },
      { label: 'Wednesday', value: '3' },
      { label: 'Thursday', value: '4' },
      { label: 'Friday', value: '5' },
      { label: 'Saturday', value: '6' },
      { label: 'Sunday', value: '0' },
    ],
    admin: {
      description: 'Day of the week to run',
      condition: (data) =>
        data?.trigger?.type === 'schedule' && data?.trigger?.scheduleType === 'weekly',
    },
  },
  {
    name: 'scheduleDayOfMonth',
    type: 'number',
    min: 1,
    max: 31,
    admin: {
      description: 'Day of the month to run (1-31)',
      condition: (data) =>
        data?.trigger?.type === 'schedule' && data?.trigger?.scheduleType === 'monthly',
    },
  },
  {
    name: 'cronExpression',
    type: 'text',
    admin: {
      description: 'Custom cron expression (e.g., "0 9 * * 1-5" for weekdays at 9 AM)',
      placeholder: '0 9 * * *',
      condition: (data) =>
        data?.trigger?.type === 'schedule' && data?.trigger?.scheduleType === 'custom',
    },
  },
];

/**
 * Webhook Trigger Configuration Fields
 * Shown when trigger type is 'webhook'
 */
const webhookTriggerFields: Field[] = [
  {
    name: 'webhookPath',
    type: 'text',
    required: true,
    admin: {
      description: 'URL path for the webhook endpoint (will be: /api/webhooks/automations/{path})',
      placeholder: 'my-webhook',
      condition: (data) => data?.trigger?.type === 'webhook',
    },
  },
  {
    name: 'webhookMethod',
    type: 'select',
    defaultValue: 'POST',
    options: [
      { label: 'POST', value: 'POST' },
      { label: 'GET', value: 'GET' },
    ],
    admin: {
      description: 'HTTP method for the webhook',
      condition: (data) => data?.trigger?.type === 'webhook',
    },
  },
  {
    name: 'webhookSecret',
    type: 'text',
    admin: {
      description: 'Optional secret for webhook authentication (will be checked in X-Webhook-Secret header)',
      condition: (data) => data?.trigger?.type === 'webhook',
    },
  },
];

/**
 * Send Email Action Configuration Fields
 */
const sendEmailFields: Field[] = [
  {
    name: 'emailTo',
    type: 'text',
    required: true,
    admin: {
      description: 'Recipient email. For form submissions use {{data.formData.email}} or {{data.submitterEmail}}',
      placeholder: 'recipient@example.com or {{data.formData.email}}',
    },
  },
  {
    name: 'emailSubject',
    type: 'text',
    required: true,
    admin: {
      description: 'Email subject line. Use {{data.fieldName}} for dynamic values',
      placeholder: 'New submission from {{data.formData.name}}',
    },
  },
  {
    name: 'emailBody',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Email body content. For form submissions, fields are under {{data.formData.X}}',
      placeholder: 'Hello,\n\nYou have a new submission:\n\nName: {{data.formData.name}}\nEmail: {{data.formData.email}}\nMessage: {{data.formData.message}}',
    },
  },
  {
    name: 'emailFrom',
    type: 'text',
    admin: {
      description: 'Sender email (leave empty to use default)',
      placeholder: 'noreply@example.com',
    },
  },
  {
    name: 'emailReplyTo',
    type: 'text',
    admin: {
      description: 'Reply-to email address',
      placeholder: '{{data.email}}',
    },
  },
];

/**
 * Webhook Action Configuration Fields
 */
const webhookActionFields: Field[] = [
  {
    name: 'webhookUrl',
    type: 'text',
    required: true,
    admin: {
      description: 'URL to send the webhook request to',
      placeholder: 'https://api.example.com/webhook',
    },
  },
  {
    name: 'webhookActionMethod',
    type: 'select',
    defaultValue: 'POST',
    options: [
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'PATCH', value: 'PATCH' },
      { label: 'GET', value: 'GET' },
      { label: 'DELETE', value: 'DELETE' },
    ],
    admin: {
      description: 'HTTP method for the request',
    },
  },
  {
    name: 'webhookHeaders',
    type: 'array',
    admin: {
      description: 'Custom headers to include in the request',
    },
    fields: [
      {
        name: 'key',
        type: 'text',
        required: true,
        admin: {
          placeholder: 'Authorization',
        },
      },
      {
        name: 'value',
        type: 'text',
        required: true,
        admin: {
          placeholder: 'Bearer {{env.API_KEY}}',
        },
      },
    ],
  },
  {
    name: 'webhookPayloadTemplate',
    type: 'textarea',
    admin: {
      description: 'JSON payload template (leave empty to send trigger data as-is)',
      placeholder: '{\n  "event": "{{trigger.event}}",\n  "data": {{json data}}\n}',
    },
  },
];

/**
 * Rules Engine Action Configuration Fields
 */
const rulesEngineFields: Field[] = [
  {
    name: 'rules',
    type: 'array',
    admin: {
      description: 'Define rules to evaluate. If any rule passes, the configured actions will run.',
    },
    fields: [
      {
        name: 'ruleName',
        type: 'text',
        required: true,
        admin: {
          description: 'Name for this rule',
          placeholder: 'High value order',
        },
      },
      {
        name: 'conditions',
        type: 'array',
        required: true,
        minRows: 1,
        admin: {
          description: 'Conditions that must ALL be true for this rule to pass',
        },
        fields: [
          {
            name: 'field',
            type: 'text',
            required: true,
            admin: {
              description: 'Field path to check (e.g., "data.amount" or "data.status")',
              placeholder: 'data.amount',
            },
          },
          {
            name: 'operator',
            type: 'select',
            required: true,
            options: [
              { label: 'Equals', value: 'equal' },
              { label: 'Not Equals', value: 'notEqual' },
              { label: 'Greater Than', value: 'greaterThan' },
              { label: 'Greater Than or Equal', value: 'greaterThanInclusive' },
              { label: 'Less Than', value: 'lessThan' },
              { label: 'Less Than or Equal', value: 'lessThanInclusive' },
              { label: 'Contains', value: 'contains' },
              { label: 'Does Not Contain', value: 'doesNotContain' },
              { label: 'In List', value: 'in' },
              { label: 'Not In List', value: 'notIn' },
            ],
            admin: {
              description: 'Comparison operator',
            },
          },
          {
            name: 'value',
            type: 'text',
            required: true,
            admin: {
              description: 'Value to compare against',
              placeholder: '100',
            },
          },
        ],
      },
      {
        name: 'ruleActions',
        type: 'array',
        admin: {
          description: 'Actions to run if this rule passes (in addition to main actions)',
        },
        fields: [
          {
            name: 'setFact',
            type: 'text',
            admin: {
              description: 'Set a fact/variable for subsequent rules',
              placeholder: 'isHighValue',
            },
          },
          {
            name: 'setFactValue',
            type: 'text',
            admin: {
              description: 'Value to set',
              placeholder: 'true',
            },
          },
        ],
      },
    ],
  },
];

/**
 * Maps collection slugs to human-readable names
 */
const collectionLabels: Record<string, string> = {
  pages: 'page',
  posts: 'post',
  media: 'media item',
  users: 'user',
  forms: 'form',
  'form-submissions': 'form submission',
  products: 'product',
  navigation: 'navigation',
  footer: 'footer',
};

/**
 * Maps event types to human-readable descriptions
 */
const eventLabels: Record<string, string> = {
  afterCreate: 'After new',
  afterUpdate: 'After',
  afterDelete: 'After',
  beforeCreate: 'Before new',
  beforeUpdate: 'Before',
  beforeDelete: 'Before',
};

/**
 * Maps event types to action verbs
 */
const eventVerbs: Record<string, string> = {
  afterCreate: 'is created',
  afterUpdate: 'is updated',
  afterDelete: 'is deleted',
  beforeCreate: 'is created',
  beforeUpdate: 'is updated',
  beforeDelete: 'is deleted',
};

/**
 * Generate human-readable trigger description
 */
function generateTriggerDescription(trigger: any): string {
  if (!trigger?.type) return 'Not configured';

  switch (trigger.type) {
    case 'payload-hook': {
      const collection = trigger.collection || 'record';
      const event = trigger.event || 'afterCreate';
      const label = collectionLabels[collection] || collection;
      const prefix = eventLabels[event] || 'When';
      const verb = eventVerbs[event] || 'changes';
      return `${prefix} ${label} ${verb}`;
    }
    case 'schedule': {
      const scheduleType = trigger.scheduleType || 'daily';
      const scheduleLabels: Record<string, string> = {
        hourly: 'Every hour',
        daily: 'Every day',
        weekly: 'Every week',
        monthly: 'Every month',
        custom: 'Custom schedule',
      };
      return scheduleLabels[scheduleType] || 'On schedule';
    }
    case 'webhook':
      return `Webhook: ${trigger.webhookPath || 'custom'}`;
    case 'manual':
      return 'Manual trigger';
    default:
      return trigger.type;
  }
}

export const Automations: CollectionConfig = {
  slug: 'automations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'triggerDescription', 'enabled', 'updatedAt'],
    group: 'System',
    description: 'Create automated workflows triggered by events, schedules, or webhooks',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc) {
          doc.triggerDescription = generateTriggerDescription(doc.trigger);
        }
        return doc;
      },
    ],
  },
  fields: [
    // Virtual field for list view (computed via afterRead hook)
    {
      name: 'triggerDescription',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true, // Hide from edit form, only show in list view
      },
      hooks: {
        beforeChange: [
          () => undefined, // Prevent storing in DB
        ],
      },
    },
    // Basic Info
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '70%',
            description: 'Give your automation a descriptive name',
            placeholder: 'Send welcome email to new users',
          },
        },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '30%',
            description: 'Enable/disable',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Describe what this automation does (optional)',
        placeholder: 'This automation sends a welcome email whenever a new user registers...',
      },
    },

    // Trigger Configuration
    {
      type: 'collapsible',
      label: 'When to Run (Trigger)',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'trigger',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'payload-hook',
              options: [
                {
                  label: 'When a record is created/updated/deleted',
                  value: 'payload-hook',
                },
                {
                  label: 'On a schedule (daily, weekly, etc.)',
                  value: 'schedule',
                },
                {
                  label: 'When a webhook is received',
                  value: 'webhook',
                },
                {
                  label: 'Manual trigger only',
                  value: 'manual',
                },
              ],
              admin: {
                description: 'What should trigger this automation?',
              },
            },
            // Payload Hook fields
            ...payloadHookFields,
            // Schedule fields
            ...scheduleFields,
            // Webhook trigger fields
            ...webhookTriggerFields,
          ],
        },
      ],
    },

    // Actions Configuration
    {
      type: 'collapsible',
      label: 'What to Do (Actions)',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'actions',
          type: 'array',
          required: true,
          minRows: 1,
          labels: {
            singular: 'Action',
            plural: 'Actions',
          },
          admin: {
            description: 'Define what happens when this automation runs. Actions execute in order.',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'actionName',
              type: 'text',
              admin: {
                description: 'Name for this action (optional, helps identify in logs)',
                placeholder: 'Send notification email',
              },
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'send-email',
              options: [
                {
                  label: 'Send Email',
                  value: 'send-email',
                },
                {
                  label: 'Call External Webhook',
                  value: 'webhook',
                },
                {
                  label: 'Evaluate Rules (Conditional Logic)',
                  value: 'rules-engine',
                },
              ],
              admin: {
                description: 'What type of action is this?',
              },
            },

            // Send Email Configuration
            {
              type: 'group',
              name: 'emailConfig',
              label: 'Email Settings',
              admin: {
                condition: (_data, siblingData) => siblingData?.type === 'send-email',
              },
              fields: sendEmailFields,
            },

            // Webhook Action Configuration
            {
              type: 'group',
              name: 'webhookConfig',
              label: 'Webhook Settings',
              admin: {
                condition: (_data, siblingData) => siblingData?.type === 'webhook',
              },
              fields: webhookActionFields,
            },

            // Rules Engine Configuration
            {
              type: 'group',
              name: 'rulesConfig',
              label: 'Rules Configuration',
              admin: {
                condition: (_data, siblingData) => siblingData?.type === 'rules-engine',
              },
              fields: rulesEngineFields,
            },

            // Conditional execution
            {
              type: 'collapsible',
              label: 'Conditional Execution (Advanced)',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'skipIf',
                  type: 'group',
                  admin: {
                    description: 'Skip this action if a condition is met',
                  },
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description: 'Enable conditional skip',
                      },
                    },
                    {
                      name: 'field',
                      type: 'text',
                      admin: {
                        description: 'Field to check (e.g., "data.status")',
                        placeholder: 'data.status',
                        condition: (_data, siblingData) => siblingData?.enabled,
                      },
                    },
                    {
                      name: 'operator',
                      type: 'select',
                      options: [
                        { label: 'Equals', value: 'equals' },
                        { label: 'Not Equals', value: 'notEquals' },
                        { label: 'Is Empty', value: 'isEmpty' },
                        { label: 'Is Not Empty', value: 'isNotEmpty' },
                      ],
                      admin: {
                        condition: (_data, siblingData) => siblingData?.enabled,
                      },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      admin: {
                        description: 'Value to compare',
                        condition: (_data, siblingData) =>
                          siblingData?.enabled &&
                          ['equals', 'notEquals'].includes(siblingData?.operator),
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // Execution Settings
    {
      type: 'collapsible',
      label: 'Advanced Settings',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'retryOnFailure',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Retry failed actions automatically',
          },
        },
        {
          name: 'maxRetries',
          type: 'number',
          defaultValue: 3,
          min: 1,
          max: 10,
          admin: {
            description: 'Maximum number of retry attempts',
            condition: (data) => data?.retryOnFailure,
          },
        },
        {
          name: 'logExecutions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Log execution history for debugging',
          },
        },
      ],
    },
  ],
  timestamps: true,
};
