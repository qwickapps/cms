/**
 * RefreshRouteOnSave Component
 *
 * Client component that listens for Payload CMS Live Preview postMessage events
 * and refreshes the Next.js route when content is saved.
 *
 * This component is used in preview routes to enable real-time updates
 * when editors make changes in the Payload admin panel.
 *
 * @see https://payloadcms.com/docs/live-preview/overview
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef } from 'react';

/**
 * Props for RefreshRouteOnSave
 */
export interface RefreshRouteOnSaveProps {
  /**
   * Optional callback fired when data is received from admin panel
   */
  onDataReceived?: (data: any) => void;
}

/**
 * RefreshRouteOnSave
 *
 * Listens for postMessage events from Payload's Live Preview iframe communication
 * and refreshes the Next.js route to show updated content.
 */
export const RefreshRouteOnSave: React.FC<RefreshRouteOnSaveProps> = ({ onDataReceived }) => {
  const router = useRouter();
  const lastRefreshRef = useRef<number>(0);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // Validate the message is from Payload CMS
      // The message contains the updated document data
      if (!event.data) return;

      const { type, data } = event.data;

      // Payload sends 'payload-live-preview' type messages
      if (type === 'payload-live-preview') {
        // Debounce refreshes to avoid too many in quick succession
        const now = Date.now();
        if (now - lastRefreshRef.current < 500) {
          return;
        }
        lastRefreshRef.current = now;

        // Call optional callback with received data
        if (onDataReceived) {
          onDataReceived(data);
        }

        // Refresh the route to fetch latest data from server
        router.refresh();
      }
    },
    [router, onDataReceived]
  );

  useEffect(() => {
    // Add event listener for postMessage events
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  // This component doesn't render anything
  return null;
};

export default RefreshRouteOnSave;
