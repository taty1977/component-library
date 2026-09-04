import React from 'react'
import { brandTheme } from '../../../styles'
import Textarea from '../Textarea'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
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
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label for the textarea.',
      table: { category: 'Text area' },
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
    rows: {
      control: 'number',
      description: 'Number of visible text rows.',
      table: { category: 'Layout' },
    },
    cols: {
      control: 'number',
      description: 'Suggested visible text columns.',
      table: { category: 'Layout' },
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

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <Textarea
        label='Controlled message'
        placeholder='Type to update state'
        value={value}
        onChange={event => setValue(event.target.value)}
        rows={5}
      />
    )
  },
}
