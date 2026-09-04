import React from 'react';
import { ThemeProvider } from 'styled-components';
import { brandTheme } from '../src/styles';

const responsiveFrames = {
  fluid: { label: 'Fluid', width: '100%' },
  mobile: { label: 'Mobile', width: '390px' },
  tablet: { label: 'Tablet', width: '768px' },
  laptop: { label: 'Laptop', width: '1024px' },
  desktop: { label: 'Desktop', width: '1280px' },
};

export const parameters = {
  layout: 'padded',
  options: {
    storySort: {
      order: ['Design System', '*'],
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Select the component theme',
    defaultValue: 'Brand',
    toolbar: {
      icon: 'paintbrush',
      items: ['Brand'],
      dynamicTitle: true,
    },
  },
  responsiveFrame: {
    name: 'Viewport',
    description: 'Responsive preview width for all stories',
    defaultValue: 'fluid',
    toolbar: {
      icon: 'browser',
      items: Object.entries(responsiveFrames).map(([value, frame]) => ({
        value,
        title: frame.label,
      })),
      dynamicTitle: true,
    },
  },
};

const themeMap = {
  Brand: brandTheme,
};

export const decorators = [
  (Story, context) => {
    const themeObject = themeMap[context.globals.theme] || brandTheme;
    const selectedFrame = responsiveFrames[context.globals.responsiveFrame] || responsiveFrames.fluid;
    return React.createElement(
      ThemeProvider,
      { theme: themeObject },
      React.createElement(
        'div',
        {
          'data-bs-theme': 'light',
          style: {
            padding: '1rem',
            minHeight: '100vh',
            background: themeObject.colors.surface,
            colorScheme: 'light',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              width: '100%',
              maxWidth: selectedFrame.width,
              minWidth: 0,
              fontFamily: 'Calibri, sans-serif',
              transition: 'max-width 160ms ease',
            },
          },
          React.createElement(Story)
        )
      )
    );
  },
];
