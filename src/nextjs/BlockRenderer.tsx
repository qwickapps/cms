// @ts-nocheck
'use client';

/**
 * BlockRenderer - Generic component that maps Payload CMS blocks to QwickApps Framework components
 *
 * This component provides a data-driven rendering system that transforms Payload blocks
 * into their corresponding QwickApps Framework components.
 *
 * Supported block types:
 * - hero → HeroBlock
 * - textSection → Section with rich text
 * - featureGrid → GridLayout with FeatureCard children
 * - ctaSection → Section with Button actions
 * - image → Next.js Image component
 * - spacer → Spacing div
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { Paper, Card, CardContent, CardActions, Collapse, IconButton, Box, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { HeroBlock, Section, GridLayout, GridCell, Button, FeatureCard, Text, iconMap, ProductCard, Markdown } from './framework';
import { FormBlockComponent } from './FormBlockComponent';

/**
 * Markdown content styling constants
 * Defines consistent heading sizes and spacing for markdown blocks
 */
const MARKDOWN_STYLES = {
  '& h1': {
    fontSize: '2rem',
    marginTop: '1.5rem',
    marginBottom: '1rem',
  },
  '& h2': {
    fontSize: '1.5rem',
    marginTop: '1.25rem',
    marginBottom: '0.75rem',
  },
  '& h3': {
    fontSize: '1.25rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  '& p': {
    marginBottom: '1rem',
  },
  '& ul, & ol': {
    marginBottom: '1rem',
  },
} as const;

/**
 * Type definitions for Payload block data structures
 */

/**
 * ViewSchema props - inherited by all blocks
 * These map to framework ViewSchema component props
 */
interface ViewSchemaProps {
  // Layout & Spacing
  padding?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  marginTop?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  marginBottom?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  width?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false';

  // Colors & Background
  background?: string;
  color?: string;
  backgroundImage?: string; // Converted from object to string in extractViewSchemaProps
  backgroundGradient?: string;

  // Advanced
  className?: string;
  sx?: any;
  id?: string;
}

interface BaseBlock extends Omit<ViewSchemaProps, 'backgroundImage'> {
  blockType: string;
  id?: string;
  backgroundImage?: { url: string; alt?: string } | string; // Payload format, converted in extractViewSchemaProps
}

interface HeroBlockData extends BaseBlock {
  blockType: 'hero';
  title: string;
  subtitle?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  backgroundGradient?: string;
  textAlign?: 'left' | 'center' | 'right';
  blockHeight?: 'small' | 'medium' | 'large' | 'viewport';
  actions?: Array<{
    label: string;
    href: string;
    variant?: 'contained' | 'outlined' | 'text';
    buttonSize?: 'small' | 'medium' | 'large';
  }>;
}

interface TextSectionBlockData extends BaseBlock {
  blockType: 'textSection';
  heading?: string;
  content: any; // Rich text content from Payload
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'default' | 'surface' | 'surface-variant' | 'primary';
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false';
}

interface FeatureGridBlockData extends BaseBlock {
  blockType: 'featureGrid';
  heading?: string;
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
  }>;
  columns?: number;
  spacing?: 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'default' | 'surface' | 'surface-variant';
}

interface CTASectionBlockData extends BaseBlock {
  blockType: 'ctaSection';
  heading: string;
  description?: string;
  buttons: Array<{
    label: string;
    href: string;
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
  }>;
  padding?: 'small' | 'medium' | 'large';
  background?: 'default' | 'surface' | 'primary';
  textAlign?: 'left' | 'center' | 'right';
}

interface ImageBlockData extends BaseBlock {
  blockType: 'image';
  image: {
    url: string;
    width?: number;
    height?: number;
  };
  alt: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
}

interface SpacerBlockData extends BaseBlock {
  blockType: 'spacer';
  height?: 'small' | 'medium' | 'large' | 'xlarge';
}

interface CodeBlockData extends BaseBlock {
  blockType: 'code';
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
}

