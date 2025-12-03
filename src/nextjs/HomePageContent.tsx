// @ts-nocheck
'use client';

/**
 * Client-side HomePage Content Component
 *
 * This component renders the homepage using QwickApps Framework components.
 * It's client-only to avoid SSR issues with the framework.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Container, Box } from '@mui/material';
import { HeroBlock, Section, GridLayout, GridCell, Text } from './framework';

export interface HomePageContentProps {
  hero: any | null;
  features: any[];
}

export function HomePageContent({ hero, features }: HomePageContentProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - Using Framework HeroBlock Component */}
      {hero ? (
        <HeroBlock
          key="hero-section"
          title={hero.title as string}
          subtitle={hero.subtitle as string | undefined}
          backgroundGradient={hero.backgroundGradient as string | undefined}
          textAlign={(hero.textAlign as 'left' | 'center' | 'right') || 'center'}
          blockHeight={(hero.blockHeight as 'small' | 'medium' | 'large' | 'viewport') || 'medium'}
          actions={hero.actions as any || []}
        />
      ) : (
        <HeroBlock
          key="hero-section-default"
          title="Welcome to QwickPress"
          subtitle="Add a Hero Block in the admin to customize this section!"
          backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          textAlign="center"
          blockHeight="medium"
          actions={[
            {
              label: 'Create Hero Block →',
              href: '/admin/collections/hero-blocks/create',
              variant: 'outlined',
              buttonSize: 'large'
            }
          ]}
        />
      )}

      {/* Why Choose Section */}
      <Section key="why-choose-section" padding="large" background="surface">
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Why Choose QwickApps?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
            QwickApps offers a comprehensive suite of pre-built components and applications designed
            to help developers save time and effort. Whether you're building a new project from scratch
            or looking to enhance an existing one, our resources are tailored to meet your needs.
          </p>
        </Container>
      </Section>

      {/* Features Grid */}
      {features.length > 0 ? (
        <Section key="features-section" padding="large" background="var(--theme-surface-variant)">
          <Container maxWidth="lg">
            <GridLayout columns={3} spacing="large">
              {features.map((feature: any) => (
                <GridCell key={feature.id} padding="medium" textAlign="center">
                  <Text variant="h6" fontWeight="800" sx={{ mb: 1 }}>
                    {feature.title}
                  </Text>
                  <Text variant="body2" sx={{ opacity: 0.8 }}>
                    {feature.description}
                  </Text>
                </GridCell>
              ))}
            </GridLayout>
          </Container>
        </Section>
      ) : (
        <Section key="features-section-empty" padding="large" background="var(--theme-surface-variant)">
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Features Section</h3>
            <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
              Add Features in the admin to see them displayed here!
            </p>
            <Box sx={{ mt: 2 }}>
              <a
                href="/admin/collections/features/create"
                style={{
                  color: '#667eea',
                  textDecoration: 'underline',
                  fontSize: '1.1rem'
                }}
              >
                Create Features →
              </a>
            </Box>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section key="cta-section" padding="large" background="surface">
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to Start Building?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
            Join thousands of developers who are already using QwickApps to build amazing applications.
          </p>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                padding: '12px 32px',
                fontSize: '1.1rem',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: 500,
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              Get Started Today
            </a>
            <a
              href="/products"
              style={{
                padding: '12px 32px',
                fontSize: '1.1rem',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: 500,
                backgroundColor: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              Explore Products
            </a>
          </Box>
        </Container>
      </Section>
    </Box>
  );
}
