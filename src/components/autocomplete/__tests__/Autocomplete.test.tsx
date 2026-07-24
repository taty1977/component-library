import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Autocomplete from '../Autocomplete';
import { theme } from '../../../styles';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Autocomplete Component', () => {
  const options = ['Apple', 'Banana', 'Cherry'];

  test('renders without crashing', () => {
    const { getByPlaceholderText } = renderWithTheme(<Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />);
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('does not display options when input is focused with empty value', () => {
    const { getByPlaceholderText, queryByText } = renderWithTheme(<Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />);
    fireEvent.focus(getByPlaceholderText('Search...'));
    expect(queryByText('Apple')).not.toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
    expect(queryByText('Cherry')).not.toBeInTheDocument();
  });

  test('calls onSelect when an option is clicked', () => {
    const onSelectMock = jest.fn();
    const { getByPlaceholderText, getByText } = renderWithTheme(<Autocomplete options={options} onSelect={onSelectMock} placeholder="Search..." />);
    fireEvent.focus(getByPlaceholderText('Search...'));
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Ba' } });
    fireEvent.click(getByText('Banana'));
    expect(onSelectMock).toHaveBeenCalledWith('Banana');
  });

  test('filters options based on input value', () => {
    const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />);
    fireEvent.focus(getByPlaceholderText('Search...'));
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Ap' } });
    expect(getByText('Apple')).toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
  });

  test('shows clear button on focus with value and clears input when clicked', () => {
    renderWithTheme(<Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Banana' } });

    const clearButton = screen.getByRole('button', { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });
});