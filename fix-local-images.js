const fs = require('fs');
let content = fs.readFileSync('d:/ziya/furniture/src/data/products.ts', 'utf-8');

const originalImagesMap = {
  'Aria Cloud Sofa': ['"/products/sofa.png"'],
  'Zen Dining Table': ['"/products/dining.png"'],
  'Atlas Bookshelf': ['"/products/bookshelf.png"'],
  'Haven Bed Frame': ['"/products/bed.png"'],
  'Nova Accent Chair': ['"/products/chair.png"'],
  'Marble Coffee Table': ['"/products/dining.png"'],
  'Minimalist Wardrobe': ['"/products/bookshelf.png"'],
  'Ergo Office Chair': ['"/products/chair.png"'],
  'Smart TV Unit': ['"/products/electronics.png"'],
  'Outdoor Patio Set': ['"/products/sofa.png"']
};

let updatedContent = content.replace(/name:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g, (match, name, imagesStr) => {
  let newImages = [];
  if (originalImagesMap[name]) {
    newImages = originalImagesMap[name];
  } else {
    newImages = ['"/products/electronics.png"'];
  }
  
  const replacement = 'images: [\n      ' + newImages.join(',\n      ') + '\n    ]';
  return match.replace(/images:\s*\[[\s\S]*?\]/, replacement);
});

fs.writeFileSync('d:/ziya/furniture/src/data/products.ts', updatedContent);
console.log('Updated products.ts with local generated images');
