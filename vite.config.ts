/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: './node_modules/.vite/superb-data-kraken-frontend',
  //TODO: Following fixes use of process.env rather than import.meta.env, which fails in test with jest,
  // but seems to work only in development and not after build (process.env is undefined)

  // Could something like the following help??
  //   import rollupPluginReplace from '@rollup/plugin-replace'

  // export default function (config) {
  //   config.plugins.push(
  //     rollupPluginReplace({
  //       'process.env': 'import.meta.env'
  //     })
  //   }
  // }

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
      '@customHooks': resolve(__dirname, './src/customHooks'),
      '@customTypes': resolve(__dirname, './src/customTypes'),
      '@notifications': resolve(__dirname, './src/notifications'),
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

// Another way to use process.env in the code, maybe this way it will also work after build, as import.meta seems necessary (for browser support,
// as of Webpack 5 process.env is no longer supported and will return undefined )

// import { defineConfig, loadEnv } from 'vite';

// export default defineConfig(({ command, mode }) => {
//     const env = loadEnv(mode, process.cwd(), '');
//     return {
//         define: {
//             'process.env.YOUR_STRING_VARIABLE': JSON.stringify(env.YOUR_STRING_VARIABLE),
//             'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
//             // If you want to exposes all env variables, which is not recommended
//             // 'process.env': env
//         },
//     };
// });
