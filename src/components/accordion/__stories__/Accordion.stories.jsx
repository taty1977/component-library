import React from 'react';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/solid';
import { brandTheme } from '../../../styles';
import { Accordion } from '../Accordion';

const themeStyles = {
  Brand: brandTheme,
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
    variant: {
      control: 'select',
      options: ['default', 'leftIcon'],
      description: 'Choose the default or left icon header layout.',
      table: { category: 'Appearance' },
    },
    collapsedIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    items: { control: 'object' },
  },
  decorators: [
    (Story, context) => {
      const activeTheme = themeStyles[context.globals.theme] || themeStyles.Brand;

      return (
      <div
        style={{
          backgroundColor: activeTheme.colors.surface,
          color: activeTheme.colors.text,
          border: `1px solid ${activeTheme.colors.border}`,
          padding: '16px',
        }}
      >
        <Story />
      </div>
      );
    },
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
    variant: 'default',
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

export const ReverseHeader = {
  args: {
    ...Default.args,
    variant: 'leftIcon',
  },
};

export const WithCustomIcons = {
  args: {
    ...Default.args,
    collapsedIcon: <PlusIcon width="1em" height="1em" aria-hidden="true" />,
    expandedIcon: <Bars3Icon width="1em" height="1em" aria-hidden="true" />,
  },
};

