import React from 'react'
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import { Accordion } from '../Accordion'

const themeStyles = {
  Brand: brandTheme,
}

export default {
  component: Accordion,
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An accessible accordion with a neutral default style and primary or secondary color variants. Use custom collapsed and expanded icons when needed.',
      },
    },
  },
  argTypes: {
    allowMultiple: {
      control: { type: 'inline-radio' },
      options: [true, false],
      labels: {
        true: 'Allow multiple open',
        false: 'Single panel only',
      },
      description: 'When true, multiple accordion panels can stay open at once.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: false },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Choose the accordion color treatment.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },
    collapsedIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    items: { control: 'object' },
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

const defaultItems = [
  { id: '1', title: 'Accordion Item 1', content: 'Content for the first accordion item' },
  { id: '2', title: 'Accordion Item 2', content: 'Content for the second accordion item' },
  { id: '3', title: 'Accordion Item 3', content: 'Content for the third accordion item' },
]

export const Default = {
  args: {
    items: defaultItems,
    allowMultiple: false,
    variant: 'default',
  },
}

export const Primary = {
  args: {
    ...Default.args,
    variant: 'primary',
  },
}

export const Secondary = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
}

const customIconArgs = {
  collapsedIcon: <PlusIcon width='1em' height='1em' aria-hidden='true' />,
  expandedIcon: <Bars3Icon width='1em' height='1em' aria-hidden='true' />,
}

export const DefaultWithCustomIcons = {
  args: {
    ...Default.args,
    ...customIconArgs,
  },
  parameters: {
    docs: {
      description: {
        story: 'The default variant with custom icons for collapsed and expanded states.',
      },
    },
  },
}

export const PrimaryWithCustomIcons = {
  args: {
    ...Primary.args,
    ...customIconArgs,
  },
}

export const SecondaryWithCustomIcons = {
  args: {
    ...Secondary.args,
    ...customIconArgs,
  },
}
