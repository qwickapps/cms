// @ts-nocheck
/**
 * Content Preview Component
 *
 * Live preview panel that renders page/post content using QwickApps React Framework
 * Shows in the admin panel alongside the content editor
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import { useFormFields } from '@payloadcms/ui';
import React, { useEffect, useState } from 'react';
import { iconMap } from '@qwickapps/react-framework';
import './styles/ContentPreview.css';

export const ContentPreview: React.FC = () => {
  const [previewData, setPreviewData] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Get form field values
  const title = useFormFields(([fields]) => fields.title?.value as string);
  const layout = useFormFields(([fields]) => fields.layout?.value as any[]);
  const status = useFormFields(([fields]) => fields.status?.value as string);

  // Update preview data when fields change
  useEffect(() => {
    // Ensure layout is always an array
    const layoutArray = Array.isArray(layout) ? layout : [];
    setPreviewData({
      title,
      layout: layoutArray,
      status,
    });
  }, [title, layout, status]);

  // Check if layout is valid and has items
  const hasBlocks = previewData &&
    Array.isArray(previewData.layout) &&
    previewData.layout.length > 0;

  if (!hasBlocks) {
    return (
      <div className="content-preview">
        <div className="preview-header">
          <h3>🔍 Live Preview</h3>
          <div className="preview-device-selector">
            <button
              className={previewMode === 'desktop' ? 'active' : ''}
              onClick={() => setPreviewMode('desktop')}
              title="Desktop View"
            >
              🖥️
            </button>
            <button
              className={previewMode === 'tablet' ? 'active' : ''}
              onClick={() => setPreviewMode('tablet')}
              title="Tablet View"
            >
              📱
            </button>
            <button
              className={previewMode === 'mobile' ? 'active' : ''}
              onClick={() => setPreviewMode('mobile')}
              title="Mobile View"
            >
              📱
            </button>
          </div>
        </div>
        <div className="preview-empty">
          <p>No content blocks added yet.</p>
          <p>Add content blocks to see a live preview.</p>
        </div>
      </div>
    );
  }

  // Map of viewport widths for different devices
  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="content-preview">
      <div className="preview-header">
        <h3>🔍 Live Preview</h3>
        <div className="preview-device-selector">
          <button
            className={previewMode === 'desktop' ? 'active' : ''}
            onClick={() => setPreviewMode('desktop')}
            title="Desktop View"
          >
            🖥️
          </button>
          <button
            className={previewMode === 'tablet' ? 'active' : ''}
            onClick={() => setPreviewMode('tablet')}
            title="Tablet View"
          >
            📱
          </button>
          <button
            className={previewMode === 'mobile' ? 'active' : ''}
            onClick={() => setPreviewMode('mobile')}
            title="Mobile View"
          >
            📱
          </button>
        </div>
        {status && (
          <div className={`preview-status status-${status}`}>
            {status === 'published' ? '✅' : '📝'} {status}
          </div>
        )}
      </div>

      <div
        className={`preview-viewport viewport-${previewMode}`}
        style={{
          maxWidth: viewportWidths[previewMode],
        }}
      >
        <div className="preview-content">
          {previewData.title && (
            <h1 className="preview-title">{previewData.title}</h1>
          )}

          <div className="preview-blocks">
            {Array.isArray(previewData.layout) && previewData.layout.map((block: any, index: number) => (
              <PreviewBlock key={index} block={block} />
            ))}
          </div>
        </div>
      </div>

      <div className="preview-info">
        <small>
          📊 {previewData.layout.length} block{previewData.layout.length !== 1 ? 's' : ''}
        </small>
      </div>
    </div>
  );
};

/**
 * Individual Block Preview Component
 */
