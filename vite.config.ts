/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'VueFirebaseTools',
      // the proper extensions will be added
      fileName: 'use-firebase-tools',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'firebase'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          firebase: 'Firebase',
        },
      },
    },
  },
})
