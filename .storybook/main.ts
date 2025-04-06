import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    "stories": [
        "../package/src/**/*.mdx",
        "../package/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-essentials",
        '@storybook/addon-interactions',
    ],
    "framework": {
        "name": "@storybook/react-vite",
        "options": {}
    }
}
export default config