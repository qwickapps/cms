/**
 * Seed data for Restaurant example
 */

import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  console.log('🌱 Seeding Restaurant Website...');

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
      siteName: 'La Bella Tavola',
      siteDescription: 'Authentic Italian cuisine in the heart of downtown',
      contactEmail: 'info@labellatable.com',
      contactPhone: '+1 (555) 234-5678',
      address: {
        street: '456 Culinary Avenue',
        city: 'San Francisco',
        state: 'CA',
        zip: '94103',
        country: 'United States',
      },
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com/labellatable' },
        { platform: 'facebook', url: 'https://facebook.com/labellatable' },
        { platform: 'yelp', url: 'https://yelp.com/biz/la-bella-tavola' },
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
        { label: 'Menu', url: '/menu' },
        { label: 'About', url: '/about' },
        { label: 'Gallery', url: '/gallery' },
        { label: 'Reservations', url: '/reservations' },
        { label: 'Contact', url: '/contact' },
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
          title: 'La Bella Tavola',
          subtitle: 'Experience authentic Italian cuisine crafted with passion and tradition since 1998.',
          textAlign: 'center',
          blockHeight: 'viewport',
          actions: [
            {
              label: 'View Menu',
              href: '/menu',
              variant: 'contained',
              color: 'primary',
              buttonSize: 'large',
            },
            {
              label: 'Make a Reservation',
              href: '/reservations',
              variant: 'outlined',
              color: 'primary',
              buttonSize: 'large',
            },
          ],
        },
        {
          blockType: 'textSection',
          heading: 'Our Story',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'For over 25 years, La Bella Tavola has been serving handcrafted Italian dishes made with the finest ingredients. Our recipes have been passed down through generations, bringing the authentic flavors of Italy to your table.',
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
          heading: 'Featured Dishes',
          columns: 3,
          spacing: 'large',
          cards: [
            {
              title: 'Osso Buco',
              description: 'Braised veal shanks in white wine, served with saffron risotto. A Milanese classic.',
              icon: '🍖',
            },
            {
              title: 'Seafood Risotto',
              description: 'Creamy arborio rice with fresh mussels, clams, shrimp, and calamari.',
              icon: '🦐',
            },
            {
              title: 'Tiramisu',
              description: 'Espresso-soaked ladyfingers layered with mascarpone cream. Made fresh daily.',
              icon: '🍰',
            },
          ],
          maxWidth: 'lg',
          padding: 'large',
        },
        {
          blockType: 'ctaSection',
          heading: 'Reserve Your Table',
          description: 'Join us for an unforgettable dining experience. Open Tuesday through Sunday.',
          textAlign: 'center',
          buttons: [
            {
              label: 'Book Now',
              href: '/reservations',
              variant: 'contained',
              color: 'primary',
              buttonSize: 'large',
            },
          ],
          background: 'var(--palette-primary-main)',
          color: 'var(--palette-primary-contrastText)',
          padding: 'huge',
        },
      ],
    },
  });

  // Create reservation form
  const reservationForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Reservation Form',
      submitButtonText: 'Request Reservation',
      successMessage: 'Thank you! We\'ll confirm your reservation within 2 hours.',
      fields: [
        { fieldType: 'text', label: 'Name', name: 'name', required: true, width: '50' },
        { fieldType: 'email', label: 'Email', name: 'email', required: true, width: '50' },
        { fieldType: 'text', label: 'Phone', name: 'phone', required: true, width: '50' },
        { fieldType: 'select', label: 'Party Size', name: 'partySize', options: '2 guests,3-4 guests,5-6 guests,7+ guests', width: '50' },
        { fieldType: 'text', label: 'Preferred Date', name: 'date', required: true, width: '50' },
        { fieldType: 'select', label: 'Preferred Time', name: 'time', options: '5:00 PM,5:30 PM,6:00 PM,6:30 PM,7:00 PM,7:30 PM,8:00 PM,8:30 PM,9:00 PM', width: '50' },
        { fieldType: 'textarea', label: 'Special Requests', name: 'specialRequests', placeholder: 'Dietary restrictions, celebrations, seating preferences...' },
      ],
    },
  });

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Reservations',
      slug: 'reservations',
      content: [
        {
          blockType: 'hero',
          title: 'Make a Reservation',
          subtitle: 'We look forward to serving you',
          textAlign: 'center',
          blockHeight: 'small',
        },
        {
          blockType: 'form',
          form: reservationForm.id,
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
