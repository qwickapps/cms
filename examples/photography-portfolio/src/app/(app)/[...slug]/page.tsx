import { BlockRenderer } from '@qwickapps/cms/nextjs';
import { getPayload } from 'payload';
import config from '../../../../payload.config';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageSlug = slug.join('/');
  const payload = await getPayload({ config });

  // Fetch page from Pages collection by slug
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: pageSlug },
    },
    limit: 1,
  });

  const page = pages[0];

  if (!page) {
    notFound();
  }

  return (
    <main>
      {page.layout && <BlockRenderer blocks={page.layout} />}
    </main>
  );
}

// Generate static params for all published pages (except homepage)
export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      status: { equals: 'published' },
      slug: { not_equals: 'home' },
    },
    limit: 100,
  });

  return pages.map((page) => ({
    slug: page.slug?.split('/') || [],
  }));
}
