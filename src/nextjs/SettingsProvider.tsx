'use client';
// @ts-nocheck

/**
 * SettingsProvider - Provides site-wide settings to all components
 *
 * Fetches Settings global from Payload CMS and makes it available via Context.
 * Used for CAPTCHA configuration, analytics, SEO defaults, etc.
 *
 * Usage:
 *   <SettingsProvider>
 *     <YourApp />
 *   </SettingsProvider>
 *
 *   const settings = useSettings();
 *   const captchaProvider = settings?.captcha?.provider;
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPayloadAPIClient } from '../client/PayloadAPIClient';

// Settings type based on Settings global schema
export interface Settings {
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
  siteLogo?: any;
  favicon?: any;
  copyrightText?: string;
  adminEmail?: string;
  supportEmail?: string;
  contactPhone?: string;
  businessAddress?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
  googleAnalytics?: {
    enabled?: boolean;
    measurementId?: string;
  };
  googleTagManager?: {
    enabled?: boolean;
    containerId?: string;
  };
  facebookPixel?: {
    enabled?: boolean;
    pixelId?: string;
  };
  captcha?: {
    provider?: 'none' | 'recaptcha-v2' | 'recaptcha-v3' | 'hcaptcha' | 'turnstile';
    siteKey?: string;
    secretKey?: string;
    threshold?: number;
  };
  seo?: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultKeywords?: string;
    defaultOgImage?: any;
  };
  email?: {
    provider?: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPassword?: string;
    fromEmail?: string;
    fromName?: string;
  };
  customScripts?: {
    headerScripts?: string;
    footerScripts?: string;
    customCss?: string;
  };
  maintenance?: {
    enabled?: boolean;
    message?: string;
    allowedIPs?: string;
  };
  // Theme Settings
  defaultTheme?: 'light' | 'dark';
  defaultPalette?: string;
  showThemeSwitcher?: boolean;
  showPaletteSwitcher?: boolean;
}

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: React.ReactNode;
  initialSettings?: Settings;
}

export function SettingsProvider({ children, initialSettings }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings | null>(initialSettings || null);
  const [loading, setLoading] = useState<boolean>(!initialSettings);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const client = getPayloadAPIClient();

      // Fetch all four globals in parallel
      const [siteSettings, integrations, advancedSettings, themeSettings] = await Promise.all([
        client.findGlobal('site-settings').catch(() => ({})),
        client.findGlobal('integrations').catch(() => ({})),
        client.findGlobal('advanced-settings').catch(() => ({})),
        client.findGlobal('theme-settings').catch(() => ({})),
      ]);

      // Merge all settings into a single object
      const mergedSettings: Settings = {
        // From Site Settings
        siteName: (siteSettings as any).siteName,
        siteDescription: (siteSettings as any).siteDescription,
        siteUrl: (siteSettings as any).siteUrl,
        siteLogo: (siteSettings as any).siteLogo,
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

      setSettings(mergedSettings);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch settings');
      setError(error);
      console.error('SettingsProvider: Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if we don't have initial settings
    if (!initialSettings) {
      fetchSettings();
    }
  }, [initialSettings]);

  const value: SettingsContextType = {
    settings,
    loading,
    error,
    refresh: fetchSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/**
 * Hook to access site settings
 *
 * @returns Settings context with settings, loading state, error, and refresh function
 * @throws Error if used outside SettingsProvider
 */
export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
