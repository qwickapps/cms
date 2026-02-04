# Changelog

All notable changes to @qwickapps/cms will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-02-04

### Added

- **Markdown Block**: SSR-safe markdown rendering with syntax highlighting
  - Server-side rendering support for markdown content
  - Code syntax highlighting integration
  - Safe HTML sanitization

### Fixed

- **Image URLs**: Convert same-domain absolute URLs to relative for Next.js Image optimization
- **Markdown SSR**: Improve markdown block server-side rendering and code quality
- **Client Providers**: Fix AppRouterCacheProvider context flow in ClientSideQwickApp
- **Hydration**: Resolve hydration errors and improve package exports

## [0.2.7] - 2026-01-31

### Fixed

- **Media Collection**: Remove non-existent fashion-products relationship
  - Removed invalid relationship that referenced non-existent collection
  - Fixes: Collection configuration errors on startup
- **Security**: Patch critical Next.js RCE vulnerability (CVE GHSA-9qr9-h5gf-34mp)
  - Updated Next.js dependencies to address remote code execution vulnerability
  - Ensures secure server-side rendering and API routes

## [0.2.6] - 2026-01-25

Previous releases not documented.
