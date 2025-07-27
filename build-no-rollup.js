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
  
  // Process CSS with Tailwind
  if (fs.existsSync('src/index.css')) {
    console.log('Processing CSS with Tailwind...');
    execSync('npx tailwindcss -i src/index.css -o dist/styles.css --minify --config tailwind.config.ts', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });
  }
  
  // Also process component CSS files
  const cssFiles = [
    'src/components/Footer.css',
    'src/components/WhatsAppFloatButton.css'
  ];
  
  cssFiles.forEach(cssFile => {
    if (fs.existsSync(cssFile)) {
      console.log(`Processing ${cssFile}...`);
      const outputFile = `dist/${path.basename(cssFile)}`;
      fs.copyFileSync(cssFile, outputFile);
    }
  });
  
  // Build with esbuild directly - using IIFE format for better React compatibility
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
  
  // Read the HTML file and add React CDN links and CSS
  let htmlContent = fs.readFileSync('dist/index.html', 'utf8');
  
  // Add React CDN links and CSS before the main script
  const reactCDN = `
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="/Footer.css">
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  `;
  
  // Replace the script reference and add React CDN
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    reactCDN + '<script src="/main.js"></script>'
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