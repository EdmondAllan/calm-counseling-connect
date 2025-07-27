import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    react()
    // Removed componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [],
    },
    minify: 'esbuild',
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-win32-x64-msvc'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}));
