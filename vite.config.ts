import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Without the API URL the built site calls its own origin and gets index.html
  // back, which breaks every page. Stop the build instead of shipping that.
  if (
    command === 'build' &&
    !loadEnv(mode, process.cwd(), 'VITE_').VITE_API_BASE_URL
  ) {
    throw new Error(
      'VITE_API_BASE_URL is not set. Put it in .env.production (or pass it as a build arg).'
    );
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./public', import.meta.url)),
      },
    },
  };
});
