import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Autocomplete from '../Autocomplete';

const themeStyles = {
  light: {
    '--autocomplete-bg': '#ffffff',
    '--autocomplete-border': '#d1d5db',
    '--autocomplete-text': '#111827',
    '--autocomplete-hover': '#f3f4f6',
  },
  dark: {
    '--autocomplete-bg': '#111827',
    '--autocomplete-border': '#374151',
    '--autocomplete-text': '#f9fafb',
    '--autocomplete-hover': '#1f2937',
  },
  brand: {
    '--autocomplete-bg': '#eff6ff',
    '--autocomplete-border': '#60a5fa',
    '--autocomplete-text': '#1d4ed8',
    '--autocomplete-hover': '#dbeafe',
  },
};

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A themed autocomplete input with optional left and right icon slots. Type to filter options and select a value via click.',
      },
    },
  },
  args: {
    options: [
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Fig',
      'Grape',
      'Kiwi',
      'Lemon',
      'Mango',
      'Orange',
    ],
    placeholder: 'Search fruit...',
    theme: 'light',
    showLeftIcon: false,
    showRightIcon: false,
  },
  argTypes: {
    onSelect: { action: 'selected' },
    options: {
      control: 'object',
      description: 'List of options used for client-side filtering.',
      table: { category: 'Data' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty.',
      table: { category: 'Input' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show a left icon in the input.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Show a right icon in the input.',
      table: { category: 'Icons' },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'brand'],
      description: 'Pick a theme color palette for the autocomplete component',
      table: { category: 'Presentation' },
    },
    iconLeft: {
      table: { disable: true },
    },
    iconRight: {
      table: { disable: true },
    },
  },
};

export default meta;

const renderAutocomplete = ({ theme, showLeftIcon, showRightIcon, ...args }) => (
  <div style={themeStyles[theme]}>
    <Autocomplete
      {...args}
      iconLeft={showLeftIcon ? <MagnifyingGlassIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
      iconRight={showRightIcon ? <MagnifyingGlassIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    />
  </div>
);

export const Default = {
  render: renderAutocomplete,
};

export const WithLeftIcon = {
  render: renderAutocomplete,
  args: {
    showLeftIcon: true,
  },
};

export const WithBothIcons = {
  render: renderAutocomplete,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
};