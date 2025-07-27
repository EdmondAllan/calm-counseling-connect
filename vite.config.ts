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
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
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
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      include: []
    }
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-win32-x64-msvc', '@rollup/rollup-linux-x64-gnu'],
    esbuildOptions: {
      target: 'es2020'
    },
    force: true
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env.ROLLUP_SKIP_NATIVE': 'true',
    'process.env.VITE_SKIP_NATIVE': 'true'
  },
  esbuild: {
    target: 'es2020'
  },
  rollupOptions: {
    external: []
  }
}));
