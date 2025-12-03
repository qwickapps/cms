'use client';
// @ts-nocheck

/**
 * ScriptsInjector - Injects analytics and custom scripts
 *
 * Reads configuration from Settings global and injects:
 * - Google Analytics (GA4)
 * - Google Tag Manager
 * - Facebook Pixel
 * - Custom header/footer scripts
 *
 * Usage:
 *   Place in root layout after SettingsProvider
 *   <ScriptsInjector />
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useEffect } from 'react';
import Script from 'next/script';
import { useSettings } from './SettingsProvider';

export function ScriptsInjector() {
  const { settings, loading } = useSettings();

  // Don't render anything while loading
  if (loading || !settings) {
    return null;
  }

  const { googleAnalytics, googleTagManager, facebookPixel, customScripts } = settings;

  // Inject custom CSS
  useEffect(() => {
    if (customScripts?.customCss) {
      const styleId = 'qwickpress-custom-css';
      let styleElement = document.getElementById(styleId);

      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = customScripts.customCss;

      return () => {
        // Cleanup on unmount
        const el = document.getElementById(styleId);
        if (el) {
          el.remove();
        }
      };
    }
  }, [customScripts?.customCss]);

  return (
    <>
      {/* Google Analytics (GA4) */}
      {googleAnalytics?.enabled && googleAnalytics?.measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalytics.measurementId}');
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {googleTagManager?.enabled && googleTagManager?.containerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManager.containerId}');
            `}
          </Script>
          {/* GTM noscript fallback */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManager.containerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixel?.enabled && facebookPixel?.pixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixel.pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Custom Header Scripts */}
      {customScripts?.headerScripts && (
        <Script id="custom-header-scripts" strategy="afterInteractive">
          {customScripts.headerScripts}
        </Script>
      )}

      {/* Custom Footer Scripts */}
      {customScripts?.footerScripts && (
        <Script id="custom-footer-scripts" strategy="lazyOnload">
          {customScripts.footerScripts}
        </Script>
      )}
    </>
  );
}
