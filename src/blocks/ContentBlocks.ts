/**
 * Shared Content Blocks for QwickPress
 *
 * These blocks can be used across Pages, Posts, Products, and other collections
 * to build flexible, data-driven layouts.
 *
 * Blocks map to QwickApps Framework components for consistent rendering.
 *
 * All blocks inherit from framework ViewSchema which provides comprehensive styling props.
 * See: /packages/qwickapps-react-framework/src/schemas/ViewSchema.ts
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Block, Field } from 'payload';

/**
 * Common ViewSchema fields - can be added to any block
 * These map directly to framework component props
 */
const commonStyleFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Layout & Spacing',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'padding',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Tiny', value: 'tiny' },
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
          { label: 'Huge', value: 'huge' },
        ],
        admin: {
          description: 'Internal spacing',
        },
      },
      {
        name: 'marginTop',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Tiny', value: 'tiny' },
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
          { label: 'Huge', value: 'huge' },
        ],
        admin: {
          description: 'Space above block',
        },
      },
      {
        name: 'marginBottom',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Tiny', value: 'tiny' },
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
          { label: 'Huge', value: 'huge' },
        ],
        admin: {
          description: 'Space below block',
        },
      },
      {
        name: 'width',
        type: 'text',
        admin: {
          description: 'Width (e.g., "100%", "large", "600px")',
          placeholder: 'auto',
        },
      },
      {
        name: 'maxWidth',
        type: 'select',
        options: [
          { label: 'Extra Small (444px)', value: 'xs' },
          { label: 'Small (600px)', value: 'sm' },
          { label: 'Medium (900px)', value: 'md' },
          { label: 'Large (1200px)', value: 'lg' },
          { label: 'Extra Large (1536px)', value: 'xl' },
          { label: 'Full Width', value: 'false' },
        ],
        admin: {
          description: 'Maximum content width',
        },
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Colors & Background',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'background',
        type: 'text',
        label: 'Background Color',
        admin: {
          description: 'Background color (theme variable or custom)',
          components: {
            Field: '/src/admin/fields/ColorInput#ColorInput',
          },
        },
      },
      {
        name: 'color',
        type: 'text',
        label: 'Text Color',
        admin: {
          description: 'Text color (theme variable or custom)',
          components: {
            Field: '/src/admin/fields/ColorInput#ColorInput',
          },
        },
      },
      {
        name: 'backgroundImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Background image',
        },
      },
      {
        name: 'backgroundGradient',
        type: 'textarea',
        admin: {
          description: 'CSS gradient',
          placeholder: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Advanced',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'className',
        type: 'text',
        admin: {
          description: 'Additional CSS class names',
          placeholder: 'custom-class',
        },
      },
      {
        name: 'sx',
        type: 'textarea',
        admin: {
          description: 'MUI sx prop as JSON for advanced styling',
          placeholder: '{"boxShadow": 2, "borderRadius": 2}',
        },
      },
      {
        name: 'id',
        type: 'text',
        admin: {
          description: 'HTML element ID',
          placeholder: 'unique-id',
        },
      },
    ],
  },
];

/**
 * Hero Block - Large header section with title, subtitle, and actions
 * Maps to: @qwickapps/react-framework HeroBlock component
 */
export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block (e.g., "Home page hero")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading text',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Optional subtitle or description',
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
      admin: {
        description: 'Text alignment',
      },
    },
    {
      name: 'blockHeight',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full Viewport', value: 'viewport' },
      ],
    },
    {
      name: 'actions',
      type: 'array',
      label: 'Call-to-Action Buttons',
      admin: {
        description: 'Add buttons for hero actions (e.g., "Get Started", "Learn More")',
        components: {
          RowLabel: {
            path: '/src/admin/components/ButtonRowLabel#ButtonRowLabel',
            clientProps: {},
          },
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Button text label',
          },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            description: 'Button destination URL',
          },
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
          admin: {
            description: 'Button style variant',
          },
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Error', value: 'error' },
            { label: 'Warning', value: 'warning' },
            { label: 'Info', value: 'info' },
            { label: 'Success', value: 'success' },
          ],
          admin: {
            description: 'Button color theme',
          },
        },
        {
          name: 'buttonSize',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            description: 'Button size',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name for start of button (e.g., "rocket_launch", "play_arrow")',
            placeholder: 'rocket_launch',
          },
        },
        {
          name: 'endIcon',
          type: 'text',
          admin: {
            description: 'Icon name for end of button (e.g., "arrow_forward", "open_in_new")',
            placeholder: 'arrow_forward',
          },
        },
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make button stretch to full container width',
          },
        },
      ],
    },
    ...commonStyleFields,
  ],
};

