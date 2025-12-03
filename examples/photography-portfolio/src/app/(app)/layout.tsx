'use client';

import { ServerQwickApp } from '@qwickapps/cms/nextjs';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerQwickApp
      apiUrl={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
      palette="midnight"
      defaultTheme="dark"
    >
      {children}
    </ServerQwickApp>
  );
}
