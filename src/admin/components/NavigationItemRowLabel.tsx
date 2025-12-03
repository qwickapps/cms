// @ts-nocheck
/**
 * Custom Label for Navigation Items
 *
 * Displays meaningful labels showing item label and route
 * Centralized implementation that receives data as props
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';
import { getIconEmoji } from '@qwickapps/react-framework';

interface NavigationItemLabelProps {
  data?: {
    label?: string;
    route?: string;
    icon?: string;
    children?: any[];
  };
  rowNumber?: number;
}

export const NavigationItemRowLabel: React.FC<NavigationItemLabelProps> = ({ data, rowNumber = 0 }) => {
  const displayIndex = String(rowNumber + 1).padStart(2, '0');
  const hasChildren = data?.children && Array.isArray(data.children) && data.children.length > 0;

  const displayIcon = getIconEmoji(data?.icon);

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
        {displayIcon}
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

      {hasChildren && (
        <span style={{
          fontSize: '12px',
          padding: '2px 6px',
          background: 'var(--theme-primary-light)',
          color: 'var(--theme-primary-dark)',
          borderRadius: '4px',
          fontWeight: 600,
        }}>
          {data.children!.length} sub-item{data.children!.length !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
};
