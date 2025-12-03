// @ts-nocheck
'use client';

/**
 * Footer From Settings Component
 *
 * Fetches footer configuration from Footer collection and renders with settings.
 * Displays copyright from site settings and "Powered by" branding.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Footer, Text } from './framework';
import { useSettings } from './SettingsProvider';
import { getPayloadAPIClient } from '../client/PayloadAPIClient';

/**
 * FooterFromSettings - Client Component
 * Fetches footer data from Footer collection and renders with copyright
 */
export function FooterFromSettings() {
  const { settings } = useSettings();
  const [footerData, setFooterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const client = getPayloadAPIClient();
        const result = await client.find('footer', {
          where: {
            position: { equals: 'main' }
          },
          limit: 1
        });

        if (result.docs && result.docs.length > 0) {
          setFooterData(result.docs[0]);
        }
      } catch (error) {
        console.error('Error fetching footer:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFooter();
  }, []);

  // Don't render anything while loading
  if (loading) {
    return null;
  }

  // Process copyright text with template variables
  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName || 'QwickPress';
  let copyrightText = settings?.copyrightText || `© ${currentYear} ${siteName}. All rights reserved.`;

  // Replace template variables
  copyrightText = copyrightText
    .replace('{year}', currentYear.toString())
    .replace('{siteName}', siteName);

  // Custom copyright component with "Powered by" on the right
  const customCopyright = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        width: '100%',
      }}
    >
      <Text variant="body2" customColor="var(--theme-text-secondary)">
        {copyrightText}
      </Text>
      <span style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)' }}>
        Powered by{' '}
        <a
          href="https://qwickapps.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          QwickPress
        </a>
        {' - A '}
        <a
          href="https://payloadcms.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          Payload CMS
        </a>
      </span>
    </Box>
  );

  // Render footer with data if available, otherwise render minimal footer with just copyright
  return (
    <Footer
      sections={footerData?.sections || []}
      copyright={customCopyright}
      orientation={footerData?.orientation || 'horizontal'}
      variant={footerData?.variant || 'default'}
      showDivider={footerData?.showDivider !== false}
    />
  );
}
