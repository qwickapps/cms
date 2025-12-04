export const dynamic = 'force-dynamic';
// @ts-nocheck
import 'server-only';

/**
 * Server QwickApp Wrapper - Fetches navigation from CMS
 *
 * This server component fetches navigation data from Payload CMS
 * and passes it to the client-side QwickApp component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { getPayload, type Payload } from 'payload';
import { ReactNode } from 'react';
import { ClientSideQwickApp } from './ClientSideQwickApp';
import type { Config } from 'payload';

export interface ServerQwickAppProps {
  children: ReactNode;
  payloadConfig: Config;
}

/**
 * Get Payload instance with proper error handling for secret key issues
 */
async function getPayloadInstance(config: Config): Promise<Payload | null> {
  try {
    return await getPayload({ config: config as any });
  } catch (error: any) {
    // Check if this is a secret key error - return null to use defaults
    if (error?.message?.includes('secret key') || error?.payloadInitError) {
      console.warn('[ServerQwickApp] Payload initialization failed (secret key issue), using defaults');
      return null;
    }
    throw error;
  }
}

/**
 * Fetch navigation data from Payload CMS
 */
async function getNavigationData(config: Config) {
  try {
    const payload = await getPayloadInstance(config);

    if (!payload) {
      // Return default navigation if payload init failed
      return getDefaultNavigation();
    }

    const result = await payload.find({
      collection: 'navigation',
      where: {
        position: { equals: 'main' }
      },
      limit: 1,
      draft: false
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs[0];
    }

    // Return default navigation if none found in CMS
    return getDefaultNavigation();
  } catch (error: any) {
    // Suppress error if tables don't exist yet (42P01 is PostgreSQL error code for "relation does not exist")
    if (error?.cause?.code === '42P01' || error?.message?.includes('does not exist')) {
      console.log('[Build] Database tables not ready yet, using default navigation');
    } else {
      console.error('Error fetching navigation:', error);
    }
    // Return default navigation on error
    return getDefaultNavigation();
  }
}

function getDefaultNavigation() {
  return {
    name: 'Main Menu',
    position: 'main',
    items: [
      {
        label: 'Home',
        route: '/',
        icon: 'home'
      },
      {
        label: 'Admin',
        route: '/admin',
        icon: 'person'
      }
    ]
  };
}

/**
 * Fetch all settings from Payload CMS and merge them
 */
async function getSettings(config: Config) {
  try {
    const payload = await getPayloadInstance(config);

    if (!payload) {
      // Return default settings if payload init failed
      return getDefaultSettings();
    }

    // Fetch all four globals in parallel
    const [siteSettings, integrations, advancedSettings, themeSettings] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', draft: false }).catch(() => ({})),
      payload.findGlobal({ slug: 'integrations', draft: false }).catch(() => ({})),
      payload.findGlobal({ slug: 'advanced-settings', draft: false }).catch(() => ({})),
      payload.findGlobal({ slug: 'theme-settings', draft: false }).catch(() => ({})),
    ]);

    // Merge all settings
    return {
      // From Site Settings
      siteName: (siteSettings as any).siteName,
      siteDescription: (siteSettings as any).siteDescription,
      siteUrl: (siteSettings as any).siteUrl,
      // Logo configuration
      logoIcon: (siteSettings as any).logoIcon,
      customLogoIcon: (siteSettings as any).customLogoIcon,
      logoText: (siteSettings as any).logoText,
      logoBadge: (siteSettings as any).logoBadge,
      logoBadgeShape: (siteSettings as any).logoBadgeShape,
      siteLogo: (siteSettings as any).siteLogo, // Keep for backward compatibility
      favicon: (siteSettings as any).favicon,
      copyrightText: (siteSettings as any).copyrightText,
      adminEmail: (siteSettings as any).adminEmail,
      supportEmail: (siteSettings as any).supportEmail,
      contactPhone: (siteSettings as any).contactPhone,
      businessAddress: (siteSettings as any).businessAddress,
      socialMedia: (siteSettings as any).socialMedia,

      // From Integrations
      googleAnalytics: (integrations as any).googleAnalytics,
      googleTagManager: (integrations as any).googleTagManager,
      facebookPixel: (integrations as any).facebookPixel,
      captcha: (integrations as any).captcha,
      email: (integrations as any).email,

      // From Advanced Settings
      seo: (advancedSettings as any).seo,
      customScripts: (advancedSettings as any).customScripts,
      maintenance: (advancedSettings as any).maintenance,

      // From Theme Settings
      defaultTheme: (themeSettings as any).defaultTheme,
      defaultPalette: (themeSettings as any).defaultPalette,
      showThemeSwitcher: (themeSettings as any).showThemeSwitcher,
      showPaletteSwitcher: (themeSettings as any).showPaletteSwitcher,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return getDefaultSettings();
  }
}

function getDefaultSettings() {
  return {
    siteName: 'QwickApps',
    defaultTheme: 'dark' as const,
    defaultPalette: 'autumn',
  };
}

/**
 * ServerQwickApp - Server Component
 * Fetches navigation and settings from CMS and passes to client component
 */
export async function ServerQwickApp({ children, payloadConfig }: ServerQwickAppProps) {
  const navigationData = await getNavigationData(payloadConfig);
  const settings = await getSettings(payloadConfig);

  return (
    <ClientSideQwickApp
      navigationItems={navigationData.items}
      initialSettings={settings}
    >
      {children}
    </ClientSideQwickApp>
  );
}
