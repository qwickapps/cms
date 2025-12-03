// @ts-nocheck
'use client';

/**
 * QwickApps Framework Components - Client Boundary
 *
 * This file serves as the client boundary for all QwickApps Framework components.
 * Instead of creating individual wrapper files, we export all framework components
 * from a single 'use client' file.
 *
 * Why this pattern?
 * - Next.js 15 defaults to Server Components
 * - Framework components use React hooks (require client-side)
 * - Single client boundary is more maintainable than many wrapper files
 *
 * Usage:
 *   import { HeroBlock, Section, GridLayout } from './components/framework';
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

// Re-export all framework components that we use
// This marks them as client components in Next.js
export {
  // Layout components
  HeroBlock,
  Section,
  GridLayout,
  GridCell,

  // Content components
  Text,
  Button,
  FeatureCard,
  FeatureGrid,

  // Structure components
  Footer,

  // Form components (themed for QwickApps)
  FormField,
  FormSelect,
  FormCheckbox,
  Captcha,

  // Utilities
  iconMap,

  // Product components
  ProductCard,

  // Type exports
  type HeroBlockProps,
  type SectionProps,
  type GridLayoutProps,
  type GridCellProps,
  type TextProps,
  type ButtonProps,
  type FeatureCardProps,
  type FeatureGridProps,
  type FormFieldProps,
  type FormSelectProps,
  type FormCheckboxProps,
  type CaptchaProps,
  type CaptchaProvider,
} from '@qwickapps/react-framework';
