import React from 'react'
import { brandTheme } from '../../../styles'
import Textarea from '../Textarea'

const themeStyles = {
  Brand: brandTheme,
}

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A themed multiline text field with labels, required indicators, controlled and uncontrolled state, and accessible validation feedback.',
      },
    },
  },
  args: {
    label: 'Message',
    placeholder: 'Write a message',
    rows: 5,
    required: false,
    variant: 'primary',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label for the textarea.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: 'Controlled textarea value. Use with onChange.',
      table: { category: 'Content' },
    },
    onChange: {
      description: 'Called when the textarea value changes.',
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
      description: 'Selects the focus color treatment.',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea field.',
      table: { category: 'State' },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows.',
      table: { category: 'Layout' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the textarea field.',
      table: { category: 'Layout' },
    },
    cols: {
      control: 'number',
      description: 'Suggested visible text columns.',
      table: { category: 'Layout' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'IDs of elements that describe the textarea.',
      table: { category: 'Accessibility' },
    },
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

export const Default = {}

export const WithError = {
  args: {
    error: 'Message is required.',
  },
}

export const Required = {
  args: {
    label: 'Required message',
    placeholder: 'Write a required message',
    required: true,
  },
}

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: 'This field is disabled.',
  },
}

export const Compact = {
  args: {
    label: 'Feedback',
    placeholder: 'Brief feedback',
    rows: 3,
  },
}

export const Large = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description',
    rows: 8,
  },
}

export const RequiredWithError = {
  args: {
    label: 'Message',
    placeholder: 'Write a message',
    required: true,
    error: 'Message is required and must be at least 10 characters.',
  },
}

export const AllStates = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <Textarea label='Default state' placeholder='Enter a message' rows={4} />
      <Textarea label='Focused state' placeholder='Enter a message' rows={4} autoFocus />
      <Textarea label='Error state' placeholder='Enter a message' rows={4} error='This field is required.' />
      <Textarea label='Disabled state' placeholder='Enter a message' rows={4} disabled />
      <Textarea label='Required field' placeholder='Enter a message' rows={4} required />
    </div>
  ),
}
