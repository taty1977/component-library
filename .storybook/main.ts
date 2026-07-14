import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/react-webpack5",
  "staticDirs": [
    "..\\public"
  ]
  ,
  webpackFinal: async (config) => {
    // Add ts-loader for handling TypeScript files in stories and components
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    });
    config.resolve = config.resolve || {};
    config.resolve.extensions = config.resolve.extensions || [];
    if (!config.resolve.extensions.includes('.ts')) config.resolve.extensions.push('.ts');
    if (!config.resolve.extensions.includes('.tsx')) config.resolve.extensions.push('.tsx');
    return config;
  }
};
export default config;