/**
 * Custom Label for Navigation Sub-Items
 *
 * Displays meaningful labels for nested navigation items
 * Centralized implementation that receives data as props
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';

interface NavigationSubItemLabelProps {
  data?: {
    label?: string;
    route?: string;
  };
  rowNumber?: number;
}

export const NavigationSubItemRowLabel: React.FC<NavigationSubItemLabelProps> = ({ data, rowNumber = 0 }) => {
  const displayIndex = String(rowNumber + 1).padStart(2, '0');

  // Show error if required fields are missing
  if (!data?.label || !data?.route) {
    return (
      <div style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ Missing required fields - label: {data?.label || 'MISSING'}, route: {data?.route || 'MISSING'}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 500,
    }}>
      <span style={{
        color: 'var(--theme-elevation-600)',
        fontSize: '14px',
        fontWeight: 600,
      }}>
        {displayIndex}.
      </span>

      <span style={{ fontSize: '16px' }}>
        ↳
      </span>

      <span style={{ color: 'var(--theme-elevation-900)' }}>
        {data.label}
      </span>

      <span style={{
        color: 'var(--theme-elevation-600)',
        fontWeight: 400,
        fontSize: '14px',
      }}>
        → {data.route}
      </span>
    </div>
  );
};
