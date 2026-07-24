import React from 'react';
import { Accordion } from '../Accordion';

const themeStyles = {
  brand: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '16px',
  },
  light: {
    backgroundColor: '#ffffff',
    color: '#111827',
    padding: '16px',
  },
  dark: {
    backgroundColor: '#111827',
    color: '#f9fafb',
    padding: '16px',
  },
};

export default {
  component: Accordion,
  title: 'Components/Accordion',
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: { type: 'inline-radio' },
      options: [true, false],
      labels: {
        true: 'Allow multiple open',
        false: 'Single panel only',
      },
      description: 'When true, multiple accordion panels can stay open at once.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: false },
      },
    },
    items: { control: 'object' },
    theme: {
      control: { type: 'select' },
      options: ['brand', 'light', 'dark'],
      description: 'Pick a theme color palette for the accordion wrapper',
    },
  },
  decorators: [
    (Story, context) => (
      <div style={themeStyles[context.args.theme || 'brand']}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'An accessible accordion component. Use `allowMultiple` to allow multiple panels open.',
      },
    },
  },
};

const defaultItems = [
  { id: '1', title: 'Accordion Item 1', content: 'Content for the first accordion item' },
  { id: '2', title: 'Accordion Item 2', content: 'Content for the second accordion item' },
  { id: '3', title: 'Accordion Item 3', content: 'Content for the third accordion item' },
];

export const Default = {
  args: {
    items: defaultItems,
    allowMultiple: false,
    theme: 'light',
  },
};

export const MultiOpen = {
  args: {
    ...Default.args,
    allowMultiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple panels can remain open at the same time.',
      },
    },
  },
};

