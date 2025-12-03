import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Photography Portfolio',
  description: 'Professional photography portfolio built with QwickApps CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
