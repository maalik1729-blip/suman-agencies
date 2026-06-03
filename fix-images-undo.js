const fs = require('fs');
let content = fs.readFileSync('d:/ziya/furniture/src/data/products.ts', 'utf-8');

const originalImagesMap = {
  'Aria Cloud Sofa': ['1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c'],
  'Zen Dining Table': ['1555041469-a586c61ea9bc', '1449824913935-59a10b8d2000'],
  'Atlas Bookshelf': ['1507003211169-0a1dd7228f2d'],
  'Haven Bed Frame': ['1560185007-cde436f6a4d0'],
  'Nova Accent Chair': ['1586023492125-27b2c045efd7'],
  'Marble Coffee Table': ['1493663284031-b7e3aefcae8e'],
  'Mixer Grinder 750W (3 Jars)': ['1556909114-f6e7ad7d3136'],
  'Electric Ceiling Fan 1200mm': ['1565814329452-e1efa11c5b89']
};

const genericCable = '1588872657578-7efd1f1555ed';
const fallbackFurniture = '1555041469-a586c61ea9bc';
const fallbackElectronics = '1556909114-f6e7ad7d3136';

let updatedContent = content.replace(/name:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g, (match, name, imagesStr) => {
  let newImages = [];
  if (originalImagesMap[name]) {
    newImages = originalImagesMap[name].map(id => '"https://images.unsplash.com/photo-' + id + '?w=800&q=80"');
  } else if (name.includes('Cable') || name.includes('Adapter')) {
    newImages = ['"https://images.unsplash.com/photo-' + genericCable + '?w=800&q=80"'];
  } else {
    // If we replaced it before, it might have one of the imagesMap ids. Let's just restore them to fallback for now.
    // If it's furniture
    if (match.includes('"furniture"')) {
      newImages = ['"https://images.unsplash.com/photo-' + fallbackFurniture + '?w=800&q=80"'];
    } else {
      newImages = ['"https://images.unsplash.com/photo-' + fallbackElectronics + '?w=800&q=80"'];
    }
  }
  
  const replacement = 'images: [\n      ' + newImages.join(',\n      ') + '\n    ]';
  return match.replace(/images:\s*\[[\s\S]*?\]/, replacement);
});

fs.writeFileSync('d:/ziya/furniture/src/data/products.ts', updatedContent);
console.log('Undid products.ts images');
