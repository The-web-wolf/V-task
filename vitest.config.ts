/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
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
