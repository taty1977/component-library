import React, { useCallback, useId, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export interface ChartSeries {
  dataKey: string
  name?: string
  color?: string
  strokeWidth?: number
  dot?: boolean | object
  activeDot?: boolean | object
  fillOpacity?: number
  radius?: [number, number, number, number] | number
}

export interface ChartDataItem {
  [key: string]: any
}

export interface ChartProps {
  /** Chart type to display */
  type?: 'line' | 'bar' | 'area' | 'pie'
  /** Data points for the chart */
  data: ChartDataItem[]
  /** Series configuration for lines/bars/areas or pie dataKey */
  series: ChartSeries[]
  /** Custom color palette for series/slices (overrides theme palette) */
  colors?: string[]
  /** Custom stroke color for grid lines (overrides theme border color) */
  gridColor?: string
  /** Custom text color for axes and legend (overrides theme mutedText color) */
  textColor?: string
  /** Custom background color for tooltips (overrides theme surface color) */
  tooltipBgColor?: string
  /** Custom border color for tooltips (overrides theme border color) */
  tooltipBorderColor?: string
  /** Key for the X-axis (category axis) */
  xAxisKey?: string
  /** Title shown above the chart */
  title?: string
  /** Short description shown below the title */
  description?: string
  /** Accessible ARIA label for screen readers */
  ariaLabel?: string
  /** Height of the chart container (e.g., 300 or "100%") */
  height?: number | string
  /** Stroke width for lines and area borders */
  strokeWidth?: number
  /** Dot config or boolean for line chart data points */
  dot?: boolean | object
  /** Active dot config or boolean for hovered line data points */
  activeDot?: boolean | object
  /** Fill opacity for area chart areas */
  fillOpacity?: number
  /** Border radius for bar chart bars */
  barRadius?: [number, number, number, number] | number
  /** Outer radius for pie chart */
  outerRadius?: number | string
  /** Inner radius for pie chart (e.g. for donut charts) */
  innerRadius?: number | string
  /** Show background grid lines */
  showGrid?: boolean
  /** Show hover tooltip */
  showTooltip?: boolean
  /** Show series legend */
  showLegend?: boolean
  /** Optional custom CSS class name */
  className?: string
}

const ChartContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  padding: ${({ theme }) => theme.spaces.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
`

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.md};
`

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

const Description = styled.p`
  margin: ${({ theme }) => `${theme.spaces.xs} 0 0`};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const ChartWrapper = styled.div<{ $height: number | string }>`
  width: 100%;
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height)};
  min-height: ${({ theme }) => theme.sizes.sz_1200};

  & .recharts-surface {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  & .recharts-default-legend,
  & .recharts-legend-wrapper,
  & .recharts-legend-item,
  & .recharts-legend-item-text {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  & .recharts-text,
  & .recharts-cartesian-axis-tick-value,
  & .recharts-pie-label-text,
  & .recharts-label {
    fill: ${({ theme }) => theme.colors.text} !important;
  }
`

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const Chart: React.FC<ChartProps> = ({
  type = 'line',
  data,
  series,
  colors,
  gridColor: customGridColor,
  textColor: customTextColor,
  tooltipBgColor: customTooltipBgColor,
  tooltipBorderColor: customTooltipBorderColor,
  xAxisKey = 'name',
  title,
  description,
  ariaLabel,
  height = 300,
  strokeWidth = 2,
  dot = { r: 4 },
  activeDot = { r: 6 },
  fillOpacity = 0.2,
  barRadius = [4, 4, 0, 0],
  outerRadius = 80,
  innerRadius,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  className,
}) => {
  const theme = useTheme()
  const chartId = useId()
  const titleId = `${chartId}-title`
  const descriptionId = `${chartId}-desc`

  // Color palette: props > theme
  const palette = useMemo(() => {
    if (colors && colors.length > 0) {
      return colors
    }
    if (theme?.colors) {
      return [
        theme.colors.primary,
        theme.colors.tertiary,
        theme.colors.quaternary,
        theme.colors.heading,
        theme.colors.icon,
        theme.colors.danger,
      ]
    }
    return []
  }, [colors, theme])

  // Resolve series color
  const getColor = useCallback(
    (seriesItem: ChartSeries, index: number) => {
      return seriesItem.color || palette[index % palette.length]
    },
    [palette],
  )

  // Resolve theme styles
  const { gridColor, textColor, customTooltipStyle, tooltipItemStyle, tooltipLabelStyle, axisTickStyle, legendStyle } =
    useMemo(() => {
      const grid = customGridColor || theme?.colors?.border
      const text = customTextColor || theme?.colors?.text || theme?.colors?.heading || '#123b4a'
      const bg = customTooltipBgColor || theme?.colors?.surface
      const border = customTooltipBorderColor || theme?.colors?.border
      const fontFamily = theme?.fontFamily
      const fontSize = theme?.fontSizes?.sm

      return {
        gridColor: grid,
        textColor: text,
        customTooltipStyle: {
          backgroundColor: bg,
          borderColor: border,
          borderRadius: theme?.sizes?.sz_050,
          boxShadow: theme?.boxShadow?.bs_03,
          color: text,
          fontSize,
          fontFamily,
        },
        tooltipItemStyle: {
          color: text,
          fontSize,
          fontFamily,
        },
        tooltipLabelStyle: {
          color: theme?.colors?.heading || text,
          fontSize,
          fontFamily,
          fontWeight: 600,
        },
        axisTickStyle: {
          fill: text,
          fontSize,
          fontFamily,
        },
        legendStyle: {
          color: text,
          fontSize,
          fontFamily,
        },
      }
    }, [customGridColor, customTextColor, customTooltipBgColor, customTooltipBorderColor, theme])

  const renderLegendFormatter = useCallback(
    (value: string) => <span style={{ color: textColor }}>{value}</span>,
    [textColor],
  )

  // Shared Cartesian elements
  const renderCartesianElements = () => [
    showGrid ? <CartesianGrid key='grid' strokeDasharray='3 3' stroke={gridColor} /> : null,
    <XAxis key='xaxis' dataKey={xAxisKey} stroke={textColor} tick={axisTickStyle} />,
    <YAxis key='yaxis' stroke={textColor} tick={axisTickStyle} />,
    showTooltip ? (
      <Tooltip
        key='tooltip'
        contentStyle={customTooltipStyle}
        itemStyle={tooltipItemStyle}
        labelStyle={tooltipLabelStyle}
      />
    ) : null,
    showLegend ? <Legend key='legend' wrapperStyle={legendStyle} formatter={renderLegendFormatter} /> : null,
  ]

  // Render chart by type
  const renderChartContent = () => {
    switch (type) {
      case 'pie': {
        const primarySeries = series[0]
        const dataKey = primarySeries?.dataKey || 'value'
        const nameKey = xAxisKey || 'name'

        const pieData = data.map((item, index) => ({
          ...item,
          fill: item.fill || item.color || series[index]?.color || palette[index % palette.length],
        }))

        return (
          <PieChart>
            {showTooltip && (
              <Tooltip contentStyle={customTooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
            )}
            {showLegend && <Legend wrapperStyle={legendStyle} formatter={renderLegendFormatter} />}
            <Pie
              data={pieData}
              dataKey={dataKey}
              nameKey={nameKey}
              cx='50%'
              cy='50%'
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              label
            />
          </PieChart>
        )
      }

      case 'bar':
        return (
          <BarChart data={data}>
            {renderCartesianElements()}
            {series.map((s, i) => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                fill={getColor(s, i)}
                radius={s.radius ?? barRadius}
              />
            ))}
          </BarChart>
        )

      case 'area':
        return (
          <AreaChart data={data}>
            {renderCartesianElements()}
            {series.map((s, i) => {
              const color = getColor(s, i)
              return (
                <Area
                  key={s.dataKey}
                  type='monotone'
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  stroke={color}
                  strokeWidth={s.strokeWidth ?? strokeWidth}
                  fill={color}
                  fillOpacity={s.fillOpacity ?? fillOpacity}
                />
              )
            })}
          </AreaChart>
        )

      case 'line':
      default:
        return (
          <LineChart data={data}>
            {renderCartesianElements()}
            {series.map((s, i) => (
              <Line
                key={s.dataKey}
                type='monotone'
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                stroke={getColor(s, i)}
                strokeWidth={s.strokeWidth ?? strokeWidth}
                dot={s.dot ?? dot}
                activeDot={s.activeDot ?? activeDot}
              />
            ))}
          </LineChart>
        )
    }
  }

  return (
    <ChartContainer
      className={className}
      role='region'
      aria-label={title ? undefined : ariaLabel || 'Chart'}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      {(title || description) && (
        <Header>
          {title && <Title id={titleId}>{title}</Title>}
          {description && <Description id={descriptionId}>{description}</Description>}
        </Header>
      )}
      <VisuallyHidden>
        <table aria-label={title ? `${title} data` : ariaLabel || 'Chart data'}>
          <thead>
            <tr>
              <th scope='col'>{xAxisKey}</th>
              {series.map(s => (
                <th key={s.dataKey} scope='col'>
                  {s.name || s.dataKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item[xAxisKey]}</td>
                {series.map(s => (
                  <td key={s.dataKey}>{item[s.dataKey]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </VisuallyHidden>
      <ChartWrapper $height={height}>
        <ResponsiveContainer width='100%' height='100%'>
          {renderChartContent()}
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartContainer>
  )
}

export default Chart
