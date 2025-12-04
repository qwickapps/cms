# Photography Portfolio

A professional photography portfolio website built with @qwickapps/cms.

## Features

- **Hero Section** - Stunning full-screen hero with background image
- **Photo Galleries** - Portfolio organized by category (portraits, weddings, lifestyle)
- **About Page** - Photographer bio
- **Contact Form** - Inquiry form with CAPTCHA protection

## Quick Start

### Interactive Setup (Recommended)

The interactive setup script guides you through configuration:

```bash
# Run the interactive setup
npm run setup
```

This will:
1. Check prerequisites (Node.js, npm)
2. Let you choose your database option (Docker, local PostgreSQL, or custom URL)
3. Create `.env` file with your configuration
4. Install dependencies
5. Seed the database with demo content

### Using Docker

```bash
# One command to start everything
npm run docker:dev

# Or step by step:
npm run docker:up    # Start PostgreSQL on port 5433
npm run seed         # Seed demo content
npm run dev          # Start the dev server
```

### Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create .env file with your DATABASE_URL
echo "DATABASE_URL=postgresql://user:password@localhost:5432/photography" > .env

# Install and seed
npm install
npm run seed
npm run dev
```

### View the Site

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## Demo Credentials

- Email: `admin@photography.demo`
- Password: `demo1234`

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
