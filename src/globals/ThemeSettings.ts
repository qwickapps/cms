import { GlobalConfig } from 'payload';

/**
 * Theme Settings - Configure QwickApp theme and palette
 *
 * Controls the default theme, palette, and theme switcher visibility
 * for QwickApp framework components.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Theme',
  admin: {
    description: 'Configure the default theme, color palette, and theme switcher options',
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Theme Configuration',
      admin: {
        description: 'Set the default theme mode and palette for your application',
      },
      fields: [
        {
          name: 'defaultTheme',
          type: 'select',
          label: 'Default Theme',
          required: true,
          defaultValue: 'light',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          admin: {
            description: 'The default theme mode when users first visit the site',
          },
        },
        {
          name: 'defaultPalette',
          type: 'select',
          label: 'Default Palette',
          required: true,
          defaultValue: 'default',
          options: [
            { label: 'Default - Classic blue and neutral colors', value: 'default' },
            { label: 'Autumn - Warm oranges and golden yellows', value: 'autumn' },
            { label: 'Ocean - Deep blues and aqua teals', value: 'ocean' },
            { label: 'Spring - Fresh greens and soft pinks', value: 'spring' },
            { label: 'Winter - Cool blues and icy whites', value: 'winter' },
            { label: 'Cosmic - Modern purple gradient', value: 'cosmic' },
          ],
          admin: {
            description: 'The default color palette for the application',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Theme Switcher Options',
      admin: {
        description: 'Control which theme switchers are displayed to users',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'showThemeSwitcher',
          type: 'checkbox',
          label: 'Show Theme Switcher',
          defaultValue: true,
          admin: {
            description: 'Allow users to toggle between light and dark themes',
          },
        },
        {
          name: 'showPaletteSwitcher',
          type: 'checkbox',
          label: 'Show Palette Switcher',
          defaultValue: false,
          admin: {
            description: 'Allow users to choose between different color palettes',
          },
        },
      ],
    },
  ],
};
