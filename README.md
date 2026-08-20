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

### Chromatic deployment

Chromatic publishes the Storybook build publicly. The project token is kept in the local, ignored `.env` file and must be loaded into the PowerShell session before running npm; npm does not load `.env` automatically:

```powershell
$env:CHROMATIC_PROJECT_TOKEN = (Get-Content .env | Where-Object { $_ -match '^CHROMATIC_PROJECT_TOKEN=' } | ForEach-Object { $_ -replace '^CHROMATIC_PROJECT_TOKEN=', '' })
npm run chromatic
```

The project token is available in Chromatic under the project's Manage screen. Do not use the deployment URL or build ID as the token, and never commit `.env` or the token to the repository.

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
