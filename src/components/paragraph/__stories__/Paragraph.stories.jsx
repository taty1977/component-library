import React from 'react'
import { brandTheme } from '../../../styles'
import Paragraph from '../Paragraph'

const themeStyles = {
  Brand: brandTheme,
}

const paragraphSizes = Object.keys(brandTheme.fontSizes)
const paragraphWeights = Object.keys(brandTheme.fontWeights)
const paragraphFamilies = Object.keys(brandTheme.fontFamilies)
const paragraphColors = Object.keys(brandTheme.actionColors)
const textDecorations = Object.keys(brandTheme.textDecorations)

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme-driven paragraph component with independent size, weight, and font-family controls.',
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
    children:
      'This is a paragraph component. It provides flexible typography for body text with theme-driven styling and independent control over size, weight, and font family.',
    size: 'md',
    weight: 'normal',
    family: 'paragraph',
    color: 'Primary',
    textDecoration: 'none',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content of the paragraph.',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: paragraphSizes,
      description: 'Font size from theme.',
      table: { category: 'Appearance' },
    },
    weight: {
      control: 'select',
      options: paragraphWeights,
      description: 'Theme font-weight token.',
      table: { category: 'Appearance' },
    },
    family: {
      control: 'select',
      options: paragraphFamilies,
      description: 'Theme font-family token.',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: paragraphColors,
      description: 'Semantic theme color for paragraph text.',
      table: { category: 'Appearance' },
    },
    textDecoration: {
      control: 'select',
      options: textDecorations,
      description: 'Selects the paragraph text decoration.',
      table: { category: 'Appearance' },
    },
  },
}

export default meta

export const Default = {
  name: 'Default paragraph',
}

export const Small = {
  name: 'Small paragraph',
  args: {
    size: 'sm',
    children: 'This is a small paragraph.',
  },
}

export const Large = {
  name: 'Large paragraph',
  args: {
    size: 'lg',
    children: 'This is a large paragraph.',
  },
}

export const Bold = {
  name: 'Bold paragraph',
  args: {
    weight: 'bold',
    children: 'This is a bold paragraph.',
  },
}

export const AllFontSizes = {
  name: 'All font sizes',
  render: () => (
    <>
      <Paragraph size='xs'>Extra small text (xs)</Paragraph>
      <Paragraph size='sm'>Small text (sm)</Paragraph>
      <Paragraph size='md'>Medium text (md)</Paragraph>
      <Paragraph size='lg'>Large text (lg)</Paragraph>
      <Paragraph size='xl'>Extra large text (xl)</Paragraph>
    </>
  ),
}
