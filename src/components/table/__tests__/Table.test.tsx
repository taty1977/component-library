import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles'
import Table from '../Table'

interface User {
  id: number
  name: string
  status: string
}

const rows: User[] = [
  { id: 1, name: 'Ada Lovelace', status: 'Active' },
  { id: 2, name: 'Grace Hopper', status: 'Pending' },
]

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
]

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Table', () => {
  test('renders data and optional header and footer slots', () => {
    renderWithTheme(
      <Table<User>
        columns={columns}
        data={rows}
        header={<h2>Users</h2>}
        footer={<span>2 users</span>}
        getRowKey={row => row.id}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toBeInTheDocument()
    expect(screen.getByText('2 users')).toBeInTheDocument()
  })

  test('renders an empty message when data is empty', () => {
    renderWithTheme(<Table columns={columns} data={[]} emptyMessage='Nothing here' />)

    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  test('renders pagination only when configured and changes pages', () => {
    const onPageChange = jest.fn()
    renderWithTheme(
      <Table columns={columns} data={rows} pagination={{ page: 2, pageSize: 2, total: 5, onPageChange }} />,
    )

    expect(screen.getByRole('navigation', { name: 'Table pagination' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }))
    expect(onPageChange).toHaveBeenCalledWith(1)
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled()
  })

  test('matches pagination buttons to the table variant', () => {
    renderWithTheme(
      <Table
        columns={columns}
        data={rows}
        variant='primary'
        pagination={{ page: 1, pageSize: 2, total: 5, onPageChange: jest.fn() }}
      />,
    )

    expect(screen.getByRole('button', { name: 'Previous' })).toHaveStyle(`background: ${theme.colors.surface}`)
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveStyle(`color: ${theme.colors.primary}`)
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveStyle('border: 0')
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveStyle(`font-weight: ${theme.fontWeights.semiBold}`)
  })

  test('can fix the first and last columns', () => {
    renderWithTheme(<Table columns={columns} data={rows} stickyFirstColumn stickyLastColumn />)

    expect(screen.getByRole('table')).toHaveStyle('width: max-content')
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveStyle('position: sticky')
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col')
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveStyle('left: 0')
    expect(screen.getAllByRole('cell', { name: 'Ada Lovelace' })[0]).toHaveStyle(
      `font-weight: ${theme.fontWeights.semiBold}`,
    )
    expect(screen.getAllByRole('cell', { name: 'Ada Lovelace' })[0]).toHaveStyle('position: sticky')
    expect(screen.getAllByRole('cell', { name: 'Active' })[0]).toHaveStyle('position: sticky')
    expect(screen.getAllByRole('cell', { name: 'Active' })[0]).toHaveStyle('right: 0')
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveStyle('position: sticky')
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveStyle('right: 0')
  })

  test('supports semibold text on any column', () => {
    renderWithTheme(<Table columns={[{ ...columns[0], fontWeight: 'semiBold' }, columns[1]]} data={rows} />)

    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toHaveStyle(`font-weight: ${theme.fontWeights.semiBold}`)
  })

  test('conditionally renders column borders', () => {
    renderWithTheme(<Table columns={columns} data={rows} showColumnBorders />)

    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveStyle(
      `border-left: 1px solid ${theme.colors.border}`,
    )
  })

  test('conditionally renders striped rows', () => {
    renderWithTheme(<Table columns={columns} data={rows} striped />)

    expect(screen.getAllByRole('row')[2].querySelector('td')).toHaveStyle(`background: ${theme.colors.surfaceAlt}`)
  })

  test('uses the secondary surface color for secondary striped rows', () => {
    renderWithTheme(<Table columns={columns} data={rows} variant='secondary' striped />)

    expect(screen.getAllByRole('row')[2].querySelector('td')).toHaveStyle(
      `background: ${theme.colors.secondarySurfaceAlt}`,
    )
  })

  test('conditionally renders custom pagination icons on the correct side of the button label', () => {
    renderWithTheme(
      <Table
        columns={columns}
        data={rows}
        pagination={{
          page: 1,
          pageSize: 2,
          total: 5,
          onPageChange: jest.fn(),
          previousIcon: <span data-testid='previous-icon'>Previous icon</span>,
          nextIcon: <span data-testid='next-icon'>Next icon</span>,
        }}
      />,
    )

    const previousButton = screen.getByRole('button', { name: /previous/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(screen.getByTestId('previous-icon')).toBeInTheDocument()
    expect(screen.getByTestId('next-icon')).toBeInTheDocument()
    expect(previousButton.firstElementChild).toHaveTextContent('Previous icon')
    expect(previousButton.lastElementChild).toHaveTextContent('Previous')
    expect(nextButton.firstElementChild).toHaveTextContent('Next')
    expect(nextButton.lastElementChild).toHaveTextContent('Next icon')
  })

  test('conditionally renders column sort icons and forwards click handlers', () => {
    const onSort = jest.fn()

    renderWithTheme(
      <Table
        columns={[
          {
            ...columns[0],
            sortIcon: (
              <button type='button' data-testid='sort-icon' onClick={onSort}>
                Sort
              </button>
            ),
          },
          columns[1],
        ]}
        data={rows}
        header={<h2>Users</h2>}
      />,
    )

    fireEvent.click(screen.getByTestId('sort-icon'))

    expect(screen.getByTestId('sort-icon')).toBeInTheDocument()
    expect(onSort).toHaveBeenCalledTimes(1)
  })
})
