export const dynamic = 'force-dynamic';
// @ts-nocheck

/**
 * Metadata Generation Utilities
 *
 * Server-side utilities for generating Next.js metadata from Payload CMS settings.
 * Used for SEO, social sharing, and browser metadata.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { getPayload } from 'payload';
import type { Config } from 'payload';
import type { Metadata } from 'next';
import type { Settings } from './SettingsProvider';

/**
 * Generate root layout metadata from CMS settings
 * Used in app/layout.tsx for site-wide defaults
 */
export async function generateRootMetadata(config: Config): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: config as unknown as any });

    const [siteSettings, advancedSettings] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', draft: false }).catch(() => ({})),
      payload.findGlobal({ slug: 'advanced-settings', draft: false }).catch(() => ({})),
    ]);

    const siteName = (siteSettings as any).siteName || 'QwickPress';
    const siteDescription = (siteSettings as any).siteDescription;
    const faviconUrl = (siteSettings as any).favicon?.url;
    const defaultOgImageUrl = (advancedSettings as any).seo?.defaultOgImage?.url;
    const twitterHandle = (siteSettings as any).socialMedia?.twitter;

    return {
      title: {
        template: `%s | ${siteName}`,
        default: siteName,
      },
      description: siteDescription,
      icons: faviconUrl ? {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      } : undefined,
      openGraph: {
        siteName,
        type: 'website',
        images: defaultOgImageUrl ? [defaultOgImageUrl] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        site: twitterHandle,
      },
    };
  } catch (error) {
    console.error('Error generating root metadata:', error);
    // Return minimal fallback metadata
    return {
      title: {
        template: '%s | QwickPress',
        default: 'QwickPress',
      },
    };
  }
}

/**
 * Merge page-specific metadata with site defaults
 * Used in individual page generateMetadata functions
 */
export function mergePageMetadata(
  pageData: any,
  settings: Settings | null
): Metadata {
  const siteName = settings?.siteName || 'QwickPress';
  const defaultDescription = settings?.seo?.defaultDescription;
  const defaultKeywords = settings?.seo?.defaultKeywords;
  const defaultOgImage = settings?.seo?.defaultOgImage?.url;

  return {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.description || defaultDescription,
    keywords: pageData.seo?.keywords || defaultKeywords,
    openGraph: {
      title: pageData.seo?.title || pageData.title,
      description: pageData.seo?.description || defaultDescription,
      siteName,
      type: 'website',
      images: pageData.seo?.ogImage?.url || defaultOgImage
        ? [pageData.seo?.ogImage?.url || defaultOgImage]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.seo?.title || pageData.title,
      description: pageData.seo?.description || defaultDescription,
      images: pageData.seo?.ogImage?.url || defaultOgImage
        ? [pageData.seo?.ogImage?.url || defaultOgImage]
        : undefined,
    },
  };
}

/**
 * Get favicon metadata from settings
 * Helper for extracting favicon configuration
 */
export function getFaviconMetadata(settings: Settings | null): Metadata['icons'] {
  if (!settings?.favicon?.url) {
    return undefined;
  }

  return {
    icon: settings.favicon.url,
    shortcut: settings.favicon.url,
    apple: settings.favicon.url,
  };
}
