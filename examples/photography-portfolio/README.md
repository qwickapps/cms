# Photography Portfolio

A professional photography portfolio website built with @qwickapps/cms.

## Features

- **Hero Section** - Stunning full-screen hero with portfolio highlights
- **Photo Galleries** - Organized photo collections by category
- **About Page** - Photographer bio and equipment
- **Services** - Wedding, portrait, commercial photography services
- **Contact Form** - Inquiry form with CAPTCHA protection
- **Blog** - Behind-the-scenes and photography tips

## Quick Start

### Using Docker (Recommended)

```bash
# Start the site
docker compose up

# Open in browser
open http://localhost:3000

# Admin panel
open http://localhost:3000/admin
```

### Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations
npm run payload migrate

# Seed sample data
npm run seed

# Start development server
npm run dev
```

## Default Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
photography-portfolio/
├── src/
│   ├── app/
│   │   ├── (app)/          # Frontend routes
│   │   │   ├── layout.tsx  # App layout with navigation
│   │   │   ├── page.tsx    # Homepage
│   │   │   ├── gallery/    # Photo galleries
│   │   │   ├── about/      # About page
│   │   │   ├── services/   # Services page
│   │   │   └── contact/    # Contact page
│   │   ├── (payload)/      # Payload admin routes
│   │   └── api/            # API routes
│   └── collections/        # Custom collections
├── seed/
│   └── data.ts            # Sample content
├── payload.config.ts      # Payload CMS configuration
└── docker-compose.yml     # Docker setup
```

## Customization

### Changing Colors

Edit the theme in `src/app/(app)/layout.tsx`:

```typescript
const palette = 'ocean'; // Options: autumn, cosmic, ocean, forest, sunset, midnight
```

### Adding Galleries

Use the admin panel to:
1. Upload photos to Media collection
2. Create a new Page with Gallery blocks
3. Organize photos by category

### Custom Collections

The example uses standard CMS collections. To add custom collections:

```typescript
// src/collections/Galleries.ts
import type { CollectionConfig } from 'payload';

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'select', options: ['wedding', 'portrait', 'landscape'] },
    { name: 'photos', type: 'relationship', relationTo: 'media', hasMany: true },
  ],
};
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `PAYLOAD_SECRET` | Secret for Payload authentication | - |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the site | `http://localhost:3000` |

## License

[PolyForm Shield License 1.0.0](../../LICENSE)
