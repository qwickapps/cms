# Travel Blog

A travel blog and destination guide built with @qwickapps/cms.

## Features

- **Hero Section** - Featured destination or latest adventure
- **Destinations** - Organized by region/country with guides
- **Blog Posts** - Travel stories with rich media
- **Itineraries** - Detailed trip plans and recommendations
- **Photo Galleries** - Travel photography collections
- **Newsletter** - Subscription form for travel updates
- **About** - Author bio and travel philosophy

## Quick Start

### Using Docker (Recommended)

```bash
docker compose up
open http://localhost:3000
```

### Local Development

```bash
npm install
cp .env.example .env
npm run payload migrate
npm run seed
npm run dev
```

## Default Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

## Theme

This example uses the **ocean** color palette for a fresh, adventurous feel.

## Customization

### Content Categories

Organize content by:
- Destinations (by continent/country)
- Trip Types (backpacking, luxury, family)
- Activities (hiking, food, culture)
- Duration (weekend, week, month)

### Blog Posts

Each post can include:
- Featured image
- Destination tags
- Reading time estimate
- Photo galleries
- Embedded maps
- Practical tips sections

### Newsletter Integration

Connect to email services via the Integrations settings:
- Mailchimp
- ConvertKit
- Custom SMTP

## License

[PolyForm Shield License 1.0.0](../../LICENSE)
