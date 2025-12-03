// @ts-nocheck

/**
 * Dynamic QwickApp Wrapper - SSR Compatible
 *
 * This component wraps ClientQwickApp and is now SSR compatible
 * after Phase 2 framework fixes.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import { ReactNode } from 'react';
import { ClientSideQwickApp } from './ClientSideQwickApp';
// import '@qwickapps/react-framework/dist/index.css'; // CSS is loaded by individual components

export interface DynamicQwickAppProps {
  children: ReactNode;
}

/**
 * DynamicQwickApp - SSR compatible wrapper for QwickApp framework
 */
export function DynamicQwickApp({ children }: DynamicQwickAppProps) {
  return <ClientSideQwickApp>{children}</ClientSideQwickApp>;
}
