// @ts-nocheck
/**
 * QwickApps CMS - Next.js Integration Components
 *
 * This module provides ready-to-use Next.js components for integrating
 * Payload CMS with the QwickApps Framework.
 *
 * Components included:
 * - ServerQwickApp: Server component that fetches navigation and settings from CMS
 * - ClientSideQwickApp: Client wrapper for QwickApp with PayloadDataProvider
 * - ClientQwickApp: Simple client QwickApp wrapper (deprecated - use ServerQwickApp)
 * - BlockRenderer: Renders Payload blocks as QwickApps Framework components
 * - FormBlockComponent: Form renderer with CAPTCHA support
 * - ScriptsInjector: Injects analytics and custom scripts
 * - SettingsProvider: React Context for site settings
 * - ClientHomePage: Homepage client component
 * - HomePageContent: Homepage content component
 * - DynamicQwickApp: Dynamic QwickApp loader
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
import '@qwickapps/react-framework/index.css';

// Main app wrappers
export { ServerQwickApp, type ServerQwickAppProps } from './ServerQwickApp.js';
export { ClientSideQwickApp, type ClientSideQwickAppProps } from './ClientSideQwickApp.js';
export { DynamicQwickApp, type DynamicQwickAppProps } from './DynamicQwickApp.js';

// Content rendering
export { BlockRenderer } from './BlockRenderer.js';
export { FormBlockComponent } from './FormBlockComponent.js';

// Homepage components
export { ClientHomePage, type ClientHomePageProps } from './ClientHomePage.js';
export { HomePageContent, type HomePageContentProps } from './HomePageContent.js';

// Providers and utilities
export { SettingsProvider, useSettings, type Settings } from './SettingsProvider.js';
export { ScriptsInjector } from './ScriptsInjector.js';
export { FooterFromSettings } from './FooterFromSettings.js';
export { SiteLogo, type SiteLogoProps } from './SiteLogo.js';

// Live Preview support
export { RefreshRouteOnSave, type RefreshRouteOnSaveProps } from './RefreshRouteOnSave.js';
export { LivePreviewClient, type LivePreviewClientProps } from './LivePreviewClient.js';

// Metadata utilities
export { generateRootMetadata, mergePageMetadata, getFaviconMetadata } from './metadata.js';

// Re-export framework components for convenience
export * from './framework.js';

// Re-export theme and palette providers for admin usage
export { ThemeProvider, PaletteProvider, useTheme, usePalette } from '@qwickapps/react-framework';
