# @qwickapps/cms Examples

This directory contains example websites built with `@qwickapps/cms`. Each example demonstrates how to build different types of websites using the QwickApps CMS framework.

## Available Examples

| Example | Description | Demo |
|---------|-------------|------|
| [Photography Portfolio](./photography-portfolio) | Professional photographer portfolio with galleries | Coming soon |
| [Restaurant](./restaurant) | Restaurant website with menu and reservations | Coming soon |
| [DJ Portfolio](./dj-portfolio) | Music artist/DJ website with events and mixes | Coming soon |
| [Travel Blog](./travel-blog) | Travel blog with destinations and stories | Coming soon |

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Running an Example

Each example can be run independently using Docker Compose:

```bash
# Navigate to the example
cd examples/photography-portfolio

# Start the example
docker compose up

# Open in browser
open http://localhost:3000
```

### Running All Examples

To run all examples at once:

```bash
# From the examples directory
docker compose up

# Examples will be available at:
# - Photography: http://localhost:3001
# - Restaurant:  http://localhost:3002
# - DJ:          http://localhost:3003
# - Travel Blog: http://localhost:3004
```

## Example Structure

Each example follows the same structure:

```
example-name/
├── README.md           # Example-specific documentation
├── docker-compose.yml  # Docker configuration
├── package.json        # Dependencies
├── payload.config.ts   # Payload CMS configuration
├── src/
│   ├── app/           # Next.js app directory
│   └── collections/   # Custom collections (if any)
└── seed/
    └── data.ts        # Sample content data
```

## Creating Your Own Site

1. Copy any example as a starting point
2. Modify the Payload configuration
3. Update the seed data with your content
4. Customize the styling

## Common Patterns

### Using Collections

All examples use the standard CMS collections:

```typescript
import {
  Pages,
  Posts,
  Media,
  Navigation,
  Forms,
} from '@qwickapps/cms/collections';
```

### Using Content Blocks

Content blocks for flexible page layouts:

```typescript
import { contentBlocks } from '@qwickapps/cms/blocks';
```

### Site Settings

Global site configuration:

```typescript
import {
  SiteSettings,
  Integrations,
  ThemeSettings,
} from '@qwickapps/cms/globals';
```

## License

These examples are provided under the [PolyForm Shield License 1.0.0](../LICENSE).

You are free to use these examples as templates for your own websites.
