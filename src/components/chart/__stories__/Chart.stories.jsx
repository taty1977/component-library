import React from 'react'
import { brandTheme } from '../../../styles'
import Chart from '../Chart'

const themeStyles = {
  Brand: brandTheme,
}

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
  { dataKey: 'Sales', name: 'Sales ($)' },
  { dataKey: 'Revenue', name: 'Revenue ($)' },
  { dataKey: 'Profit', name: 'Profit ($)' },
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
  render: (args, context) => {
    const activeTheme = themeStyles[context.globals.theme] || themeStyles.Brand
    const themeSeries = [activeTheme.colors.primary, activeTheme.colors.secondary, activeTheme.colors.heading]

    return (
      <Chart
        {...args}
        series={args.series.map((seriesItem, index) => ({
          ...seriesItem,
          color: seriesItem.color || themeSeries[index % themeSeries.length],
        }))}
      />
    )
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
    ariaLabel: {
      control: 'text',
      description: 'Accessible ARIA label for screen readers.',
      table: { category: 'Accessibility' },
    },
    height: {
      control: 'number',
      description: 'Height of the chart container in pixels.',
      table: { category: 'Layout' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the container.',
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
      table: { category: 'Colors' },
    },
    gridColor: {
      control: 'color',
      description: 'Custom stroke color for grid lines (overrides theme border).',
      table: { category: 'Colors' },
    },
    textColor: {
      control: 'color',
      description: 'Custom text color for axes and legend (overrides theme muted text).',
      table: { category: 'Colors' },
    },
    tooltipBgColor: {
      control: 'color',
      description: 'Custom background color for tooltips (overrides theme surface).',
      table: { category: 'Colors' },
    },
    tooltipBorderColor: {
      control: 'color',
      description: 'Custom border color for tooltips (overrides theme border).',
      table: { category: 'Colors' },
    },
    strokeWidth: {
      control: 'number',
      description: 'Stroke width for lines and area borders.',
      table: { category: 'Styles' },
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Fill opacity for area chart fills.',
      table: { category: 'Styles' },
    },
    dot: {
      control: 'boolean',
      description: 'Show or configure data point dots on line charts.',
      table: { category: 'Styles' },
    },
    activeDot: {
      control: 'boolean',
      description: 'Show or configure active hover dots on line charts.',
      table: { category: 'Styles' },
    },
    barRadius: {
      control: 'object',
      description: 'Corner radius for bar chart bars.',
      table: { category: 'Styles' },
    },
    outerRadius: {
      control: 'number',
      description: 'Outer radius for pie chart slices.',
      table: { category: 'Styles' },
    },
    innerRadius: {
      control: 'number',
      description: 'Inner radius for pie chart slices (e.g. donut charts).',
      table: { category: 'Styles' },
    },
    data: { table: { category: 'Data' } },
    series: { table: { category: 'Data' } },
    xAxisKey: { table: { category: 'Data' } },
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
            padding: '24px',
            borderRadius: '12px',
          }}
        >
          <Story />
        </div>
      )
    },
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
