# DJ / Music Artist Portfolio

A music artist portfolio website built with @qwickapps/cms.

## Features

- **Hero Section** - Dynamic hero with latest release or tour info
- **Discography** - Albums, EPs, and singles showcase
- **Events** - Upcoming shows and tour dates
- **Music Player** - Embedded tracks and mixes
- **Bio** - Artist story and press kit
- **Booking** - Inquiry form for events and collaborations
- **Gallery** - Performance photos and music videos

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

This example uses the **cosmic** color palette for a vibrant, energetic look.

## Customization

### Adding Events

Use the admin panel to add upcoming shows with:
- Venue name and location
- Date and time
- Ticket link
- VIP/Meet & Greet options

### Music Embeds

Embed tracks from Spotify, SoundCloud, or other platforms using the Code block:

```html
<iframe src="https://open.spotify.com/embed/track/..." />
```

### Press Kit

Create a downloadable press kit page with:
- High-res photos
- Bio text
- Technical rider
- Contact information

## License

[PolyForm Shield License 1.0.0](../../LICENSE)
