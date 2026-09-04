import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Input from '../Input'
import { theme } from '../../../styles'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Input', () => {
  test('renders optional icon slots and forwards input changes', () => {
    const onChange = jest.fn()

    renderWithTheme(
      <Input
        iconLeft={<span data-testid='left-icon'>Left</span>}
        iconRight={<span data-testid='right-icon'>Right</span>}
        onChange={onChange}
        placeholder='Email address'
      />,
    )

    const input = screen.getByPlaceholderText('Email address')
    expect(input).toHaveStyle(`border-color: ${theme.colors.border}`)
    expect(input).toHaveStyle(`box-shadow: ${theme.boxShadow.bs_01}`)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'name@example.com' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('conditionally renders and associates a label and error message', () => {
    renderWithTheme(<Input error='Email is required' id='email' label='Email address' />)

    const input = screen.getByLabelText('Email address')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
    expect(screen.getByText('Email is required')).toHaveAttribute('id', 'email-error')
  })

  test('shows a required indicator without changing the accessible label', () => {
    renderWithTheme(<Input label='Email address' required />)

    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument()
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
  })

  test('conditionally renders icon slots outside the input', () => {
    renderWithTheme(
      <Input
        outsideIconLeft={<span data-testid='outside-left-icon'>Left</span>}
        outsideIconRight={<span data-testid='outside-right-icon'>Right</span>}
      />,
    )

    expect(screen.getByTestId('outside-left-icon').parentElement).toHaveStyle('align-self: stretch')
    expect(screen.getByTestId('outside-right-icon')).toBeInTheDocument()
  })

  test('forwards the input type and announces errors', () => {
    renderWithTheme(<Input error='Password is required' label='Password' type='password' />)

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('alert')).toHaveTextContent('Password is required')
  })

  test('supports keyboard activation for outside icon actions', () => {
    const handleActions = jest.fn()

    renderWithTheme(<Input handleActions={handleActions} outsideIconLeft={<span>Help</span>} />)

    const action = screen.getByRole('button')
    fireEvent.keyDown(action, { key: 'Enter' })
    fireEvent.keyDown(action, { key: ' ' })

    expect(handleActions).toHaveBeenCalledTimes(2)
  })
})
