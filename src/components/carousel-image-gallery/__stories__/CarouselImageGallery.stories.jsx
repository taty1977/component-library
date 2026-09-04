import React from 'react';
import { brandTheme } from '../../../styles';
import { CarouselImageGallery } from '../CarouselImageGallery';

const themeStyles = {
  Brand: brandTheme,
};

const createGalleryImage = (background, accent) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="${background}" />
      <circle cx="600" cy="400" r="240" fill="${accent}" />
      <rect x="410" y="310" width="380" height="180" rx="90" fill="#ffffff" opacity="0.92" />
    </svg>
  `)}`;

const renderShowcase = (args, context) => {
  const activeTheme = themeStyles[context.globals.theme] || themeStyles.Brand;
  const titleId = `gallery-showcase-title-${context.id}`;

  return (
    <main
      aria-labelledby={titleId}
      style={{
        background: activeTheme.colors.surface,
        color: activeTheme.colors.text,
        border: `1px solid ${activeTheme.colors.border}`,
        padding: '24px',
        borderRadius: '24px',
        display: 'grid',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: activeTheme.colors.mutedText }}>
          Storybook Preview
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2 id={titleId} style={{ margin: 0, fontSize: '28px', lineHeight: 1.1, color: activeTheme.colors.heading }}>Performance Runner XZ</h2>
            <p style={{ margin: '8px 0 0', color: activeTheme.colors.mutedText }}>Preview the gallery across themes, breakpoints, and thumbnail positions.</p>
          </div>
          <div style={{ alignSelf: 'start', fontWeight: 700, fontSize: '24px' }}>$189</div>
        </div>
      </div>

      <CarouselImageGallery {...args} />
    </main>
  );
};

const imageSet = [
  {
    id: 'sky',
    src: createGalleryImage('#e0f2fe', '#38bdf8'),
    alt: 'Sky blue product image',
    badge: 'New',
    likeButton: true,
  },
  {
    id: 'mist',
    src: createGalleryImage('#f0f9ff', '#7dd3fc'),
    alt: 'Pale blue product image',
  },
  {
    id: 'ocean',
    src: createGalleryImage('#dbeafe', '#60a5fa'),
    alt: 'Ocean blue product image',
  },
  {
    id: 'ice',
    src: createGalleryImage('#eff6ff', '#93c5fd'),
    alt: 'Ice blue product image',
  },
  {
    id: 'aqua',
    src: createGalleryImage('#e6f7ff', '#0ea5e9'),
    alt: 'Aqua blue product image',
  },
  {
    id: 'navy',
    src: createGalleryImage('#e0f2fe', '#1e3a8a'),
    alt: 'Navy blue product image',
  },
  {
    id: 'midnight',
    src: createGalleryImage('#eff6ff', '#93c5fd'),
    alt: 'Midnight blue product image',
  },
  {
    id: 'skyline',
    src: createGalleryImage('#f0f9ff', '#7dd3fc'),  
  alt: 'Skyline blue product image',
  },
];

const meta = {
  title: 'Components/CarouselImageGallery',
  component: CarouselImageGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An ecommerce-ready product image carousel with previous/next navigation, dot indicators, thumbnail selection, favorites, and click-to-open gallery behavior. The story surface adapts to the active Storybook theme so responsive and visual QA are easier in one place.',
      },
    },
  },
  render: renderShowcase,
  args: {
    images: imageSet,
    likeButton: true,
    showThumbnails: true,
    thumbnailsPosition: 'bottom',
    showIndicators: true,
    ariaLabel: 'Product image gallery',
    openOnClick: true,
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of gallery image objects. Set likeButton to false on an item to hide its favorite control.',
      table: { category: 'Data' },
    },
    likeButton: {
      control: 'boolean',
      description: 'Show or hide the favorite button for the active image.',
      table: { category: 'Display' },
    },
    showThumbnails: {
      control: 'boolean',
      description: 'Show thumbnail strip under the main image.',
      table: { category: 'Display' },
    },
    thumbnailsPosition: {
      control: { type: 'radio' },
      options: ['left', 'right', 'bottom'],
      description: 'Choose where thumbnails are displayed around the main image.',
      table: { category: 'Display' },
    },
    breakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop'],
      description: 'Choose the responsive layout breakpoint.',
      table: { category: 'Display' },
    },
    showIndicators: {
      control: 'boolean',
      description: 'Show dot indicators under the main image.',
      table: { category: 'Display' },
    },
    initialIndex: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'First selected image index.',
      table: { category: 'Behavior' },
    },
    openOnClick: {
      control: 'boolean',
      description: 'Allow the main image and overflow thumbnail to open the gallery modal.',
      table: { category: 'Behavior' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the gallery region.',
      table: { category: 'Accessibility' },
    },
  },
};

export default meta;

export const Default = {};

export const NoThumbnails = {
  args: {
    showThumbnails: false,
  },
};

export const IndicatorsOnly = {
  args: {
    showThumbnails: false,
    showIndicators: true,
  },
};

export const ThumbnailsOnly = {
  args: {
    showThumbnails: true,
    showIndicators: false,
  },
};

export const WithoutModalOpening = {
  args: {
    openOnClick: false,
  },
};

export const ThumbnailsLeft = {
  args: {
    thumbnailsPosition: 'left',
  },
};

export const ThumbnailsRight = {
  args: {
    thumbnailsPosition: 'right',
  },
};

export const StartFromMiddle = {
  args: {
    initialIndex: 2,
  },
};

export const SingleImage = {
  args: {
    images: [imageSet[0]],
  },
};

export const MissingAltFallback = {
  args: {
    images: [{ ...imageSet[0], alt: ' ' }],
    showThumbnails: false,
    showIndicators: false,
  },
};

export const WithoutLikeButton = {
  args: {
    likeButton: false,
  },
};
