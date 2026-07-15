import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Accordion } from '../Accordion';
import { theme } from '../../../styles';

const withTheme = (Story) => {
  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(
      'div',
      { style: { padding: '1rem' } },
      React.createElement(Story, null)
    )
  );
};

export default {
  component: Accordion,
  title: 'Components/Accordion',
  tags: ['autodocs'],
  decorators: [withTheme],
  argTypes: {
    allowMultiple: { control: 'boolean' },
    items: { control: 'object' },
  },
  parameters: {
    docs: {
      description: {
        component: 'An accessible accordion component. Use `allowMultiple` to allow multiple panels open.',
      },
    },
  },
};

const defaultItems = [
  { id: '1', title: 'Accordion Item 1', content: 'Content for the first accordion item' },
  { id: '2', title: 'Accordion Item 2', content: 'Content for the second accordion item' },
  { id: '3', title: 'Accordion Item 3', content: 'Content for the third accordion item' },
];

export const Default = {
  args: {
    items: defaultItems,
    allowMultiple: true,
  },
};

export const SingleOpen = {
  args: {
    ...Default.args,
    allowMultiple: false,
  },
};

// Example play function to demonstrate interaction in Storybook's canvas
// (requires Storybook's testing-library support)
Default.play = async ({ canvasElement }) => {
  // noop if testing helpers not available
  try {
    const { within, userEvent } = await import('@storybook/testing-library');
    const canvas = within(canvasElement);
    const firstButton = await canvas.getByRole('button', { name: /accordion item 1/i });
    await userEvent.click(firstButton);
  } catch (e) {
    // ignore when testing helpers are not installed
  }
};
