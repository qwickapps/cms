/**
 * Seed script for Photography Portfolio
 */
import { getPayload } from 'payload';
import config from '../payload.config';

// Disable SSL verification for corporate networks
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function seed() {
  console.log('Starting seed...');
  const payload = await getPayload({ config });

  // 1. Create admin user
  console.log('\n1. Creating admin user...');
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@photography.demo',
        password: 'demo1234',
      },
    });
    console.log('Created admin user: admin@photography.demo / demo1234');
  } catch (e: any) {
    console.log('Admin user may already exist');
  }

  // 2. Update site settings
  console.log('\n2. Configuring site settings...');
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Elena Morrison Photography',
      siteDescription: 'Capturing life\'s precious moments through the art of photography',
      logoIcon: 'qwick-icon',
      logoText: 'Elena Morrison',
      logoBadge: 'none',
      copyrightText: '2024 Elena Morrison Photography',
      adminEmail: 'admin@photography.demo',
      contactPhone: '+1 (555) 123-4567',
    },
  });
  console.log('Site settings configured');

  // 3. Update theme settings
  console.log('\n3. Configuring theme...');
  await payload.updateGlobal({
    slug: 'theme-settings',
    data: {
      defaultTheme: 'dark',
      defaultPalette: 'ocean',
      showThemeSwitcher: true,
    },
  });

  // 4. Create navigation
  console.log('\n4. Creating navigation...');
  try {
    await payload.create({
      collection: 'navigation',
      data: {
        name: 'Main Navigation',
        position: 'main',
        items: [
          { label: 'Home', route: '/', icon: 'home' },
          { label: 'Portfolio', route: '/portfolio', icon: 'photo_library' },
          { label: 'About', route: '/about', icon: 'person' },
          { label: 'Contact', route: '/contact', icon: 'mail' },
        ],
      },
    });
  } catch (e) {
    console.log('Navigation may already exist');
  }

  // 5. Create homepage
  console.log('\n5. Creating homepage...');

  // High-quality photography images from Unsplash (royalty-free)
  // Using reliable direct URLs for hero backgrounds
  const images = {
    // Home hero - dramatic portrait with shadow/light play (professional studio look)
    heroHome: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&h=1080&fit=crop&crop=faces&q=80',
    // Portfolio hero - vintage camera equipment
    heroPortfolio: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=1080&fit=crop&q=80',
    // About hero - photographer with camera
    heroAbout: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&h=1080&fit=crop&q=80',
    // Contact hero - studio lighting
    heroContact: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=1080&fit=crop&q=80',
    // Portfolio images - consistent 4:5 aspect ratio for portraits
    portrait1: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=750&fit=crop&crop=faces&q=80',
    portrait2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=faces&q=80',
    portrait3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=750&fit=crop&crop=faces&q=80',
    portrait4: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop&crop=faces&q=80',
    portrait5: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=750&fit=crop&crop=faces&q=80',
    portrait6: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=750&fit=crop&crop=faces&q=80',
    // Wedding images
    wedding1: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=750&fit=crop&q=80',
    wedding2: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=750&fit=crop&q=80',
    wedding3: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=750&fit=crop&q=80',
    wedding4: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=750&fit=crop&q=80',
    // Landscape images - 3:2 aspect ratio
    landscape1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop&q=80',
    landscape2: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=600&fit=crop&q=80',
    landscape3: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=600&fit=crop&q=80',
  };

  // Homepage with hero and featured work
  const homeBlocks = [
    {
      blockType: 'hero',
      blockName: 'Hero Section',
      title: 'Elena Morrison',
      subtitle: 'P H O T O G R A P H Y',
      textAlign: 'left',
      blockHeight: 'viewport',
      // Stronger left-side gradient for text readability
      backgroundGradient: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 100%), url(${images.heroHome})`,
    },
    {
      blockType: 'textSection',
      blockName: 'Featured Work',
      heading: 'Featured Work',
      textAlign: 'center',
      padding: 'large',
      content: {
        root: {
          type: 'root',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'A selection of my recent photography projects' }] },
          ],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      },
    },
    {
      blockType: 'cardGrid',
      blockName: 'Featured Gallery',
      columns: 3,
      spacing: 'small',
      cardVariant: 'outlined',
      cards: [
        { title: 'Portrait', imageUrl: images.portrait1 },
        { title: 'Wedding', imageUrl: images.wedding1 },
        { title: 'Landscape', imageUrl: images.landscape1 },
      ],
    },
    {
      blockType: 'ctaSection',
      blockName: 'Contact CTA',
      heading: 'Let\'s Create Together',
      description: 'Book a session and let me capture your special moments.',
      textAlign: 'center',
      padding: 'large',
      buttons: [
        { label: 'View Portfolio', href: '/portfolio', variant: 'outlined', color: 'primary', buttonSize: 'large' },
        { label: 'Get in Touch', href: '/contact', variant: 'contained', color: 'primary', buttonSize: 'large' },
      ],
    },
  ];

  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        isHomepage: true,
        status: 'published',
        layout: homeBlocks,
        meta: { title: 'Elena Morrison Photography', description: 'Professional photography services in San Francisco' },
      },
    });
    console.log('Homepage created');
  } catch (e: any) {
    console.error('Failed to create homepage:', e.message);
    if (e.data?.errors) console.error('Validation errors:', JSON.stringify(e.data.errors, null, 2));
    const pages = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } });
    if (pages.docs[0]) {
      console.log('Found existing homepage, updating...');
      await payload.update({ collection: 'pages', id: pages.docs[0].id, data: { layout: homeBlocks, status: 'published' } });
    } else {
      console.error('No existing homepage found, and create failed. Cannot proceed.');
    }
  }

  // 6. Create Portfolio page
  console.log('\n6. Creating portfolio page...');
  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Portfolio',
        slug: 'portfolio',
        status: 'published',
        layout: [
          {
            blockType: 'hero',
            blockName: 'Portfolio Hero',
            title: 'Portfolio',
            subtitle: 'A curated collection of my finest work',
            textAlign: 'center',
            blockHeight: 'large',
            // Stronger overlay for text readability
            backgroundGradient: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%), url(${images.heroPortfolio})`,
          },
          // Portrait Photography Section - clean grid layout
          {
            blockType: 'textSection',
            blockName: 'Portraits Intro',
            heading: 'Portraits',
            textAlign: 'center',
            padding: 'medium',
            content: {
              root: {
                type: 'root',
                children: [
                  { type: 'paragraph', children: [{ type: 'text', text: 'Capturing authentic personality through light and emotion.' }] },
                ],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            blockType: 'cardGrid',
            blockName: 'Portrait Gallery',
            columns: 3,
            spacing: 'small',
            cardVariant: 'outlined',
            cards: [
              { title: 'Portrait 1', imageUrl: images.portrait1 },
              { title: 'Portrait 2', imageUrl: images.portrait2 },
              { title: 'Portrait 3', imageUrl: images.portrait3 },
              { title: 'Portrait 4', imageUrl: images.portrait4 },
              { title: 'Portrait 5', imageUrl: images.portrait5 },
              { title: 'Portrait 6', imageUrl: images.portrait6 },
            ],
          },
          // Wedding Photography Section
          {
            blockType: 'textSection',
            blockName: 'Wedding Intro',
            heading: 'Weddings',
            textAlign: 'center',
            padding: 'medium',
            content: {
              root: {
                type: 'root',
                children: [
                  { type: 'paragraph', children: [{ type: 'text', text: 'Documenting love stories, one frame at a time.' }] },
                ],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            blockType: 'cardGrid',
            blockName: 'Wedding Gallery',
            columns: 4,
            spacing: 'small',
            cardVariant: 'outlined',
            cards: [
              { title: 'Wedding 1', imageUrl: images.wedding1 },
              { title: 'Wedding 2', imageUrl: images.wedding2 },
              { title: 'Wedding 3', imageUrl: images.wedding3 },
              { title: 'Wedding 4', imageUrl: images.wedding4 },
            ],
          },
          // Landscape Photography Section
          {
            blockType: 'textSection',
            blockName: 'Landscape Intro',
            heading: 'Landscapes',
            textAlign: 'center',
            padding: 'medium',
            content: {
              root: {
                type: 'root',
                children: [
                  { type: 'paragraph', children: [{ type: 'text', text: 'The beauty of the natural world. Available as fine art prints.' }] },
                ],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            blockType: 'cardGrid',
            blockName: 'Landscape Gallery',
            columns: 3,
            spacing: 'small',
            cardVariant: 'outlined',
            cards: [
              { title: 'Mountains', imageUrl: images.landscape1 },
              { title: 'Lake Sunset', imageUrl: images.landscape2 },
              { title: 'Forest', imageUrl: images.landscape3 },
            ],
          },
          {
            blockType: 'ctaSection',
            blockName: 'Contact CTA',
            heading: 'Book a Session',
            description: 'Let\'s create something beautiful together.',
            textAlign: 'center',
            padding: 'large',
            buttons: [
              { label: 'Get in Touch', href: '/contact', variant: 'outlined', color: 'primary', buttonSize: 'large' },
            ],
          },
        ],
      },
    });
    console.log('Portfolio page created');
  } catch (e: any) {
    console.error('Failed to create portfolio page:', e.message);
    if (e.data?.errors) console.error('Validation errors:', JSON.stringify(e.data.errors, null, 2));
  }

  // 7. Create About page
  console.log('\n7. Creating about page...');
  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'About',
        slug: 'about',
        status: 'published',
        layout: [
          {
            blockType: 'hero',
            blockName: 'About Hero',
            title: 'About',
            subtitle: 'The story behind the lens',
            textAlign: 'center',
            blockHeight: 'large',
            backgroundGradient: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%), url(${images.heroAbout})`,
          },
          {
            blockType: 'textSection',
            blockName: 'Bio',
            heading: 'Hello, I\'m Elena',
            textAlign: 'left',
            content: {
              root: {
                type: 'root',
                children: [
                  { type: 'paragraph', children: [{ type: 'text', text: 'Photography has been my passion since I picked up my first camera at age 15. What started as a hobby quickly became my life\'s calling. After studying fine arts at the San Francisco Art Institute and apprenticing with renowned photographers, I launched my own studio in 2014.' }] },
                  { type: 'paragraph', children: [{ type: 'text', text: 'My approach combines technical excellence with artistic vision. I believe every photo should tell a story, evoke emotion, and capture the authentic essence of the moment.' }] },
                ],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            blockType: 'cardGrid',
            blockName: 'Awards',
            heading: 'Awards & Recognition',
            columns: 2,
            spacing: 'medium',
            cardVariant: 'outlined',
            cards: [
              { title: 'Magazine Features', description: 'Featured in Vogue, Elle, and Harper\'s Bazaar', icon: '📰' },
              { title: 'International Awards', description: 'Winner, International Photography Awards 2023', icon: '🏆' },
              { title: 'Local Recognition', description: 'Best Wedding Photographer, SF Chronicle Reader\'s Choice 2022', icon: '⭐' },
              { title: 'Publications', description: 'Published in National Geographic Traveler', icon: '📚' },
            ],
          },
        ],
      },
    });
    console.log('About page created');
  } catch (e: any) {
    console.error('Failed to create about page:', e.message);
    if (e.data?.errors) console.error('Validation errors:', JSON.stringify(e.data.errors, null, 2));
  }

  // 8. Create Contact page
  console.log('\n8. Creating contact page...');
  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Contact',
        slug: 'contact',
        status: 'published',
        layout: [
          {
            blockType: 'hero',
            blockName: 'Contact Hero',
            title: 'Contact',
            subtitle: 'Let\'s create something beautiful',
            textAlign: 'center',
            blockHeight: 'large',
            backgroundGradient: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%), url(${images.heroContact})`,
          },
          {
            blockType: 'cardGrid',
            blockName: 'Contact Methods',
            heading: 'Contact Information',
            columns: 3,
            spacing: 'large',
            cardVariant: 'elevation',
            cards: [
              { title: 'Email', description: 'hello@elenamorrison.com', icon: '📧' },
              { title: 'Phone', description: '+1 (555) 123-4567', icon: '📞' },
              { title: 'Studio', description: '123 Creative Studio Lane, San Francisco, CA 94102', icon: '📍' },
            ],
          },
          {
            blockType: 'textSection',
            blockName: 'Hours',
            heading: 'Studio Hours',
            textAlign: 'center',
            content: {
              root: {
                type: 'root',
                children: [
                  { type: 'paragraph', children: [{ type: 'text', text: 'Monday - Friday: 9am - 6pm' }] },
                  { type: 'paragraph', children: [{ type: 'text', text: 'Saturday: By appointment' }] },
                  { type: 'paragraph', children: [{ type: 'text', text: 'Sunday: Closed' }] },
                ],
                direction: 'ltr', format: '', indent: 0, version: 1,
              },
            },
          },
          {
            blockType: 'ctaSection',
            blockName: 'Book CTA',
            heading: 'Ready to Book a Session?',
            description: 'I\'d love to hear from you! Whether you\'re planning a wedding, need professional headshots, or have a creative project in mind.',
            textAlign: 'center',
            buttons: [
              { label: 'Send Email', href: 'mailto:hello@elenamorrison.com', variant: 'contained', color: 'primary', buttonSize: 'large' },
            ],
          },
        ],
      },
    });
    console.log('Contact page created');
  } catch (e: any) {
    console.error('Failed to create contact page:', e.message);
    if (e.data?.errors) console.error('Validation errors:', JSON.stringify(e.data.errors, null, 2));
  }

  console.log('\n✅ Seed completed successfully!');
  console.log('\n📝 Demo credentials:');
  console.log('   Email: admin@photography.demo');
  console.log('   Password: demo1234');
  console.log('\n🌐 Visit http://localhost:3000 to see your site');
  console.log('🔧 Visit http://localhost:3000/admin to manage content');
  console.log('\n💡 Tip: Add images via the admin panel to make the site look professional!');

  process.exit(0);
}

seed().catch((e) => { console.error('Seed failed:', e); process.exit(1); });
