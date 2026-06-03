const fs = require('fs');

const imagesList = fs.readFileSync('d:/ziya/furniture/public/products/image_list.txt', 'utf-8').trim().split('\n').map(l => l.trim()).filter(l => l);

let content = fs.readFileSync('d:/ziya/furniture/src/data/products.ts', 'utf-8');

let imageIndex = 0;

let updatedContent = content.replace(/name:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g, (match, name, imagesStr) => {
  // Take 2 images for each product, if possible
  let newImages = [];
  for (let i = 0; i < 2; i++) {
    if (imageIndex < imagesList.length) {
      newImages.push(`"/products/${imagesList[imageIndex]}"`);
      imageIndex++;
    } else {
      // Loop back if we run out
      imageIndex = 0;
      newImages.push(`"/products/${imagesList[imageIndex]}"`);
      imageIndex++;
    }
  }
  
  const replacement = 'images: [\n      ' + newImages.join(',\n      ') + '\n    ]';
  return match.replace(/images:\s*\[[\s\S]*?\]/, replacement);
});

fs.writeFileSync('d:/ziya/furniture/src/data/products.ts', updatedContent);
console.log('Successfully updated products.ts with the users actual images!');
