// This is a script to run manually to generate favicons from our SVG file
// Install these packages before running: npm install -g svgo sharp

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');

console.log('Generating favicons from SVG...');

try {
  // Convert SVG to PNG images of various sizes using sharp
  // You'll need to run this script with Node.js
  // First install sharp: npm install sharp
  
  // Command to run SVG optimization
  console.log('Optimizing SVG...');
  execSync('svgo public/mappin-icon.svg -o public/mappin-icon-optimized.svg');
  
  // Commands to generate the favicon files
  // You'll need ImageMagick installed for this to work
  // On Windows: choco install imagemagick
  // On Mac: brew install imagemagick
  
  console.log('Generating favicon.ico...');
  execSync('convert -background transparent public/mappin-icon-optimized.svg -define icon:auto-resize=16,32,48,64,128 public/favicon.ico');
  
  console.log('Generating apple-touch-icon.png...');
  execSync('convert -background transparent public/mappin-icon-optimized.svg -resize 180x180 public/apple-touch-icon.png');
  
  console.log('Generating favicon-32x32.png...');
  execSync('convert -background transparent public/mappin-icon-optimized.svg -resize 32x32 public/favicon-32x32.png');
  
  console.log('Generating favicon-16x16.png...');
  execSync('convert -background transparent public/mappin-icon-optimized.svg -resize 16x16 public/favicon-16x16.png');
  
  console.log('Generating android-chrome-192x192.png...');
  execSync('convert -background transparent public/mappin-icon-optimized.svg -resize 192x192 public/android-chrome-192x192.png');
  
  console.log('Generating android-chrome-512x512.png...');
  execSync('convert -background transparent public/mappin-icon-optimized.svg -resize 512x512 public/android-chrome-512x512.png');
  
  console.log('All favicon files generated successfully!');
} catch (error) {
  console.error('Error generating favicons:', error);
} 