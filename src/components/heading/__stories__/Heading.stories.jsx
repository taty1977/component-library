import React from 'react'
import Heading from '../Heading'

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const headingWeights = ['light', 'normal', 'medium', 'semiBold', 'bold', 'extraBold']
const textDecorations = ['none', 'underline', 'overline', 'line-through']

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A theme-driven heading component with independent semantic level, visual size, weight, and font-family controls.',
      },
    },
  },
  args: {
    children: 'A clear section heading',
    level: 'h2',
    weight: 'bold',
    family: 'heading',
    color: 'Primary',
    textDecoration: 'none',
  },
  argTypes: {
    level: {
      control: 'select',
      options: headingLevels,
      description: 'Semantic heading level rendered in the document.',
      table: { category: 'Semantics' },
    },
    weight: {
      control: 'select',
      options: headingWeights,
      description: 'Theme font-weight token.',
      table: { category: 'Appearance' },
    },
    family: {
      control: 'select',
      options: ['heading', 'paragraph'],
      description: 'Theme font-family token.',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['Primary', 'Secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Semantic theme color for headings and notification text.',
      table: { category: 'Appearance' },
    },
    textDecoration: {
      control: 'select',
      options: textDecorations,
      description: 'Selects the heading text decoration.',
      table: { category: 'Appearance' },
    },
  },
}

export default meta

export const Default = {
  name: 'Default heading',
}

export const Display = {
  name: 'Display heading',
  args: {
    level: 'h1',
    children: 'Display heading',
  },
}

export const Compact = {
  name: 'Compact heading',
  args: {
    level: 'h4',
    weight: 'medium',
    children: 'Compact heading',
  },
}

export const Notification = {
  name: 'Notification heading',
  args: {
    level: 'h4',
    weight: 'semiBold',
    color: 'info',
    children: 'Additional information',
  },
}
