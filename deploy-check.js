#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking deployment configuration...\n');

// Check if required files exist
const requiredFiles = [
  'vercel.json',
  'functions/create-order.ts',
  'functions/package.json',
  'package.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
    allFilesExist = false;
  }
});

// Check API directory structure
console.log('\n📁 API Directory Structure:');
const functionsDir = path.join(__dirname, 'functions');
if (fs.existsSync(functionsDir)) {
  const apiFiles = fs.readdirSync(functionsDir);
  apiFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
} else {
  console.log('❌ API directory not found');
  allFilesExist = false;
}

// Check environment variables (if .env.local exists)
console.log('\n🔧 Environment Configuration:');
const envFile = path.join(__dirname, '.env.local');
if (fs.existsSync(envFile)) {
  console.log('✅ .env.local file exists');
  const envContent = fs.readFileSync(envFile, 'utf8');
  const hasRazorpayKeyId = envContent.includes('RAZORPAY_KEY_ID');
  const hasRazorpayKeySecret = envContent.includes('RAZORPAY_KEY_SECRET');
  
  console.log(`   - RAZORPAY_KEY_ID: ${hasRazorpayKeyId ? '✅' : '❌'}`);
  console.log(`   - RAZORPAY_KEY_SECRET: ${hasRazorpayKeySecret ? '✅' : '❌'}`);
} else {
  console.log('⚠️  .env.local file not found');
}

console.log('\n📋 Deployment Checklist:');
console.log('1. Ensure all required files exist ✅');
console.log('2. Set up environment variables in Vercel dashboard');
console.log('3. Deploy using: vercel --prod');
console.log('4. Test API endpoints after deployment');

if (allFilesExist) {
  console.log('\n🎉 Configuration looks good! Ready for deployment.');
} else {
  console.log('\n⚠️  Please fix the missing files before deployment.');
}
