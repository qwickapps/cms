/**
 * Custom Label for Accordion Item Array Items
 *
 * Displays meaningful labels showing accordion title and expansion state
 * Used in Accordion blocks
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';

interface AccordionItemRowLabelProps {
  data?: {
    title?: string;
    content?: string;
    defaultExpanded?: boolean;
  };
  rowNumber?: number;
}

export const AccordionItemRowLabel: React.FC<AccordionItemRowLabelProps> = ({ data, rowNumber = 0 }) => {
  const displayIndex = String(rowNumber + 1).padStart(2, '0');

  // Show error if required fields are missing
  if (!data?.title) {
    return (
      <div style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ Missing accordion title
      </div>
    );
  }

  // Truncate content preview if provided
  const contentPreview = data.content ? (
    typeof data.content === 'string' ? (
      data.content.length > 60 ? `${data.content.substring(0, 60)}...` : data.content
    ) : '[Rich Text Content]'
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

      <span style={{ fontSize: '16px' }}>
        {data.defaultExpanded ? '📂' : '📁'}
      </span>

      <span style={{ color: 'var(--theme-elevation-900)' }}>
        {data.title}
      </span>

      {data.defaultExpanded && (
        <span style={{
          fontSize: '11px',
          padding: '2px 6px',
          background: 'var(--theme-success-light)',
          color: 'var(--theme-success-dark)',
          borderRadius: '4px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          Expanded
        </span>
      )}

      {contentPreview && (
        <span style={{
          color: 'var(--theme-elevation-500)',
          fontWeight: 400,
          fontSize: '13px',
          fontStyle: 'italic',
          maxWidth: '300px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {contentPreview}
        </span>
      )}
    </div>
  );
};
