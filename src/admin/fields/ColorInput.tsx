/**
 * Color Input Field Component
 *
 * A custom Payload CMS field component that allows users to:
 * - Select from predefined theme variables
 * - Enter a custom color value
 * - Preview the selected color
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React, { useState, useEffect } from 'react';

// Field components receive value via props, not useField hook

// Available theme color variables
const themeColors = [
  // Primary Colors
  { value: 'var(--theme-primary)', label: 'Primary', category: 'Primary' },
  { value: 'var(--theme-primary-light)', label: 'Primary Light', category: 'Primary' },
  { value: 'var(--theme-primary-dark)', label: 'Primary Dark', category: 'Primary' },
  { value: 'var(--theme-on-primary)', label: 'On Primary', category: 'Primary' },

  // Secondary Colors
  { value: 'var(--theme-secondary)', label: 'Secondary', category: 'Secondary' },
  { value: 'var(--theme-secondary-light)', label: 'Secondary Light', category: 'Secondary' },
  { value: 'var(--theme-secondary-dark)', label: 'Secondary Dark', category: 'Secondary' },
  { value: 'var(--theme-on-secondary)', label: 'On Secondary', category: 'Secondary' },

  // Accent Colors
  { value: 'var(--theme-accent)', label: 'Accent', category: 'Accent' },
  { value: 'var(--theme-accent-light)', label: 'Accent Light', category: 'Accent' },
  { value: 'var(--theme-accent-dark)', label: 'Accent Dark', category: 'Accent' },
  { value: 'var(--theme-on-accent)', label: 'On Accent', category: 'Accent' },

  // Semantic Colors
  { value: 'var(--theme-success)', label: 'Success', category: 'Semantic' },
  { value: 'var(--theme-on-success)', label: 'On Success', category: 'Semantic' },
  { value: 'var(--theme-warning)', label: 'Warning', category: 'Semantic' },
  { value: 'var(--theme-on-warning)', label: 'On Warning', category: 'Semantic' },
  { value: 'var(--theme-error)', label: 'Error', category: 'Semantic' },
  { value: 'var(--theme-on-error)', label: 'On Error', category: 'Semantic' },
  { value: 'var(--theme-info)', label: 'Info', category: 'Semantic' },
  { value: 'var(--theme-on-info)', label: 'On Info', category: 'Semantic' },

  // Surface & Background
  { value: 'var(--theme-background)', label: 'Background', category: 'Surface' },
  { value: 'var(--theme-on-background)', label: 'On Background', category: 'Surface' },
  { value: 'var(--theme-surface)', label: 'Surface', category: 'Surface' },
  { value: 'var(--theme-on-surface)', label: 'On Surface', category: 'Surface' },
  { value: 'var(--theme-surface-variant)', label: 'Surface Variant', category: 'Surface' },
  { value: 'var(--theme-on-surface-variant)', label: 'On Surface Variant', category: 'Surface' },
  { value: 'var(--theme-surface-elevated)', label: 'Surface Elevated', category: 'Surface' },

  // Text Colors
  { value: 'var(--theme-text-primary)', label: 'Text Primary', category: 'Text' },
  { value: 'var(--theme-text-secondary)', label: 'Text Secondary', category: 'Text' },
  { value: 'var(--theme-text-inverted)', label: 'Text Inverted', category: 'Text' },
];

export const ColorInput: React.FC<any> = (props) => {
  console.log('=== ColorInput Debug ===');
  console.log('All props:', props);
  console.log('Props keys:', Object.keys(props));
  console.log('props.value:', props.value);
  console.log('props.setValue:', props.setValue);
  console.log('props.onChange:', props.onChange);
  console.log('props.readOnly:', props.readOnly);

  // Try different possible prop names for the value and setter
  const value = props.value ?? props.initialValue ?? '';
  const setValue = props.setValue ?? props.onChange ?? (() => {
    console.error('No setValue or onChange found in props!');
  });

  console.log('Using value:', value);
  console.log('Using setValue:', typeof setValue);

  // Get string value with fallback
  const stringValue = (value as string) || '';

  // Determine initial mode based on current value
  const isThemeVariable = stringValue.startsWith('var(--theme-');
  const initialMode = stringValue ? (isThemeVariable ? 'theme' : 'custom') : 'theme';
  const initialCustomColor = !isThemeVariable && stringValue ? stringValue : '#000000';

  const [inputMode, setInputMode] = useState<'theme' | 'custom'>(initialMode);
  const [customColor, setCustomColor] = useState(initialCustomColor);

  // Get label and required from field definition
  const label = typeof props.field?.label === 'string' ? props.field.label : undefined;
  const required = props.field?.required;

  // Update mode when external value changes
  useEffect(() => {
    if (stringValue) {
      if (stringValue.startsWith('var(--theme-')) {
        setInputMode('theme');
      } else {
        setInputMode('custom');
        setCustomColor(stringValue);
      }
    }
  }, [stringValue]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    console.log('Theme changed to:', newValue);
    console.log('Current stringValue:', stringValue);
    setValue(newValue);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setValue(newColor);
  };

  const handleModeChange = (mode: 'theme' | 'custom') => {
    setInputMode(mode);
    if (mode === 'theme' && !stringValue.startsWith('var(--theme-')) {
      setValue('var(--theme-primary)');
    } else if (mode === 'custom' && stringValue.startsWith('var(--theme-')) {
      setValue(customColor);
    }
  };

  // Group colors by category
  const groupedColors = themeColors.reduce((acc, color) => {
    if (!acc[color.category]) {
      acc[color.category] = [];
    }
    acc[color.category].push(color);
    return acc;
  }, {} as Record<string, typeof themeColors>);

  return (
    <div style={{
      marginBottom: '20px',
      fontFamily: 'sans-serif',
    }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 600,
          fontSize: '13px',
          color: 'var(--theme-elevation-900, #333)',
        }}>
          {label}
          {required && <span style={{ color: 'var(--theme-error, #dc3545)' }}> *</span>}
        </label>
      )}

      {/* Mode Selector */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '12px',
      }}>
        <button
          type="button"
          onClick={() => handleModeChange('theme')}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            border: '1px solid var(--theme-border-main, #e0e0e0)',
            borderRadius: '4px',
            backgroundColor: inputMode === 'theme' ? 'var(--theme-primary, #007bff)' : 'transparent',
            color: inputMode === 'theme' ? 'var(--theme-on-primary, #fff)' : 'var(--theme-text-primary, #000)',
            cursor: 'pointer',
            fontWeight: inputMode === 'theme' ? 600 : 400,
          }}
        >
          Theme Variable
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('custom')}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            border: '1px solid var(--theme-border-main, #e0e0e0)',
            borderRadius: '4px',
            backgroundColor: inputMode === 'custom' ? 'var(--theme-primary, #007bff)' : 'transparent',
            color: inputMode === 'custom' ? 'var(--theme-on-primary, #fff)' : 'var(--theme-text-primary, #000)',
            cursor: 'pointer',
            fontWeight: inputMode === 'custom' ? 600 : 400,
          }}
        >
          Custom Color
        </button>
      </div>

      {/* Input based on mode */}
      {inputMode === 'theme' ? (
        <select
          value={stringValue || 'var(--theme-primary)'}
          onChange={handleThemeChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid var(--theme-border-main, #e0e0e0)',
            borderRadius: '4px',
            backgroundColor: 'var(--theme-surface, #fff)',
            color: 'var(--theme-text-primary, #000)',
            cursor: 'pointer',
          }}
        >
          {Object.entries(groupedColors).map(([category, colors]) => (
            <optgroup key={category} label={category}>
              {colors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      ) : (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            style={{
              width: '60px',
              height: '40px',
              border: '1px solid var(--theme-border-main, #e0e0e0)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
          <input
            type="text"
            value={customColor}
            onChange={handleCustomColorChange}
            placeholder="#000000"
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              border: '1px solid var(--theme-border-main, #e0e0e0)',
              borderRadius: '4px',
              backgroundColor: 'var(--theme-surface, #fff)',
              color: 'var(--theme-text-primary, #000)',
              fontFamily: 'monospace',
            }}
          />
        </div>
      )}

      {/* Color Preview */}
      {stringValue && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          border: '1px solid var(--theme-border-main, #e0e0e0)',
          borderRadius: '4px',
          backgroundColor: 'var(--theme-surface-variant, #f5f5f5)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                backgroundColor: stringValue,
                border: '1px solid var(--theme-border-main, #e0e0e0)',
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '11px',
                color: 'var(--theme-text-secondary, #666)',
                marginBottom: '2px',
              }}>
                Current Value:
              </div>
              <code style={{
                fontSize: '12px',
                color: 'var(--theme-text-primary, #000)',
                fontFamily: 'monospace',
              }}>
                {stringValue}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
