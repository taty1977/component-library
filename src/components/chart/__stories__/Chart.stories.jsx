import React from 'react'
import { brandTheme } from '../../../styles'
import Chart from '../Chart'

const sampleData = [
  { name: 'Jan', Sales: 4000, Revenue: 2400, Profit: 1600 },
  { name: 'Feb', Sales: 3000, Revenue: 1398, Profit: 1200 },
  { name: 'Mar', Sales: 2000, Revenue: 9800, Profit: 3400 },
  { name: 'Apr', Sales: 2780, Revenue: 3908, Profit: 2000 },
  { name: 'May', Sales: 1890, Revenue: 4800, Profit: 2180 },
  { name: 'Jun', Sales: 2390, Revenue: 3800, Profit: 2500 },
  { name: 'Jul', Sales: 3490, Revenue: 4300, Profit: 2100 },
]

const sampleSeries = [
  { dataKey: 'Sales', name: 'Sales ($)', color: brandTheme.colors.primary },
  { dataKey: 'Revenue', name: 'Revenue ($)', color: brandTheme.colors.tertiary },
  { dataKey: 'Profit', name: 'Profit ($)', color: brandTheme.colors.quaternary },
]

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic Search', value: 300 },
  { name: 'Paid Ads', value: 300 },
  { name: 'Referral', value: 200 },
]

const meta = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A responsive, themed chart component built with Recharts. Supports line, bar, area, and pie chart types with customizable series, colors, tooltips, grids, and titles.',
      },
    },
  },
  args: {
    title: 'Financial Overview',
    description: 'Monthly breakdown of sales, revenue, and profit',
    data: sampleData,
    series: sampleSeries,
    xAxisKey: 'name',
    height: 320,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'area', 'pie'],
      description: 'The visual type of chart to display.',
      table: { category: 'Chart Type' },
    },
    title: {
      control: 'text',
      description: 'Title header displayed above the chart.',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Subtitle/description text displayed below the title.',
      table: { category: 'Content' },
    },
    height: {
      control: 'number',
      description: 'Height of the chart container in pixels.',
      table: { category: 'Layout' },
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines on the chart background.',
      table: { category: 'Display' },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show interactive hover tooltip.',
      table: { category: 'Display' },
    },
    showLegend: {
      control: 'boolean',
      description: 'Show series legend.',
      table: { category: 'Display' },
    },
    colors: {
      control: 'object',
      description: 'Array of custom colors to override the default theme color palette.',
      table: { category: 'Display' },
    },
    data: { table: { category: 'Data' } },
    series: { table: { category: 'Data' } },
    xAxisKey: { table: { category: 'Data' } },
  },
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: brandTheme.colors.surface,
          border: `1px solid ${brandTheme.colors.border}`,
          padding: '24px',
          borderRadius: '12px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

export const LineChart = {
  args: {
    type: 'line',
  },
}

export const BarChart = {
  args: {
    type: 'bar',
    title: 'Monthly Sales Comparison',
    description: 'Bar chart showing revenue vs sales per month',
  },
}

export const AreaChart = {
  args: {
    type: 'area',
    title: 'Cumulative Growth',
    description: 'Filled area chart illustrating metric trends over time',
  },
}

export const PieChart = {
  args: {
    type: 'pie',
    title: 'Traffic Sources',
    description: 'Distribution of incoming website visitors',
    data: pieData,
    series: [{ dataKey: 'value', name: 'Visitors' }],
    xAxisKey: 'name',
  },
}
