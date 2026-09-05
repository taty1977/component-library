import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Button from '../Button'
import { theme } from '../../../styles'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Button Component', () => {
  test('renders both icon slots at the requested size and handles clicks', () => {
    const onClick = jest.fn()

    renderWithTheme(
      <Button
        aria-label='Save changes'
        iconLeft={<span data-testid='left-icon'>Left</span>}
        iconRight={<span data-testid='right-icon'>Right</span>}
        onClick={onClick}
        size='lg'
      >
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save changes' })
    expect(button).toHaveAttribute('data-size', 'lg')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()

    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('renders the primary variant', () => {
    renderWithTheme(
      <Button iconLeft={<span data-testid='primary-icon'>Add</span>} variant='primary'>
        Create
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Create' })
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(screen.getByTestId('primary-icon').parentElement).toHaveStyle('color: currentColor')
  })

  test('applies an optional width preset', () => {
    renderWithTheme(<Button width='full'>Continue</Button>)

    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('data-width', 'full')
  })

  test('uses the padding-only default size', () => {
    renderWithTheme(<Button>Continue</Button>)

    const button = screen.getByRole('button', { name: 'Continue' })
    expect(button).toHaveAttribute('data-size', 'default')
    expect(button).toHaveAttribute('data-width', 'default')
    expect(button).toHaveStyle('min-height: auto')
  })

  test('applies custom className', () => {
    renderWithTheme(<Button className='custom-btn'>Custom Class</Button>)

    const button = screen.getByRole('button', { name: 'Custom Class' })
    expect(button).toHaveClass('custom-btn')
  })
})
