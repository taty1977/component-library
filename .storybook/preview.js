import React from 'react';
import { ThemeProvider } from 'styled-components';
import { brandTheme, lightTheme, darkTheme } from '../src/styles';

export const parameters = {
  themes: {
    default: 'Brand',
    list: [
      { name: 'Brand', color: '#ffffff', value: brandTheme, default: true },
      { name: 'Light', color: '#ffffff', value: lightTheme},
      { name: 'Dark', color: '#0f172a', value: darkTheme },
    ],
  },
};

const themeMap = {
  Brand: brandTheme,
  Light: lightTheme,
  Dark: darkTheme,
};

export const decorators = [
  (Story, context) => {
    const themeObject = themeMap[context.globals.theme] || lightTheme;
    return React.createElement(
      ThemeProvider,
      { theme: themeObject },
      React.createElement(
        'div',
        {
          style: {
            padding: '1rem',
            minHeight: '100vh',
            background: themeObject.colors.surface,
          },
        },
        React.createElement(Story)
      )
    );
  },
];
