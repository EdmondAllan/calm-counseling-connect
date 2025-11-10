#!/usr/bin/env node

// Custom build script for Vercel that completely bypasses rollup
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  console.log('Starting custom build without rollup...');
  
  // Set environment variables to skip native modules
  process.env.ROLLUP_SKIP_NATIVE = 'true';
  process.env.VITE_SKIP_NATIVE = 'true';
  process.env.NODE_OPTIONS = '--max-old-space-size=4096';
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Copy index.html to dist
  if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', 'dist/index.html');
  }
  
  // Copy public assets
  if (fs.existsSync('public')) {
    execSync('cp -r public/* dist/', { stdio: 'inherit' });
  }
  
  // Use esbuild to bundle the main entry point
  const esbuildCommand = [
    'npx esbuild src/main.tsx',
    '--bundle',
    '--outdir=dist',
    '--format=esm',
    '--target=esnext',
    '--minify',
    '--sourcemap',
    '--external:react',
    '--external:react-dom'
  ].join(' ');
  
  console.log('Running esbuild...');
  execSync(esbuildCommand, { 
    stdio: 'inherit',
    env: {
      ...process.env,
      ROLLUP_SKIP_NATIVE: 'true',
      VITE_SKIP_NATIVE: 'true'
    }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}