/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

const config: UserConfig = {
  plugins: [react(), dts({ insertTypesEntry: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'payload-lexical-react',
      formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: (format) => `payload-lexical-react.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react/jsx-runtime', 'react/compiler-runtime', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
};

export default defineConfig(config);
