/**
 * Seed data for Travel Blog example
 */

import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  console.log('🌱 Seeding Travel Blog...');

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
      siteName: 'Wanderlust Chronicles',
      siteDescription: 'Adventures, guides, and stories from around the world',
      contactEmail: 'hello@wanderlustchronicles.com',
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com/wanderlustchronicles' },
        { platform: 'youtube', url: 'https://youtube.com/wanderlustchronicles' },
        { platform: 'pinterest', url: 'https://pinterest.com/wanderlustchronicles' },
        { platform: 'tiktok', url: 'https://tiktok.com/@wanderlustchronicles' },
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
        { label: 'Destinations', url: '/destinations' },
        { label: 'Blog', url: '/blog' },
        { label: 'Guides', url: '/guides' },
        { label: 'About', url: '/about' },
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
          title: 'Wanderlust Chronicles',
          subtitle: 'Discover hidden gems, local cultures, and unforgettable experiences around the globe.',
          textAlign: 'center',
          blockHeight: 'viewport',
          actions: [
            {
              label: 'Explore Destinations',
              href: '/destinations',
              variant: 'contained',
              color: 'primary',
              buttonSize: 'large',
              icon: 'explore',
            },
            {
              label: 'Read Latest',
              href: '/blog',
              variant: 'outlined',
              color: 'primary',
              buttonSize: 'large',
            },
          ],
        },
        {
          blockType: 'textSection',
          heading: 'Welcome Fellow Traveler',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'I\'m Maya, and I\'ve spent the last 8 years exploring over 60 countries. This blog is my collection of travel stories, practical guides, and the hidden spots that don\'t make it into guidebooks. Whether you\'re planning your first solo trip or your hundredth adventure, I hope to inspire your next journey.',
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
          heading: 'Featured Destinations',
          columns: 3,
          spacing: 'large',
          cards: [
            {
              title: 'Japan',
              description: 'From ancient temples to neon-lit streets. A complete guide to the Land of the Rising Sun.',
              icon: '🗾',
              link: '/destinations/japan',
              linkText: 'Explore Japan',
            },
            {
              title: 'Portugal',
              description: 'Coastal charm, historic cities, and the world\'s best pastéis de nata.',
              icon: '🇵🇹',
              link: '/destinations/portugal',
              linkText: 'Explore Portugal',
            },
            {
              title: 'New Zealand',
              description: 'Adventure awaits in Middle Earth. Hiking, fjords, and pure natural beauty.',
              icon: '🥝',
              link: '/destinations/new-zealand',
              linkText: 'Explore NZ',
            },
          ],
          maxWidth: 'lg',
          padding: 'large',
        },
        {
          blockType: 'ctaSection',
          heading: 'Never Miss an Adventure',
          description: 'Join 50,000+ travelers. Get destination guides, packing tips, and stories delivered to your inbox.',
          textAlign: 'center',
          buttons: [
            {
              label: 'Subscribe',
              href: '/newsletter',
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

  // Create sample blog posts
  await payload.create({
    collection: 'posts',
    data: {
      title: '48 Hours in Tokyo: The Perfect First-Timer Itinerary',
      slug: '48-hours-in-tokyo',
      excerpt: 'Make the most of a short trip to Japan\'s vibrant capital with this carefully crafted two-day guide.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Tokyo is overwhelming in the best possible way. With only 48 hours, you need a plan that balances must-see attractions with authentic local experiences. Here\'s how to do it right.',
                },
              ],
            },
          ],
        },
      },
      status: 'published',
    },
  });

  // Create newsletter form
  const newsletterForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Newsletter Signup',
      submitButtonText: 'Subscribe',
      successMessage: 'Welcome to the adventure! Check your inbox to confirm your subscription.',
      fields: [
        { fieldType: 'text', label: 'First Name', name: 'firstName', required: true, width: '50' },
        { fieldType: 'email', label: 'Email Address', name: 'email', required: true, width: '50' },
        { fieldType: 'select', label: 'Interests', name: 'interests', options: 'Budget Travel,Luxury Travel,Adventure,Food & Culture,Solo Travel,Family Travel', width: '100' },
      ],
    },
  });

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Newsletter',
      slug: 'newsletter',
      content: [
        {
          blockType: 'hero',
          title: 'Join the Journey',
          subtitle: 'Get travel tips, destination guides, and stories in your inbox',
          textAlign: 'center',
          blockHeight: 'small',
        },
        {
          blockType: 'form',
          form: newsletterForm.id,
          maxWidth: 'sm',
          padding: 'large',
        },
      ],
    },
  });

  // Create contact form
  const contactForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Contact Form',
      submitButtonText: 'Send Message',
      successMessage: 'Thanks for reaching out! I\'ll get back to you within a few days.',
      fields: [
        { fieldType: 'text', label: 'Name', name: 'name', required: true, width: '50' },
        { fieldType: 'email', label: 'Email', name: 'email', required: true, width: '50' },
        { fieldType: 'select', label: 'Topic', name: 'topic', options: 'Collaboration,Press/Media,Travel Question,Other' },
        { fieldType: 'textarea', label: 'Message', name: 'message', required: true },
      ],
    },
  });

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Contact',
      slug: 'contact',
      content: [
        {
          blockType: 'hero',
          title: 'Get in Touch',
          subtitle: 'Questions, collaborations, or just want to say hello?',
          textAlign: 'center',
          blockHeight: 'small',
        },
        {
          blockType: 'form',
          form: contactForm.id,
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
