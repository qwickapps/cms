// @ts-nocheck - @qwickapps/schema is a peer dependency resolved at runtime
/**
 * Payload CMS Data Provider Implementation
 *
 * Integrates Payload CMS with QwickApps React Framework data binding system.
 * Fetches content from Payload REST API and transforms it to match framework schemas.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Model } from '@qwickapps/schema';
import { DataResponse, IDataProvider, SelectOptions } from '@qwickapps/schema';

/**
 * Configuration for Payload Data Provider
 */
export interface PayloadDataProviderConfig {
  /** Base URL for Payload API (e.g., "http://localhost:3000/api") */
  apiUrl?: string;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Payload CMS-based data provider for QwickApps Framework
 *
 * Fetches data from Payload REST API and provides it to framework components
 * via the standard IDataProvider interface.
 *
 * Usage:
 * ```tsx
 * const payloadProvider = new PayloadDataProvider({
 *   apiUrl: 'http://localhost:3000/api'
 * });
 *
 * <DataProvider dataSource={{ dataProvider: payloadProvider }}>
 *   <HeroBlock dataSource="hero-blocks" />
 * </DataProvider>
 * ```
 */
export class PayloadDataProvider implements IDataProvider {
  private apiUrl: string;
  private debug: boolean;

  constructor(config: PayloadDataProviderConfig = {}) {
    this.apiUrl = config.apiUrl || '/api';
    this.debug = config.debug || false;
  }

  /**
   * Get single data item by slug
   *
   * For Payload, slug can be:
   * - Collection name (e.g., "hero-blocks") - returns first item
   * - Collection with ID (e.g., "hero-blocks/1") - returns specific item
   * - Nested path (e.g., "pages.home.hero") - navigates nested structure
   */
  async get<T extends Model>(slug: string): Promise<DataResponse<T>> {
    try {
      if (this.debug) {
        console.log('[PayloadDataProvider] get:', slug);
      }

      // Parse slug to determine collection and optional ID
      const { collection, id, path } = this.parseSlug(slug);

      // Build API URL
      let url = `${this.apiUrl}/${collection}`;

      if (id) {
        // Fetch specific item by ID
        url = `${url}/${id}`;
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          data: this.transformPayloadData(data) as T,
          cached: false,
          meta: {
            schema: collection,
            version: '1.0.0',
            slug
          }
        };
      } else {
        // Fetch first item from collection
        url = `${url}?limit=1`;
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        const result = await response.json();
        const firstItem = result.docs?.[0];

        if (!firstItem) {
          return { data: undefined };
        }

        // If path specified, navigate into the data
        const data = path ? this.navigatePath(firstItem, path) : firstItem;

        return {
          data: this.transformPayloadData(data) as T,
          cached: false,
          meta: {
            schema: collection,
            version: '1.0.0',
            slug
          }
        };
      }
    } catch (error) {
      console.error('[PayloadDataProvider] Error in get:', error);
      return {
        data: undefined,
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  }

  /**
   * Select multiple data items with query options
   *
   * Maps framework SelectOptions to Payload API query parameters
   */
  async select<T extends Model>(
    schema: string,
    options: SelectOptions = {}
  ): Promise<DataResponse<T[]>> {
    try {
      if (this.debug) {
        console.log('[PayloadDataProvider] select:', schema, options);
      }

      // Build query parameters
      const params = new URLSearchParams();

      if (options.limit) {
        params.append('limit', String(options.limit));
      }

      if (options.offset) {
        params.append('page', String(Math.floor(options.offset / (options.limit || 10)) + 1));
      }

      if (options.orderBy && options.sort) {
        const sortPrefix = options.sort === 'desc' ? '-' : '';
        params.append('sort', `${sortPrefix}${options.orderBy}`);
      }

      // Apply filters as where clause
      if (options.filters) {
        params.append('where', JSON.stringify(options.filters));
      }

      // Build API URL
      const url = `${this.apiUrl}/${schema}?${params.toString()}`;
      const response = await fetch(url, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }

      const result = await response.json();
      const items = result.docs || [];

      return {
        data: items.map((item: any) => this.transformPayloadData(item)) as T[],
        cached: false,
        meta: {
          schema,
          version: '1.0.0',
          total: result.totalDocs || items.length,
          offset: options.offset || 0,
          limit: options.limit || items.length
        }
      };
    } catch (error) {
      console.error('[PayloadDataProvider] Error in select:', error);
      return {
        data: [],
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  }

  /**
   * Parse slug into collection, ID, and nested path
   */
  private parseSlug(slug: string): { collection: string; id?: string; path?: string } {
    // Remove leading slash if present
    const cleanSlug = slug.replace(/^\//, '');

    // Check for dot notation (e.g., "pages.home.hero")
    if (cleanSlug.includes('.')) {
      const parts = cleanSlug.split('.');
      return {
        collection: parts[0],
        path: parts.slice(1).join('.')
      };
    }

    // Check for slash notation (e.g., "hero-blocks/1")
    if (cleanSlug.includes('/')) {
      const [collection, id] = cleanSlug.split('/');
      return { collection, id };
    }

    // Simple collection name
    return { collection: cleanSlug };
  }

  /**
   * Navigate nested path in object
   */
  private navigatePath(obj: any, path: string): any {
    const parts = path.split('.');
    let current = obj;

    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = current[part];
      } else {
        return undefined;
      }
    }

    return current;
  }

  /**
   * Transform Payload data to match framework expectations
   *
   * Payload returns data with metadata (id, createdAt, updatedAt, etc.)
   * This method can transform it to match framework component props
   */
  private transformPayloadData(data: any): any {
    if (!data) return data;

    // For HeroBlock, map Payload fields to framework props
    if (data.title && data.backgroundGradient) {
      return {
        ...data,
        // Map Payload's 'height' to framework's 'blockHeight'
        blockHeight: data.height || 'medium',
        // Map Payload's 'ctaButtons' to framework's 'actions'
        actions: data.ctaButtons?.map((btn: any) => ({
          label: btn.text,
          href: btn.link,
          variant: btn.variant === 'contained' ? 'primary' : 'outlined',
          buttonSize: 'large'
        })) || []
      };
    }

    // Return data as-is for other collections
    return data;
  }
}
