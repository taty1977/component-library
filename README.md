# UI Component Library

This repository is configured as a UI component library, not a standalone React app.

## Available Scripts

In the project directory, run:

### `npm run storybook`

Launches Storybook at [http://localhost:6006](http://localhost:6006).

### `npm run build`

Builds the library bundles into `dist/` using Rollup.

### `npm run test`

Runs the Jest test suite.

## Package Exports

The package exports:

- `main`: `dist/index.cjs.js`
- `module`: `dist/index.esm.js`
- `types`: `dist/index.d.ts`

## Usage

Import components from the package entry point:

```ts
import { Button, Accordion } from '@taty1977/my-component-library';
```
