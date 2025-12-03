// @ts-nocheck
/**
 * Custom Label for Card Array Items
 *
 * Displays meaningful labels showing card title, icon, and link
 * Used in Card Grid blocks
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';
import { getIconEmoji } from '@qwickapps/react-framework';

interface CardRowLabelProps {
  data?: {
    title?: string;
    description?: string;
    icon?: string;
    image?: any;
    link?: string;
    linkText?: string;
  };
  rowNumber?: number;
}

export const CardRowLabel: React.FC<CardRowLabelProps> = ({ data, rowNumber = 0 }) => {
  const displayIndex = String(rowNumber + 1).padStart(2, '0');

  // Show error if required fields are missing
  if (!data?.title) {
    return (
      <div style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ Missing card title
      </div>
    );
  }

  // Get icon emoji if provided
  const displayIcon = data.icon ? getIconEmoji(data.icon) : null;

  // Truncate description if provided
  const descriptionPreview = data.description ? (
    data.description.length > 50 ? `${data.description.substring(0, 50)}...` : data.description
  ) : null;

  // Check if has image
  const hasImage = data.image && typeof data.image === 'object';

  // Shorten link for display
  const displayLink = data.link ? (
    data.link.length > 25 ? `${data.link.substring(0, 25)}...` : data.link
  ) : null;

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

      {displayIcon && (
        <span style={{ fontSize: '18px' }}>
          {displayIcon}
        </span>
      )}

      {!displayIcon && hasImage && (
        <span style={{ fontSize: '16px' }}>
          🖼️
        </span>
      )}

      <span style={{ color: 'var(--theme-elevation-900)' }}>
        {data.title}
      </span>

      {data.linkText && (
        <span style={{
          fontSize: '11px',
          padding: '2px 6px',
          background: 'var(--theme-info-light)',
          color: 'var(--theme-info-dark)',
          borderRadius: '4px',
          fontWeight: 600,
        }}>
          {data.linkText}
        </span>
      )}

      {displayLink && !data.linkText && (
        <span style={{
          color: 'var(--theme-elevation-600)',
          fontWeight: 400,
          fontSize: '12px',
          fontFamily: 'monospace',
        }}>
          → {displayLink}
        </span>
      )}

      {descriptionPreview && (
        <span style={{
          color: 'var(--theme-elevation-500)',
          fontWeight: 400,
          fontSize: '13px',
          fontStyle: 'italic',
          maxWidth: '250px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {descriptionPreview}
        </span>
      )}
    </div>
  );
};
