import type { StorybookConfig } from '@storybook/react-vite'

/** 견본 파일은 src/stories 아래에 모은다 */
const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
}

export default config
