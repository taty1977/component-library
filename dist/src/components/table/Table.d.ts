import React from 'react';
export type TableAlign = 'left' | 'center' | 'right';
export type TableVariant = 'default' | 'primary' | 'secondary' | 'tertiary';
export interface TableColumn<T> {
    key: string;
    header: React.ReactNode;
    align?: TableAlign;
    render?: (row: T, rowIndex: number) => React.ReactNode;
}
export interface TablePagination {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}
export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
    columns: TableColumn<T>[];
    data: T[];
    getRowKey?: (row: T, rowIndex: number) => React.Key;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    pagination?: TablePagination;
    emptyMessage?: React.ReactNode;
    variant?: TableVariant;
    stickyFirstColumn?: boolean;
    stickyLastColumn?: boolean;
}
declare function Table<T>({ columns, data, getRowKey, header, footer, pagination, emptyMessage, variant, stickyFirstColumn, stickyLastColumn, ...tableProps }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
export default Table;
