/**
 * Enhanced Pages List Header Component
 *
 * Adds Material Design-styled header above the Pages list
 * Provides quick stats and actions for better UX
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { BeforeListClientProps } from 'payload';
import { useListQuery, useConfig } from '@payloadcms/ui';
import './styles/CollectionListHeader.css';

export const PagesListHeader: React.FC<BeforeListClientProps> = () => {
  const { data } = useListQuery();
  const config = useConfig();
  const [publishedCount, setPublishedCount] = useState<number | null>(null);
  const [draftCount, setDraftCount] = useState<number | null>(null);

  const totalDocs = data?.totalDocs ?? 0;
  const serverURL = config?.config?.serverURL || '';

  // Fetch accurate counts by status
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch published count
        const publishedRes = await fetch(
          `${serverURL}/api/pages?where[status][equals]=published&limit=0`,
          { credentials: 'include' }
        );
        if (publishedRes.ok) {
          const publishedData = await publishedRes.json();
          setPublishedCount(publishedData.totalDocs || 0);
        }

        // Fetch draft count
        const draftRes = await fetch(
          `${serverURL}/api/pages?where[status][equals]=draft&limit=0`,
          { credentials: 'include' }
        );
        if (draftRes.ok) {
          const draftData = await draftRes.json();
          setDraftCount(draftData.totalDocs || 0);
        }
      } catch (error) {
        console.error('Error fetching page counts:', error);
      }
    };

    if (serverURL) {
      fetchCounts();
    }
  }, [serverURL, data?.totalDocs]);

  return (
    <div className="collection-list-header">
      <div className="collection-list-stats">
        <div className="stats-grid">
          <div className="stat-card stat-card-primary">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <div className="stat-label">Total Pages</div>
              <div className="stat-value">{totalDocs}</div>
            </div>
          </div>

          <div className="stat-card stat-card-success">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <div className="stat-label">Published</div>
              <div className="stat-value">
                {publishedCount === null ? '...' : publishedCount}
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-warning">
            <div className="stat-icon">✎</div>
            <div className="stat-content">
              <div className="stat-label">Drafts</div>
              <div className="stat-value">
                {draftCount === null ? '...' : draftCount}
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-info">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">Showing</div>
              <div className="stat-value">
                {data?.docs?.length || 0} of {totalDocs}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
