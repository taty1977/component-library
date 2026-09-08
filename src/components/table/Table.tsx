import React from 'react'
import styled from 'styled-components'
import type { Breakpoint, ThemeType } from '../../styles'

export type TableAlign = 'left' | 'center' | 'right'
export type TableFontWeight = 'normal' | 'semiBold'
export type TableVariant = 'primary' | 'secondary'

export interface TableColumn<T> {
  key: string
  header: React.ReactNode
  align?: TableAlign
  fontWeight?: TableFontWeight
  render?: (row: T, rowIndex: number) => React.ReactNode
  sortIcon?: React.ReactNode
}

export interface TablePagination {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  pageStatus?: React.ReactNode
  previousIcon?: React.ReactNode
  nextIcon?: React.ReactNode
}

export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  className?: string
  columns: TableColumn<T>[]
  data: T[]
  getRowKey?: (row: T, rowIndex: number) => React.Key
  pagination?: TablePagination
  emptyMessage?: React.ReactNode
  variant?: TableVariant
  stickyFirstColumn?: boolean
  stickyLastColumn?: boolean
  showColumnBorders?: boolean
  striped?: boolean
  breakpoint?: Breakpoint
}

const Root = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  font-family: ${({ theme }) => theme.fontFamily};
`

// The viewport owns horizontal scrolling and keyboard focus for wide tables.
const TableViewport = styled.div<{ $variant: TableVariant }>`
  overflow-x: auto;

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => theme.colors[$variant].focusBorder};
    outline-offset: -2px;
  }
`

const StyledTable = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: ${({ theme }) => theme.colors.text};
`

const getVariantAppearance = (theme: ThemeType, variant: TableVariant) => {
  if (variant === 'secondary') {
    return {
      background: theme.colors.secondary.base,
      border: theme.colors.secondary.border,
      text: theme.colors.surface,
    }
  }

  return { background: theme.colors.primary.base, border: theme.colors.primary.border, text: theme.colors.surface }
}

const getVariantHoverColor = (theme: ThemeType, variant: TableVariant) =>
  variant === 'secondary' ? theme.colors.secondary.hover : theme.colors.primary.hover

const HeaderCell = styled.th<{
  $align: TableAlign
  $stickyLeft: boolean
  $stickyRight: boolean
  $variant: TableVariant
  $showColumnBorders: boolean
  $isFirst: boolean
  $isLast: boolean
}>`
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border-bottom: 1px solid ${({ $variant, theme }) => getVariantAppearance(theme, $variant).border};
  border-left: ${({ $showColumnBorders, $isFirst, theme }) =>
    $showColumnBorders && !$isFirst ? `1px solid ${theme.colors.border}` : 'none'};
  background: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).background};
  color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  text-align: ${({ $align }) => $align};
  white-space: nowrap;
  position: ${({ $stickyLeft, $stickyRight }) => ($stickyLeft || $stickyRight ? 'sticky' : 'static')};
  left: ${({ $stickyLeft }) => ($stickyLeft ? '0' : 'auto')};
  right: ${({ $stickyRight }) => ($stickyRight ? '0' : 'auto')};
  z-index: ${({ $stickyLeft, $stickyRight }) => ($stickyLeft || $stickyRight ? 3 : 'auto')};
  box-shadow: ${({ $stickyLeft, $stickyRight, theme }) =>
    $stickyLeft
      ? `4px 0 12px -2px ${theme.colors.border}80`
      : $stickyRight
      ? `-4px 0 12px -2px ${theme.colors.border}80`
      : 'none'};
  border-top-left-radius: ${({ $isFirst, theme }) => ($isFirst ? theme.sizes.sz_075 : '0')};
  border-top-right-radius: ${({ $isLast, theme }) => ($isLast ? theme.sizes.sz_075 : '0')};

  & > span {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: ${({ theme }) => theme.spaces.xs};
    width: 100%;
  }
`

