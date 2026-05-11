const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
const matches = [...content.matchAll(/"\/products\/([^"]+)"/g)].map(m => m[1]);
const unique = [...new Set(matches)];
let missing = 0;
unique.forEach(f => {
  const exists = fs.existsSync('public/products/' + f);
  if (!exists) { console.log('MISSING: ' + f); missing++; }
});
console.log('Total unique images: ' + unique.length + ', Missing: ' + missing);