const PreviewBlock: React.FC<{ block: any }> = ({ block }) => {
  const blockType = block.blockType;

  // Simple preview rendering for different block types
  switch (blockType) {
    case 'hero':
      return (
        <div className="preview-block preview-hero" style={{ background: block.backgroundGradient || '#f5f5f5' }}>
          <h2>{block.title || 'Hero Title'}</h2>
          {block.subtitle && <p>{block.subtitle}</p>}
          {block.actions && block.actions.length > 0 && (
            <div className="preview-actions">
              {block.actions.map((action: any, i: number) => (
                <button key={i} className={`preview-button ${action.variant || 'contained'}`}>
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );

    case 'textSection':
      return (
        <div className="preview-block preview-text-section">
          {block.heading && <h3>{block.heading}</h3>}
          {block.content && (
            <div className="preview-rich-text">
              [Rich Text Content]
            </div>
          )}
        </div>
      );

    case 'featureGrid':
      return (
        <div className="preview-block preview-feature-grid">
          {block.heading && <h3>{block.heading}</h3>}
          <div className="preview-grid" style={{ gridTemplateColumns: `repeat(${block.columns || 3}, 1fr)` }}>
            {block.features && block.features.map((feature: any, i: number) => {
              const iconData = feature.icon ? iconMap[feature.icon] : null;
              const IconComponent = iconData?.component;
              return (
                <div key={i} className="preview-feature-card">
                  <div className="feature-icon">
                    {IconComponent ? <IconComponent /> : '⭐'}
                  </div>
                  <div className="feature-title">{feature.title || `Feature ${i + 1}`}</div>
                  {feature.description && <div className="feature-description">{feature.description}</div>}
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="preview-block preview-image">
          <div className="preview-image-placeholder">
            🖼️ {block.alt || 'Image'}
          </div>
          {block.caption && <p className="image-caption">{block.caption}</p>}
        </div>
      );

    case 'code':
      return (
        <div className="preview-block preview-code">
          {block.title && <h4>{block.title}</h4>}
          <pre className="code-block">
            <code className={`language-${block.language || 'text'}`}>
              {block.code || '// Code goes here'}
            </code>
          </pre>
        </div>
      );

    case 'ctaSection':
      return (
        <div className="preview-block preview-cta">
          <h3>{block.heading || 'Call to Action'}</h3>
          {block.description && <p>{block.description}</p>}
          {block.buttons && block.buttons.length > 0 && (
            <div className="preview-actions">
              {block.buttons.map((btn: any, i: number) => (
                <button key={i} className={`preview-button ${btn.variant || 'contained'}`}>
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );

    case 'spacer':
      return (
        <div
          className="preview-block preview-spacer"
          style={{
            height: block.height === 'small' ? '24px' :
              block.height === 'large' ? '96px' :
                block.height === 'xlarge' ? '144px' : '48px',
          }}
        >
          <div className="spacer-indicator">↕️ Spacer ({block.height || 'medium'})</div>
        </div>
      );

    case 'form':
      return (
        <div className="preview-block preview-form">
          <h3>📋 Form Block</h3>
          <p>Form preview will appear here</p>
        </div>
      );

    case 'accordion':
      return (
        <div className="preview-block preview-accordion">
          {block.heading && <h3>{block.heading}</h3>}
          {block.items && block.items.map((item: any, i: number) => (
            <div key={i} className="accordion-item">
              ▶ {item.title || `Item ${i + 1}`}
            </div>
          ))}
        </div>
      );

    case 'cardGrid':
      return (
        <div className="preview-block preview-card-grid">
          {block.heading && <h3>{block.heading}</h3>}
          <div className="preview-grid" style={{ gridTemplateColumns: `repeat(${block.columns || 3}, 1fr)` }}>
            {block.cards && block.cards.map((card: any, i: number) => {
              const iconData = card.icon ? iconMap[card.icon] : null;
              const IconComponent = iconData?.component;
              return (
                <div key={i} className="preview-card">
                  {IconComponent && (
                    <div className="card-icon">
                      <IconComponent />
                    </div>
                  )}
                  <h4>{card.title || `Card ${i + 1}`}</h4>
                  {card.description && <p>{card.description}</p>}
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'productGrid':
      return (
        <div className="preview-block preview-product-grid">
          {block.heading && <h3>{block.heading}</h3>}
          <div className="preview-grid" style={{ gridTemplateColumns: `repeat(${block.columns || 3}, 1fr)` }}>
            {Array.from({ length: block.products?.length || 3 }).map((_, i) => (
              <div key={i} className="preview-product-card">
                <div className="product-image">🛍️</div>
                <div className="product-title">Product {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="preview-block preview-unknown">
          <p>📦 {blockType || 'Unknown'} Block</p>
        </div>
      );
  }
};
