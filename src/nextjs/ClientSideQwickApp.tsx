// @ts-nocheck
'use client';

/**
 * Client-side QwickApp Wrapper
 *
 * Provides the QwickApps framework on the client side.
 * Receives navigation items from server component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { QwickApp } from '@qwickapps/react-framework';
import { PayloadDataProvider } from '@qwickapps/cms/providers';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import '@qwickapps/react-framework/dist/index.css'; // CSS is loaded by individual components
import { SettingsProvider, Settings, useSettings } from './SettingsProvider';
import { ScriptsInjector } from './ScriptsInjector';
import { SiteLogo } from './SiteLogo';

// Create Payload data provider instance
const payloadProvider = new PayloadDataProvider({
  apiUrl: '/api',
  debug: false
});

export interface ClientSideQwickAppProps {
  children: ReactNode;
  navigationItems: Array<{
    id: string;
    label: string;
    route: string;
    icon?: string;
    children?: Array<{
      id: string;
      label: string;
      route: string;
    }>;
  }>;
  initialSettings?: Settings | null;
}

/**
 * Inner component that uses settings from SettingsProvider
 */
function QwickAppWithSettings({ children, navigationItems }: { children: ReactNode; navigationItems: any[] }) {
  const { settings } = useSettings();

  // Use settings for app name
  const appName = settings?.siteName || 'QwickPress';

  // Use SiteLogo component which automatically handles all logo configurations
  const logoElement = <SiteLogo size="small" />;

  // Use theme settings from CMS or fallback to defaults
  const defaultTheme = settings?.defaultTheme || 'light';
  const defaultPalette = settings?.defaultPalette || 'default';
  const showThemeSwitcher = settings?.showThemeSwitcher !== undefined ? settings.showThemeSwitcher : true;
  const showPaletteSwitcher = settings?.showPaletteSwitcher !== undefined ? settings.showPaletteSwitcher : false;

  return (
    <QwickApp
      appName={appName}
      logo={logoElement}
      appId="com.qwickapps.press"
      enableScaffolding={true}
      navigationItems={navigationItems}
      showThemeSwitcher={showThemeSwitcher}
      showPaletteSwitcher={showPaletteSwitcher}
      defaultTheme={defaultTheme}
      defaultPalette={defaultPalette}
      dataSource={{
        dataProvider: payloadProvider,
        enableLogging: false
      }}
    >
      {children as any}
    </QwickApp>
  );
}

/**
 * ClientSideQwickApp - Client Component
 * Wraps the entire app with QwickApps framework, settings provider, and analytics
 */
export function ClientSideQwickApp({ children, navigationItems, initialSettings }: ClientSideQwickAppProps) {
  return (
    <AppRouterCacheProvider>
      <SettingsProvider initialSettings={initialSettings || undefined}>
        <ScriptsInjector />
        <QwickAppWithSettings navigationItems={navigationItems}>
          {children}
        </QwickAppWithSettings>
      </SettingsProvider>
    </AppRouterCacheProvider>
  );
}
