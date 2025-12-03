// @ts-nocheck
/**
 * Custom Label for Button Array Items
 *
 * Displays meaningful labels showing button text, variant, and link
 * Used in Hero actions, CTA buttons, and other button arrays
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';
import { getIconEmoji } from '@qwickapps/react-framework';

interface ButtonRowLabelProps {
  data?: {
    label?: string;
    href?: string;
    variant?: string;
    color?: string;
    icon?: string;
    endIcon?: string;
  };
  rowNumber?: number;
}

export const ButtonRowLabel: React.FC<ButtonRowLabelProps> = ({ data, rowNumber = 0 }) => {
  const displayIndex = String(rowNumber + 1).padStart(2, '0');

  // Show error if required fields are missing
  if (!data?.label) {
    return (
      <div style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ Missing button label
      </div>
    );
  }

  // Get icon emoji if provided
  const startIcon = data.icon ? getIconEmoji(data.icon) : null;
  const trailingIcon = data.endIcon ? getIconEmoji(data.endIcon) : null;

  // Shorten href for display
  const displayHref = data.href ? (
    data.href.length > 30 ? `${data.href.substring(0, 30)}...` : data.href
  ) : null;

  // Get variant badge color
  const variantColors: Record<string, { bg: string; text: string }> = {
    contained: { bg: 'var(--theme-primary-light)', text: 'var(--theme-primary-dark)' },
    outlined: { bg: 'var(--theme-elevation-200)', text: 'var(--theme-elevation-800)' },
    text: { bg: 'var(--theme-elevation-150)', text: 'var(--theme-elevation-700)' },
  };

  const variant = data.variant || 'contained';
  const variantStyle = variantColors[variant] || variantColors.contained;

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

      {startIcon && (
        <span style={{ fontSize: '16px' }}>
          {startIcon}
        </span>
      )}

      <span style={{ color: 'var(--theme-elevation-900)' }}>
        {data.label}
      </span>

      {trailingIcon && (
        <span style={{ fontSize: '16px' }}>
          {trailingIcon}
        </span>
      )}

      {variant && (
        <span style={{
          fontSize: '11px',
          padding: '2px 6px',
          background: variantStyle.bg,
          color: variantStyle.text,
          borderRadius: '4px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          {variant}
        </span>
      )}

      {data.color && data.color !== 'primary' && (
        <span style={{
          fontSize: '11px',
          padding: '2px 6px',
          background: 'var(--theme-elevation-200)',
          color: 'var(--theme-elevation-700)',
          borderRadius: '4px',
          fontWeight: 500,
        }}>
          {data.color}
        </span>
      )}

      {displayHref && (
        <span style={{
          color: 'var(--theme-elevation-600)',
          fontWeight: 400,
          fontSize: '13px',
          fontFamily: 'monospace',
        }}>
          → {displayHref}
        </span>
      )}
    </div>
  );
};
