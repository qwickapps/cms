/**
 * Custom Label for Content Blocks
 *
 * Displays a meaningful label for each block in the admin UI
 * Centralized implementation that receives data as props
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';

interface BlockLabelProps {
  data?: {
    blockType?: string;
    blockName?: string;
  };
  rowNumber?: number;
}

export const BlockRowLabel: React.FC<BlockLabelProps> = ({ data, rowNumber = 0 }) => {
  // Get the block type
  const blockType = data?.blockType;

  // Use rowNumber directly from props
  const blockIndex = rowNumber;
  const displayIndex = String(blockIndex + 1).padStart(2, '0');

  // Map block slugs to friendly names with emojis
  const blockInfo: Record<string, { name: string; icon: string }> = {
    hero: { name: 'Hero Block', icon: '🎯' },
    textSection: { name: 'Text Section', icon: '📝' },
    featureGrid: { name: 'Feature Grid', icon: '⭐' },
    ctaSection: { name: 'CTA Section', icon: '🎬' },
    image: { name: 'Image', icon: '🖼️' },
    spacer: { name: 'Spacer', icon: '↕️' },
    code: { name: 'Code Block', icon: '💻' },
    productGrid: { name: 'Product Grid', icon: '🛍️' },
    accordion: { name: 'Accordion', icon: '📋' },
    cardGrid: { name: 'Card Grid', icon: '🎴' },
    form: { name: 'Form', icon: '📝' },
  };

  const info = blockInfo[blockType || ''] || { name: blockType || 'Block', icon: '📦' };

  // Use blockName if user has set it, otherwise show block type name
  const customName = data?.blockName;

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
        fontFamily: 'monospace',
      }}>
        {displayIndex}.
      </span>
      <span style={{ fontSize: '16px' }}>
        {info.icon}
      </span>
      <span style={{ color: 'var(--theme-elevation-900)' }}>
        {info.name}
      </span>
      {customName && (
        <>
          <span style={{
            color: 'var(--theme-elevation-600)',
            fontWeight: 400,
          }}>
            -
          </span>
          <span style={{
            color: 'var(--theme-elevation-800)',
            fontWeight: 500,
          }}>
            {customName}
          </span>
        </>
      )}
    </div>
  );
};
