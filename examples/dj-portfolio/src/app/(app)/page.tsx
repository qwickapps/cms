import { BlockRenderer } from '@qwickapps/cms/nextjs';
import { getPayload } from 'payload';
import config from '../../../payload.config';

export default async function HomePage() {
  const payload = await getPayload({ config });

  // Fetch homepage from Pages collection
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    limit: 1,
  });

  const page = pages[0];

  if (!page) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>Welcome to Photography Portfolio</h1>
        <p>Visit <a href="/admin">/admin</a> to create your homepage.</p>
      </div>
    );
  }

  return (
    <main>
      {page.content && <BlockRenderer blocks={page.content} />}
    </main>
  );
}
