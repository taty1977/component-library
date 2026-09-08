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
    (Story, context) => {
      const activeTheme = themeStyles[context.globals.theme] || themeStyles.Brand

      return (
        <div
          style={{
            backgroundColor: activeTheme.colors.surface,
            border: `1px solid ${activeTheme.colors.border}`,
            color: activeTheme.colors.text,
            padding: activeTheme.spaces.lg,
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
