/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: './node_modules/.vite/sdk-frontend-open-source',
  //TODO: Following fixes use of process.env rather than import.meta.env, which fails in test with jest,
  // but seems to work only in development and not after build (process.env is undefined)
  define: {
    'process.env': process.env,
    // Does the following fix the process.env is undefined after build?
    'import.meta.env.VITE_WORKFLOW_URL': JSON.stringify(
      process.env.VITE_WORKFLOW_URL,
    ),
    'import.meta.env.VITE_DASHBOARD_URL': JSON.stringify(
      process.env.VITE_DASHBOARD_URL,
    ),
  },

  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@customTypes': resolve(__dirname, './src/customTypes'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@router': resolve(__dirname, './src/router'),
      '@utils': resolve(__dirname, './src/utils'),
      '@views': resolve(__dirname, './src/views'),
      '@services': resolve(__dirname, './src/services'),
    },
  },

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: './',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: './',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
