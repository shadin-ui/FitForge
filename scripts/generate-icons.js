const sharp = require('sharp');
const { exec } = require('child_process');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'logo.svg');

// Convert SVG to PNG for different sizes
async function generatePNGs() {
  const sizes = [16, 32, 64, 192, 512];
  
  for (const size of sizes) {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `logo${size}.png`));
  }
  
  // Create favicon.ico
  await sharp(svgPath)
    .resize(64, 64)
    .toFile(path.join(publicDir, 'favicon.ico'));
}

generatePNGs().catch(console.error);
