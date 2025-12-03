/**
 * Payload CMS API Client
 *
 * Centralized client for all Payload CMS REST API calls.
 * Handles URL resolution, error handling, and consistent data fetching.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

export interface QueryOptions {
  where?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string;
  depth?: number;
  draft?: boolean;
}

export interface PayloadResponse<T = any> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export class PayloadAPIClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    // Auto-detect base URL:
    // 1. Use provided baseURL if given
    // 2. In browser (client-side), use relative URL (empty string)
    // 3. In server (SSR), use PAYLOAD_PUBLIC_SERVER_URL or NEXT_PUBLIC_SERVER_URL or default
    if (baseURL) {
      this.baseURL = baseURL;
    } else if (typeof window !== 'undefined') {
      // Client-side: use relative URLs to avoid port/domain mismatch
      this.baseURL = '';
    } else {
      // Server-side: prefer PAYLOAD_PUBLIC_SERVER_URL (runtime) over NEXT_PUBLIC_SERVER_URL (build-time)
      this.baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    }
  }

  /**
   * Build query string from options
   */
  private buildQueryString(options: QueryOptions = {}): string {
    const params = new URLSearchParams();

    if (options.where) {
      params.append('where', JSON.stringify(options.where));
    }
    if (options.limit !== undefined) {
      params.append('limit', options.limit.toString());
    }
    if (options.page !== undefined) {
      params.append('page', options.page.toString());
    }
    if (options.sort) {
      params.append('sort', options.sort);
    }
    if (options.depth !== undefined) {
      params.append('depth', options.depth.toString());
    }
    if (options.draft !== undefined) {
      params.append('draft', options.draft.toString());
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Fetch from a collection
   */
  async find<T = any>(
    collection: string,
    options?: QueryOptions
  ): Promise<PayloadResponse<T>> {
    const queryString = this.buildQueryString(options);
    const url = `${this.baseURL}/api/${collection}${queryString}`;

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetch a single document by ID
   */
  async findById<T = any>(
    collection: string,
    id: string | number
  ): Promise<T> {
    const url = `${this.baseURL}/api/${collection}/${id}`;

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection}/${id}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetch a global
   */
  async findGlobal<T = any>(slug: string): Promise<T> {
    const url = `${this.baseURL}/api/globals/${slug}`;

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch global ${slug}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create a document in a collection
   */
  async create<T = any>(
    collection: string,
    data: Record<string, any>
  ): Promise<T> {
    const url = `${this.baseURL}/api/${collection}`;

    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${collection}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update a document by ID
   */
  async update<T = any>(
    collection: string,
    id: string | number,
    data: Record<string, any>
  ): Promise<T> {
    const url = `${this.baseURL}/api/${collection}/${id}`;

    const response = await fetch(url, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${collection}/${id}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a document by ID
   */
  async delete(collection: string, id: string | number): Promise<void> {
    const url = `${this.baseURL}/api/${collection}/${id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${collection}/${id}: ${response.statusText}`);
    }
  }
}

// Singleton instance
let clientInstance: PayloadAPIClient | null = null;

/**
 * Get or create a PayloadAPIClient instance
 */
export function getPayloadAPIClient(baseURL?: string): PayloadAPIClient {
  if (!clientInstance || baseURL) {
    clientInstance = new PayloadAPIClient(baseURL);
  }
  return clientInstance;
}
