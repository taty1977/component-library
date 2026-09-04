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
    "@storybook/addon-themes",
    "@chromatic-com/storybook"
  ],
  "framework": "@storybook/react-webpack5",
  "staticDirs": [
    "../public"
  ],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript"
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.extensions = config.resolve.extensions || [".js", ".jsx", ".ts", ".tsx"];
    config.performance = {
      ...(config.performance || {}),
      hints: false
    };

    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    });

    return config;
  }
};
export default config;