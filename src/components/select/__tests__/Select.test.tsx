import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles'
import Select from '../Select'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Select', () => {
  test('renders a labeled select with custom icons', () => {
    renderWithTheme(
      <Select iconLeft={<span data-testid='left-icon'>Left</span>} label='Country'>
        <option value=''>Choose a country</option>
        <option value='us'>United States</option>
      </Select>,
    )

    expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument()
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  test('forwards selected values and changes', () => {
    const onChange = jest.fn()

    renderWithTheme(
      <Select defaultValue='us' onChange={onChange}>
        <option value='us'>United States</option>
        <option value='ca'>Canada</option>
      </Select>,
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('us')
    fireEvent.change(select, { target: { value: 'ca' } })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(select).toHaveValue('ca')
  })

  test('shows a check icon for the selected dropdown option', () => {
    renderWithTheme(
      <Select defaultValue='us' showSelectionCheck>
        <option value='us'>United States</option>
        <option value='ca'>Canada</option>
      </Select>,
    )

    fireEvent.click(screen.getByRole('button'))

    const listbox = screen.getByRole('listbox')
    expect(
      within(listbox)
        .getByRole('option', { name: /United States/ })
        .querySelector('svg'),
    ).not.toBeNull()
    expect(
      within(listbox)
        .getByRole('option', { name: /Canada/ })
        .querySelector('svg'),
    ).toBeNull()
  })

  test('associates validation errors with the select', () => {
    renderWithTheme(
      <Select error='Country is required' id='country' label='Country'>
        <option value=''>Choose a country</option>
      </Select>,
    )

    const select = screen.getByRole('combobox', { name: 'Country' })
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAttribute('aria-describedby', 'country-error')
    expect(screen.getByRole('alert')).toHaveTextContent('Country is required')
  })

  test('does not show a check icon for the default option', () => {
    renderWithTheme(
      <Select defaultValue=''>
        <option value=''>Choose a country</option>
        <option value='us'>United States</option>
      </Select>,
    )

    fireEvent.click(screen.getByRole('button'))

    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getByRole('option', { name: 'Choose a country' }).querySelector('svg')).toBeNull()
  })
})
