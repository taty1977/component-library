import React from 'react';

export const decorators = [
  (Story) => React.createElement(
    'div',
    { style: { padding: '1rem', minHeight: '100vh' } },
    React.createElement(Story)
  ),
];