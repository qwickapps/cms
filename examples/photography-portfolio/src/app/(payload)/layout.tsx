/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next';
import type { ServerFunctionClient } from 'payload';

import config from '@payload-config';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap';

import '@payloadcms/next/css';

type Args = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Photography Portfolio Admin',
    template: '%s | Admin',
  },
  description: 'Photography Portfolio CMS Admin Panel',
};

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = async ({ children }: Args) => {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
};

export default Layout;
