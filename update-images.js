const fs = require('fs');
const path = require('path');

// 1. Get all actual image files in public/products
const pubDir = path.join(__dirname, 'public', 'products');
const files = fs.readdirSync(pubDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
const validImages = files.filter(f => !f.includes('hero-banner'));

if (validImages.length === 0) {
  console.log('No valid images found!');
  process.exit(1);
}

// 2. Read products.ts
const productsFile = path.join(__dirname, 'src', 'data', 'products.ts');
let content = fs.readFileSync(productsFile, 'utf-8');

// 3. Replace all images: [ ... ] arrays
let imgIndex = 0;
content = content.replace(/images:\s*\[([\s\S]*?)\]/g, (match) => {
  // Take 2 images per product, wrapping around if we run out
  const img1 = validImages[imgIndex % validImages.length];
  const img2 = validImages[(imgIndex + 1) % validImages.length];
  imgIndex += 2;
  
  return `images: [\n      "/products/${img1}",\n      "/products/${img2}"\n    ]`;
});

fs.writeFileSync(productsFile, content);
console.log(`Successfully updated products.ts using ${validImages.length} available images.`);
