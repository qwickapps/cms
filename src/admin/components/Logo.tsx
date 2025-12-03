// @ts-nocheck
/**
 * QwickPress Admin Logo Component
 *
 * Custom logo displayed in the Payload CMS admin panel.
 * Uses the ProductLogo component from QwickApps framework for consistent branding.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';
import { ProductLogo } from '@qwickapps/react-framework';

export const Logo = () => {
  return (
    <ProductLogo
      name="wick Press"
      size="small"
      onClick={() => { window.location.href = '/admin' }}
    />
  );
};