interface ProductGridBlockData extends BaseBlock {
  blockType: 'productGrid';
  heading?: string;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    category?: string;
    tagline?: string;
    description: any;
    icon?: { url: string };
    image?: { url: string };
    status: string;
    features?: Array<{ title: string; description?: string }>;
    technologies?: string;
    actions?: Array<{
      id: string;
      label: string;
      url: string;
      variant?: 'contained' | 'outlined' | 'text';
      color?: 'primary' | 'secondary' | 'error';
      disabled?: boolean;
      openInNewTab?: boolean;
    }>;
    githubUrl?: string;
    docsUrl?: string;
    demoUrl?: string;
  }>;
  variant?: 'compact' | 'detailed';
  columns?: number;
  spacing?: 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'default' | 'surface' | 'surface-variant';
  equalHeight?: boolean;
}

interface AccordionBlockData extends BaseBlock {
  blockType: 'accordion';
  heading?: string;
  items: Array<{
    title: string;
    content: any;
    defaultExpanded?: boolean;
  }>;
  allowMultiple?: boolean;
  variant?: 'outlined' | 'filled' | 'plain';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

interface CardGridBlockData extends BaseBlock {
  blockType: 'cardGrid';
  heading?: string;
  cards: Array<{
    title: string;
    description?: string;
    image?: { url: string };
    imageUrl?: string;  // External image URL fallback
    icon?: string;
    link?: string;
    linkText?: string;
  }>;
  columns?: number;
  spacing?: 'small' | 'medium' | 'large';
  cardVariant?: 'outlined' | 'elevation' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'default' | 'surface' | 'surface-variant';
}

interface FormBlockData extends BaseBlock {
  blockType: 'form';
  form: {
    id: string;
    formName: string;
    title: string;
    description?: string;
    fields: Array<{
      fieldName: string;
      label: string;
      inputType: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox';
      required?: boolean;
      placeholder?: string;
      options?: Array<{
        label: string;
        value: string;
      }>;
    }>;
    submitButtonText?: string;
    successMessage?: string;
    enableCaptcha?: boolean;
  };
  overrideHeading?: string;
  overrideDescription?: string;
  overrideSubmitButtonText?: string;
  overrideSuccessMessage?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

interface MarkdownBlockData extends BaseBlock {
  blockType: 'markdown';
  heading?: string;
  content: string; // Markdown content
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

type BlockData = HeroBlockData | TextSectionBlockData | FeatureGridBlockData | CTASectionBlockData | ImageBlockData | SpacerBlockData | CodeBlockData | ProductGridBlockData | AccordionBlockData | CardGridBlockData | FormBlockData | MarkdownBlockData;

/**
 * Props for BlockRenderer component
 */
interface BlockRendererProps {
  /** Array of blocks from Payload CMS */
  blocks?: BlockData[];
  /** Optional className for the container */
  className?: string;
}

/**
 * Helper function to convert Payload Lexical rich text to plain text
 * Handles Payload CMS 3.0 Lexical editor format
 */
function renderRichText(content: any): string {
  if (!content) return '';

  // Handle string content directly
  if (typeof content === 'string') return content;

  // Handle Lexical format: { root: { children: [...] } }
  if (content.root && content.root.children) {
    return extractTextFromLexical(content.root.children);
  }

  // Handle direct children array
  if (Array.isArray(content)) {
    return extractTextFromLexical(content);
  }

  return '';
}

/**
 * Recursively extract text from Lexical nodes
 */
function extractTextFromLexical(nodes: any[]): string {
  if (!Array.isArray(nodes)) return '';

  return nodes.map((node: any) => {
    // Text node
    if (node.type === 'text' && node.text) {
      return node.text;
    }

    // Nodes with children (paragraphs, lists, etc.)
    if (node.children && Array.isArray(node.children)) {
      const text = extractTextFromLexical(node.children);
      // Add line breaks for paragraph and list items
      if (node.type === 'paragraph' || node.type === 'listitem') {
        return text + '\n';
      }
      return text;
    }

    return '';
  }).join('');
}

/**
 * Helper function to map spacing values to pixel heights
 */
function getSpacerHeight(height?: 'small' | 'medium' | 'large' | 'xlarge'): string {
  const heightMap = {
    small: '24px',
    medium: '48px',
    large: '96px',
    xlarge: '144px',
  };
  return heightMap[height || 'medium'];
}

/**
 * Helper function to map image size to width
 */
function getImageSize(size?: 'small' | 'medium' | 'large' | 'full'): string {
  const sizeMap = {
    small: '400px',
    medium: '600px',
    large: '800px',
    full: '100%',
  };
  return sizeMap[size || 'large'];
}

/**
 * Extract ViewSchema props from a block
 * These props should be passed through to all framework components
 */
function extractViewSchemaProps(block: BaseBlock): Partial<ViewSchemaProps> {
  const props: Partial<ViewSchemaProps> = {};

  // Layout & Spacing
  if (block.padding !== undefined) props.padding = block.padding;
  if (block.marginTop !== undefined) props.marginTop = block.marginTop;
  if (block.marginBottom !== undefined) props.marginBottom = block.marginBottom;
  if (block.width !== undefined) props.width = block.width;
  if (block.maxWidth !== undefined) props.maxWidth = block.maxWidth;

  // Colors & Background
  if (block.background !== undefined) props.background = block.background;
  if (block.color !== undefined) props.color = block.color;
  if (block.backgroundImage !== undefined) {
    // Handle both { url: string } and string formats - always convert to string
    props.backgroundImage = (typeof block.backgroundImage === 'string'
      ? block.backgroundImage
      : block.backgroundImage?.url) as string;
  }
  if (block.backgroundGradient !== undefined) props.backgroundGradient = block.backgroundGradient;

  // Advanced
  if (block.className !== undefined) props.className = block.className;
  if (block.sx !== undefined) {
    // Parse sx if it's a string
    try {
      props.sx = typeof block.sx === 'string' ? JSON.parse(block.sx) : block.sx;
    } catch {
      console.warn('Failed to parse sx prop:', block.sx);
    }
  }
  if (block.id !== undefined) props.id = block.id;

  return props;
}

/**
 * Render a single block based on its type
 */
function renderBlock(block: BlockData, index: number): React.ReactNode {
  const key = block.id || `block-${index}`;

  switch (block.blockType) {
    case 'hero': {
      const heroBlock = block as HeroBlockData;
      const viewProps = extractViewSchemaProps(heroBlock);

      return (
        <HeroBlock
          key={key}
          title={heroBlock.title}
          subtitle={heroBlock.subtitle}
          backgroundImage={heroBlock.backgroundImage?.url || undefined}
          backgroundGradient={heroBlock.backgroundGradient}
          textAlign={heroBlock.textAlign}
          height={heroBlock.blockHeight}
          {...viewProps}
        >
          {heroBlock.actions && heroBlock.actions.length > 0 && (
            <div style={{ display: 'flex', gap: '16px', justifyContent: heroBlock.textAlign === 'left' ? 'flex-start' : heroBlock.textAlign === 'right' ? 'flex-end' : 'center', flexWrap: 'wrap' }}>
              {heroBlock.actions.map((action, idx) => (
                <Button
                  key={`${key}-action-${idx}`}
                  variant={action.variant || 'contained'}
                  buttonSize={action.buttonSize || 'medium'}
                  href={action.href}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </HeroBlock>
      );
    }

    case 'textSection': {
      const textSection = block as TextSectionBlockData;
      const viewProps = extractViewSchemaProps(textSection);

      // Map maxWidth to contentMaxWidth for Section component
      const sectionProps: any = { ...viewProps };
      if (textSection.maxWidth) {
        sectionProps.contentMaxWidth = textSection.maxWidth;
        delete sectionProps.maxWidth;
      }

      return (
        <Section
          key={key}
          {...sectionProps}
        >
          {textSection.heading && (
            <Text variant="h4" align={textSection.textAlign}>
              {textSection.heading}
            </Text>
          )}
          <Text variant="body1" align={textSection.textAlign} color={textSection.color as any}>
            {renderRichText(textSection.content)}
          </Text>
        </Section>
      );
    }

    case 'featureGrid': {
      const featureGrid = block as FeatureGridBlockData;
      const viewProps = extractViewSchemaProps(featureGrid);

      return (
        <Section
          key={key}
          {...viewProps}
        >
          {featureGrid.heading && (
            <Text variant="h3" align="center" style={{ marginBottom: '32px' }}>
              {featureGrid.heading}
            </Text>
          )}
          <GridLayout
            columns={(featureGrid.columns || 3) as 1 | 2 | 3 | 4 | 5 | 6}
            spacing={featureGrid.spacing}
          >
            {featureGrid.features.map((feature) => {
              // Convert icon name to Material UI icon component
              const iconData = feature.icon ? iconMap[feature.icon] : null;
              const IconComponent = iconData?.component;

              return (
                <FeatureCard
                  key={feature.id}
                  feature={{
                    id: feature.id,
                    title: feature.title,
                    description: feature.description,
                    icon: IconComponent ? <IconComponent /> : undefined
                  }}
                  span={(12 / (featureGrid.columns || 3)) as 1 | 2 | 3 | 4 | 5 | 6}
                />
              );
            })}
          </GridLayout>
        </Section>
      );
    }

    case 'ctaSection': {
      const ctaSection = block as CTASectionBlockData;
      const viewProps = extractViewSchemaProps(ctaSection);

      return (
        <Section
          key={key}
          {...viewProps}
        >
          <Text variant="h3" align={ctaSection.textAlign}>
            {ctaSection.heading}
          </Text>
          {ctaSection.description && (
            <Text variant="body1" align={ctaSection.textAlign}>
              {ctaSection.description}
            </Text>
          )}
          <div style={{ display: 'flex', gap: '16px', justifyContent: ctaSection.textAlign === 'left' ? 'flex-start' : ctaSection.textAlign === 'right' ? 'flex-end' : 'center', marginTop: '24px', flexWrap: 'wrap' }}>
            {ctaSection.buttons.map((button, idx) => (
              <Button
                key={`${key}-button-${idx}`}
                variant={button.variant || 'contained'}
                buttonSize={button.size || 'large'}
                href={button.href}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </Section>
      );
    }

    case 'image': {
      const imageBlock = block as ImageBlockData;
      const viewProps = extractViewSchemaProps(imageBlock);

      const containerStyle: React.CSSProperties = {
        width: imageBlock.size ? getImageSize(imageBlock.size) : viewProps.width,
        maxWidth: viewProps.maxWidth,
        margin: '0 auto',
      };

      return (
        <div
          key={key}
          style={containerStyle}
          className={viewProps.className}
          id={viewProps.id}
        >
          {imageBlock.image?.url && (
            <Image
              src={imageBlock.image.url}
              alt={imageBlock.alt}
              width={imageBlock.image.width || 800}
              height={imageBlock.image.height || 600}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          {imageBlock.caption && (
            <Text variant="caption" align="center" style={{ marginTop: '8px', display: 'block' }}>
              {imageBlock.caption}
            </Text>
          )}
        </div>
      );
    }

    case 'spacer': {
      const spacer = block as SpacerBlockData;
      return (
        <div
          key={key}
          style={{ height: getSpacerHeight(spacer.height) }}
          aria-hidden="true"
        />
      );
    }

    case 'code': {
      const codeBlock = block as CodeBlockData;
      const viewProps = extractViewSchemaProps(codeBlock);

      return (
        <Section key={key} {...viewProps}>
          <Paper
            variant="outlined"
            sx={{
              backgroundColor: 'var(--theme-surface-variant)',
              border: '1px solid var(--theme-outline)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            {(codeBlock.title || codeBlock.showCopy) && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  backgroundColor: 'var(--theme-surface)',
                  borderBottom: '1px solid var(--theme-outline)',
                }}
              >
                {codeBlock.title && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Monaco, Consolas, monospace',
                      color: 'var(--theme-on-surface)',
                      opacity: 0.8,
                    }}
                  >
                    {codeBlock.title}
                  </Typography>
                )}
              </Box>
            )}
            <Box
              component="pre"
              sx={{
                margin: 0,
                padding: 2,
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'var(--theme-on-surface)',
                overflow: 'auto',
                whiteSpace: codeBlock.wrapLines ? 'pre-wrap' : 'pre',
              }}
            >
              <code>{codeBlock.code}</code>
            </Box>
          </Paper>
        </Section>
      );
    }

    case 'productGrid': {
      const productGrid = block as ProductGridBlockData;
      const viewProps = extractViewSchemaProps(productGrid);

      // Helper to extract text from Lexical rich text
      const extractTextFromLexical = (lexicalData: any): string => {
        if (!lexicalData?.root?.children) return '';
        const extractText = (node: any): string => {
          if (node.type === 'text') return node.text || '';
          if (node.children) return node.children.map(extractText).join('');
          return '';
        };
        return lexicalData.root.children.map(extractText).join(' ').trim();
      };

      // Helper to parse technologies string into array
      const parseTechnologies = (techString: string): string[] => {
        if (!techString) return [];
        return techString.split(',').map(t => t.trim()).filter(Boolean);
      };

      // Map product status to ProductCard status
      const mapProductStatus = (status: string): 'launched' | 'beta' | 'coming-soon' => {
        switch (status) {
          case 'active': return 'launched';
          case 'beta': return 'beta';
          case 'coming-soon': return 'coming-soon';
          default: return 'coming-soon';
        }
      };

      // Transform actions to ProductCard format
      const transformActions = (actions: any[] | undefined) => {
        if (!actions || actions.length === 0) return undefined;

        return actions.map(action => ({
          id: action.id,
          label: action.label,
          variant: action.variant || 'contained',
          color: action.color || 'primary',
          disabled: action.disabled || false,
          onClick: () => {
            if (action.openInNewTab) {
              window.open(action.url, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = action.url;
            }
          }
        }));
      };

      return (
        <Section
          key={key}
          {...viewProps}
        >
          {productGrid.heading && (
            <Text variant="h3" align="center" style={{ marginBottom: '32px' }}>
              {productGrid.heading}
            </Text>
          )}
          <GridLayout
            columns={(productGrid.columns || 3) as 1 | 2 | 3 | 4 | 5 | 6}
            spacing={productGrid.spacing}
            equalHeight={productGrid.equalHeight !== false}
          >
            {productGrid.products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  category: product.category || 'Product',
                  description: extractTextFromLexical(product.description),
                  shortDescription: product.tagline,
                  features: product.features?.map((f: any) => f.title) || [],
                  technologies: parseTechnologies(product.technologies),
                  status: mapProductStatus(product.status),
                  image: product.image?.url,
                  url: `/products/${product.slug}`,
                }}
                actions={transformActions(product.actions)}
                variant={productGrid.variant || 'compact'}
                showImage={true}
                showTechnologies={true}
                maxFeaturesCompact={3}
              />
            ))}
          </GridLayout>
        </Section>
      );
    }

    case 'accordion': {
      const accordion = block as AccordionBlockData;
      const viewProps = extractViewSchemaProps(accordion);

      return (
        <Section key={key} {...viewProps}>
          {accordion.heading && (
            <Text variant="h3" align="center" style={{ marginBottom: '24px' }}>
              {accordion.heading}
            </Text>
          )}
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            {accordion.items.map((item, idx) => (
              <AccordionItem
                key={`${key}-item-${idx}`}
                title={item.title}
                content={renderRichText(item.content)}
                defaultExpanded={item.defaultExpanded}
                variant={accordion.variant}
              />
            ))}
          </Box>
        </Section>
      );
    }

    case 'cardGrid': {
      const cardGrid = block as CardGridBlockData;
      const viewProps = extractViewSchemaProps(cardGrid);

      return (
        <Section
          key={key}
          {...viewProps}
        >
          {cardGrid.heading && (
            <Text variant="h3" align="center" style={{ marginBottom: '32px' }}>
              {cardGrid.heading}
            </Text>
          )}
          <GridLayout columns={(cardGrid.columns || 3) as 1 | 2 | 3 | 4 | 5 | 6} spacing={cardGrid.spacing}>
            {cardGrid.cards.map((card, idx) => {
              // Convert icon name to Material UI icon component
              const iconData = card.icon ? iconMap[card.icon] : null;
              const IconComponent = iconData?.component;
              // Support both uploaded images and external URLs
              const cardImageUrl = card.image?.url || card.imageUrl;

              return (
                <Card
                  key={`${key}-card-${idx}`}
                  variant={cardGrid.cardVariant === 'elevation' ? 'elevation' : cardGrid.cardVariant === 'filled' ? 'outlined' : 'outlined'}
                  sx={{ height: '100%' }}
                >
                  {cardImageUrl && (
                    <Image
                      src={cardImageUrl}
                      alt={card.title}
                      width={400}
                      height={200}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  )}
                  <CardContent>
                    {IconComponent && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, color: 'primary.main', fontSize: 48 }}>
                        <IconComponent />
                      </Box>
                    )}
                    <Text variant="h6">{card.title}</Text>
                    {card.description && (
                      <Text variant="body2" style={{ marginTop: '8px' }}>
                        {card.description}
                      </Text>
                    )}
                  </CardContent>
                  {card.link && (
                    <CardActions>
                      <Button buttonSize="small" href={card.link}>
                        {card.linkText || 'Learn More'}
                      </Button>
                    </CardActions>
                  )}
                </Card>
              );
            })}
          </GridLayout>
        </Section>
      );
    }

    case 'form': {
      const formBlock = block as FormBlockData;

      // Handle case where form relationship might not be populated
      if (!formBlock.form || typeof formBlock.form !== 'object') {
        console.warn('Form block missing form relationship:', formBlock);
        return null;
      }

      return (
        <FormBlockComponent
          key={key}
          formId={formBlock.form.id}
          formName={formBlock.form.formName}
          heading={formBlock.overrideHeading ? formBlock.overrideHeading : formBlock.form.title}
          description={formBlock.overrideDescription ? formBlock.overrideDescription : formBlock.form.description}
          fields={formBlock.form.fields}
          submitButtonText={formBlock.overrideSubmitButtonText ? formBlock.overrideSubmitButtonText : formBlock.form.submitButtonText}
          successMessage={formBlock.overrideSuccessMessage ? formBlock.overrideSuccessMessage : formBlock.form.successMessage}
          padding={formBlock.padding}
          enableCaptcha={formBlock.form.enableCaptcha}
        />
      );
    }

    case 'markdown': {
      const markdownBlock = block as MarkdownBlockData;
      const viewProps = extractViewSchemaProps(markdownBlock);

      // Map maxWidth to contentMaxWidth for Section component
      const sectionProps: Omit<typeof viewProps, 'maxWidth'> & { contentMaxWidth?: string } = {
        ...viewProps,
      };
      if (markdownBlock.maxWidth) {
        sectionProps.contentMaxWidth = markdownBlock.maxWidth;
        delete (sectionProps as { maxWidth?: string }).maxWidth;
      }

      return (
        <Section
          key={key}
          {...sectionProps}
        >
          {markdownBlock.heading && (
            <Text variant="h4" align={markdownBlock.textAlign}>
              {markdownBlock.heading}
            </Text>
          )}
          <Box sx={MARKDOWN_STYLES}>
            <Markdown>{markdownBlock.content}</Markdown>
          </Box>
        </Section>
      );
    }

    default:
      console.warn(`Unknown block type: ${(block as any).blockType}`);
      return null;
  }
}

/**
 * Accordion Item Component for the Accordion Block
 */
function AccordionItem({
  title,
  content,
  defaultExpanded = false,
  variant = 'outlined',
}: {
  title: string;
  content: string;
  defaultExpanded?: boolean;
  variant?: 'outlined' | 'filled' | 'plain';
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        mb: 1,
        border: variant === 'outlined' ? '1px solid var(--theme-outline)' : 'none',
        backgroundColor: variant === 'filled' ? 'var(--theme-surface-variant)' : 'transparent',
        borderRadius: 1,
      }}
    >
      <Box
        onClick={handleToggle}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'var(--theme-surface-variant)',
          },
        }}
      >
        <Text variant="h6" style={{ margin: 0 }}>
          {title}
        </Text>
        <IconButton
          size="small"
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2, pt: 0 }}>
          <Text variant="body1">{content}</Text>
        </Box>
      </Collapse>
    </Box>
  );
}

/**
 * BlockRenderer Component
 *
 * Renders an array of Payload blocks as QwickApps Framework components
 */
export function BlockRenderer({ blocks, className }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

export default BlockRenderer;
