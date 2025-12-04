import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Import collections from @qwickapps/cms
import {
  Pages,
  Posts,
  Media,
  Users,
  Navigation,
  Forms,
  FormSubmissions,
  Features,
  Products,
} from '@qwickapps/cms/collections';

// Import globals from @qwickapps/cms
import {
  SiteSettings,
  Integrations,
  AdvancedSettings,
  ThemeSettings,
} from '@qwickapps/cms/globals';

// Import plugin
import { qwickappsPlugin } from '@qwickapps/cms/plugins';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION',

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Photography Portfolio',
    },
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  collections: [
    Users,
    Pages,
    Posts,
    Media,
    Navigation,
    Forms,
    FormSubmissions,
    Features,
    Products,
  ],

  globals: [
    SiteSettings,
    Integrations,
    AdvancedSettings,
    ThemeSettings,
  ],

  plugins: [
    qwickappsPlugin({
      enableVisualBuilder: true,
    }),
  ],

  typescript: {
    outputFile: 'src/payload-types.ts',
  },
});
