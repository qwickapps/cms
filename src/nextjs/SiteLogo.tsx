// @ts-nocheck - Props types from @qwickapps/react-framework have schema dependency issues
/**
 * SiteLogo Component
 *
 * Renders the site logo based on site settings configuration.
 * Automatically determines whether to use ProductLogo or Logo based on icon + text settings.
 *
 * Logic:
 * - If logoIcon is set AND logoText is set → Use ProductLogo (icon + text)
 * - If only logoText is set → Use Logo (text only)
 * - If only logoIcon is set → Use the icon as an image
 * - Default → ProductLogo with QwickIcon and siteName
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';
import { ProductLogo, Logo as FrameworkLogo, QwickIcon } from '@qwickapps/react-framework';
import { useSettings } from './SettingsProvider';
import Image from 'next/image';

export interface SiteLogoProps {
  /** Size of the logo */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  /** Optional click handler */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * SiteLogo Component
 *
 * Automatically renders the appropriate logo type based on site settings:
 * - Icon + Text: ProductLogo (with QwickIcon or custom icon)
 * - Text only: Logo component
 * - Icon only: Image
 */
export function SiteLogo({
  size = 'small',
  onClick,
  className,
  style,
}: SiteLogoProps) {
  const { settings } = useSettings();

  // Get settings
  const logoIcon = (settings as any)?.logoIcon || 'qwick-icon';
  const customLogoIcon = (settings as any)?.customLogoIcon;
  const logoText = (settings as any)?.logoText; // Don't fallback to siteName here
  const siteName = (settings as any)?.siteName || 'QwickPress';
  const logoBadge = (settings as any)?.logoBadge || 'none';
  const logoBadgeShape = (settings as any)?.logoBadgeShape || 'circle';

  // Use logoText if provided, otherwise use siteName
  const displayText = logoText || siteName;

  // Debug logging (remove in production)
  if (typeof window !== 'undefined') {
    console.log('SiteLogo settings:', {
      logoIcon,
      logoText,
      siteName,
      displayText,
      logoBadge,
      logoBadgeShape,
      hasIcon: logoIcon !== 'none',
      hasText: !!displayText
    });
  }

  // Determine what to render
  const hasIcon = logoIcon !== 'none';
  const hasText = !!displayText;

  // Case 1: Both icon and text → ProductLogo
  if (hasIcon && hasText) {
    // Determine which icon to use
    let iconElement: React.ReactElement | undefined;

    if (logoIcon === 'qwick-icon') {
      // Use default QwickIcon
      iconElement = undefined; // ProductLogo will use QwickIcon by default
    } else if (logoIcon === 'custom-icon' && customLogoIcon) {
      // Use custom icon
      const iconUrl = typeof customLogoIcon === 'object' && customLogoIcon.url
        ? customLogoIcon.url
        : customLogoIcon;

      const iconSize = size === 'tiny' ? 20 : size === 'small' ? 32 : size === 'medium' ? 40 : size === 'large' ? 52 : 68;

      iconElement = (
        <Image
          src={iconUrl}
          alt=""
          width={iconSize}
          height={iconSize}
          style={{ objectFit: 'contain' }}
        />
      );
    }

    return (
      <ProductLogo
        icon={iconElement}
        name={displayText}
        size={size}
        onClick={onClick}
        className={className}
        style={style}
        badge={logoBadge}
        badgeShape={logoBadgeShape}
      />
    );
  }

  // Case 2: Text only → Logo component
  if (!hasIcon && hasText) {
    return (
      <FrameworkLogo
        name={displayText}
        size={size}
        onClick={onClick}
        className={className}
        style={style}
        badge={logoBadge}
        badgeShape={logoBadgeShape}
      />
    );
  }

  // Case 3: Icon only → Image
  if (hasIcon && !hasText) {
    if (logoIcon === 'qwick-icon') {
      const iconSize = size === 'tiny' ? 20 : size === 'small' ? 32 : size === 'medium' ? 40 : size === 'large' ? 52 : 68;
      return (
        <div
          className={`site-logo-icon ${className || ''}`.trim()}
          style={{
            cursor: onClick ? 'pointer' : 'default',
            display: 'inline-flex',
            alignItems: 'center',
            ...style,
          }}
          onClick={onClick}
        >
          <QwickIcon size={iconSize} />
        </div>
      );
    } else if (logoIcon === 'custom-icon' && customLogoIcon) {
      const iconUrl = typeof customLogoIcon === 'object' && customLogoIcon.url
        ? customLogoIcon.url
        : customLogoIcon;

      const iconSize = size === 'tiny' ? 20 : size === 'small' ? 32 : size === 'medium' ? 40 : size === 'large' ? 52 : 68;

      return (
        <div
          className={`site-logo-icon ${className || ''}`.trim()}
          style={{
            cursor: onClick ? 'pointer' : 'default',
            display: 'inline-flex',
            alignItems: 'center',
            ...style,
          }}
          onClick={onClick}
        >
          <Image
            src={iconUrl}
            alt={`${siteName} Logo`}
            width={iconSize}
            height={iconSize}
            style={{ objectFit: 'contain' }}
          />
        </div>
      );
    }
  }

  // Fallback: ProductLogo with defaults
  return (
    <ProductLogo
      name={siteName}
      size={size}
      onClick={onClick}
      className={className}
      style={style}
    />
  );
}
