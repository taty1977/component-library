
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles';
import { Accordion } from '../Accordion';

const testItems = [
  { id: '1', title: 'Panel One', content: 'Content for panel one' },
  { id: '2', title: 'Panel Two', content: 'Content for panel two' },
  { id: '3', title: 'Panel Three', content: 'Content for panel three' },
];

function renderWithUser(component: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(<ThemeProvider theme={theme}>{component}</ThemeProvider>),
  };
}

describe('Accordion', () => {
  test('uses shared theme colors for its surface styles', () => {
    render(
      <ThemeProvider theme={theme}>
        <Accordion items={testItems} />
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: /panel one/i });

    expect(button).toHaveStyle(`background-color: ${theme.colors.surface}`);
    expect(button).toHaveStyle(`color: ${theme.colors.heading}`);
  });

  test('supports the left icon variant', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Accordion items={testItems} variant="leftIcon" />
      </ThemeProvider>
    );

    expect(container.firstChild).toHaveAttribute('data-variant', 'leftIcon');
  });

  test('uses custom icons for collapsed and expanded states', async () => {
    const { user } = renderWithUser(
      <Accordion
        collapsedIcon={<span data-testid="collapsed-icon">Collapsed</span>}
        expandedIcon={<span data-testid="expanded-icon">Expanded</span>}
        items={[testItems[0]]}
      />
    );

    expect(screen.getByTestId('collapsed-icon')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /panel one/i }));
    expect(screen.getByTestId('expanded-icon')).toBeInTheDocument();
  });

  test('renders accordion with multiple panels', () => {  
    render(
      <ThemeProvider theme={theme}>
        <Accordion items={testItems} />
      </ThemeProvider>
    );  
    const buttons = screen.getAllByRole('button');  
    expect(buttons).toHaveLength(3);  
    expect(screen.queryByText('Content for panel one')).toBeNull();  
    expect(screen.queryByText('Content for panel two')).toBeNull();  
    expect(screen.queryByText('Content for panel three')).toBeNull();  
  });  
  
  test('shows content for the clicked panel and hides the rest', async () => {  
    const { user } = renderWithUser(<Accordion items={testItems} />);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[1]);  
    expect(screen.getByText('Content for panel two')).toBeVisible();  
    expect(screen.queryByText('Content for panel one')).toBeNull();  
    expect(screen.queryByText('Content for panel three')).toBeNull();  
  });  
  
  test('hides content when an expanded panel is clicked again', async () => {  
    const { user } = renderWithUser(<Accordion items={testItems} />);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[2]);  
    expect(screen.getByText('Content for panel three')).toBeVisible();  
    await user.click(buttons[2]);  
    expect(screen.queryByText('Content for panel three')).toBeNull();  
  });  

  test('renders children passed as separate Accordion props', async () => {
    const itemsWithChildren = [{ id: 'child-1', title: 'Children Panel' }];
    const { user } = renderWithUser(
      <Accordion items={itemsWithChildren}>
        <span>Children body content</span>
      </Accordion>
    );
    const button = screen.getByRole('button', { name: /children panel/i });

    await user.click(button);
    expect(screen.getByText('Children body content')).toBeVisible();
  });
  
  test('can expand multiple panels at the same time when allowMultiple is true', async () => {  
    const { user } = renderWithUser(<Accordion items={testItems} allowMultiple={true} />);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[0]);  
    await user.click(buttons[2]);  
    expect(screen.getByText('Content for panel one')).toBeVisible();  
    expect(screen.queryByText('Content for panel two')).toBeNull();  
    expect(screen.getByText('Content for panel three')).toBeVisible();  
  });  
  
  describe('when allowMultiple is false (default)', () => {  
    test('only one panel is visible at a time', async () => {  
      const { user } = renderWithUser(<Accordion items={testItems} />);  
      const buttons = screen.getAllByRole('button');  
      await user.click(buttons[0]);  
      expect(screen.getByText('Content for panel one')).toBeVisible();  
      await user.click(buttons[2]);  
      expect(screen.getByText('Content for panel three')).toBeVisible();  
      expect(screen.queryByText('Content for panel one')).toBeNull();  
    });  

    test('clicking another panel closes the previously open panel', async () => {
      const { user } = renderWithUser(<Accordion items={testItems} allowMultiple={false} />);
      const buttons = screen.getAllByRole('button');

      await user.click(buttons[0]);
      expect(screen.getByText('Content for panel one')).toBeVisible();

      await user.click(buttons[1]);
      expect(screen.getByText('Content for panel two')).toBeVisible();
      expect(screen.queryByText('Content for panel one')).toBeNull();
    });
  });  
  
  describe('accessibility', () => {  
    test('each button has aria-controls pointing to its content region', () => {  
      render(
        <ThemeProvider theme={theme}>
          <Accordion items={testItems} />
        </ThemeProvider>
      );  
      const buttons = screen.getAllByRole('button');  
      buttons.forEach((button: HTMLElement, index: number) => {  
        const controlsId = button.getAttribute('aria-controls');  
        expect(controlsId).toBeTruthy();  
        expect(controlsId).toBe(`accordion-content-${testItems[index].id}`);  
      });  
    });  
  
    test('content regions have aria-labelledby pointing back to their header', async () => {  
      const { user } = renderWithUser(<Accordion items={testItems} allowMultiple={true} />);  
      const buttons = screen.getAllByRole('button');  
      // Expand all items to make content regions visible
      for (const button of buttons) {
        await user.click(button);
      }
      const regions = screen.getAllByRole('region');  
      expect(regions).toHaveLength(3);
      regions.forEach((region: HTMLElement) => {  
        const labelledBy = region.getAttribute('aria-labelledby');  
        expect(labelledBy).toBeTruthy();  
        // Verify the button with this ID exists
        const button = document.getElementById(labelledBy!);
        expect(button).toBeInTheDocument();
      });  
    });  
  });  
});
