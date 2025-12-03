'use client';
// @ts-nocheck

/**
 * Client-side HomePage Wrapper
 *
 * This wrapper handles dynamic import with SSR disabled.
 * Next.js 15 requires dynamic imports with ssr:false to be in Client Components.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

// Import HomePageContent directly - SSR now supported!
import { HomePageContent } from './HomePageContent';

export interface ClientHomePageProps {
  hero: any | null;
  features: any[];
}

export function ClientHomePage({ hero, features }: ClientHomePageProps) {
  return <HomePageContent hero={hero} features={features} />;
}
