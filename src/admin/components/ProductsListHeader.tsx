/**
 * Enhanced Products List Header Component
 *
 * Adds Material Design-styled header above the Products list
 * Provides quick stats and actions for better UX
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { BeforeListClientProps } from 'payload';
import { useListQuery, useConfig } from '@payloadcms/ui';
import './styles/CollectionListHeader.css';

export const ProductsListHeader: React.FC<BeforeListClientProps> = () => {
  const { data } = useListQuery();
  const config = useConfig();
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [betaCount, setBetaCount] = useState<number | null>(null);
  const [comingSoonCount, setComingSoonCount] = useState<number | null>(null);

  const totalDocs = data?.totalDocs ?? 0;
  const serverURL = config?.config?.serverURL || '';

  // Fetch accurate counts by status
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch active count
        const activeRes = await fetch(
          `${serverURL}/api/products?where[status][equals]=active&limit=0`,
          { credentials: 'include' }
        );
        if (activeRes.ok) {
          const activeData = await activeRes.json();
          setActiveCount(activeData.totalDocs || 0);
        }

        // Fetch beta count
        const betaRes = await fetch(
          `${serverURL}/api/products?where[status][equals]=beta&limit=0`,
          { credentials: 'include' }
        );
        if (betaRes.ok) {
          const betaData = await betaRes.json();
          setBetaCount(betaData.totalDocs || 0);
        }

        // Fetch coming-soon count
        const comingSoonRes = await fetch(
          `${serverURL}/api/products?where[status][equals]=coming-soon&limit=0`,
          { credentials: 'include' }
        );
        if (comingSoonRes.ok) {
          const comingSoonData = await comingSoonRes.json();
          setComingSoonCount(comingSoonData.totalDocs || 0);
        }
      } catch (error) {
        console.error('Error fetching product counts:', error);
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
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <div className="stat-label">Total Products</div>
              <div className="stat-value">{totalDocs}</div>
            </div>
          </div>

          <div className="stat-card stat-card-success">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <div className="stat-label">Active</div>
              <div className="stat-value">
                {activeCount === null ? '...' : activeCount}
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-info">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-label">Beta</div>
              <div className="stat-value">
                {betaCount === null ? '...' : betaCount}
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-warning">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <div className="stat-label">Coming Soon</div>
              <div className="stat-value">
                {comingSoonCount === null ? '...' : comingSoonCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
