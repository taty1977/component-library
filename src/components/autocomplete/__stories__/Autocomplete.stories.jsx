import React from 'react'
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import Autocomplete from '../Autocomplete'

const themeStyles = {
  Brand: brandTheme,
}

const meta = {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A themed autocomplete input with labels, validation feedback, and optional left and right icon slots. Type to filter options and select a value via click.',
      },
    },
  },
  args: {
    label: 'Fruit',
    options: ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange'],
    placeholder: 'Search fruit...',
    required: false,
    showLeftIcon: false,
    showRightIcon: false,
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label for the autocomplete input.', table: { category: 'Input' } },
    required: {
      control: 'boolean',
      description: 'Marks the field as required and shows an asterisk.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the input.',
      table: { category: 'Validation' },
    },
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
    iconLeft: {
      table: { disable: true },
    },
    iconRight: {
      table: { disable: true },
    },
  },
  decorators: [
    (Story, context) => {
      const activeTheme = themeStyles[context.globals.theme] || themeStyles.Brand

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
      )
    },
  ],
}

export default meta

const renderAutocomplete = ({ showLeftIcon, showRightIcon, ...args }) => (
  <Autocomplete
    {...args}
    iconLeft={showLeftIcon ? <MagnifyingGlassIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    iconRight={showRightIcon ? <ArrowRightIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
  />
)

export const Default = {
  render: renderAutocomplete,
}

export const WithLabel = {
  render: renderAutocomplete,
  args: {
    label: 'Fruit',
  },
}

export const WithError = {
  render: renderAutocomplete,
  args: {
    label: 'Fruit',
    error: 'Please select a fruit.',
  },
}

export const Required = {
  render: renderAutocomplete,
  args: {
    label: 'Fruit',
    required: true,
  },
}

export const WithLeftIcon = {
  render: renderAutocomplete,
  args: {
    showLeftIcon: true,
  },
}

export const WithRightIcon = {
  render: renderAutocomplete,
  args: {
    showRightIcon: true,
  },
}

export const WithBothIcons = {
  render: renderAutocomplete,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
}
