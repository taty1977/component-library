import React from 'react';
import { CarouselImageGallery } from '../CarouselImageGallery';

const themeStyles = {
  Brand: {
    background: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)',
    color: '#1e3a8a',
    border: '1px solid #bfdbfe',
  },
  Light: {
    backgroundColor: '#ffffff',
    color: '#111827',
    border: '1px solid #e5e7eb',
  },
  Dark: {
    background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
    color: '#f9fafb',
    border: '1px solid #334155',
  },
};

const renderShowcase = (args, context) => {
  const activeTheme = themeStyles[context.globals.theme] || themeStyles.Light;

  return (
    <div
      style={{
        ...activeTheme,
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
        <span style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.72 }}>
          Storybook Preview
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '28px', lineHeight: 1.1 }}>Performance Runner XZ</h2>
            <p style={{ margin: '8px 0 0', opacity: 0.8 }}>Preview the gallery across themes, breakpoints, and thumbnail positions.</p>
          </div>
          <div style={{ alignSelf: 'start', fontWeight: 700, fontSize: '24px' }}>$189</div>
        </div>
      </div>

      <CarouselImageGallery {...args} />
    </div>
  );
};

const imageSet = [
  {
    id: 'shoe-1',
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80',
    alt: 'Red running sneaker side view',
    badge: 'New',
  },
  {
    id: 'shoe-2',
    src: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=320&q=80',
    alt: 'Black sneaker top angle',
  },
  {
    id: 'shoe-3',
    src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=320&q=80',
    alt: 'Pair of white sneakers in studio',
  },
  {
    id: 'shoe-4',
    src: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=320&q=80',
    alt: 'Gray performance sneaker profile',
  },
  {
    id: 'shoe-5',
    src: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=320&q=80',
    alt: 'Running shoes with neon details',
  },
  {
    id: 'shoe-6',
    src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=320&q=80',
    alt: 'White sneaker with gum sole closeup',
  },

    {
    id: 'shoe-7',
    src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=320&q=80',
    alt: 'Pair of sport shoes on concrete floor',
  },
  {
    id: 'shoe-8',
    src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=320&q=80',
    alt: 'Red and white sneaker detail shot',
  },
  {
    id: 'shoe-9',
    src: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=320&q=80',
    alt: 'Athletic shoe side angle on white background',
  },
  {
    id: 'shoe-10',
    src: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=320&q=80',
    alt: 'Modern sneaker pair arranged in studio',
  },
  {
    id: 'shoe-11',
    src: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=320&q=80',
    alt: 'Dark running shoe with textured sole',
  },
  {
    id: 'shoe-12',
    src: 'https://images.unsplash.com/photo-1597248881519-db089d3744a5?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1597248881519-db089d3744a5?auto=format&fit=crop&w=320&q=80',
    alt: 'Lightweight trainer in outdoor light',
  },
  {
    id: 'shoe-13',
    src: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1400&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=320&q=80',
    alt: 'Minimal sneaker with clean silhouette',
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
    showThumbnails: true,
    thumbnailsPosition: 'bottom',
    showIndicators: true,
    ariaLabel: 'Product image gallery',
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of gallery image objects.',
      table: { category: 'Data' },
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
    isMobile: {
      control: 'boolean',
      description: 'Simulate mobile view.',
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
    showIndicators: {
      control: 'boolean',
      description: 'Show navigation dots below the main image when the gallery is closed.',
      table: { category: 'Display' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the gallery region.',
      table: { category: 'Accessibility' },
    },
    onImageChange: { action: 'imageChanged' },
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
    initialIndex: 12,
  },
};

export const SingleImage = {
  args: {
    images: [imageSet[0]],
  },
};
