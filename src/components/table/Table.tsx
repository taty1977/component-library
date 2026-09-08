import React from 'react'
import styled from 'styled-components'
import type { ThemeType } from '../../styles/theme'

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
  previousIcon?: React.ReactNode
  nextIcon?: React.ReactNode
}

export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[]
  data: T[]
  getRowKey?: (row: T, rowIndex: number) => React.Key
  header?: React.ReactNode
  footer?: React.ReactNode
  pagination?: TablePagination
  emptyMessage?: React.ReactNode
  variant?: TableVariant
  stickyFirstColumn?: boolean
  stickyLastColumn?: boolean
  showColumnBorders?: boolean
  striped?: boolean
}

const Root = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.sz_075};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.boxShadow.bs_01};
  font-family: ${({ theme }) => theme.fontFamily};
`

const Slot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces.md};
  padding: ${({ theme }) => theme.spaces.md} ${({ theme }) => theme.spaces.lg};
  color: ${({ theme }) => theme.colors.text};
`

const TableViewport = styled.div`
  overflow-x: auto;
`

const StyledTable = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: ${({ theme }) => theme.colors.text};
`

const getVariantAppearance = (theme: ThemeType, variant: TableVariant) => {
  const appearanceMap = {
    primary: {
      background: theme.colors.primary,
      border: theme.colors.primaryBorder,
      text: theme.colors.surface,
    },
    secondary: {
      background: theme.colors.secondary,
      border: theme.colors.secondaryBorder,
      text: theme.colors.surface,
    },
  } as const

  return appearanceMap[variant] ?? appearanceMap.primary
}

const HeaderCell = styled.th<{
  $align: TableAlign
  $stickyLeft: boolean
  $stickyRight: boolean
  $variant: TableVariant
  $showColumnBorders: boolean
  $isFirst: boolean
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
      ? `4px 0 12px -2px ${theme.colors.border}`
      : $stickyRight
      ? `-4px 0 12px -2px ${theme.colors.border}`
      : 'none'};

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
  $striped: boolean
  $isOddRow: boolean
}>`
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-left: ${({ $showColumnBorders, $isFirst, theme }) =>
    $showColumnBorders && !$isFirst ? `1px solid ${theme.colors.border}` : 'none'};
  background: ${({ $striped, $isOddRow, $variant, theme }) =>
    $striped && $isOddRow
      ? $variant === 'secondary'
        ? theme.colors.secondarySurfaceAlt
        : theme.colors.surfaceAlt
      : theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $fontWeight, theme }) =>
    $fontWeight === 'semiBold' ? theme.fontWeights.semiBold : theme.fontWeights.normal};
  text-align: ${({ $align }) => $align};
  vertical-align: middle;
  position: ${({ $stickyLeft, $stickyRight }) => ($stickyLeft || $stickyRight ? 'sticky' : 'static')};
  left: ${({ $stickyLeft }) => ($stickyLeft ? '0' : 'auto')};
  right: ${({ $stickyRight }) => ($stickyRight ? '0' : 'auto')};
  z-index: ${({ $stickyLeft, $stickyRight }) => ($stickyLeft || $stickyRight ? 2 : 'auto')};
  box-shadow: ${({ $stickyLeft, $stickyRight, theme }) =>
    $stickyLeft
      ? `4px 0 12px -2px ${theme.colors.border}`
      : $stickyRight
      ? `-4px 0 12px -2px ${theme.colors.border}`
      : 'none'};
`

const BodyRow = styled.tr`
  &:last-child ${BodyCell} {
    border-bottom: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};

    ${BodyCell} {
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }
  }
`

const EmptyCell = styled.td`
  padding: ${({ theme }) => `${theme.spaces.xl} ${theme.spaces.lg}`};
  color: ${({ theme }) => theme.colors.mutedText};
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
  border-radius: ${({ theme }) => theme.sizes.sz_050};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ $variant, theme }) => getVariantAppearance(theme, $variant).background};
  cursor: pointer;
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusBorder};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${({ theme }) => theme.fontSizes.sm};
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
    return React.cloneElement(sortIcon, {
      onClick: handleClick,
    })
  }

  return <TableIcon aria-hidden='true'>{sortIcon}</TableIcon>
}

const getPageCount = (pagination: TablePagination) => Math.max(1, Math.ceil(pagination.total / pagination.pageSize))

function Table<T> ({
  columns,
  data,
  getRowKey,
  header,
  footer,
  pagination,
  emptyMessage = 'No results found.',
  variant = 'primary',
  stickyFirstColumn = false,
  stickyLastColumn = false,
  showColumnBorders = false,
  striped = false,
  ...tableProps
}: TableProps<T>) {
  const pageCount = pagination ? getPageCount(pagination) : 0
  const currentPage = pagination ? Math.min(Math.max(pagination.page, 1), pageCount) : 0

  return (
    <Root>
      {header ? <Slot>{header}</Slot> : null}
      <TableViewport>
        <StyledTable {...tableProps}>
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <HeaderCell
                  scope='col'
                  key={column.key}
                  $align={column.align ?? 'left'}
                  $variant={variant}
                  $stickyLeft={stickyFirstColumn && columnIndex === 0}
                  $stickyRight={stickyLastColumn && columnIndex === columns.length - 1}
                  $showColumnBorders={showColumnBorders}
                  $isFirst={columnIndex === 0}
                >
                  <span>
                    {column.header}
                    {renderSortIcon(column.sortIcon)}
                  </span>
                </HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <BodyRow key={getRowKey?.(row, rowIndex) ?? rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <BodyCell
                      key={column.key}
                      $align={column.align ?? 'left'}
                      $stickyLeft={stickyFirstColumn && columnIndex === 0}
                      $stickyRight={stickyLastColumn && columnIndex === columns.length - 1}
                      $variant={variant}
                      $fontWeight={
                        column.fontWeight ?? (stickyFirstColumn && columnIndex === 0 ? 'semiBold' : 'normal')
                      }
                      $showColumnBorders={showColumnBorders}
                      $isFirst={columnIndex === 0}
                      $striped={striped}
                      $isOddRow={rowIndex % 2 === 1}
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
          <PageStatus aria-live='polite'>
            Page {currentPage} of {pageCount}
          </PageStatus>
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
      {footer ? <Slot>{footer}</Slot> : null}
    </Root>
  )
}

export default Table
