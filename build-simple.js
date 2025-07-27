#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Starting simple build with esbuild...');
  
  // Create dist directory
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Copy public assets first
  if (fs.existsSync('public')) {
    execSync('cp -r public/* dist/', { stdio: 'inherit' });
  }
  
  // Build with esbuild - using iife format with proper externals
  const esbuildCommand = [
    'npx esbuild src/main.tsx',
    '--bundle',
    '--outdir=dist',
    '--format=iife',
    '--global-name=App',
    '--target=es2020',
    '--minify',
    '--sourcemap',
    '--loader:.tsx=tsx',
    '--loader:.ts=ts',
    '--loader:.css=css',
    '--external:react',
    '--external:react-dom'
  ].join(' ');
  
  console.log('Running esbuild...');
  execSync(esbuildCommand, { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  // Read the original HTML file
  let htmlContent = fs.readFileSync('index.html', 'utf8');
  
  // Add React and ReactDOM CDN links before the main script
  const reactCDN = `
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  `;
  
  // Replace the script reference and add React CDN
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    reactCDN + '<script src="/main.js"></script>'
  );
  
  // Write the updated HTML to dist
  fs.writeFileSync('dist/index.html', htmlContent);
  
  console.log('Build completed successfully!');
  console.log('Generated files in dist/');
  
  // List the generated files
  const files = fs.readdirSync('dist');
  console.log('Files in dist:', files);
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 