#!/usr/bin/env node

// Custom build script for Vercel to avoid rollup native module issues
process.env.NODE_OPTIONS = '--max-old-space-size=4096';
process.env.ROLLUP_SKIP_NATIVE = 'true';

const { execSync } = require('child_process');

try {
  console.log('Starting Vercel build...');
  execSync('npm run build:vercel', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 