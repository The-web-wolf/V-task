/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '/src/utils/test-setup.ts',
    css: true,
    alias: {
      '@': '/src',
      '@test-utils': '/src/utils/test-utils.ts',
    },
  },
})
