const fs = require('fs');
let content = fs.readFileSync('d:/ziya/furniture/src/data/products.ts', 'utf-8');

const imagesMap = {
  'Aria Cloud Sofa': ['1555041469-a586c61ea9bc', '1493663284031-b7e3aefcae8e'],
  'Zen Dining Table': ['1533090135164-cd7d1912f2c8', '1577140917170-285929ef55af'],
  'Atlas Bookshelf': ['1594620113681-7973ee67bf8d'],
  'Haven Bed Frame': ['1505693314120-1d44243a416a', '1505693416388-ac5ce068fe85'],
  'Nova Accent Chair': ['1567538096630-e0c55bd6374c'],
  'Marble Coffee Table': ['1532372320572-cda25653a26d'],
  'Minimalist Wardrobe': ['1618219908412-a29a1b1a4034'],
  'Ergo Office Chair': ['1505843490538-5133c6c7d0e1'],
  'Smart TV Unit': ['1600566752355-32e6fc85ab60'],
  'Outdoor Patio Set': ['1532453288672-3a27e9b520c8'],
  // Electronics
  'Smart LED TV 55" 4K': ['1593359677879-632b0f4955ce'],
  'Soundbar Home Theatre': ['1544244015-0f04e84457e5'],
  'Wireless Noise-Cancelling Headphones': ['1618366712010-f4ae9c747dcb'],
  'Smart Home Security Camera': ['1557800636-894a64c1696f'],
  'Robot Vacuum Cleaner': ['1589830252174-8b6eb74a625a'],
  'Air Purifier HEPA': ['1585728748176-455981180fb7'],
  'Smart Refrigerator': ['1584269894723-5e7bc052df5c'],
  'Washing Machine Front Load': ['1626808611902-36d10c5c6436'],
  'Microwave Oven 30L': ['1584269894723-5e7bc052df5c'],
  'Mixer Grinder 750W (3 Jars)': ['1589830252174-8b6eb74a625a'],
  'Electric Ceiling Fan 1200mm': ['1585728748176-455981180fb7']
};

const cableImages = ['1588872657578-7efd1f1555ed', '1519389953887-71fc1c4602f9', '1527443154391-9d19ce4f5bac'];

let updatedContent = content.replace(/name:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g, (match, name, imagesStr) => {
  let newImages = [];
  if (imagesMap[name]) {
    newImages = imagesMap[name].map(id => '"https://images.unsplash.com/photo-' + id + '?w=800&q=80"');
  } else if (name.includes('Cable') || name.includes('Adapter')) {
    let randomId = cableImages[Math.floor(Math.random() * cableImages.length)];
    newImages = ['"https://images.unsplash.com/photo-' + randomId + '?w=800&q=80"'];
  } else {
    return match;
  }
  
  const replacement = 'images: [\n      ' + newImages.join(',\n      ') + '\n    ]';
  return match.replace(/images:\s*\[[\s\S]*?\]/, replacement);
});

fs.writeFileSync('d:/ziya/furniture/src/data/products.ts', updatedContent);
console.log('Updated products.ts');
