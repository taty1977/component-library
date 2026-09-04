import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles'
import TextArea from '../TextArea'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('TextArea', () => {
  test('renders a labeled textarea and forwards changes', () => {
    const onChange = jest.fn()

    renderWithTheme(<TextArea label='Message' onChange={onChange} placeholder='Write a message' />)

    const textArea = screen.getByLabelText('Message')
    expect(textArea).toHaveAttribute('placeholder', 'Write a message')

    fireEvent.change(textArea, { target: { value: 'Hello' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('associates validation errors with the textarea', () => {
    renderWithTheme(<TextArea error='Message is required' id='message' label='Message' />)

    const textArea = screen.getByLabelText('Message')
    expect(textArea).toHaveAttribute('aria-invalid', 'true')
    expect(textArea).toHaveAttribute('aria-describedby', 'message-error')
    expect(screen.getByRole('alert')).toHaveTextContent('Message is required')
  })

  test('shows a required indicator without changing the accessible label', () => {
    renderWithTheme(<TextArea label='Message' required />)

    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument()
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
  })

  test('supports controlled values', () => {
    const onChange = jest.fn()

    renderWithTheme(<TextArea onChange={onChange} value='Controlled message' />)

    expect(screen.getByDisplayValue('Controlled message')).toBeInTheDocument()
  })
})
