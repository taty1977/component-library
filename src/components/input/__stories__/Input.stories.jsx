import React from 'react'
import { ArrowRightIcon, CheckIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import Input from '../Input'

const themeStyles = {
  Brand: brandTheme,
}

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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
    variant: 'primary',
    showLeftIcon: false,
    showRightIcon: false,
    showOutsideLeftIcon: false,
    showOutsideRightIcon: false,
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label for the input.', table: { category: 'Content' } },
    placeholder: { control: 'text', description: 'Placeholder text.', table: { category: 'Content' } },
    value: {
      control: 'text',
      description: 'Controlled input value. Use with onChange.',
      table: { category: 'Content' },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date', 'tel', 'url'],
      description: 'HTML input type.',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the input field.',
      table: { category: 'Layout' },
    },
    onChange: {
      description: 'Called when the input value changes.',
      table: { category: 'Events' },
    },
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
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Selects the focus and icon color treatment.',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field.',
      table: { category: 'State' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Shows the configured icon inside the input.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Shows the configured icon inside the input.',
      table: { category: 'Icons' },
    },
    showOutsideLeftIcon: {
      control: 'boolean',
      description: 'Shows the configured icon beside the input on the left.',
      table: { category: 'Outside Icons' },
    },
    showOutsideRightIcon: {
      control: 'boolean',
      description: 'Shows the configured icon beside the input on the right.',
      table: { category: 'Outside Icons' },
    },
    handleActions: {
      description: 'Callback function triggered by interactive outside icons.',
      table: { category: 'Outside Icons' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'IDs of elements that describe the input.',
      table: { category: 'Accessibility' },
    },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    outsideIconLeft: { table: { disable: true } },
    outsideIconRight: { table: { disable: true } },
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

const renderInput = ({ showLeftIcon, showOutsideLeftIcon, showOutsideRightIcon, showRightIcon, ...args }) => (
  <Input
    {...args}
    iconLeft={showLeftIcon ? <MagnifyingGlassIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    iconRight={showRightIcon ? <ArrowRightIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    outsideIconLeft={showOutsideLeftIcon ? <ClockIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    outsideIconRight={showOutsideRightIcon ? <CheckIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
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
    handleActions: () => {},
  },
}

export const Disabled = {
  render: renderInput,
  args: {
    disabled: true,
    defaultValue: 'This field is disabled',
  },
}

export const Email = {
  render: renderInput,
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const Password = {
  render: renderInput,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showRightIcon: true,
  },
}

export const Search = {
  render: renderInput,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    showLeftIcon: true,
  },
}

export const RequiredWithError = {
  render: renderInput,
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    required: true,
    error: 'Please enter a valid email address.',
  },
}

export const AllStates = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <Input label='Default state' placeholder='Enter a value' />
      <Input label='Focused state' placeholder='Enter a value' autoFocus />
      <Input label='Error state' placeholder='Enter a value' error='This field is required.' />
      <Input label='Disabled state' placeholder='Enter a value' disabled />
      <Input label='Required field' placeholder='Enter a value' required />
    </div>
  ),
}
