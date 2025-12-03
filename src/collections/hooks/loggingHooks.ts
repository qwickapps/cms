/**
 * Payload CMS Collection Logging Hooks
 *
 * Provides reusable hooks for logging collection operations.
 * Only logs important events - errors, warnings, and security-relevant operations.
 *
 * What is logged:
 * - Create/Update/Delete failures
 * - Authentication-related operations on Users collection
 * - Form submission errors
 * - Validation failures
 *
 * What is NOT logged (routine traffic):
 * - Successful read operations
 * - Normal CRUD operations (unless they fail)
 *
 * @module @qwickapps/cms/collections/hooks/loggingHooks
 */

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionAfterErrorHook,
} from 'payload';
import { cmsLoggers } from '../../logging/index.js';

const log = cmsLoggers.collections;

/**
 * Hook to log collection errors
 * Attach to afterError hook on collections
 */
export const logCollectionError: CollectionAfterErrorHook = async ({
  error,
  collection,
  context,
  req,
}) => {
  log.error('Collection operation failed', {
    collection: collection?.slug,
    error: error?.message,
    stack: error?.stack,
    userId: req?.user?.id,
  });

  // Re-throw to maintain normal error handling
  throw error;
};

/**
 * Hook to log form submission creation
 * Use on FormSubmissions collection
 */
export const logFormSubmission: CollectionAfterChangeHook = async ({
  doc,
  operation,
  collection,
  req,
}) => {
  if (operation === 'create' && collection?.slug === 'form-submissions') {
    // Log form submissions for troubleshooting (not as error, but as info for tracking)
    log.info('Form submitted', {
      formName: doc.formName,
      submitterEmail: doc.submitterEmail,
      status: doc.status,
    });
  }

  return doc;
};

/**
 * Hook to log user authentication events
 * Use on Users collection
 */
export const logUserAuthEvent: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  collection,
  req,
}) => {
  if (collection?.slug !== 'users') return doc;

  // Log role changes (security relevant)
  if (operation === 'update' && previousDoc?.roles && doc?.roles) {
    const previousRoles = Array.isArray(previousDoc.roles) ? previousDoc.roles : [];
    const newRoles = Array.isArray(doc.roles) ? doc.roles : [];

    if (JSON.stringify(previousRoles.sort()) !== JSON.stringify(newRoles.sort())) {
      log.warn('User roles changed', {
        userId: doc.id,
        email: doc.email,
        previousRoles,
        newRoles,
        changedBy: req?.user?.id,
      });
    }
  }

  // Log new user creation
  if (operation === 'create') {
    log.info('New user created', {
      userId: doc.id,
      email: doc.email,
      roles: doc.roles,
    });
  }

  return doc;
};

/**
 * Hook to log deletion of important records
 * Use on collections where deletion should be tracked
 */
export const logDeletion: CollectionAfterDeleteHook = async ({
  doc,
  collection,
  req,
}) => {
  log.warn('Record deleted', {
    collection: collection?.slug,
    recordId: doc?.id,
    deletedBy: req?.user?.id,
  });

  return doc;
};

/**
 * Hook to log validation errors before save
 * Useful for debugging form/data issues
 */
export const logValidationContext: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  collection,
  req,
  context,
}) => {
  // Only log if there's a validation context set (by other hooks)
  if (context?.validationErrors) {
    log.warn('Validation errors detected', {
      collection: collection?.slug,
      operation,
      errors: context.validationErrors,
      userId: req?.user?.id,
    });
  }

  return data;
};
