import React from 'react'
import { ArrowRightIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import Input from '../Input'

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A themed single-line input with labels, required indicators, optional icons, controlled and uncontrolled state, and accessible validation feedback.',
      },
    },
  },
  args: {
    label: 'Input label',
    placeholder: 'Enter a value',
    required: false,
    showLeftIcon: false,
    showRightIcon: false,
    showOutsideLeftIcon: false,
    showOutsideRightIcon: false,
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label for the input.', table: { category: 'Input' } },
    required: {
      control: 'boolean',
      description: 'Marks the field as required and shows an asterisk.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the field.',
      table: { category: 'Validation' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Shows the configured icon in the input.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Shows the configured icon in the input.',
      table: { category: 'Icons' },
    },
    showOutsideLeftIcon: {
      control: 'boolean',
      description: 'Shows the configured icon beside the input.',
      table: { category: 'Outside icons' },
    },
    showOutsideRightIcon: {
      control: 'boolean',
      description: 'Shows the configured icon beside the input.',
      table: { category: 'Outside icons' },
    },
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
}

export default meta

const renderInput = ({ showLeftIcon, showOutsideLeftIcon, showOutsideRightIcon, showRightIcon, ...args }) => (
  <Input
    {...args}
    iconLeft={showLeftIcon ? <MagnifyingGlassIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    iconRight={showRightIcon ? <ArrowRightIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    outsideIconLeft={
      showOutsideLeftIcon ? <InformationCircleIcon width='1em' height='1em' aria-hidden='true' /> : undefined
    }
    outsideIconRight={
      showOutsideRightIcon ? <InformationCircleIcon width='1em' height='1em' aria-hidden='true' /> : undefined
    }
  />
)

export const Default = { render: renderInput }

export const WithRightIcon = {
  render: renderInput,
  args: {
    showLeftIcon: false,
    showRightIcon: true,
  },
}

export const WithLeftIcon = {
  render: renderInput,
  args: {
    showLeftIcon: true,
    showRightIcon: false,
  },
}

export const WithError = {
  render: renderInput,
  args: {
    error: 'This field is required.',
  },
}

export const Required = {
  render: renderInput,
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    required: true,
    type: 'email',
  },
}

export const WithOutsideIcons = {
  render: renderInput,
  args: {
    showOutsideLeftIcon: true,
    showOutsideRightIcon: true,
  },
}
