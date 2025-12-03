/**
 * QwickApps CMS Logging
 *
 * Provides centralized logging for the CMS package with optional remote log forwarding.
 * Dependencies @qwickapps/logging and @qwickapps/log-client are optional.
 *
 * What to log:
 * - Authentication failures
 * - Collection operation errors
 * - Plugin initialization errors
 * - Configuration warnings
 * - Database connection issues
 * - Unexpected exceptions
 *
 * What NOT to log (already captured by web analytics/access logs):
 * - Normal page requests
 * - Successful API calls
 * - User sessions
 * - Page views
 *
 * Environment Variables:
 *   LOG_SERVICE_URL - Log server URL (e.g., https://logs.qwickapps.com)
 *   LOG_SERVICE_TOKEN - Service account token for authentication
 *   LOG_ENABLED - Enable/disable remote logging (default: true in production)
 *
 * @module @qwickapps/cms/logging
 */

// Configuration from environment
const LOG_SERVICE_URL = process.env.LOG_SERVICE_URL || 'https://logs.qwickapps.com';
const LOG_SERVICE_TOKEN = process.env.LOG_SERVICE_TOKEN;
const LOG_ENABLED = process.env.LOG_ENABLED !== 'false';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Type definitions for optional dependencies
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogTransport {
  handle(level: LogLevel, namespace: string, message: string, context?: Record<string, unknown>): void;
}

interface LoggerInterface {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
  setConfig?(config: Record<string, unknown>): void;
}

interface LogClientInterface {
  addLog(log: Record<string, unknown>): void;
  shutdown(): Promise<void>;
  getStats(): Record<string, unknown> | null;
}

// Optional dependency references (loaded dynamically)
let getLoggerFn: ((namespace: string) => LoggerInterface) | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let LogClientClass: any = null;

// Try to load optional dependencies
try {
  const loggingModule = await import('@qwickapps/logging');
  // Use getLogger factory function which returns a logger instance
  getLoggerFn = (namespace: string) => loggingModule.getLogger(namespace) as unknown as LoggerInterface;
} catch {
  // @qwickapps/logging not installed - use console fallback
}

try {
  const logClientModule = await import('@qwickapps/log-client');
  LogClientClass = logClientModule.LogClient;
} catch {
  // @qwickapps/log-client not installed - remote logging disabled
}

// Singleton log client instance
let logClient: LogClientInterface | null = null;

/**
 * Get or create the log client singleton
 */
function getLogClient(): LogClientInterface | null {
  if (logClient) return logClient;
  if (!LogClientClass) return null;

  // Only enable in production with proper token, or explicitly enabled in dev
  if (!LOG_ENABLED) return null;
  if (!LOG_SERVICE_TOKEN && IS_PRODUCTION) {
    console.warn('[CMS Logging] No service token configured - remote logging disabled');
    return null;
  }

  const config = {
    serviceUrl: LOG_SERVICE_URL,
    authToken: LOG_SERVICE_TOKEN,
    batchSize: 50,
    flushIntervalMs: 10000,
    bufferMaxSize: 1000,
    debug: !IS_PRODUCTION,
    metadata: {
      app_name: 'qwickapps-cms',
      app_version: process.env.npm_package_version || '0.0.0',
      environment: process.env.NODE_ENV || 'development',
      device_type: 'server',
    },
  };

  logClient = new LogClientClass(config);
  return logClient;
}

/**
 * Transport adapter that forwards logs to the QwickApps log server
 */
class CMSLogTransport implements LogTransport {
  handle(level: LogLevel, namespace: string, message: string, context?: Record<string, unknown>): void {
    if (level === 'debug') return;

    const client = getLogClient();
    if (!client) return;

    client.addLog({
      level,
      msg: message,
      timestamp: new Date().toISOString(),
      ns: namespace,
      ...context,
    });
  }
}

// Singleton transport instance
const cmsTransport = new CMSLogTransport();

/**
 * Console-based fallback logger when @qwickapps/logging is not available
 */
class ConsoleLogger implements LoggerInterface {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!IS_PRODUCTION) {
      console.debug(`[${this.namespace}] ${message}`, context || '');
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    console.info(`[${this.namespace}] ${message}`, context || '');
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(`[${this.namespace}] ${message}`, context || '');
  }

  error(message: string, context?: Record<string, unknown>): void {
    console.error(`[${this.namespace}] ${message}`, context || '');
  }
}

/**
 * Create a CMS logger with optional remote log forwarding
 *
 * @param namespace - Logger namespace (e.g., 'Auth', 'Collections', 'Plugins')
 * @returns Configured Logger instance
 *
 * @example
 * const log = createCMSLogger('Auth');
 * log.error('Authentication failed', { userId, reason: 'invalid_token' });
 */
export function createCMSLogger(namespace: string): LoggerInterface {
  const fullNamespace = `CMS.${namespace}`;

  // Use @qwickapps/logging if available, otherwise fall back to console
  if (getLoggerFn) {
    const logger = getLoggerFn(fullNamespace);
    if (logger.setConfig) {
      logger.setConfig({
        transports: [cmsTransport],
        level: IS_PRODUCTION ? 'warn' : 'debug',
        enabled: true,
        disableConsole: IS_PRODUCTION,
      });
    }
    return logger;
  }

  return new ConsoleLogger(fullNamespace);
}

/**
 * Pre-configured loggers for common CMS operations
 */
export const cmsLoggers = {
  /** Authentication events (login failures, token issues) */
  auth: createCMSLogger('Auth'),

  /** Collection operations (CRUD errors, validation failures) */
  collections: createCMSLogger('Collections'),

  /** Plugin lifecycle (initialization errors, configuration issues) */
  plugins: createCMSLogger('Plugins'),

  /** Database operations (connection errors, query failures) */
  database: createCMSLogger('Database'),

  /** API errors (endpoint failures, response errors) */
  api: createCMSLogger('API'),

  /** Configuration issues (missing env vars, invalid settings) */
  config: createCMSLogger('Config'),
};

/**
 * Flush all pending logs (call before process exit)
 */
export async function flushCMSLogs(): Promise<void> {
  if (logClient) {
    await logClient.shutdown();
    logClient = null;
  }
}

/**
 * Get log client statistics (for health checks)
 */
export function getLogStats(): Record<string, unknown> | null {
  return logClient?.getStats() || null;
}

// Export types
export type { LogLevel, LoggerInterface as Logger };
