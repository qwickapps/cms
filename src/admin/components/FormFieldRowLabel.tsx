/**
 * Custom RowLabel for Form Fields
 *
 * Displays field label and type instead of generic "Field 01"
 * Centralized implementation that receives data as props
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';

interface FormFieldLabelProps {
  data?: {
    label?: string;
    fieldName?: string;
    inputType?: string;
    required?: boolean;
  };
  rowNumber?: number;
}

export const FormFieldRowLabel: React.FC<FormFieldLabelProps> = ({ data, rowNumber = 0 }) => {
  const fieldIndex = String(rowNumber + 1).padStart(2, '0');

  // Show error if required fields are missing
  if (!data?.label || !data?.fieldName || !data?.inputType) {
    return (
      <div style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ Missing required fields - label: {data?.label || 'MISSING'}, fieldName: {data?.fieldName || 'MISSING'}, inputType: {data?.inputType || 'MISSING'}
      </div>
    );
  }

  // Icon mapping for field types
  const typeIcons: Record<string, string> = {
    text: '📝',
    email: '📧',
    tel: '📱',
    number: '🔢',
    textarea: '📄',
    select: '📋',
    checkbox: '☑️',
  };

  const icon = typeIcons[data.inputType] || '📝';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 500,
    }}>
      <span style={{
        color: 'var(--theme-elevation-800)',
        fontFamily: 'monospace',
      }}>
        {fieldIndex}.
      </span>
      <span style={{ fontSize: '16px' }}>
        {icon}
      </span>
      <span style={{ color: 'var(--theme-elevation-900)' }}>
        {data.label}
      </span>
      <span style={{
        color: 'var(--theme-elevation-600)',
        fontWeight: 400,
        fontSize: '13px',
        fontFamily: 'monospace',
      }}>
        ({data.inputType})
      </span>
      {data.required && (
        <span style={{
          color: 'var(--theme-error-500)',
          fontSize: '12px',
          fontWeight: 600,
        }}>
          *
        </span>
      )}
    </div>
  );
};
