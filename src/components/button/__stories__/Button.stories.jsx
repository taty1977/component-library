import React from 'react';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import { brandTheme } from '../../../styles';
import Button from '../Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Continue',
    size: 'default',
    variant: 'primary',
    width: 'default',
    disabled: false,
    showLeftIcon: false,
    showRightIcon: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    width: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg', 'full'],
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show the left icon.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Show the right icon.',
      table: { category: 'Icons' },
    },
    iconLeft: {
      table: { disable: true },
    },
    iconRight: {
      table: { disable: true },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: brandTheme.colors.surface,
          border: `1px solid ${brandTheme.colors.border}`,
          padding: '16px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

const renderButton = ({ showLeftIcon, showRightIcon, ...args }) => (
  <Button
    {...args}
    iconLeft={showLeftIcon ? <PlusIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    iconRight={showRightIcon ? <ArrowRightIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
  />
);

export const Default = {
  render: renderButton,
};

export const Primary = {
  render: renderButton,
  args: {
    variant: 'primary',
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const WithBothIcons = {
  render: renderButton,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
};