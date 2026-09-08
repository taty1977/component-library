import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles';
import Heading from '../Heading';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Heading', () => {
  test('uses theme tokens for size, weight, and family', () => {
    renderWithTheme(
      <Heading level="h3" weight="medium" family="heading">
        Section title
      </Heading>,
    );

    const heading = screen.getByRole('heading', { name: 'Section title' });
    expect(heading.tagName).toBe('H3');
    expect(heading).toHaveStyle(`font-size: ${theme.headingSizes.h3}`);
    expect(heading).toHaveStyle(`font-weight: ${theme.fontWeights.medium}`);
  });

  test('supports a semantic heading level independent of visual size', () => {
    renderWithTheme(<Heading level="h2">Subheading</Heading>);

    expect(screen.getByRole('heading', { level: 2, name: 'Subheading' })).toBeInTheDocument();
  });

  test('uses semantic theme colors for notification text', () => {
    renderWithTheme(
      <Heading level="h4" color="info">
        Additional information
      </Heading>,
    );

    expect(screen.getByRole('heading', { name: 'Additional information' })).toHaveStyle(
      `color: ${theme.actionColors.info}`,
    );
  });

  test('supports selectable text transform', () => {
    renderWithTheme(<Heading textTransform="uppercase">Section title</Heading>);

    expect(screen.getByRole('heading', { name: 'Section title' })).toHaveStyle('text-transform: uppercase');
  });
});
