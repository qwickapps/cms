# @qwickapps/cms

> Reusable Payload CMS collections, globals, and components for building QwickApps-powered websites

## What's New in v0.4.0

- **E-Commerce Integration**: Enhanced BlockRenderer with ProductCard component support for building e-commerce content
- **Cart Functionality**: New client-side exports enable shopping cart integration in content blocks
- **Product Support**: Pages and Posts collections now support e-commerce product displays

See [CHANGELOG.md](./CHANGELOG.md) for full details.

## Overview

`@qwickapps/cms` is a package that provides pre-built Payload CMS configurations for creating content management systems with the QwickApps framework. It eliminates boilerplate by providing ready-to-use collections, globals, blocks, and integrations.

## Features

- 📦 **Collections**: Pages, Posts, Media, Navigation, Forms, and more
- 🌐 **Globals**: Site Settings, Integrations, Advanced Settings
- 🧱 **Content Blocks**: Hero, Feature Grid, CTA, Forms, and 8+ other blocks
- 🔌 **Plugins**: QwickApps integration plugin
- 🎨 **Components**: Admin UI components (Logo, Dashboard, Row Labels)
- 📊 **Providers**: PayloadDataProvider for framework integration

## Installation

```bash
npm install @qwickapps/cms
```

## Usage

### Basic Setup

```typescript
// payload.config.ts
import { buildConfig } from 'payload';
import {
  Pages,
  Posts,
  Media,
  Users,
  Navigation,
  Forms,
} from '@qwickapps/cms/collections';
import {
  SiteSettings,
  Integrations,
  AdvancedSettings,
} from '@qwickapps/cms/globals';

export default buildConfig({
  collections: [Users, Pages, Posts, Media, Navigation, Forms],
  globals: [SiteSettings, Integrations, AdvancedSettings],
  // ... rest of your config
});
```

### Using Content Blocks

```typescript
import { contentBlocks } from '@qwickapps/cms/blocks';

// In your collection config
{
  name: 'content',
  type: 'blocks',
  blocks: contentBlocks,
}
```

### Using the QwickApps Plugin

```typescript
import { qwickappsPlugin } from '@qwickapps/cms/plugins';

export default buildConfig({
  plugins: [
    qwickappsPlugin({
      enableVisualBuilder: true,
      enableAI: false,
    }),
  ],
});
```

## Collections

### Pages
Dynamic pages with flexible content blocks and SEO metadata.

### Posts
Blog posts with featured images, authors, categories, and tags.

### Media
Image, video, and PDF uploads with alt text and captions.

### Navigation
Multi-level navigation menus with icon support.

### Forms
Custom form builder with CAPTCHA protection and submission storage.

### Products
Product catalog with rich descriptions and pricing.

### Users
Authentication and user management.

## Globals

### Site Settings
- Site information (name, description, logo)
- Contact information
- Social media links

### Integrations
- Analytics (GA4, GTM, Facebook Pixel)
- CAPTCHA (reCAPTCHA v2/v3, hCaptcha, Turnstile)
- Email configuration (SMTP)

### Advanced Settings
- SEO defaults
- Custom scripts (header, footer, CSS)
- Maintenance mode

## Content Blocks

- **Hero** - Large header sections
- **Text Section** - Rich text content
- **Feature Grid** - Feature showcases
- **CTA Section** - Call-to-action sections
- **Image** - Image displays
- **Spacer** - Vertical spacing
- **Code** - Code snippets
- **Product Grid** - Product displays
- **Accordion** - Collapsible content
- **Card Grid** - Card layouts
- **Form** - Contact forms

## Components

Admin UI components for better UX:
- `Logo` - Custom admin logo
- `Icon` - Custom admin icon
- `Dashboard` - Custom dashboard
- `BlockRowLabel` - Block row labels
- `FormFieldRowLabel` - Form field labels
- `NavigationItemRowLabel` - Navigation labels

## Providers

### PayloadDataProvider

Bridge between Payload CMS and QwickApps Framework:

```typescript
import { PayloadDataProvider } from '@qwickapps/cms/providers';

const dataProvider = new PayloadDataProvider({
  baseUrl: 'http://localhost:3000/api',
});
```

## Development

### Building

```bash
npm run build
```

### Watching

```bash
npm run dev
```

## Dependencies

This package requires the following peer dependencies:

- `payload` ^3.0.0
- `@payloadcms/db-postgres` ^3.0.0
- `@payloadcms/next` ^3.0.0
- `@payloadcms/richtext-lexical` ^3.0.0
- `@qwickapps/react-framework` *
- `@qwickapps/schema` *
- `next` ^15.0.3
- `react` ^19.0.0

## Examples

The `examples/` directory contains complete, runnable website examples:

| Example | Description | Theme |
|---------|-------------|-------|
| [Photography Portfolio](./examples/photography-portfolio) | Professional photographer portfolio with galleries | Midnight (dark) |
| [Restaurant](./examples/restaurant) | Restaurant website with menu and reservations | Autumn (light) |
| [DJ Portfolio](./examples/dj-portfolio) | Music artist/DJ website with events and music | Cosmic (dark) |
| [Travel Blog](./examples/travel-blog) | Travel blog with destinations and stories | Ocean (light) |

### Running Examples

Each example can be run with Docker:

```bash
# Navigate to an example
cd examples/photography-portfolio

# Start with Docker Compose
docker compose up

# Open in browser
open http://localhost:3000

# Admin panel
open http://localhost:3000/admin
```

Default credentials for all examples:
- Email: `admin@example.com`
- Password: `admin123`

### Running All Examples

```bash
cd examples
docker compose up

# Photography: http://localhost:3001
# Restaurant:  http://localhost:3002
# DJ:          http://localhost:3003
# Travel Blog: http://localhost:3004
```

## License

This package is licensed under the [PolyForm Shield License 1.0.0](./LICENSE).

**Permitted uses:**
- Building websites and applications
- Internal business applications
- Learning and educational projects
- Non-competitive commercial applications

**Contact:** legal@qwickapps.com for commercial licensing questions.

## Links

- [QwickApps Framework](https://www.npmjs.com/package/@qwickapps/react-framework)
- [QwickApps Schema](https://www.npmjs.com/package/@qwickapps/schema)
- [Payload CMS](https://payloadcms.com)
