import React from 'react';
import Input from '../../input/Input';

const DesignSystemIntroduction = () => (
  <article style={{ maxWidth: '56rem', padding: '2rem', lineHeight: 1.6 }}>
    <h1>Design System Storybook</h1>
    <p>
      This library provides reusable React components and shared design tokens for building consistent,
      <Input label="Email" type="email" placeholder="you@example.com" />
    </p>

    <h2>Design Principles</h2>
    <ul>
      <li><strong>Consistency:</strong> Shared colors, spacing, typography, sizing, borders, and shadows.</li>
      <li><strong>Clarity:</strong> Semantic colors and predictable spacing create clear hierarchy.</li>
      <li><strong>Accessibility:</strong> Components preserve native HTML behavior and expose interaction states.</li>
      <li><strong>Composability:</strong> Components accept standard React and HTML props.</li>
      <li><strong>Responsive behavior:</strong> Layout-sensitive components use shared breakpoint tokens.</li>
    </ul>

    <h2>Visual Foundation</h2>
    <p>
      The theme uses Open Sans, rem-based spacing and sizing, semantic color roles, and shared elevation tokens.
      Access the theme through <code>src/styles</code> and use it with styled-components.
    </p>

    <h3>Core Spacing</h3>
    <table>
      <thead>
        <tr><th style={{ textAlign: 'left', paddingRight: '2rem' }}>Token</th><th style={{ textAlign: 'left' }}>Value</th></tr>
      </thead>
      <tbody>
        <tr><td><code>xs</code></td><td>0.25rem</td></tr>
        <tr><td><code>sm</code></td><td>0.5rem</td></tr>
        <tr><td><code>md</code></td><td>1rem</td></tr>
        <tr><td><code>lg</code></td><td>1.5rem</td></tr>
        <tr><td><code>xl</code></td><td>2rem</td></tr>
      </tbody>
    </table>

    <h2>Components</h2>
    <p>
      The package exports Accordion, Autocomplete, Button, Carousel Image Gallery, and Input components.
      Storybook is the visual reference for their states and variants.
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>

      <Input type="email" placeholder="you@example.com" />
    </div>

    <h2>Usage</h2>
    <pre><code>{`import { ThemeProvider } from 'styled-components';
import { Button, Input, theme } from '@taty1977/my-component-library';

<ThemeProvider theme={theme}>
  <Input label="Email" type="email" placeholder="you@example.com" />
  <Button type="button">Continue</Button>
</ThemeProvider>`}</code></pre>

    <p>
      Input supports uncontrolled fields with <code>defaultValue</code> and controlled fields with
      <code> value</code> and <code>onChange</code>. Standard native props are forwarded to the underlying input.
    </p>

    <h2>Accessibility</h2>
    <ul>
      <li>Provide a label or another accessible name for every input.</li>
      <li>Use a stable id for external labels and descriptions.</li>
      <li>Pass validation text through the Input error prop.</li>
      <li>Keep icon-only actions keyboard accessible.</li>
    </ul>
  </article>
);

const meta = {
  title: 'Design System/Introduction',
  parameters: {
    docs: {
      page: DesignSystemIntroduction,
    },
  },
};

export default meta;

export const Introduction = {
  render: DesignSystemIntroduction,
};