const BodyCell = styled.td<{
  $align: TableAlign
  $stickyLeft: boolean
  $stickyRight: boolean
  $variant: TableVariant
  $fontWeight: TableFontWeight
  $showColumnBorders: boolean
  $isFirst: boolean
  $isLast: boolean
  $isRowHeader: boolean
  $isLastRow: boolean
  $striped: boolean
  $isOddRow: boolean
  $roundTop: boolean
}>`
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-left: ${({ $showColumnBorders, $isFirst, theme }) =>
    $showColumnBorders && !$isFirst ? `1px solid ${theme.colors.border}` : 'none'};
  background: ${({ $isRowHeader, $striped, $isOddRow, $variant, theme }) =>
    $isRowHeader
      ? getVariantAppearance(theme, $variant).background
      : $striped && $isOddRow
      ? $variant === 'secondary'
        ? theme.colors.secondary.surface
        : theme.colors.surfaceAlt
      : theme.colors.surface};
  color: ${({ $isRowHeader, $variant, theme }) =>
    $isRowHeader ? getVariantAppearance(theme, $variant).text : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $fontWeight, theme }) =>
    $fontWeight === 'semiBold' ? theme.fontWeights.semiBold : theme.fontWeights.normal};
  text-align: ${({ $align }) => $align};
  vertical-align: middle;
  transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.15s ease, color 0.15s ease;
  position: ${({ $stickyLeft, $stickyRight }) => ($stickyLeft || $stickyRight ? 'sticky' : 'static')};
  left: ${({ $stickyLeft }) => ($stickyLeft ? '0' : 'auto')};
  right: ${({ $stickyRight }) => ($stickyRight ? '0' : 'auto')};
  z-index: ${({ $stickyLeft, $stickyRight }) => ($stickyLeft || $stickyRight ? 2 : 'auto')};
  box-shadow: ${({ $stickyLeft, $stickyRight, theme }) =>
    $stickyLeft
      ? `4px 0 12px -2px ${theme.colors.border}80`
      : $stickyRight
      ? `-4px 0 12px -2px ${theme.colors.border}80`
      : 'none'};
  border-top-left-radius: ${({ $roundTop, $isFirst, theme }) => ($roundTop && $isFirst ? theme.sizes.sz_075 : '0')};
  border-top-right-radius: ${({ $roundTop, $isLast, theme }) => ($roundTop && $isLast ? theme.sizes.sz_075 : '0')};
  border-bottom-left-radius: ${({ $isRowHeader, $isLastRow, theme }) =>
    $isRowHeader && $isLastRow ? theme.sizes.sz_075 : '0'};
`

// Headerless rows use the first cell as a row header.
const BodyRow = styled.tr<{ $variant: TableVariant }>`
  &:last-child ${BodyCell} {
    border-bottom: 0;
  }
`

const EmptyCell = styled.td`
  padding: ${({ theme }) => `${theme.spaces.xl} ${theme.spaces.lg}`};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spaces.sm};
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const PageButton = styled.button<{ $variant: TableVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.xs};
  min-width: ${({ theme }) => theme.sizes.sz_200};
  padding: ${({ theme }) => `${theme.spaces.xs} ${theme.spaces.sm}`};
  border: 0;
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).background};
  cursor: pointer;
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  transform: translateY(0);
  transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.15s ease;
  user-select: none;

  &:hover:not(:disabled) {
    background: ${({ $variant, theme }) => getVariantHoverColor(theme, $variant)};
    color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme, $variant }) => theme.colors[$variant].focusBorder};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
  }
`

const TableIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.sz_100};
  height: ${({ theme }) => theme.sizes.sz_100};
  color: currentColor;
  flex-shrink: 0;
`

const PageStatus = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`

const renderSortIcon = (sortIcon: React.ReactNode) => {
  if (!sortIcon) return null

  if (!React.isValidElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>(sortIcon)) {
    return <TableIcon aria-hidden='true'>{sortIcon}</TableIcon>
  }

  const iconProps = sortIcon.props
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    iconProps.onClick?.(event)
  }

  if (typeof iconProps.onClick === 'function') {
    return React.cloneElement(sortIcon, { onClick: handleClick })
  }

  return <TableIcon aria-hidden='true'>{sortIcon}</TableIcon>
}

const getPageCount = (pagination: TablePagination) =>
  Math.max(1, Math.ceil(Math.max(0, pagination.total) / Math.max(1, pagination.pageSize)))

