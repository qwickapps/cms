/**
 * LivePreviewClient Component
 *
 * Client component that uses Payload's useLivePreview hook to provide
 * real-time updates as content is edited in the admin panel.
 *
 * This component wraps the BlockRenderer and provides live data updates
 * without requiring a page refresh.
 *
 * @see https://payloadcms.com/docs/live-preview/client
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import React from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { BlockRenderer } from './BlockRenderer';

/**
 * Props for LivePreviewClient
 */
export interface LivePreviewClientProps {
  /**
   * Initial page/post data from server
   */
  initialData: any;
  /**
   * The Payload server URL for live preview communication
   */
  serverURL: string;
  /**
   * Depth for relationship population (should match initial request depth)
   */
  depth?: number;
}

/**
 * LivePreviewClient
 *
 * Uses Payload's useLivePreview hook to receive real-time updates
 * from the admin panel as content is being edited.
 */
export const LivePreviewClient: React.FC<LivePreviewClientProps> = ({
  initialData,
  serverURL,
  depth = 2,
}) => {
  // Use the live preview hook to get real-time updates
  const { data } = useLivePreview({
    initialData,
    serverURL,
    depth,
  });

  // Render the blocks with live data
  return <BlockRenderer blocks={data?.layout || []} />;
};

export default LivePreviewClient;
