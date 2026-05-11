const fs = require('fs');

// 1 USD = 84 INR, round to nearest 99 for market-friendly pricing
const USD_TO_INR = 84;

function toINR(usd) {
  const raw = Math.round(usd * USD_TO_INR);
  // Round to nearest nice number
  if (raw >= 10000) return Math.round(raw / 1000) * 1000 - 1; // e.g. 209999
  if (raw >= 1000) return Math.round(raw / 100) * 100 - 1;    // e.g. 2099
  return raw;
}

let content = fs.readFileSync('d:/ziya/furniture/src/data/products.ts', 'utf-8');

// Convert price: <number> values
content = content.replace(/price:\s*(\d+),/g, (match, val) => {
  const usd = parseInt(val);
  // Only convert if it looks like a USD price (< 10000, likely not already INR)
  if (usd < 10000) {
    return `price: ${toINR(usd)},`;
  }
  return match;
});

// Convert originalPrice: <number> values
content = content.replace(/originalPrice:\s*(\d+),/g, (match, val) => {
  const usd = parseInt(val);
  if (usd < 10000) {
    return `originalPrice: ${toINR(usd)},`;
  }
  return match;
});

fs.writeFileSync('d:/ziya/furniture/src/data/products.ts', content);
console.log('Converted all product prices from USD to INR');