function Table<T> ({
  className,
  columns,
  data,
  getRowKey,
  pagination,
  emptyMessage = 'No results found.',
  variant = 'primary',
  stickyFirstColumn = false,
  stickyLastColumn = false,
  showColumnBorders = false,
  striped = false,
  breakpoint,
  ...tableProps
}: TableProps<T>) {
  const pageCount = pagination ? getPageCount(pagination) : 0
  const currentPage = pagination ? Math.min(Math.max(pagination.page, 1), pageCount) : 0
  // Mobile tables scroll naturally; larger layouts keep edge columns anchored.
  const stickyEdgesEnabled = breakpoint !== 'mobile'
  // A table without usable column labels has no semantic thead to render.
  const hasHeader = columns.some(
    column => column.header !== null && column.header !== undefined && column.header !== '',
  )

  return (
    <Root className={className}>
      <TableViewport $variant={variant} tabIndex={0} role='region' aria-label='Scrollable table'>
        <StyledTable {...tableProps} aria-label={tableProps['aria-label'] ?? 'Data table'}>
          {hasHeader ? (
            <thead>
              <tr>
                {columns.map((column, columnIndex) => (
                  <HeaderCell
                    scope='col'
                    key={column.key}
                    $align={column.align ?? 'left'}
                    $variant={variant}
                    $stickyLeft={stickyEdgesEnabled && stickyFirstColumn && columnIndex === 0}
                    $stickyRight={stickyEdgesEnabled && stickyLastColumn && columnIndex === columns.length - 1}
                    $showColumnBorders={showColumnBorders}
                    $isFirst={columnIndex === 0}
                    $isLast={columnIndex === columns.length - 1}
                  >
                    <span>
                      {column.header}
                      {renderSortIcon(column.sortIcon)}
                    </span>
                  </HeaderCell>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <BodyRow key={getRowKey?.(row, rowIndex) ?? rowIndex} $variant={variant}>
                  {columns.map((column, columnIndex) => (
                    <BodyCell
                      as={!hasHeader && columnIndex === 0 ? 'th' : 'td'}
                      scope={!hasHeader && columnIndex === 0 ? 'row' : undefined}
                      key={column.key}
                      $align={column.align ?? 'left'}
                      $stickyLeft={stickyEdgesEnabled && stickyFirstColumn && columnIndex === 0}
                      $stickyRight={stickyEdgesEnabled && stickyLastColumn && columnIndex === columns.length - 1}
                      $variant={variant}
                      $fontWeight={
                        column.fontWeight ??
                        ((!hasHeader || (stickyEdgesEnabled && stickyFirstColumn)) && columnIndex === 0
                          ? 'semiBold'
                          : 'normal')
                      }
                      $showColumnBorders={showColumnBorders}
                      $isFirst={columnIndex === 0}
                      $isLast={columnIndex === columns.length - 1}
                      $isRowHeader={!hasHeader && columnIndex === 0}
                      $isLastRow={rowIndex === data.length - 1}
                      $striped={striped}
                      $isOddRow={rowIndex % 2 === 1}
                      $roundTop={!hasHeader && rowIndex === 0}
                    >
                      {column.render ? column.render(row, rowIndex) : String(row[column.key as keyof T] ?? '')}
                    </BodyCell>
                  ))}
                </BodyRow>
              ))
            ) : (
              <tr>
                <EmptyCell colSpan={Math.max(columns.length, 1)}>{emptyMessage}</EmptyCell>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableViewport>
      {pagination ? (
        <Pagination aria-label='Table pagination'>
          <PageButton
            type='button'
            $variant={variant}
            onClick={() => pagination.onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            {pagination.previousIcon ? <TableIcon aria-hidden='true'>{pagination.previousIcon}</TableIcon> : null}
            <span>Previous</span>
          </PageButton>
          {pagination.pageStatus ? <PageStatus aria-live='polite'>{pagination.pageStatus}</PageStatus> : null}
          <PageButton
            type='button'
            $variant={variant}
            onClick={() => pagination.onPageChange(currentPage + 1)}
            disabled={currentPage >= pageCount}
          >
            <span>Next</span>
            {pagination.nextIcon ? <TableIcon aria-hidden='true'>{pagination.nextIcon}</TableIcon> : null}
          </PageButton>
        </Pagination>
      ) : null}
    </Root>
  )
}

export default Table
