import React from 'react'
import { brandTheme } from '../../../styles'
import Heading from '../Heading'

const themeStyles = {
  Brand: brandTheme,
}

const headingLevels = Object.keys(brandTheme.headingSizes)
const headingWeights = Object.keys(brandTheme.fontWeights)
const headingFamilies = Object.keys(brandTheme.fontFamilies)
const headingColors = ['title', ...Object.keys(brandTheme.actionColors)]
const textTransforms = Object.keys(brandTheme.textTransforms)

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
  args: {
    children: 'A clear section heading',
    level: 'h2',
    weight: 'bold',
    family: 'merriweather',
    color: 'title',
    textTransform: 'none',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content of the heading.',
      table: { category: 'Content' },
    },
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
      options: headingFamilies,
      description: 'Theme font-family token.',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: headingColors,
      description: 'Semantic theme color for headings and notification text.',
      table: { category: 'Appearance' },
    },
    textTransform: {
      control: 'select',
      options: textTransforms,
      description: 'Selects the heading text transform.',
      table: { category: 'Appearance' },
    },
    fontFamily: { table: { disable: true } },
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

export const AllHeadingLevels = {
  name: 'All heading levels',
  render: () => (
    <>
      <Heading level='h1'>Heading H1</Heading>
      <Heading level='h2'>Heading H2</Heading>
      <Heading level='h3'>Heading H3</Heading>
      <Heading level='h4'>Heading H4</Heading>
      <Heading level='h5'>Heading H5</Heading>
      <Heading level='h6'>Heading H6</Heading>
    </>
  ),
}
