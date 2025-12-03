/**
 * Seed data for DJ Portfolio example
 */

import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  console.log('🌱 Seeding DJ Portfolio...');

  const payload = await getPayload({ config });

  // Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin',
    },
  });

  // Create site settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'DJ NOVA',
      siteDescription: 'Electronic music producer and DJ based in Los Angeles',
      contactEmail: 'booking@djnova.music',
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com/djnova' },
        { platform: 'spotify', url: 'https://open.spotify.com/artist/djnova' },
        { platform: 'soundcloud', url: 'https://soundcloud.com/djnova' },
        { platform: 'youtube', url: 'https://youtube.com/djnova' },
      ],
    },
  });

  // Create navigation
  await payload.create({
    collection: 'navigation',
    data: {
      name: 'Main Navigation',
      location: 'header',
      items: [
        { label: 'Home', url: '/' },
        { label: 'Music', url: '/music' },
        { label: 'Events', url: '/events' },
        { label: 'About', url: '/about' },
        { label: 'Booking', url: '/booking' },
      ],
    },
  });

  // Create homepage
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      content: [
        {
          blockType: 'hero',
          title: 'DJ NOVA',
          subtitle: 'New Album "ECLIPSE" Out Now. World Tour 2025.',
          textAlign: 'center',
          blockHeight: 'viewport',
          actions: [
            {
              label: 'Listen Now',
              href: '/music',
              variant: 'contained',
              color: 'primary',
              buttonSize: 'large',
              icon: 'play_arrow',
            },
            {
              label: 'Tour Dates',
              href: '/events',
              variant: 'outlined',
              color: 'primary',
              buttonSize: 'large',
            },
          ],
        },
        {
          blockType: 'textSection',
          heading: 'Latest Release',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '"ECLIPSE" is a journey through soundscapes of progressive house and techno. Featuring collaborations with artists from around the globe, this album pushes the boundaries of electronic music.',
                    },
                  ],
                },
              ],
            },
          },
          textAlign: 'center',
          maxWidth: 'md',
          padding: 'large',
        },
        {
          blockType: 'cardGrid',
          heading: 'Upcoming Shows',
          columns: 3,
          spacing: 'large',
          cards: [
            {
              title: 'Los Angeles',
              description: 'Dec 15, 2025 • The Novo\nECLIPSE Album Release Party',
              icon: '🎧',
              link: '/events#la',
              linkText: 'Get Tickets',
            },
            {
              title: 'Miami',
              description: 'Dec 20, 2025 • Club Space\nMMW Warm-up',
              icon: '🌴',
              link: '/events#miami',
              linkText: 'Get Tickets',
            },
            {
              title: 'Berlin',
              description: 'Jan 5, 2026 • Berghain\nEuropean Tour Kickoff',
              icon: '🇩🇪',
              link: '/events#berlin',
              linkText: 'Get Tickets',
            },
          ],
          maxWidth: 'lg',
          padding: 'large',
        },
        {
          blockType: 'ctaSection',
          heading: 'Book DJ NOVA',
          description: 'Available for festivals, clubs, and private events worldwide.',
          textAlign: 'center',
          buttons: [
            {
              label: 'Booking Inquiry',
              href: '/booking',
              variant: 'contained',
              color: 'primary',
              buttonSize: 'large',
            },
          ],
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          padding: 'huge',
        },
      ],
    },
  });

  // Create booking form
  const bookingForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Booking Inquiry',
      submitButtonText: 'Send Inquiry',
      successMessage: 'Thank you! Our booking team will respond within 48 hours.',
      fields: [
        { fieldType: 'text', label: 'Your Name', name: 'name', required: true, width: '50' },
        { fieldType: 'text', label: 'Company/Venue', name: 'company', required: true, width: '50' },
        { fieldType: 'email', label: 'Email', name: 'email', required: true, width: '50' },
        { fieldType: 'text', label: 'Phone', name: 'phone', width: '50' },
        { fieldType: 'select', label: 'Event Type', name: 'eventType', options: 'Festival,Club Night,Private Event,Corporate,Other', width: '50' },
        { fieldType: 'text', label: 'Event Date', name: 'eventDate', required: true, width: '50' },
        { fieldType: 'text', label: 'Venue & Location', name: 'venue', required: true },
        { fieldType: 'textarea', label: 'Additional Details', name: 'details', placeholder: 'Tell us about your event, expected attendance, budget, etc.' },
      ],
    },
  });

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Booking',
      slug: 'booking',
      content: [
        {
          blockType: 'hero',
          title: 'Booking',
          subtitle: 'Let\'s create an unforgettable experience',
          textAlign: 'center',
          blockHeight: 'small',
        },
        {
          blockType: 'form',
          form: bookingForm.id,
          maxWidth: 'sm',
          padding: 'large',
        },
      ],
    },
  });

  console.log('✅ Seeding complete!');
  console.log('  Email: admin@example.com');
  console.log('  Password: admin123');

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
