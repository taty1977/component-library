import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles'
import Chart from '../Chart'

// Mock recharts ResponsiveContainer so it renders children in JSDOM where dimensions are 0
jest.mock('recharts', () => {
  const original = jest.requireActual('recharts')
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='responsive-container' style={{ width: 500, height: 300 }}>
        {children}
      </div>
    ),
  }
})

const sampleData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 2000, profit: 9800 },
]

const sampleSeries = [
  { dataKey: 'sales', name: 'Sales' },
  { dataKey: 'profit', name: 'Profit' },
]

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Chart', () => {
  test('renders title and description when provided', () => {
    renderWithTheme(
      <Chart
        data={sampleData}
        series={sampleSeries}
        title='Monthly Performance'
        description='Sales and profit trends for Q1'
      />,
    )

    expect(screen.getByText('Monthly Performance')).toBeInTheDocument()
    expect(screen.getByText('Sales and profit trends for Q1')).toBeInTheDocument()
  })

  test('renders responsive container and chart wrapper', () => {
    renderWithTheme(<Chart data={sampleData} series={sampleSeries} type='line' />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  test('renders bar chart type', () => {
    renderWithTheme(<Chart data={sampleData} series={sampleSeries} type='bar' />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  test('renders area chart type', () => {
    renderWithTheme(<Chart data={sampleData} series={sampleSeries} type='area' />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  test('renders pie chart type', () => {
    renderWithTheme(<Chart data={sampleData} series={[{ dataKey: 'sales', name: 'Sales' }]} type='pie' />)

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  test('accepts custom color props to override theme palette', () => {
    renderWithTheme(
      <Chart
        colors={['#ff0000', '#00ff00']}
        gridColor='#cccccc'
        textColor='#333333'
        tooltipBgColor='#ffffff'
        tooltipBorderColor='#aaaaaa'
        data={sampleData}
        series={sampleSeries}
        type='bar'
      />,
    )

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  test('applies accessible ARIA region roles and labelling', () => {
    renderWithTheme(
      <Chart data={sampleData} series={sampleSeries} title='Sales Chart' description='Quarterly sales data' />,
    )

    const region = screen.getByRole('region', { name: 'Sales Chart' })
    expect(region).toBeInTheDocument()
    expect(region).toHaveAttribute('aria-describedby')
  })

  test('provides an accessible data table for screen readers', () => {
    renderWithTheme(<Chart data={sampleData} series={sampleSeries} title='Accessible Chart' />)

    const table = screen.getByRole('table', { name: 'Accessible Chart data' })
    expect(table).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Sales' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Profit' })).toBeInTheDocument()
  })

  test('labels the visual chart separately from its data table', () => {
    renderWithTheme(<Chart data={sampleData} series={sampleSeries} title='Accessible Chart' />)

    expect(screen.getByRole('img', { name: 'Accessible Chart visualization' })).toBeInTheDocument()
  })
})
