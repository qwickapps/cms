export const dynamic = 'force-dynamic';

/**
 * Root Layout - Photography Portfolio
 *
 * This is the root layout for the entire application.
 * Note: HTML and body tags are handled by route group layouts
 * to avoid conflicts with Payload admin's RootLayout.
 */

import config from '@payload-config';
import { generateRootMetadata } from '@qwickapps/cms/nextjs';
import '@qwickapps/react-framework/dist/index.css';
import type { Metadata } from 'next';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  return generateRootMetadata(config);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
