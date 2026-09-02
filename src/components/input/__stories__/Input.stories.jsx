import React from 'react';
import { ArrowRightIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { brandTheme } from '../../../styles';
import Input from '../Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Input label',
    placeholder: 'Enter a value',
    showLeftIcon: false,
    showRightIcon: false,
    showOutsideLeftIcon: false,
    showOutsideRightIcon: false,
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Input' } },
    error: { control: 'text', table: { category: 'Validation' } },
    showLeftIcon: { control: 'boolean', table: { category: 'Icons' } },
    showRightIcon: { control: 'boolean', table: { category: 'Icons' } },
    showOutsideLeftIcon: { control: 'boolean', table: { category: 'Outside icons' } },
    showOutsideRightIcon: { control: 'boolean', table: { category: 'Outside icons' } },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    outsideIconLeft: { table: { disable: true } },
    outsideIconRight: { table: { disable: true } },
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

const renderInput = ({ showLeftIcon, showOutsideLeftIcon, showOutsideRightIcon, showRightIcon, ...args }) => (
  <Input
    {...args}
    iconLeft={showLeftIcon ? <MagnifyingGlassIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    iconRight={showRightIcon ? <ArrowRightIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    outsideIconLeft={showOutsideLeftIcon ? <InformationCircleIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    outsideIconRight={showOutsideRightIcon ? <InformationCircleIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
  />
);

export const Default = { render: renderInput };

export const WithBothIcons = {
  render: renderInput,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
};

export const WithError = {
  render: renderInput,
  args: {
    error: 'This field is required.',
  },
};

export const WithOutsideIcons = {
  render: renderInput,
  args: {
    showOutsideLeftIcon: true,
    showOutsideRightIcon: true,
  },
};