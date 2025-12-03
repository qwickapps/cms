# Restaurant Website

A modern restaurant website built with @qwickapps/cms.

## Features

- **Hero Section** - Appetizing hero with restaurant highlights
- **Menu Display** - Organized menu with categories and prices
- **About Section** - Restaurant story and chef profiles
- **Hours & Location** - Operating hours and interactive map
- **Reservations** - Table booking form with CAPTCHA
- **Gallery** - Food and ambiance photos
- **Blog** - Chef's specials and food news

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

This example uses the **autumn** color palette for a warm, inviting feel.

## Customization

### Menu Categories

Edit the seed data or use the admin panel to organize menu items by:
- Appetizers
- Main Courses
- Desserts
- Beverages
- Specials

### Reservation Form

The contact form is pre-configured for reservations with fields for:
- Party size
- Preferred date/time
- Special requests
- Dietary restrictions

## License

[PolyForm Shield License 1.0.0](../../LICENSE)
