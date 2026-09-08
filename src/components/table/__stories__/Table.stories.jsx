import React from 'react';
import { ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { brandTheme } from '../../../styles';
import Table from '../Table';

const theme = brandTheme;

const rows = [
  {
    id: 1,
    name: 'Ada Lovelace',
    role: 'Principal Engineer',
    team: 'Platform',
    status: 'Active',
    joined: 'Jan 12, 2022',
  },
  {
    id: 2,
    name: 'Grace Hopper',
    role: 'Engineering Manager',
    team: 'Applications',
    status: 'Pending',
    joined: 'Mar 04, 2023',
  },
  {
    id: 3,
    name: 'Katherine Johnson',
    role: 'Data Scientist',
    team: 'Insights',
    status: 'Active',
    joined: 'Jun 19, 2021',
  },
  {
    id: 4,
    name: 'Evelyn Boyd Granville',
    role: 'Staff Engineer',
    team: 'Platform',
    status: 'Inactive',
    joined: 'Sep 27, 2020',
  },
  {
    id: 5,
    name: 'Dorothy Vaughan',
    role: 'Delivery Lead',
    team: 'Applications',
    status: 'Active',
    joined: 'Nov 08, 2022',
  },
  {
    id: 6,
    name: 'Mary Jackson',
    role: 'Frontend Engineer',
    team: 'Design Systems',
    status: 'Pending',
    joined: 'Feb 16, 2024',
  },
];

const statusColors = {
  Active: { background: '#e8f5ee', color: theme.actionColors.success },
  Inactive: { background: theme.colors.badgeBackground, color: theme.colors.badgeText },
  Pending: { background: '#fff4d6', color: '#805d00' },
};

const Status = ({ value }) => (
  <span
    style={{
      ...statusColors[value],
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: '999px',
      padding: '0.25rem 0.6rem',
      fontSize: '0.75rem',
      fontWeight: 600,
    }}
  >
    {value}
  </span>
);

const sortIcon = (label) => (
  <button
    type="button"
    aria-label={`Sort by ${label}`}
    onClick={() => {}}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 0,
      padding: 0,
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
    }}
  >
    <ArrowUpIcon width="1rem" height="1rem" aria-hidden="true" />
  </button>
);

const columns = [
  { key: 'name', header: 'Name', sortIcon: sortIcon('name') },
  { key: 'role', header: 'Role' },
  { key: 'team', header: 'Team' },
  { key: 'status', header: 'Status', render: (row) => <Status value={row.status} /> },
  { key: 'joined', header: 'Joined', align: 'right', sortIcon: sortIcon('joined') },
];

const emphasizedColumns = [{ ...columns[0], fontWeight: 'semiBold' }, ...columns.slice(1)];

const renderTable = (args) => <Table {...args} columns={columns} data={rows} getRowKey={(row) => row.id} />;
const renderEmphasizedTable = (args) => (
  <Table {...args} columns={emphasizedColumns} data={rows} getRowKey={(row) => row.id} />
);

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A responsive data table with custom cell rendering, sort icons, sticky columns, striped rows, slots, variants, and optional pagination.',
      },
    },
  },
  args: {
    variant: 'primary',
    stickyFirstColumn: false,
    stickyLastColumn: false,
    showColumnBorders: false,
    striped: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Controls the header color treatment.',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    stickyFirstColumn: { control: 'boolean', table: { category: 'Layout' } },
    stickyLastColumn: { control: 'boolean', table: { category: 'Layout' } },
    showColumnBorders: { control: 'boolean', table: { category: 'Appearance' } },
    striped: { control: 'boolean', table: { category: 'Appearance' } },
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
    getRowKey: { table: { disable: true } },
    header: { table: { disable: true } },
    footer: { table: { disable: true } },
    pagination: { table: { disable: true } },
    emptyMessage: { table: { disable: true } },
  },
};

export default meta;

export const PrimaryDirectory = {
  render: renderTable,
  name: 'Primary directory',
  args: {
    header: (
      <>
        <div>
          <strong style={{ display: 'block', fontSize: '1.1rem' }}>Team directory</strong>
          <span style={{ color: theme.colors.mutedText, fontSize: '0.875rem' }}>6 people across three teams</span>
        </div>
        <button
          type="button"
          aria-label="Filter team directory"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '0.25rem',
            padding: '0.5rem 0.75rem',
            background: theme.colors.surface,
            color: theme.colors.heading,
            cursor: 'pointer',
          }}
        >
          <FunnelIcon width="1rem" height="1rem" aria-hidden="true" />
          Filter
        </button>
      </>
    ),
    footer: <span style={{ color: theme.colors.mutedText, fontSize: '0.875rem' }}>Updated just now</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'The primary table treatment with header and footer slots.',
      },
    },
  },
};

export const SecondaryStriped = {
  render: renderTable,
  args: { variant: 'secondary', striped: true, showColumnBorders: true },
  parameters: {
    docs: {
      description: {
        story: 'Secondary tables use the secondary surface-alt token for striped rows.',
      },
    },
  },
};

export const StickyColumns = {
  render: renderTable,
  args: { stickyFirstColumn: true, stickyLastColumn: true, showColumnBorders: true },
  parameters: {
    docs: {
      description: {
        story: 'The fixed first column uses semibold body text and stays visible with horizontal scrolling.',
      },
    },
  },
};

export const SemiboldColumn = {
  render: renderEmphasizedTable,
  name: 'Semibold column',
  parameters: {
    docs: {
      description: {
        story: 'Any column can opt into semibold body text with fontWeight: semibold.',
      },
    },
  },
};

export const Paginated = {
  render: renderTable,
  args: {
    pagination: {
      page: 2,
      pageSize: 6,
      total: 18,
      onPageChange: () => {},
      previousIcon: <ChevronLeftIcon width="1rem" height="1rem" aria-hidden="true" />,
      nextIcon: <ChevronRightIcon width="1rem" height="1rem" aria-hidden="true" />,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination buttons remain borderless, semibold, and use the active variant color for their text.',
      },
    },
  },
};

export const Empty = {
  render: (args) => <Table {...args} columns={columns} data={[]} />,
  args: {
    emptyMessage: 'No team members match the current filters.',
    header: <strong>Filtered directory</strong>,
  },
};
