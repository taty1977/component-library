import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { ThemeProvider } from 'styled-components'
import { brandTheme } from '../../../styles'
import Table from '../Table'

const themeStyles = {
  Brand: brandTheme,
}

// Shared fixture data keeps every story deterministic and lightweight.
const rows = [
  { id: 1, name: 'Ada Lovelace', role: 'Principal Engineer', team: 'Platform', status: 'Active' },
  { id: 2, name: 'Grace Hopper', role: 'Engineering Manager', team: 'Applications', status: 'Pending' },
  { id: 3, name: 'Katherine Johnson', role: 'Data Scientist', team: 'Insights', status: 'Active' },
  { id: 4, name: 'Evelyn Boyd Granville', role: 'Staff Engineer', team: 'Platform', status: 'Inactive' },
]

const statusStyles = {
  Active: { background: '#e8f5ee', color: brandTheme.colors.heading },
  Inactive: { background: brandTheme.colors.badgeBackground, color: brandTheme.colors.badgeText },
  Pending: { background: '#fff4d6', color: brandTheme.colors.heading },
}

const Status = ({ value }) => (
  <span
    style={{
      ...statusStyles[value],
      display: 'inline-flex',
      borderRadius: '999px',
      padding: '0.25rem 0.6rem',
      fontSize: '0.75rem',
      fontWeight: 600,
    }}
  >
    {value}
  </span>
)

// Headered and headerless column definitions cover the two table modes.
const headerColumns = [
  { key: 'name', header: 'Name', fontWeight: 'semiBold' },
  { key: 'role', header: 'Role' },
  { key: 'team', header: 'Team' },
  { key: 'status', header: 'Status', render: row => <Status value={row.status} /> },
]

const headerlessColumns = headerColumns.map(({ header, ...column }) => column)
const withSemiboldFirstColumn = columns =>
  columns.map((column, index) => (index === 0 ? { ...column, fontWeight: 'semiBold' } : column))

const semiboldHeaderColumns = withSemiboldFirstColumn(headerColumns)
const semiboldHeaderlessColumns = withSemiboldFirstColumn(headerlessColumns)

const renderTable = (args, columns = headerColumns, data = rows) => (
  <Table {...args} columns={columns} data={data} getRowKey={row => row.id} />
)

// Storybook metadata and controls.
const meta = {
  title: 'Content/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <ThemeProvider theme={themeStyles[context.globals.theme] || themeStyles.Brand}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A responsive data table with primary and secondary variants, optional column headers, sticky edges, striping, pagination, and custom cell rendering.',
      },
    },
  },
  args: {
    variant: 'primary',
    breakpoint: 'desktop',
    stickyFirstColumn: false,
    stickyLastColumn: false,
    showColumnBorders: false,
    striped: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'], table: { category: 'Appearance' } },
    breakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop'],
      table: { category: 'Responsive' },
    },
    stickyFirstColumn: { control: 'boolean', table: { category: 'Layout' } },
    stickyLastColumn: { control: 'boolean', table: { category: 'Layout' } },
    showColumnBorders: { control: 'boolean', table: { category: 'Appearance' } },
    striped: { control: 'boolean', table: { category: 'Appearance' } },
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
    getRowKey: { table: { disable: true } },
    pagination: { table: { disable: true } },
    emptyMessage: { table: { disable: true } },
  },
}

export default meta

// Core appearance matrix.
export const HeaderPrimary = {
  render: args => renderTable(args),
  name: 'Header / primary',
}

export const HeaderSecondary = {
  render: args => renderTable(args),
  name: 'Header / secondary',
  args: { variant: 'secondary', striped: true, showColumnBorders: true },
}

export const HeaderlessPrimary = {
  render: args => renderTable(args, semiboldHeaderlessColumns),
  name: 'Headerless / primary',
  parameters: {
    docs: { description: { story: 'The first body column becomes a semibold row header.' } },
  },
}

export const HeaderlessSecondary = {
  render: args => renderTable(args, semiboldHeaderlessColumns),
  name: 'Headerless / secondary',
  args: { variant: 'secondary', striped: true, showColumnBorders: true },
}

// Layout and typography states.
export const StickyFirstColumn = {
  render: args => renderTable(args),
  args: { stickyFirstColumn: true, stickyLastColumn: false, showColumnBorders: true },
}

export const StickyLastColumn = {
  render: args => renderTable(args),
  args: { stickyFirstColumn: false, stickyLastColumn: true, showColumnBorders: true },
}

export const MobileScroll = {
  render: args => renderTable(args),
  args: { breakpoint: 'mobile', stickyFirstColumn: true, stickyLastColumn: false },
}

export const SemiboldColumn = {
  render: args => renderTable(args, semiboldHeaderColumns),
}

// Interaction and empty states.
export const Paginated = {
  render: args => renderTable(args),
  args: {
    pagination: {
      page: 2,
      pageSize: 4,
      total: 12,
      pageStatus: <>Page 2 of 3</>,
      previousIcon: <ChevronLeftIcon width='1rem' height='1rem' aria-hidden='true' />,
      nextIcon: <ChevronRightIcon width='1rem' height='1rem' aria-hidden='true' />,
      onPageChange: () => {},
    },
  },
}

export const Empty = {
  render: args => renderTable(args, headerColumns, []),
  args: { emptyMessage: 'No team members found.' },
}
