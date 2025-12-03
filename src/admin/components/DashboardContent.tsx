/**
 * Dashboard Content Component (Client Component)
 *
 * Note: Theme switching is handled by Payload CMS natively.
 * Users can change their theme preference in Account Settings.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React, { useState, useEffect } from 'react';

interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  count?: number;
  href: string;
  colorClass: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // Fetch collection counts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const counts: Record<string, number> = {};

        // Fetch counts for each collection
        const collections = ['pages', 'posts', 'products', 'forms', 'media', 'users'];

        for (const collection of collections) {
          try {
            const response = await fetch(`/api/${collection}?limit=0`);
            const data = await response.json();
            counts[collection] = data.totalDocs || 0;
          } catch (err) {
            console.error(`Error fetching ${collection}:`, err);
            counts[collection] = 0;
          }
        }

        setStats(counts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards: DashboardCard[] = [
    {
      title: 'Pages',
      description: 'Create and manage standalone pages like Home, About, Contact',
      icon: '📄',
      count: stats.pages,
      href: '/admin/collections/pages',
      colorClass: 'card-primary',
      stats: [
        { label: 'Total', value: stats.pages || 0 },
      ],
    },
    {
      title: 'Blog Posts',
      description: 'Write and publish blog posts, articles, and news updates',
      icon: '✍️',
      count: stats.posts,
      href: '/admin/collections/posts',
      colorClass: 'card-primary',
      stats: [
        { label: 'Total', value: stats.posts || 0 },
      ],
    },
    {
      title: 'Products',
      description: 'Manage your product catalog and showcase your offerings',
      icon: '🛍️',
      count: stats.products,
      href: '/admin/collections/products',
      colorClass: 'card-primary',
      stats: [
        { label: 'Total', value: stats.products || 0 },
      ],
    },
    {
      title: 'Forms',
      description: 'Create custom forms for contact, feedback, and data collection',
      icon: '📋',
      count: stats.forms,
      href: '/admin/collections/forms',
      colorClass: 'card-primary',
      stats: [
        { label: 'Total', value: stats.forms || 0 },
      ],
    },
    {
      title: 'Media Library',
      description: 'Upload and organize images, videos, and other media files',
      icon: '🖼️',
      count: stats.media,
      href: '/admin/collections/media',
      colorClass: 'card-primary',
      stats: [
        { label: 'Files', value: stats.media || 0 },
      ],
    },
    {
      title: 'Navigation',
      description: 'Configure your site navigation menus and structure',
      icon: '🧭',
      href: '/admin/collections/navigation',
      colorClass: 'card-primary',
    },
    {
      title: 'Features',
      description: 'Manage feature highlights and benefits for your site',
      icon: '⭐',
      href: '/admin/collections/features',
      colorClass: 'card-primary',
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: '👥',
      count: stats.users,
      href: '/admin/collections/users',
      colorClass: 'card-primary',
      stats: [
        { label: 'Total', value: stats.users || 0 },
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title">
            <h1>Welcome to QwickPress</h1>
            <p>Your AI-First Headless CMS powered by QwickApps Framework</p>
            <p className="theme-note">💡 Change theme in Account Settings</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      )}

      {!loading && (
        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.href}
              className={`dashboard-card ${card.colorClass}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>

                {card.stats && (
                  <div className="card-stats">
                    {card.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="stat-item">
                        <span className="stat-label">{stat.label}:</span>
                        <span className="stat-value">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {typeof card.count === 'number' && !card.stats && (
                  <div className="card-count">{card.count}</div>
                )}
              </div>
              <div className="card-arrow">→</div>
            </a>
          ))}
        </div>
      )}

      <div className="dashboard-footer">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <div className="links-grid">
            <a href="/admin/collections/pages/create" className="quick-link">
              ➕ New Page
            </a>
            <a href="/admin/collections/posts/create" className="quick-link">
              ➕ New Post
            </a>
            <a href="/admin/collections/products/create" className="quick-link">
              ➕ New Product
            </a>
            <a href="/admin/collections/forms/create" className="quick-link">
              ➕ New Form
            </a>
            <a href="/" target="_blank" className="quick-link">
              🌐 View Site
            </a>
            <a href="/api/docs" target="_blank" className="quick-link">
              📚 API Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
