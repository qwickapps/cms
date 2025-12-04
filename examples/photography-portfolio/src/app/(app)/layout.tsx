/**
 * App Route Group Layout
 *
 * This layout wraps the public-facing app with the QwickApps framework.
 * The Payload admin (/admin) is NOT wrapped, so it uses its own styling.
 */

import { ServerQwickApp, FooterFromSettings } from '@qwickapps/cms/nextjs';
import config from '@payload-config';
import '../globals.css';

export default async function AppRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" data-palette="ocean">
      <head>
        {/* Blocking script to apply user theme preferences before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var savedPalette = localStorage.getItem('palette');
                  var root = document.documentElement;

                  if (savedTheme) {
                    root.setAttribute('data-theme', savedTheme);
                  }
                  if (savedPalette) {
                    root.setAttribute('data-palette', savedPalette);
                  }
                } catch (e) {
                  // Ignore localStorage errors (e.g., private browsing)
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ServerQwickApp payloadConfig={config}>
          {children}
          <FooterFromSettings />
        </ServerQwickApp>
      </body>
    </html>
  );
}
