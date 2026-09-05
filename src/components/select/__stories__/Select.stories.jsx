import React from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import Select from '../Select'

const options = [
  { value: '', label: 'Choose a country' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
]

const renderOptions = () =>
  options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A themed select with Input styling, custom left icons, optional selection checks, and accessible validation feedback.',
      },
    },
  },
  args: {
    label: 'Country',
    showLeftIcon: false,
    showSelectionCheck: false,
    required: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label for the select.',
      table: { category: 'Select' },
    },
    required: {
      control: 'boolean',
      description: 'Marks the select as required and shows an asterisk.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the select.',
      table: { category: 'Validation' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show a custom React icon inside the left side of the select.',
      table: { category: 'Icons' },
    },
    showSelectionCheck: {
      control: 'boolean',
      description: 'Show a check icon beside the selected non-default option.',
      table: { category: 'Dropdown' },
    },
    iconLeft: { table: { disable: true } },
    children: { table: { disable: true } },
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

const renderSelect = ({ showLeftIcon, ...args }) => (
  <Select {...args} iconLeft={showLeftIcon ? <GlobeAltIcon aria-hidden='true' /> : undefined}>
    {renderOptions()}
  </Select>
)

export const Default = { render: renderSelect }

export const Selected = {
  render: renderSelect,
  args: {
    defaultValue: 'ca',
    showLeftIcon: true,
    showSelectionCheck: true,
  },
}

export const Dropdown = {
  render: renderSelect,
  args: {
    size: 4,
    showLeftIcon: true,
    showSelectionCheck: true,
    defaultValue: '',
  },
}

export const WithError = {
  render: renderSelect,
  args: {
    error: 'Please select a country.',
    required: true,
  },
}
