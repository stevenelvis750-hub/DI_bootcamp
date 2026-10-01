import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The exercises use plain .js file names (App.js, Exercise3.js...) like Create React App,
// so we tell Vite to read JSX inside .js files too.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
});