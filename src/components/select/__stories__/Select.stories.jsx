import React from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import Select from '../Select'

const themeStyles = {
  Brand: brandTheme,
}

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
    layout: 'padded',
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
      table: { category: 'Content' },
    },
    onChange: {
      description: 'Called when the selected value changes.',
      table: { category: 'Events' },
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
    disabled: {
      control: 'boolean',
      description: 'Disables the select field.',
      table: { category: 'State' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show a custom React icon inside the left side of the select.',
      table: { category: 'Icons' },
    },
    showSelectionCheck: {
      control: 'boolean',
      description: 'Show a check icon beside the selected non-default option.',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'number',
      description: 'Number of options visible without scrolling.',
      table: { category: 'Layout' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'IDs of elements that describe the select.',
      table: { category: 'Accessibility' },
    },
    iconLeft: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  decorators: [
    (Story, context) => {
      const activeTheme = themeStyles[context.globals.theme] || themeStyles.Brand

      return (
        <div
          style={{
            backgroundColor: activeTheme.colors.surface,
            border: `1px solid ${activeTheme.colors.border}`,
            color: activeTheme.colors.text,
            padding: activeTheme.spaces.lg,
            maxWidth: '600px',
          }}
        >
          <Story />
        </div>
      )
    },
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

export const Disabled = {
  render: renderSelect,
  args: {
    disabled: true,
    defaultValue: 'us',
  },
}

export const WithIcon = {
  render: renderSelect,
  args: {
    showLeftIcon: true,
  },
}

export const RequiredWithError = {
  render: renderSelect,
  args: {
    label: 'Country',
    required: true,
    error: 'You must select a country to continue.',
  },
}

export const AllStates = {
  name: 'All states',
  render: () => (
    <>
      <Select label='Default state' style={{ marginBottom: '2rem' }}>
        {renderOptions()}
      </Select>
      <Select label='Selected state' defaultValue='ca' style={{ marginBottom: '2rem' }}>
        {renderOptions()}
      </Select>
      <Select label='Error state' error='Please select a country.' style={{ marginBottom: '2rem' }}>
        {renderOptions()}
      </Select>
      <Select label='Disabled state' disabled defaultValue='us' style={{ marginBottom: '2rem' }}>
        {renderOptions()}
      </Select>
      <Select label='Required field' required>
        {renderOptions()}
      </Select>
    </>
  ),
}
