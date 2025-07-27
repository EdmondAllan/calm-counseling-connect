#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Starting build without rollup...');
  
  // Set environment variables to skip native modules
  process.env.ROLLUP_SKIP_NATIVE = 'true';
  process.env.VITE_SKIP_NATIVE = 'true';
  process.env.NODE_OPTIONS = '--max-old-space-size=4096';
  
  // Create dist directory
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Copy public assets
  if (fs.existsSync('public')) {
    execSync('cp -r public/* dist/', { stdio: 'inherit' });
  }
  
  // Copy index.html
  if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', 'dist/index.html');
  }
  
  // Build with esbuild directly
  const esbuildCommand = [
    'npx esbuild src/main.tsx',
    '--bundle',
    '--outdir=dist',
    '--format=esm',
    '--target=es2020',
    '--minify',
    '--sourcemap',
    '--loader:.tsx=tsx',
    '--loader:.ts=ts',
    '--loader:.css=css'
  ].join(' ');
  
  console.log('Running esbuild...');
  execSync(esbuildCommand, { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      ROLLUP_SKIP_NATIVE: 'true',
      VITE_SKIP_NATIVE: 'true'
    }
  });
  
  // Update the HTML to reference the built file
  let htmlContent = fs.readFileSync('dist/index.html', 'utf8');
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    '<script type="module" src="/main.js"></script>'
  );
  fs.writeFileSync('dist/index.html', htmlContent);
  
  console.log('Build completed successfully!');
  console.log('Generated files in dist/');
  
  const files = fs.readdirSync('dist');
  console.log('Files in dist:', files);
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 