#!/usr/bin/env node

// Custom build script for Vercel to completely avoid rollup native module issues
process.env.ROLLUP_SKIP_NATIVE = 'true';
process.env.VITE_SKIP_NATIVE = 'true';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

const { execSync } = require('child_process');

try {
  console.log('Starting Vercel build with native module bypass...');
  
  // Set additional environment variables
  process.env.ESBUILD_BINARY_PATH = '';
  process.env.ROLLUP_SKIP_NATIVE_BINARY = 'true';
  
  execSync('npx vite build --mode production', { 
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