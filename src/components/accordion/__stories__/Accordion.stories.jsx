import { Accordion } from '../Accordion';

export default {
  component: Accordion,
  title: 'Components/Accordion',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    items: [
      {
        id: '1',
        title: 'Accordion Item 1',
        content: 'Content for the first accordion item',
      },
      {
        id: '2',
        title: 'Accordion Item 2',
        content: 'Content for the second accordion item',
      },
      {
        id: '3',
        title: 'Accordion Item 3',
        content: 'Content for the third accordion item',
      },
    ],
  },
};

export const SingleOpen = {
  args: {
    ...Default.args,
    allowMultiple: false,
  },
};