/**
 * Text Section Block - Simple section with heading and rich text content
 * Maps to: @qwickapps/react-framework Section component
 */
export const TextSectionBlock: Block = {
  slug: 'textSection',
  labels: {
    singular: 'Text Section',
    plural: 'Text Sections',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Section heading (optional)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Rich text content',
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
      ],
      admin: {
        description: 'Text alignment',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Feature Grid Block - Grid of features from Features collection
 * Maps to: @qwickapps/react-framework GridLayout + GridCell components
 */
export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the grid',
      },
    },
    {
      name: 'features',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select features to display',
      },
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
      admin: {
        description: 'Number of columns (responsive)',
      },
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Tiny', value: 'tiny' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Huge', value: 'huge' },
      ],
      admin: {
        description: 'Space between grid items',
      },
    },
    {
      name: 'equalHeight',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Make all grid items the same height',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * CTA Section Block - Call-to-action section with buttons
 * Maps to: @qwickapps/react-framework Section component
 */
export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description text',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Action Buttons',
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Add call-to-action buttons (1-3 buttons recommended)',
        components: {
          RowLabel: {
            path: '/src/admin/components/ButtonRowLabel#ButtonRowLabel',
            clientProps: {},
          },
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Button text label',
          },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            description: 'Button destination URL',
          },
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
          admin: {
            description: 'Button style variant',
          },
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Error', value: 'error' },
            { label: 'Warning', value: 'warning' },
            { label: 'Info', value: 'info' },
            { label: 'Success', value: 'success' },
          ],
          admin: {
            description: 'Button color theme',
          },
        },
        {
          name: 'buttonSize',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            description: 'Button size',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name for start of button (e.g., "rocket_launch", "play_arrow")',
            placeholder: 'rocket_launch',
          },
        },
        {
          name: 'endIcon',
          type: 'text',
          admin: {
            description: 'Icon name for end of button (e.g., "arrow_forward", "open_in_new")',
            placeholder: 'arrow_forward',
          },
        },
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make button stretch to full container width',
          },
        },
      ],
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
      admin: {
        description: 'Text alignment',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Image Block - Single image with optional caption
 * Maps to: Next.js Image component
 */
export const ImageBlock: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Optional caption',
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full Width', value: 'full' },
      ],
      admin: {
        description: 'Image display size',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Spacer Block - Add vertical spacing between sections
 */
export const SpacerBlock: Block = {
  slug: 'spacer',
  labels: {
    singular: 'Spacer',
    plural: 'Spacers',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small (24px)', value: 'small' },
        { label: 'Medium (48px)', value: 'medium' },
        { label: 'Large (96px)', value: 'large' },
        { label: 'Extra Large (144px)', value: 'xlarge' },
      ],
    },
  ],
};

/**
 * Code Block - Display code snippets with syntax highlighting
 * Maps to: @qwickapps/react-framework Code component
 */
