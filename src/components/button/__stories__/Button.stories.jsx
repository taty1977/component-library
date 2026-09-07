import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid'
import { brandTheme } from '../../../styles'
import Button from '../Button'

const themeStyles = {
  Brand: brandTheme,
}

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A themed action button with primary and secondary colors, rectangle or pill shapes, outline styling, sizes, widths, disabled state, and optional icons.',
      },
    },
  },
  args: {
    children: 'Continue',
    size: 'default',
    variant: 'primary',
    outline: false,
    shape: 'rectangle',
    width: 'default',
    disabled: false,
    showLeftIcon: false,
    showRightIcon: false,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text or content displayed inside the button.',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the button.',
      table: { category: 'Layout' },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg'],
      description: 'Controls the button padding and minimum height.',
      table: { category: 'Sizing' },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Selects the button color treatment.',
      table: { category: 'Appearance' },
    },
    outline: {
      control: 'boolean',
      description: 'Renders the button as an outline using the selected brand color.',
      table: { category: 'Appearance' },
    },
    width: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg', 'full'],
      description: 'Selects the button width preset.',
      table: { category: 'Sizing' },
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'pill'],
      description: 'Selects the button corner radius style.',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and applies disabled styling.',
      table: { category: 'State' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show the left icon.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Show the right icon.',
      table: { category: 'Icons' },
    },
    iconLeft: {
      table: { disable: true },
    },
    iconRight: {
      table: { disable: true },
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
            padding: '16px',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default meta

const renderButton = ({ showLeftIcon, showRightIcon, ...args }) => (
  <Button
    {...args}
    iconLeft={showLeftIcon ? <PlusIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
    iconRight={showRightIcon ? <ArrowRightIcon width='1em' height='1em' aria-hidden='true' /> : undefined}
  />
)

export const Default = {
  render: renderButton,
}

export const Primary = {
  render: renderButton,
  args: {
    variant: 'primary',
    showLeftIcon: true,
    showRightIcon: true,
  },
}

export const Secondary = {
  render: renderButton,
  args: {
    variant: 'secondary',
    showLeftIcon: true,
    showRightIcon: true,
  },
}

export const PrimaryPill = {
  render: renderButton,
  args: {
    variant: 'primary',
    shape: 'pill',
  },
}

export const SecondaryPill = {
  render: renderButton,
  args: {
    variant: 'secondary',
    shape: 'pill',
  },
}

export const OutlinePrimary = {
  render: renderButton,
  args: {
    variant: 'primary',
    outline: true,
    showLeftIcon: true,
    showRightIcon: true,
  },
}

export const OutlineSecondary = {
  render: renderButton,
  args: {
    variant: 'secondary',
    outline: true,
    showLeftIcon: true,
    showRightIcon: true,
    children: 'Secondary outline',
  },
}

export const Disabled = {
  render: renderButton,
  args: {
    disabled: true,
  },
}

export const WithBothIcons = {
  render: renderButton,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
}
