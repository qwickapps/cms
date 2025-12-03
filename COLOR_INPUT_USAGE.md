# ColorInput Field Component - Usage Guide

## Overview

The ColorInput component is a custom Payload CMS field that provides an intuitive interface for selecting colors with theme variable support.

## Features

- **Theme Variable Selector**: Dropdown with 20+ predefined theme CSS variables
- **Custom Color Picker**: Visual color picker + hex input for custom colors
- **Live Preview**: Shows selected color with variable name
- **Grouped Options**: Variables organized by category (Primary, Secondary, Accent, Semantic, Surface, Text)

## Basic Usage

### Import the Component

```typescript
import { ColorInput } from '../admin/fields';
```

### Replace Text Fields with ColorInput

**Before:**
```typescript
{
  name: 'background',
  type: 'text',
  admin: {
    description: 'Background color',
    placeholder: '#ffffff or primary.main',
  },
}
```

**After:**
```typescript
{
  name: 'background',
  type: 'text',
  admin: {
    description: 'Background color (theme variable or custom)',
    components: {
      Field: {
        path: '/src/admin/fields/ColorInput#ColorInput',
        clientProps: {
          label: 'Background Color',
        },
      },
    },
  },
}
```

## Complete Example

Here's how to update the `commonStyleFields` in ContentBlocks.ts:

```typescript
const commonStyleFields: Field[] = [
  // ... layout fields ...

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
        admin: {
          description: 'Background color (theme variable or custom)',
          components: {
            Field: {
              path: '/src/admin/fields/ColorInput#ColorInput',
              clientProps: {
                label: 'Background Color',
              },
            },
          },
        },
      },
      {
        name: 'color',
        type: 'text',
        admin: {
          description: 'Text color (theme variable or custom)',
          components: {
            Field: {
              path: '/src/admin/fields/ColorInput#ColorInput',
              clientProps: {
                label: 'Text Color',
              },
            },
          },
        },
      },
      // ... other color fields ...
    ],
  },
];
```

## Available Theme Variables

The ColorInput component provides access to these theme variables:

### Primary Colors
- `var(--theme-primary)`
- `var(--theme-primary-light)`
- `var(--theme-primary-dark)`

### Secondary Colors
- `var(--theme-secondary)`
- `var(--theme-secondary-light)`
- `var(--theme-secondary-dark)`

### Accent Colors
- `var(--theme-accent)`
- `var(--theme-accent-light)`
- `var(--theme-accent-dark)`

### Semantic Colors
- `var(--theme-success)`
- `var(--theme-warning)`
- `var(--theme-error)`
- `var(--theme-info)`

### Surface & Background
- `var(--theme-background)`
- `var(--theme-surface)`
- `var(--theme-surface-variant)`
- `var(--theme-surface-elevated)`

### Text Colors
- `var(--theme-text-primary)`
- `var(--theme-text-secondary)`
- `var(--theme-text-inverted)`

## User Experience

When editors use the ColorInput field, they can:

1. **Choose between two modes:**
   - Theme Variable: Select from predefined theme colors (recommended)
   - Custom Color: Use color picker or enter hex value

2. **See live preview:**
   - Color swatch shows the selected color
   - Current value displays the CSS variable or hex code

3. **Benefit from theme support:**
   - Theme variables automatically adapt to light/dark mode
   - Theme variables respect the selected color palette
   - Custom colors remain fixed across themes

## Best Practices

1. **Prefer theme variables** for most use cases:
   ```typescript
   // ✅ Good - adapts to theme
   background: 'var(--theme-surface)'

   // ❌ Avoid unless specific reason - fixed color
   background: '#ffffff'
   ```

2. **Use semantic colors** for consistent branding:
   ```typescript
   // ✅ Good - semantic meaning
   background: 'var(--theme-primary)'
   color: 'var(--theme-on-primary)'

   // ⚠️ Less flexible - hard to change palette
   background: '#007bff'
   color: '#ffffff'
   ```

3. **Respect on-* variables** for accessibility:
   ```typescript
   // ✅ Good - ensures readable text
   background: 'var(--theme-primary)'
   color: 'var(--theme-on-primary)'

   // ❌ Bad - may have poor contrast
   background: 'var(--theme-primary)'
   color: 'var(--theme-text-secondary)'
   ```

## Migration Guide

To migrate existing text-based color fields:

1. Keep the field type as `'text'`
2. Add the `admin.components.Field` configuration
3. Update the description to mention theme variables
4. The component will preserve existing values (both theme vars and custom colors)

## Component API

### Props

- `path` (string, required): Field path from Payload's useField hook
- `label` (string, optional): Field label displayed above the input
- `required` (boolean, optional): Whether the field is required

### Value Format

The component stores values as strings:
- Theme variables: `'var(--theme-primary)'`
- Custom colors: `'#007bff'` or any valid CSS color

## Notes

- The component is a client component (`'use client'`)
- Uses Payload's `useField` hook for form integration
- All theme CSS variables are defined in `@qwickapps/react-framework`
- Preview uses inline styles to show actual color value
