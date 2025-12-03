// QwickApps CMS - Main Entry Point
// This package provides reusable Payload CMS collections, globals, components, and utilities

// Re-export everything from submodules
export * from './collections/index.js'
export * from './globals/index.js'
export * from './components/index.js'
export * from './blocks/index.js'
export * from './plugins/index.js'
export * from './providers/index.js'
export * from './client/PayloadAPIClient.js'
export * from './logging/index.js'

// Note: Next.js components are accessed via @qwickapps/cms/nextjs subpath export
// This avoids naming conflicts with blocks (e.g., HeroBlock)