export const CodeBlock: Block = {
  slug: 'code',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Code content to display',
      },
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'javascript',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'PHP', value: 'php' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'JSON', value: 'json' },
        { label: 'XML', value: 'xml' },
        { label: 'SQL', value: 'sql' },
        { label: 'Bash', value: 'bash' },
        { label: 'Plain Text', value: 'text' },
      ],
      admin: {
        description: 'Programming language for syntax highlighting',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title for the code block',
      },
    },
    {
      name: 'showCopy',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show copy to clipboard button',
      },
    },
    {
      name: 'showLineNumbers',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display line numbers',
      },
    },
    {
      name: 'wrapLines',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Wrap long lines instead of scrolling',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Product Grid Block - Display products from Products collection
 * Maps to: @qwickapps/react-framework ProductCard component
 */
export const ProductGridBlock: Block = {
  slug: 'productGrid',
  labels: {
    singular: 'Product Grid',
    plural: 'Product Grids',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the product grid',
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: ['products', 'fashion-products'], // Support multiple product collections
      hasMany: true,
      required: true,
      admin: {
        description: 'Select products to display (from any product collection)',
      },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'compact',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Detailed', value: 'detailed' },
      ],
      admin: {
        description: 'Product card display variant',
      },
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      admin: {
        description: 'Number of columns (responsive)',
      },
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Tiny', value: 'tiny' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Huge', value: 'huge' },
      ],
      admin: {
        description: 'Space between product cards',
      },
    },
    {
      name: 'equalHeight',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Make all product cards the same height',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Accordion Block - Collapsible content sections (FAQ style)
 * Maps to: @qwickapps/react-framework CollapsibleLayout component
 */
export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the accordion',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      minRows: 1,
      admin: {
        description: 'Add accordion sections (e.g., FAQ questions)',
        components: {
          RowLabel: {
            path: '/src/admin/components/AccordionItemRowLabel#AccordionItemRowLabel',
            clientProps: {},
          },
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Item title/question',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          admin: {
            description: 'Item content/answer',
          },
        },
        {
          name: 'defaultExpanded',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Expand this item by default',
          },
        },
      ],
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Allow multiple items to be expanded at once',
      },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'outlined',
      options: [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' },
        { label: 'Plain', value: 'plain' },
      ],
      admin: {
        description: 'Accordion visual style',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Card Grid Block - Flexible card grid for custom content
 * Maps to: @qwickapps/react-framework GridLayout with custom cards
 */
export const CardGridBlock: Block = {
  slug: 'cardGrid',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the card grid',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      admin: {
        description: 'Add cards with icons, images, and links',
        components: {
          RowLabel: {
            path: '/src/admin/components/CardRowLabel#CardRowLabel',
            clientProps: {},
          },
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Card title/heading',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Card description text',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional card image (uploaded)',
          },
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: {
            description: 'External image URL (use if not uploading)',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional emoji or icon character',
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link URL',
          },
        },
        {
          name: 'linkText',
          type: 'text',
          admin: {
            description: 'Link button text (defaults to "Learn More")',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      admin: {
        description: 'Number of columns (responsive)',
      },
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Tiny', value: 'tiny' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Huge', value: 'huge' },
      ],
      admin: {
        description: 'Space between cards',
      },
    },
    {
      name: 'cardVariant',
      type: 'select',
      defaultValue: 'outlined',
      options: [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Elevated', value: 'elevation' },
        { label: 'Filled', value: 'filled' },
      ],
      admin: {
        description: 'Card visual style',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Form Block - References a reusable form from Forms collection
 * Submissions are saved to FormSubmissions collection
 *
 * AI-First: Forms can be managed via /api/forms endpoints
 */
export const FormBlock: Block = {
  slug: 'form',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Select a form from the Forms collection',
      },
    },
    {
      name: 'overrideHeading',
      type: 'text',
      admin: {
        description: 'Override the form heading for this instance (optional)',
      },
    },
    {
      name: 'overrideDescription',
      type: 'textarea',
      admin: {
        description: 'Override the form description for this instance (optional)',
      },
    },
    {
      name: 'overrideSubmitButtonText',
      type: 'text',
      admin: {
        description: 'Override the submit button text for this instance (optional)',
      },
    },
    {
      name: 'overrideSuccessMessage',
      type: 'text',
      admin: {
        description: 'Override the success message for this instance (optional)',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * Markdown Block - Markdown-formatted text content
 * Maps to: @qwickapps/react-framework Markdown component
 */
export const MarkdownBlock: Block = {
  slug: 'markdown',
  labels: {
    singular: 'Markdown Content',
    plural: 'Markdown Content',
  },
  admin: {
    components: {
      Label: {
        path: '/src/admin/components/BlockRowLabel#BlockRowLabel',
        clientProps: {},
      },
    },
  },
  fields: [
    {
      name: 'blockName',
      type: 'text',
      admin: {
        description: 'Optional custom name for this block',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the content',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Content is required';
        }
        if (value.length > 50000) {
          return 'Content is too long (maximum 50,000 characters)';
        }
        return true;
      },
      admin: {
        description: 'Markdown-formatted text content (max 50,000 characters)',
        rows: 15,
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Text alignment',
      },
    },
    ...commonStyleFields,
  ],
};

/**
 * All content blocks - export as array for easy reuse
 */
export const contentBlocks: Block[] = [
  HeroBlock,
  TextSectionBlock,
  MarkdownBlock,
  FeatureGridBlock,
  CTASectionBlock,
  ImageBlock,
  SpacerBlock,
  CodeBlock,
  ProductGridBlock,
  AccordionBlock,
  CardGridBlock,
  FormBlock,
];
