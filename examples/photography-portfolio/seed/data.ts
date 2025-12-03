/**
 * Seed data for Photography Portfolio example
 *
 * Run: npm run seed
 */

import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  console.log('🌱 Seeding Photography Portfolio...');

  const payload = await getPayload({ config });

  // Create admin user
  console.log('Creating admin user...');
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin',
    },
  });

  // Create site settings
  console.log('Creating site settings...');
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Sarah Chen Photography',
      siteDescription: 'Capturing life\'s beautiful moments through the lens',
      contactEmail: 'hello@sarahchen.photo',
      contactPhone: '+1 (555) 123-4567',
      address: {
        street: '123 Photography Lane',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
        country: 'United States',
      },
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com/sarahchenphoto' },
        { platform: 'facebook', url: 'https://facebook.com/sarahchenphoto' },
        { platform: 'pinterest', url: 'https://pinterest.com/sarahchenphoto' },
      ],
    },
  });

  // Create navigation
  console.log('Creating navigation...');
  await payload.create({
    collection: 'navigation',
    data: {
      name: 'Main Navigation',
      location: 'header',
      items: [
        { label: 'Home', url: '/' },
        { label: 'Portfolio', url: '/portfolio' },
        { label: 'Services', url: '/services' },
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
    },
  });

  // Create homepage
  console.log('Creating homepage...');
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      content: [
        {
          blockType: 'hero',
          title: 'Capturing Life\'s Beautiful Moments',
          subtitle: 'Professional photography for weddings, portraits, and special events in the San Francisco Bay Area.',
          textAlign: 'center',
          blockHeight: 'viewport',
          actions: [
            {
              label: 'View Portfolio',
              href: '/portfolio',
              variant: 'contained',
              color: 'primary',
              buttonSize: 'large',
            },
            {
              label: 'Book a Session',
              href: '/contact',
              variant: 'outlined',
              color: 'primary',
              buttonSize: 'large',
            },
          ],
        },
        {
          blockType: 'textSection',
          heading: 'Welcome',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'With over 10 years of experience, I specialize in capturing authentic moments that tell your unique story. From intimate portraits to grand celebrations, every photograph is crafted with care and artistic vision.',
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
          heading: 'Services',
          columns: 3,
          spacing: 'large',
          cardVariant: 'elevation',
          cards: [
            {
              title: 'Wedding Photography',
              description: 'Capturing your special day from preparation to celebration. Full day coverage with edited digital images.',
              icon: '💒',
              link: '/services#wedding',
              linkText: 'Learn More',
            },
            {
              title: 'Portrait Sessions',
              description: 'Individual, couple, and family portraits in studio or on location. Perfect for any occasion.',
              icon: '📸',
              link: '/services#portrait',
              linkText: 'Learn More',
            },
            {
              title: 'Event Photography',
              description: 'Corporate events, parties, and celebrations. Professional coverage for events of all sizes.',
              icon: '🎉',
              link: '/services#events',
              linkText: 'Learn More',
            },
          ],
          maxWidth: 'lg',
          padding: 'large',
        },
        {
          blockType: 'ctaSection',
          heading: 'Ready to Create Something Beautiful?',
          description: 'Let\'s discuss your vision and create stunning photographs together.',
          textAlign: 'center',
          buttons: [
            {
              label: 'Get in Touch',
              href: '/contact',
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
      meta: {
        title: 'Sarah Chen Photography | Professional Photographer in San Francisco',
        description: 'Professional photography services in the San Francisco Bay Area. Specializing in weddings, portraits, and events.',
      },
    },
  });

  // Create About page
  console.log('Creating about page...');
  await payload.create({
    collection: 'pages',
    data: {
      title: 'About',
      slug: 'about',
      content: [
        {
          blockType: 'hero',
          title: 'About Sarah Chen',
          subtitle: 'The story behind the lens',
          textAlign: 'center',
          blockHeight: 'small',
        },
        {
          blockType: 'textSection',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Hi, I\'m Sarah! Photography has been my passion since I received my first camera at age 12. What started as a hobby capturing family moments has grown into a fulfilling career spanning over a decade.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Based in San Francisco, I draw inspiration from the city\'s diverse landscapes and vibrant communities. My approach combines documentary-style candid shots with timeless posed portraits, ensuring every moment is preserved authentically.',
                    },
                  ],
                },
              ],
            },
          },
          maxWidth: 'md',
          padding: 'large',
        },
      ],
    },
  });

  // Create Contact page with form
  console.log('Creating contact form...');
  const contactForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Contact Form',
      submitButtonText: 'Send Message',
      successMessage: 'Thank you for your message! I\'ll get back to you within 24 hours.',
      fields: [
        { fieldType: 'text', label: 'Name', name: 'name', required: true, width: '50' },
        { fieldType: 'email', label: 'Email', name: 'email', required: true, width: '50' },
        { fieldType: 'select', label: 'Service Interest', name: 'service', options: 'Wedding Photography,Portrait Session,Event Photography,Other', width: '100' },
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
          subtitle: 'I\'d love to hear from you',
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
  console.log('');
  console.log('Admin credentials:');
  console.log('  Email: admin@example.com');
  console.log('  Password: admin123');

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
