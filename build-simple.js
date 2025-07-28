#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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
  
  // Build with esbuild - using global format for better React compatibility
  const esbuildCommand = [
    'npx esbuild src/main.tsx',
    '--bundle',
    '--outdir=dist',
    '--format=global',
    '--global-name=App',
    '--target=es2020',
    '--minify',
    '--sourcemap',
    '--loader:.tsx=tsx',
    '--loader:.ts=ts',
    '--loader:.css=css',
    '--define:process.env.NODE_ENV=\\"production\\"'
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
  
  // Replace the script reference
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    '<script src="/main.js"></script>'
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