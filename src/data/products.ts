export interface Product {
  id: string;
  name: string;
  category: "furniture" | "electronics";
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  badge?: "new" | "sale" | "trending" | "bestseller";
  colors?: string[];
  materials?: string[];
}

export const products: Product[] = [
  // Furniture
  {
    id: "f001",
    name: "Aria Cloud Sofa",
    category: "furniture",
    subcategory: "Sofas",
    price: 209999,
    originalPrice: 268999,
    rating: 4.8,
    reviewCount: 247,
    images: [
      "/products/15fb46c1-d2e2-4967-a46e-9f39bed0f53a.png",
      "/products/161e2c7a-5d0a-4a62-9917-7308eae1c628.png"
    ],
    description:
      "Sink into ultimate luxury with the Aria Cloud Sofa. Crafted with premium Italian leather and memory foam cushioning, this statement piece transforms any living space into a sanctuary of comfort.",
    features: [
      "Italian full-grain leather upholstery",
      "Memory foam + feather blend cushions",
      "Solid walnut wood frame",
      "Removable & washable covers",
      "Modular configuration options",
    ],
    specs: {
      Dimensions: "280cm × 95cm × 80cm",
      "Seat Height": "45cm",
      Weight: "85kg",
      Material: "Italian Leather, Solid Walnut",
      Warranty: "5 Years",
    },
    inStock: true,
    badge: "sale",
    colors: ["Caramel", "Charcoal", "Cream", "Navy"],
  },
  {
    id: "f002",
    name: "Zen Dining Table",
    category: "furniture",
    subcategory: "Dining",
    price: 159999,
    rating: 4.9,
    reviewCount: 183,
    images: [
      "/products/208771d3-c938-4d68-9380-090f215bc1fd.png",
      "/products/27f402be-f305-4fba-98a1-be7ca3ffc517.png"
    ],
    description:
      "The Zen Dining Table embodies minimalist Japanese design with a live-edge solid oak top. Perfect for intimate dinners or family gatherings, it seats 6–8 guests comfortably.",
    features: [
      "Live-edge solid oak tabletop",
      "Hairpin steel legs",
      "Natural oil finish",
      "Seats 6–8 people",
      "Custom sizes available",
    ],
    specs: {
      Dimensions: "220cm × 90cm × 75cm",
      "Max Capacity": "8 persons",
      Weight: "62kg",
      Material: "Solid Oak, Steel",
      Warranty: "3 Years",
    },
    inStock: true,
    badge: "trending",
    materials: ["Solid Oak", "Brushed Steel"],
  },
  {
    id: "f003",
    name: "Atlas Bookshelf",
    category: "furniture",
    subcategory: "Storage",
    price: 70999,
    originalPrice: 91999,
    rating: 4.7,
    reviewCount: 312,
    images: [
      "/products/2d601aba-1862-461d-8371-ca2feb92d8d5.png",
      "/products/2e306e3c-5ad3-477e-8390-cf5a9acf3959.png"
    ],
    description:
      "The Atlas Bookshelf combines functionality with sculptural beauty. Its asymmetric open shelving design creates dynamic visual interest while providing ample storage for books, art, and collectibles.",
    features: [
      "Asymmetric open shelf design",
      "Anti-tip wall mounting bracket included",
      "Adjustable shelf heights",
      "Load capacity: 150kg",
      "Available in 3 finishes",
    ],
    specs: {
      Dimensions: "180cm × 35cm × 220cm",
      Shelves: "8 shelves",
      Weight: "45kg",
      Material: "Engineered Wood, Steel",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "sale",
    colors: ["Walnut", "White", "Matte Black"],
  },
  {
    id: "f004",
    name: "Haven Bed Frame",
    category: "furniture",
    subcategory: "Bedroom",
    price: 138999,
    rating: 4.9,
    reviewCount: 428,
    images: [
      "/products/374617d7-5eeb-4a51-b7cd-3ef58db33b61.png",
      "/products/38df4d5f-569e-45ae-ad7c-b44b7feb0376.png"
    ],
    description:
      "The Haven Bed Frame redefines bedroom luxury. Its upholstered headboard and clean platform design create a cocoon of serenity. Available in King, Queen, and Full sizes.",
    features: [
      "Tall upholstered headboard",
      "Platform base — no box spring needed",
      "USB charging ports built-in",
      "Under-bed storage drawers",
      "Tool-free assembly",
    ],
    specs: {
      "Available Sizes": "King, Queen, Full",
      "Headboard Height": "135cm",
      Weight: "58kg",
      Material: "Velvet Upholstery, Solid Pine",
      Warranty: "5 Years",
    },
    inStock: true,
    badge: "bestseller",
    colors: ["Slate Grey", "Dusty Rose", "Forest Green", "Ivory"],
  },
  {
    id: "f005",
    name: "Nova Accent Chair",
    category: "furniture",
    subcategory: "Chairs",
    price: 58999,
    originalPrice: 75999,
    rating: 4.6,
    reviewCount: 156,
    images: [
      "/products/4ac52a83-4cef-44db-81b0-84f809f5dcf2.png",
      "/products/4bc13860-edec-4caf-8ea5-8c6c1f057f73.png"
    ],
    description:
      "The Nova Accent Chair is a bold statement piece with its sculptural silhouette and premium boucle upholstery. Perfect as a reading chair or to anchor a seating arrangement.",
    features: [
      "Boucle fabric upholstery",
      "360° swivel base",
      "Ergonomic lumbar support",
      "Gold-tone metal legs",
      "Stain-resistant treatment",
    ],
    specs: {
      Dimensions: "75cm × 80cm × 90cm",
      "Seat Height": "48cm",
      Weight: "18kg",
      Material: "Boucle, Metal",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "new",
    colors: ["Cream Boucle", "Charcoal", "Terracotta"],
  },
  {
    id: "f006",
    name: "Marble Coffee Table",
    category: "furniture",
    subcategory: "Tables",
    price: 104999,
    rating: 4.8,
    reviewCount: 203,
    images: [
      "/products/6c9925b8-b248-45ef-bb8e-4b7ad98db296.png",
      "/products/6ebad741-81a7-4b18-8b40-4876879be619.png"
    ],
    description:
      "A genuine Calacatta marble top meets a powder-coated brass base in this exquisite coffee table. Each piece is unique due to natural stone variations.",
    features: [
      "Genuine Calacatta marble top",
      "Powder-coated brass base",
      "Felt feet to protect flooring",
      "Each piece uniquely veined",
      "Sealed for stain resistance",
    ],
    specs: {
      Dimensions: "120cm × 65cm × 42cm",
      Weight: "48kg",
      Material: "Calacatta Marble, Brass",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "trending",
  },

  // Electronics
  {
    id: "e001",
    name: "Lumina 4K OLED TV 65\"",
    category: "electronics",
    subcategory: "TVs",
    price: 276999,
    originalPrice: 352999,
    rating: 4.9,
    reviewCount: 589,
    images: [
      "/products/7a2daaef-661d-4a51-be65-0ed6275fd765.png",
      "/products/7fa48b5e-5d0e-4d89-b2d8-362c51acd29d.png"
    ],
    description:
      "Experience cinema in your living room with the Lumina 65\" 4K OLED TV. With self-illuminating pixels, infinite contrast ratios, and Dolby Vision IQ, every frame is breathtaking.",
    features: [
      "4K OLED self-illuminating display",
      "120Hz refresh rate",
      "Dolby Vision IQ + HDR10+",
      "AI-powered picture upscaling",
      "Built-in Google TV",
      "6 HDMI 2.1 ports",
    ],
    specs: {
      "Screen Size": "65 inches",
      Resolution: "3840 × 2160 (4K)",
      "Refresh Rate": "120Hz",
      "Panel Type": "OLED",
      "Smart Platform": "Google TV",
      Connectivity: "WiFi 6, Bluetooth 5.0",
    },
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "e002",
    name: "SoundArc Pro Soundbar",
    category: "electronics",
    subcategory: "Audio",
    price: 75999,
    originalPrice: 100999,
    rating: 4.8,
    reviewCount: 342,
    images: [
      "/products/88883b53-ffb6-4b79-9cd7-987b4c11ae9b.png",
      "/products/a61287c1-3751-4150-9d4f-ae50b6dd19c1.png"
    ],
    description:
      "The SoundArc Pro delivers immersive 7.1.4 Dolby Atmos sound from a single sleek bar. 15 high-performance drivers create a 360° soundstage that fills any room.",
    features: [
      "7.1.4 Dolby Atmos + DTS:X",
      "15 premium drivers",
      "Wireless subwoofer included",
      "Room calibration technology",
      "HDMI eARC, optical, USB inputs",
      "Spotify Connect built-in",
    ],
    specs: {
      "Output Power": "600W total",
      Channels: "7.1.4",
      Dimensions: "130cm × 8cm × 12cm",
      Connectivity: "WiFi, Bluetooth 5.2, HDMI eARC",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "sale",
  },
  {
    id: "e003",
    name: "AirPure Smart Air Purifier",
    category: "electronics",
    subcategory: "Home Appliances",
    price: 37999,
    rating: 4.7,
    reviewCount: 218,
    images: [
      "/products/ad60d63a-51e7-463b-a121-a7624d03d084.png",
      "/products/bc6c9730-9674-4754-a3a3-6477894af8b4.png"
    ],
    description:
      "The AirPure Smart cleans rooms up to 100m² in under 20 minutes. Its 6-stage filtration system removes 99.97% of pollutants while the sleek cylindrical design complements any interior.",
    features: [
      "6-stage HEPA + activated carbon filtration",
      "Covers up to 100m²",
      "Real-time AQI display",
      "Ultra-quiet (18dB) night mode",
      "App control + voice assistant support",
      "Auto mode with PM2.5 sensor",
    ],
    specs: {
      "Coverage Area": "Up to 100m²",
      "CADR Rating": "680 m³/h",
      "Noise Level": "18–52dB",
      Connectivity: "WiFi, Bluetooth",
      Power: "75W",
      Warranty: "3 Years",
    },
    inStock: true,
    badge: "new",
  },
  {
    id: "e004",
    name: "ChronoLight Smart Lamp",
    category: "electronics",
    subcategory: "Lighting",
    price: 24999,
    originalPrice: 33999,
    rating: 4.6,
    reviewCount: 167,
    images: [
      "/products/d164c57a-3e1b-40ae-864e-3ffc14b2a41c.png",
      "/products/d8bb49c5-ed75-42e8-8cc6-9cc2863e5d8f.png"
    ],
    description:
      "The ChronoLight adapts its color temperature throughout the day to support your natural circadian rhythm. From warm morning light to energizing daylight to calming evening hues.",
    features: [
      "Circadian rhythm lighting presets",
      "16 million color options",
      "Touch + app + voice control",
      "Wireless charging base",
      "Memory function for schedules",
      "Energy-saving LED (2700K–6500K)",
    ],
    specs: {
      "Lumen Output": "1200 lm",
      "Color Temperature": "2700K–6500K",
      Power: "15W LED",
      Connectivity: "WiFi, Bluetooth, Zigbee",
      Warranty: "3 Years",
    },
    inStock: true,
    badge: "trending",
  },
  {
    id: "e005",
    name: "NestHub Smart Display 10\"",
    category: "electronics",
    subcategory: "Smart Home",
    price: 27999,
    rating: 4.7,
    reviewCount: 294,
    images: [
      "/products/fbbf6e2b-d8bb-444b-96e6-0d6ae353c9ae.png",
      "/products/koMyzFQkPQzP6IUbr2y34E4E0R_Yulk48SfvudxLLqk4vkc5iPNd84djUrrvKpWyj3APAnDICDoRzH5QMtTzTlb5jlbR2k9yaeQHefAAMnbhoHnCsr0YsaJiQ0J556mm6BWT9Pev2QOuZnbBp2HNo850QaIx5KdiL7zLYV9Gc2fpHoreaBRwxCPpTmp6_C0p.jpg"
    ],
    description:
      "Control your entire smart home from one beautiful 10\" display. The NestHub features a high-resolution touchscreen, built-in AI assistant, and seamless integration with 1000+ smart home devices.",
    features: [
      "10\" Full HD IPS touchscreen",
      "Built-in AI smart assistant",
      "Controls 1000+ smart home devices",
      "8MP camera with privacy shutter",
      "Stereo speakers with deep bass",
      "Photo frame mode",
    ],
    specs: {
      "Display Size": "10 inches",
      Resolution: "1920 × 1200",
      Camera: "8MP with autofocus",
      Connectivity: "WiFi 6, Bluetooth 5.0, Zigbee, Z-Wave",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "new",
  },
  {
    id: "e006",
    name: "FrostGuard Smart Refrigerator",
    category: "electronics",
    subcategory: "Home Appliances",
    price: 184999,
    originalPrice: 234999,
    rating: 4.8,
    reviewCount: 412,
    images: [
      "/products/lVh_4C_KZRSKREFM47TiaOjeOU9Axq5rEfE_cP2_Rb-vjEs3hRkNIgSoEAFeFDPqExS9ea8uch3NixFgP3lXCZWHqgT-bbjMEOMKmCCmvS5fwL2SRfn6BV26M7VoIose0VEzzlY_ivc3mXXWHtE2BzfwfryjNmfG9Qi-hV6YL1xaP2FIuThdKC366J8RUD_c.jpg",
      "/products/nmrqd7vw6nktqjf6Yl9d_kZcSRHUElxnxs3jAE7RHdHXyA4wre6iD5SHL8mpqeQK1LuszwZbSIh20vMCWdMywHveY02-OY9ZcuZYzaDlXqFsjFA5EiJ2zaLk-o7OQsh6msM-TkNOt7BtNsz5TCLOHJIgXsnGkALkm7WLwqLXwwCXzXZLpQo_S7t_7MAphInC.jpg"
    ],
    description:
      "The FrostGuard Smart Refrigerator features a 32\" internal touchscreen, AI-powered freshness monitoring, and transparent door technology. It suggests recipes based on your groceries automatically.",
    features: [
      "32\" internal touchscreen display",
      "AI freshness monitoring",
      "Transparent door technology",
      "Recipe suggestions from content",
      "Smart inventory tracking",
      "Energy Star certified",
    ],
    specs: {
      Capacity: "636 liters",
      "Energy Class": "A+++",
      Dimensions: "90cm × 170cm × 70cm",
      Connectivity: "WiFi, App control",
      Compressor: "Inverter Linear",
      Warranty: "5 Years",
    },
    inStock: true,
    badge: "sale",
  },

  // Office Tables
  {
    id: "f-ot001",
    name: "Executive Manager Desk",
    category: "furniture",
    subcategory: "Office Tables",
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewCount: 64,
    images: [
      "/products/PPu0dey6wAtdICRdrgc_UzWvG4tskpYi1A8Wyw_3_AwDWT5f2M5yTvdu9w1cZ0L5e3XPaVwF5mVnfpO4PevAEOI3LaXf8UJyKyssXFO9iiWO_zbgfyJS5Y_AV5Ng5fP08pnHB5U8okHimftyB3lw0DYm5STOdbZnHpzzJH84Rc-d8m2hOb0Fg2k1ohQnYyNb.jpg",
      "/products/XMGWKrJdPgQsiHkXVcrfXKLeBnt2EGhlnL0W8xnTmg5RPrmEq8gsidN6U4O3tMa4WmrTPE4bgVacRFR_8l-Va7M-EZhNi-xFrU-TIW_wTgIs0JaoVeMCkZxiJo4B6UfR9WrJWUIfQLF7kSi9ctj22I96_RQxj208mFJ6YZeAfSo_IXQfm3H12JIAJdChtSsV.jpg"
    ],
    description:
      "A solid teak wood executive desk designed for corporate offices and home offices. Features a smooth laminate top, built-in cable management, and spacious drawer units. Ideal for managers and senior professionals.",
    features: [
      "Solid teak wood construction",
      "Built-in cable management tray",
      "3 lockable drawers",
      "Anti-scratch laminate top",
      "Available with matching chair",
    ],
    specs: {
      Dimensions: "160cm × 75cm × 75cm",
      Material: "Solid Teak, Laminate",
      Drawers: "3 lockable",
      Finish: "Walnut veneer",
      Warranty: "3 Years",
    },
    inStock: true,
    badge: "bestseller",
    materials: ["Teak Wood", "Laminate"],
  },
  {
    id: "f-ot002",
    name: "Student Study Table",
    category: "furniture",
    subcategory: "Office Tables",
    price: 545999,
    originalPrice: 671999,
    rating: 4.6,
    reviewCount: 112,
    images: [
      "/products/15fb46c1-d2e2-4967-a46e-9f39bed0f53a.png",
      "/products/161e2c7a-5d0a-4a62-9917-7308eae1c628.png"
    ],
    description:
      "A compact and sturdy wooden study table perfect for students and home offices. Features a bookshelf on the side, a spacious surface, and a smooth finish. Great for Chennai and South Indian home setups.",
    features: [
      "Side bookshelf unit",
      "Smooth laminate surface",
      "Compact design for small rooms",
      "Easy assembly",
      "Scratch resistant top",
    ],
    specs: {
      Dimensions: "120cm × 60cm × 75cm",
      Material: "Engineered Wood, Laminate",
      Shelf: "3-tier side bookshelf",
      Finish: "Matte white / Wenge",
      Warranty: "1 Year",
    },
    inStock: true,
    badge: "new",
    materials: ["Engineered Wood"],
  },

  // Wooden Chairs
  {
    id: "f-wc001",
    name: "Carved Teak Dining Chair",
    category: "furniture",
    subcategory: "Wooden Chairs",
    price: 352999,
    originalPrice: 461999,
    rating: 4.7,
    reviewCount: 89,
    images: [
      "/products/208771d3-c938-4d68-9380-090f215bc1fd.png",
      "/products/27f402be-f305-4fba-98a1-be7ca3ffc517.png"
    ],
    description:
      "A classically carved solid teak dining chair with a cushioned seat. Handcrafted by skilled artisans, this chair adds a traditional Indian charm to any dining room. Sold individually or as a set of 6.",
    features: [
      "Solid teak wood frame",
      "Hand-carved backrest design",
      "Foam cushioned seat",
      "Available in sets of 4 or 6",
      "Polished with natural teak oil",
    ],
    specs: {
      Dimensions: "50cm × 55cm × 95cm",
      "Seat Height": "45cm",
      Weight: "8kg",
      Material: "Solid Teak Wood",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "trending",
    materials: ["Teak Wood"],
  },
  {
    id: "f-wc002",
    name: "Sheesham Wood Accent Chair",
    category: "furniture",
    subcategory: "Wooden Chairs",
    price: 654999,
    originalPrice: 797999,
    rating: 4.9,
    reviewCount: 57,
    images: [
      "/products/2d601aba-1862-461d-8371-ca2feb92d8d5.png",
      "/products/2e306e3c-5ad3-477e-8390-cf5a9acf3959.png"
    ],
    description:
      "A premium sheesham (Indian rosewood) accent chair with a woven cane back and upholstered seat. Combines traditional Indian craftsmanship with a modern silhouette — perfect for living rooms, reading corners, and home offices.",
    features: [
      "Sheesham (rosewood) solid frame",
      "Woven cane backrest",
      "Foam + fabric upholstered seat",
      "Non-slip rubber feet",
      "Durable natural polish finish",
    ],
    specs: {
      Dimensions: "60cm × 65cm × 90cm",
      "Seat Height": "46cm",
      Weight: "10kg",
      Material: "Sheesham Wood, Cane, Fabric",
      Warranty: "2 Years",
    },
    inStock: true,
    badge: "new",
    materials: ["Sheesham Wood", "Cane"],
  },

  // ===== 30 NEW PRODUCTS =====

  // Sofas
  { id: "f010", name: "Royal L-Shaped Sofa", category: "furniture", subcategory: "Sofas", price: 38000, originalPrice: 46000, rating: 4.7, reviewCount: 134, images: [
      "/products/374617d7-5eeb-4a51-b7cd-3ef58db33b61.png",
      "/products/38df4d5f-569e-45ae-ad7c-b44b7feb0376.png"
    ], description: "Spacious L-shaped sofa in premium velvet with solid wood legs. Perfect for large Indian living rooms and joint family setups.", features: ["Premium velvet upholstery", "Solid sheesham wood legs", "Deep seat cushions", "Easy-clean fabric", "Modular sections"], specs: { Dimensions: "300cm × 200cm × 85cm", Material: "Velvet, Sheesham", Warranty: "3 Years" }, inStock: true, badge: "bestseller", colors: ["Royal Blue", "Moss Green", "Beige"] },

  { id: "f011", name: "Compact 2-Seater Loveseat", category: "furniture", subcategory: "Sofas", price: 14500, originalPrice: 18000, rating: 4.5, reviewCount: 87, images: [
      "/products/4ac52a83-4cef-44db-81b0-84f809f5dcf2.png",
      "/products/4bc13860-edec-4caf-8ea5-8c6c1f057f73.png"
    ], description: "A cozy 2-seater sofa perfect for small apartments and studio homes. Upholstered in durable fabric with foam-filled cushions.", features: ["Space-saving design", "Foam-filled cushions", "Fabric upholstery", "Wooden frame", "Multiple colours"], specs: { Dimensions: "150cm × 80cm × 80cm", Material: "Fabric, Wood", Warranty: "2 Years" }, inStock: true, badge: "new", colors: ["Charcoal", "Cream", "Dusty Rose"] },

  // Bedroom
  { id: "f012", name: "Teak King Size Bed", category: "furniture", subcategory: "Bedroom", price: 32000, originalPrice: 40000, rating: 4.9, reviewCount: 203, images: [
      "/products/6c9925b8-b248-45ef-bb8e-4b7ad98db296.png",
      "/products/6ebad741-81a7-4b18-8b40-4876879be619.png"
    ], description: "A majestic king-size bed crafted from solid teak with a hand-carved headboard. Built for decades of use in Indian homes.", features: ["Solid teak construction", "Hand-carved headboard", "Box storage base", "Anti-termite treatment", "Glossy polish finish"], specs: { Dimensions: "200cm × 180cm × 110cm", Material: "Solid Teak", "Storage": "Box type", Warranty: "5 Years" }, inStock: true, badge: "bestseller" },

  { id: "f013", name: "Single Cot with Drawers", category: "furniture", subcategory: "Bedroom", price: 797999, originalPrice: 12000, rating: 4.6, reviewCount: 91, images: [
      "/products/7a2daaef-661d-4a51-be65-0ed6275fd765.png",
      "/products/7fa48b5e-5d0e-4d89-b2d8-362c51acd29d.png"
    ], description: "A sturdy single cot with 2 under-bed drawers for storage. Ideal for children's rooms, hostels, and compact bedrooms.", features: ["2 under-bed drawers", "Engineered wood frame", "Anti-scratch laminate", "Easy assembly", "Compact design"], specs: { Dimensions: "200cm × 90cm × 80cm", Material: "Engineered Wood", Warranty: "2 Years" }, inStock: true, badge: "new" },

  { id: "f014", name: "Dressing Table with Mirror", category: "furniture", subcategory: "Bedroom", price: 11000, originalPrice: 14000, rating: 4.7, reviewCount: 78, images: [
      "/products/88883b53-ffb6-4b79-9cd7-987b4c11ae9b.png",
      "/products/a61287c1-3751-4150-9d4f-ae50b6dd19c1.png"
    ], description: "An elegant dressing table with a large framed mirror, 3 drawers, and a cushioned stool. A staple for Indian bedrooms.", features: ["Large framed mirror", "3 storage drawers", "Cushioned stool included", "Solid wood frame", "Premium laminate finish"], specs: { Dimensions: "120cm × 45cm × 150cm", Material: "MDF, Laminate", Mirror: "Full-length framed", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  // Dining
  { id: "f015", name: "6-Seater Sheesham Dining Set", category: "furniture", subcategory: "Dining", price: 28000, originalPrice: 34000, rating: 4.8, reviewCount: 115, images: [
      "/products/ad60d63a-51e7-463b-a121-a7624d03d084.png",
      "/products/bc6c9730-9674-4754-a3a3-6477894af8b4.png"
    ], description: "A complete 6-seater dining set in solid sheesham wood. Includes table and 6 cushioned chairs, perfect for Indian families.", features: ["Solid sheesham wood", "6 cushioned chairs", "Scratch-resistant top", "Natural oil finish", "Easy to clean"], specs: { Dimensions: "180cm × 90cm × 75cm", Seats: "6 people", Material: "Sheesham Wood", Warranty: "3 Years" }, inStock: true, badge: "bestseller" },

  { id: "f016", name: "Folding Dining Table", category: "furniture", subcategory: "Dining", price: 654999, originalPrice: 797999, rating: 4.4, reviewCount: 62, images: [
      "/products/d164c57a-3e1b-40ae-864e-3ffc14b2a41c.png",
      "/products/d8bb49c5-ed75-42e8-8cc6-9cc2863e5d8f.png"
    ], description: "A space-saving folding dining table ideal for small homes and apartments. Seats 4 comfortably, folds flat for storage.", features: ["Foldable design", "Seats 4 people", "Durable laminate top", "Steel folding legs", "Lightweight & portable"], specs: { Dimensions: "120cm × 75cm × 75cm", Seats: "4 people", Material: "MDF, Steel", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Wardrobes & Storage
  { id: "f017", name: "3-Door Sliding Wardrobe", category: "furniture", subcategory: "Storage", price: 24000, originalPrice: 30000, rating: 4.7, reviewCount: 99, images: [
      "/products/fbbf6e2b-d8bb-444b-96e6-0d6ae353c9ae.png",
      "/products/koMyzFQkPQzP6IUbr2y34E4E0R_Yulk48SfvudxLLqk4vkc5iPNd84djUrrvKpWyj3APAnDICDoRzH5QMtTzTlb5jlbR2k9yaeQHefAAMnbhoHnCsr0YsaJiQ0J556mm6BWT9Pev2QOuZnbBp2HNo850QaIx5KdiL7zLYV9Gc2fpHoreaBRwxCPpTmp6_C0p.jpg"
    ], description: "A modern 3-door sliding wardrobe with mirror panels, multiple shelves, and a hanging section. Maximises bedroom space.", features: ["3 sliding mirror doors", "8 shelves", "Hanging rail", "Soft-close runners", "Anti-tip safety fittings"], specs: { Dimensions: "180cm × 60cm × 210cm", Doors: "3 sliding mirror", Material: "Engineered Wood", Warranty: "3 Years" }, inStock: true, badge: "trending" },

  { id: "f018", name: "Wooden TV Unit", category: "furniture", subcategory: "Storage", price: 12500, originalPrice: 16000, rating: 4.6, reviewCount: 143, images: [
      "/products/lVh_4C_KZRSKREFM47TiaOjeOU9Axq5rEfE_cP2_Rb-vjEs3hRkNIgSoEAFeFDPqExS9ea8uch3NixFgP3lXCZWHqgT-bbjMEOMKmCCmvS5fwL2SRfn6BV26M7VoIose0VEzzlY_ivc3mXXWHtE2BzfwfryjNmfG9Qi-hV6YL1xaP2FIuThdKC366J8RUD_c.jpg",
      "/products/nmrqd7vw6nktqjf6Yl9d_kZcSRHUElxnxs3jAE7RHdHXyA4wre6iD5SHL8mpqeQK1LuszwZbSIh20vMCWdMywHveY02-OY9ZcuZYzaDlXqFsjFA5EiJ2zaLk-o7OQsh6msM-TkNOt7BtNsz5TCLOHJIgXsnGkALkm7WLwqLXwwCXzXZLpQo_S7t_7MAphInC.jpg"
    ], description: "A stylish wall-mounted TV unit in walnut finish with open shelves and closed cabinets. Fits TVs up to 65 inches.", features: ["Walnut laminate finish", "2 closed cabinets", "Open display shelves", "Cable management holes", "Wall-mount brackets included"], specs: { Dimensions: "180cm × 40cm × 50cm", "TV Size": "Up to 65\"", Material: "MDF, Walnut Laminate", Warranty: "2 Years" }, inStock: true, badge: "new" },

  { id: "f019", name: "5-Tier Bookshelf", category: "furniture", subcategory: "Storage", price: 461999, originalPrice: 587999, rating: 4.5, reviewCount: 56, images: [
      "/products/PPu0dey6wAtdICRdrgc_UzWvG4tskpYi1A8Wyw_3_AwDWT5f2M5yTvdu9w1cZ0L5e3XPaVwF5mVnfpO4PevAEOI3LaXf8UJyKyssXFO9iiWO_zbgfyJS5Y_AV5Ng5fP08pnHB5U8okHimftyB3lw0DYm5STOdbZnHpzzJH84Rc-d8m2hOb0Fg2k1ohQnYyNb.jpg",
      "/products/XMGWKrJdPgQsiHkXVcrfXKLeBnt2EGhlnL0W8xnTmg5RPrmEq8gsidN6U4O3tMa4WmrTPE4bgVacRFR_8l-Va7M-EZhNi-xFrU-TIW_wTgIs0JaoVeMCkZxiJo4B6UfR9WrJWUIfQLF7kSi9ctj22I96_RQxj208mFJ6YZeAfSo_IXQfm3H12JIAJdChtSsV.jpg"
    ], description: "A tall 5-tier wooden bookshelf for living rooms, offices, and study rooms. Holds books, décor, and display items.", features: ["5 adjustable shelves", "Solid wood sides", "Anti-tip wall anchor", "Matte finish", "Easy DIY assembly"], specs: { Dimensions: "90cm × 30cm × 180cm", Shelves: "5", Material: "Engineered Wood", Warranty: "1 Year" }, inStock: true },

  // Tables
  { id: "f020", name: "Marble-Top Centre Table", category: "furniture", subcategory: "Tables", price: 15000, originalPrice: 19000, rating: 4.8, reviewCount: 77, images: [
      "/products/15fb46c1-d2e2-4967-a46e-9f39bed0f53a.png",
      "/products/161e2c7a-5d0a-4a62-9917-7308eae1c628.png"
    ], description: "A premium marble-top centre/coffee table with brass-finish metal legs. Adds a luxurious touch to any living room.", features: ["Natural marble top", "Brass-finish legs", "Lower shelf", "Scratch resistant", "Easy to clean"], specs: { Dimensions: "120cm × 60cm × 45cm", Top: "Natural marble", Legs: "Powder-coated steel", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  { id: "f021", name: "Nested Side Tables (Set of 3)", category: "furniture", subcategory: "Tables", price: 520999, originalPrice: 671999, rating: 4.6, reviewCount: 44, images: [
      "/products/208771d3-c938-4d68-9380-090f215bc1fd.png",
      "/products/27f402be-f305-4fba-98a1-be7ca3ffc517.png"
    ], description: "A set of 3 nesting side tables in teak finish. Can be used together or separately for flexible living room arrangements.", features: ["Set of 3 tables", "Nesting design saves space", "Teak wood finish", "Round corners", "Lightweight"], specs: { Dimensions: "45/40/35cm diameter", Material: "MDF, Teak Veneer", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Chairs
  { id: "f022", name: "Rattan Cane Arm Chair", category: "furniture", subcategory: "Chairs", price: 713999, originalPrice: 10500, rating: 4.7, reviewCount: 68, images: [
      "/products/2d601aba-1862-461d-8371-ca2feb92d8d5.png",
      "/products/2e306e3c-5ad3-477e-8390-cf5a9acf3959.png"
    ], description: "A handwoven rattan cane armchair with a cushioned seat. Adds a natural, ethnic charm to living rooms and verandahs.", features: ["Hand-woven rattan", "Cushioned fabric seat", "Solid wood frame", "Lightweight", "Indoor & outdoor use"], specs: { Dimensions: "65cm × 70cm × 90cm", Material: "Rattan, Teak", Warranty: "1 Year" }, inStock: true, badge: "trending" },

  { id: "f023", name: "Folding Wooden Chair", category: "furniture", subcategory: "Chairs", price: 234999, originalPrice: 293999, rating: 4.3, reviewCount: 112, images: [
      "/products/374617d7-5eeb-4a51-b7cd-3ef58db33b61.png",
      "/products/38df4d5f-569e-45ae-ad7c-b44b7feb0376.png"
    ], description: "A simple and sturdy folding wooden chair ideal for extra seating during functions, offices, and dining rooms.", features: ["Foldable design", "Solid wood", "Non-slip feet", "Lightweight", "Easy storage"], specs: { Dimensions: "45cm × 45cm × 85cm", Weight: "4kg", Material: "Solid Wood", Warranty: "1 Year" }, inStock: true },

  // Office Tables (more)
  { id: "f024", name: "L-Shaped Office Desk", category: "furniture", subcategory: "Office Tables", price: 22000, originalPrice: 27000, rating: 4.8, reviewCount: 55, images: [
      "/products/4ac52a83-4cef-44db-81b0-84f809f5dcf2.png",
      "/products/4bc13860-edec-4caf-8ea5-8c6c1f057f73.png"
    ], description: "A large L-shaped office desk perfect for dual monitor setups and home offices. Features a cable tray and 4 drawers.", features: ["L-shaped design", "4 lockable drawers", "Cable management tray", "Anti-scratch surface", "Sturdy metal legs"], specs: { Dimensions: "160cm × 140cm × 75cm", Material: "MDF, Steel", Drawers: "4", Warranty: "3 Years" }, inStock: true, badge: "bestseller" },

  // Wooden Chairs (more)
  { id: "f025", name: "Rosewood Rocking Chair", category: "furniture", subcategory: "Wooden Chairs", price: 13500, originalPrice: 17000, rating: 4.9, reviewCount: 39, images: [
      "/products/6c9925b8-b248-45ef-bb8e-4b7ad98db296.png",
      "/products/6ebad741-81a7-4b18-8b40-4876879be619.png"
    ], description: "A classic rosewood rocking chair with a woven cane seat. Perfect for elders and reading corners in Indian homes.", features: ["Solid rosewood", "Woven cane seat & back", "Smooth rocking motion", "Handcrafted", "Natural polish"], specs: { Dimensions: "60cm × 90cm × 100cm", Material: "Rosewood, Cane", Warranty: "3 Years" }, inStock: true, badge: "trending" },

  // Electronics — TVs
  { id: "e010", name: "55\" 4K QLED Smart TV", category: "electronics", subcategory: "TVs", price: 52000, originalPrice: 68000, rating: 4.8, reviewCount: 189, images: [
      "/products/7a2daaef-661d-4a51-be65-0ed6275fd765.png",
      "/products/7fa48b5e-5d0e-4d89-b2d8-362c51acd29d.png"
    ], description: "A stunning 55-inch 4K QLED Smart TV with Dolby Vision, built-in Android, and voice control. Transforms any living room.", features: ["4K QLED display", "Dolby Vision & Atmos", "Android 13 built-in", "Voice remote", "Multiple HDMI ports"], specs: { "Screen Size": "55 inches", Resolution: "4K UHD", OS: "Android 13", HDMI: "3 ports", Warranty: "2 Years" }, inStock: true, badge: "bestseller" },

  { id: "e011", name: "32\" HD LED TV", category: "electronics", subcategory: "TVs", price: 16500, originalPrice: 20000, rating: 4.5, reviewCount: 231, images: [
      "/products/88883b53-ffb6-4b79-9cd7-987b4c11ae9b.png",
      "/products/a61287c1-3751-4150-9d4f-ae50b6dd19c1.png"
    ], description: "An affordable 32-inch HD LED TV with built-in Wi-Fi and streaming apps. Perfect for bedrooms and kitchens.", features: ["HD LED display", "Built-in Wi-Fi", "Netflix & YouTube", "2 HDMI ports", "Energy efficient"], specs: { "Screen Size": "32 inches", Resolution: "HD Ready", Connectivity: "Wi-Fi, Bluetooth", Warranty: "2 Years" }, inStock: true, badge: "sale" },

  // Audio
  { id: "e012", name: "5.1 Home Theatre System", category: "electronics", subcategory: "Audio", price: 18000, originalPrice: 24000, rating: 4.7, reviewCount: 88, images: [
      "/products/ad60d63a-51e7-463b-a121-a7624d03d084.png",
      "/products/bc6c9730-9674-4754-a3a3-6477894af8b4.png"
    ], description: "A powerful 5.1 channel home theatre system with 120W output, Bluetooth, and HDMI ARC. Perfect for movie nights.", features: ["120W total output", "5.1 channel surround", "HDMI ARC", "Bluetooth & USB", "Remote control"], specs: { Power: "120W RMS", Channels: "5.1", Connectivity: "HDMI, Bluetooth, USB", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  { id: "e013", name: "Portable Bluetooth Speaker", category: "electronics", subcategory: "Audio", price: 268999, originalPrice: 377999, rating: 4.6, reviewCount: 302, images: [
      "/products/d164c57a-3e1b-40ae-864e-3ffc14b2a41c.png",
      "/products/d8bb49c5-ed75-42e8-8cc6-9cc2863e5d8f.png"
    ], description: "A compact waterproof Bluetooth speaker with 12-hour battery life and rich bass. Ideal for home, travel, and outdoors.", features: ["IPX7 waterproof", "12-hour battery", "Deep bass", "360° sound", "USB-C charging"], specs: { Battery: "12 hours", Connectivity: "Bluetooth 5.3", Rating: "IPX7", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Lighting
  { id: "e014", name: "LED Ceiling Fan with Light", category: "electronics", subcategory: "Lighting", price: 402999, originalPrice: 520999, rating: 4.7, reviewCount: 176, images: [
      "/products/fbbf6e2b-d8bb-444b-96e6-0d6ae353c9ae.png",
      "/products/koMyzFQkPQzP6IUbr2y34E4E0R_Yulk48SfvudxLLqk4vkc5iPNd84djUrrvKpWyj3APAnDICDoRzH5QMtTzTlb5jlbR2k9yaeQHefAAMnbhoHnCsr0YsaJiQ0J556mm6BWT9Pev2QOuZnbBp2HNo850QaIx5KdiL7zLYV9Gc2fpHoreaBRwxCPpTmp6_C0p.jpg"
    ], description: "A modern ceiling fan with integrated LED light, remote control, and 3-speed settings. Energy-efficient and stylish.", features: ["Integrated LED light", "Remote control", "3-speed settings", "Energy-saving motor", "Sleek design"], specs: { Power: "50W fan + 24W light", Sweep: "1200mm", Speeds: "3", Control: "Remote", Warranty: "2 Years" }, inStock: true, badge: "bestseller" },

  { id: "e015", name: "Smart LED Strip Lights (5m)", category: "electronics", subcategory: "Lighting", price: 150999, originalPrice: 209999, rating: 4.5, reviewCount: 412, images: [
      "/products/lVh_4C_KZRSKREFM47TiaOjeOU9Axq5rEfE_cP2_Rb-vjEs3hRkNIgSoEAFeFDPqExS9ea8uch3NixFgP3lXCZWHqgT-bbjMEOMKmCCmvS5fwL2SRfn6BV26M7VoIose0VEzzlY_ivc3mXXWHtE2BzfwfryjNmfG9Qi-hV6YL1xaP2FIuThdKC366J8RUD_c.jpg",
      "/products/nmrqd7vw6nktqjf6Yl9d_kZcSRHUElxnxs3jAE7RHdHXyA4wre6iD5SHL8mpqeQK1LuszwZbSIh20vMCWdMywHveY02-OY9ZcuZYzaDlXqFsjFA5EiJ2zaLk-o7OQsh6msM-TkNOt7BtNsz5TCLOHJIgXsnGkALkm7WLwqLXwwCXzXZLpQo_S7t_7MAphInC.jpg"
    ], description: "App-controlled RGB LED strip lights with 16 million colours, music sync, and voice assistant support. 5m roll.", features: ["16M colour options", "Music sync mode", "App & voice control", "Cuttable every 3 LEDs", "Self-adhesive backing"], specs: { Length: "5 metres", Control: "App, Voice", Colors: "16 million RGB", Warranty: "1 Year" }, inStock: true, badge: "trending" },

  { id: "e016", name: "Decorative Pendant Light", category: "electronics", subcategory: "Lighting", price: 293999, originalPrice: 402999, rating: 4.6, reviewCount: 58, images: [
      "/products/PPu0dey6wAtdICRdrgc_UzWvG4tskpYi1A8Wyw_3_AwDWT5f2M5yTvdu9w1cZ0L5e3XPaVwF5mVnfpO4PevAEOI3LaXf8UJyKyssXFO9iiWO_zbgfyJS5Y_AV5Ng5fP08pnHB5U8okHimftyB3lw0DYm5STOdbZnHpzzJH84Rc-d8m2hOb0Fg2k1ohQnYyNb.jpg",
      "/products/XMGWKrJdPgQsiHkXVcrfXKLeBnt2EGhlnL0W8xnTmg5RPrmEq8gsidN6U4O3tMa4WmrTPE4bgVacRFR_8l-Va7M-EZhNi-xFrU-TIW_wTgIs0JaoVeMCkZxiJo4B6UfR9WrJWUIfQLF7kSi9ctj22I96_RQxj208mFJ6YZeAfSo_IXQfm3H12JIAJdChtSsV.jpg"
    ], description: "A handcrafted metal pendant light in a geometric cage design. Perfect above dining tables and kitchen islands.", features: ["Geometric cage design", "E27 bulb compatible", "Adjustable cord length", "Matte black finish", "Easy installation"], specs: { Material: "Iron", Bulb: "E27 (not included)", "Cord Length": "Adjustable up to 150cm", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Smart Home
  { id: "e017", name: "Smart Video Doorbell", category: "electronics", subcategory: "Smart Home", price: 436999, originalPrice: 587999, rating: 4.7, reviewCount: 94, images: [
      "/products/15fb46c1-d2e2-4967-a46e-9f39bed0f53a.png",
      "/products/161e2c7a-5d0a-4a62-9917-7308eae1c628.png"
    ], description: "A Wi-Fi video doorbell with 1080p live view, motion alerts, two-way audio, and night vision. Works with Alexa & Google.", features: ["1080p live video", "Two-way audio", "Motion detection alerts", "Night vision", "Alexa & Google compatible"], specs: { Resolution: "1080p HD", Connectivity: "Wi-Fi 2.4GHz", Night: "IR night vision", Warranty: "1 Year" }, inStock: true, badge: "new" },

  { id: "e018", name: "Smart Plug (4-Pack)", category: "electronics", subcategory: "Smart Home", price: 167999, originalPrice: 234999, rating: 4.5, reviewCount: 267, images: [
      "/products/208771d3-c938-4d68-9380-090f215bc1fd.png",
      "/products/27f402be-f305-4fba-98a1-be7ca3ffc517.png"
    ], description: "App-controlled smart plugs with energy monitoring, scheduling, and voice control. Compatible with all Indian sockets.", features: ["App & voice control", "Energy monitoring", "Schedule on/off", "Overload protection", "Compact design"], specs: { Pack: "4 plugs", Connectivity: "Wi-Fi 2.4GHz", Rating: "16A", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  // Home Appliances
  { id: "e019", name: "Tower Air Cooler (50L)", category: "electronics", subcategory: "Home Appliances", price: 797999, originalPrice: 12000, rating: 4.6, reviewCount: 183, images: [
      "/products/2d601aba-1862-461d-8371-ca2feb92d8d5.png",
      "/products/2e306e3c-5ad3-477e-8390-cf5a9acf3959.png"
    ], description: "A powerful 50-litre tower air cooler with 4-way air deflection, remote control, and auto-fill. Perfect for Indian summers.", features: ["50L water tank", "4-way air deflection", "Remote control", "Auto-fill option", "Honeycomb cooling pads"], specs: { "Tank Capacity": "50 litres", Speeds: "3", Coverage: "Up to 400 sq.ft", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  { id: "e020", name: "Inverter Split AC 1.5 Ton", category: "electronics", subcategory: "Home Appliances", price: 38000, originalPrice: 46000, rating: 4.8, reviewCount: 221, images: [
      "/products/374617d7-5eeb-4a51-b7cd-3ef58db33b61.png",
      "/products/38df4d5f-569e-45ae-ad7c-b44b7feb0376.png"
    ], description: "A 5-star rated 1.5-ton inverter split AC with auto-clean, Wi-Fi control, and turbo cool mode. Energy efficient for Indian summers.", features: ["5-star energy rating", "Wi-Fi & app control", "Auto-clean function", "Turbo cool mode", "PM 2.5 air filter"], specs: { Capacity: "1.5 Ton", "Star Rating": "5 Star", Refrigerant: "R32", Warranty: "5 Years compressor" }, inStock: true, badge: "bestseller" },

  { id: "e021", name: "Washing Machine 7kg Front Load", category: "electronics", subcategory: "Home Appliances", price: 29000, originalPrice: 36000, rating: 4.7, reviewCount: 148, images: [
      "/products/4ac52a83-4cef-44db-81b0-84f809f5dcf2.png",
      "/products/4bc13860-edec-4caf-8ea5-8c6c1f057f73.png"
    ], description: "A fully automatic front-load washing machine with 15 wash programs, steam wash, and in-built heater. Built for Indian fabrics.", features: ["15 wash programs", "Steam wash", "In-built heater", "Child lock", "Quick wash 15 min"], specs: { Capacity: "7 kg", Type: "Front Load", Programs: "15", Warranty: "10 Years motor" }, inStock: true, badge: "sale" },

  { id: "e022", name: "Induction Cooktop 2000W", category: "electronics", subcategory: "Home Appliances", price: 268999, originalPrice: 377999, rating: 4.6, reviewCount: 389, images: [
      "/products/6c9925b8-b248-45ef-bb8e-4b7ad98db296.png",
      "/products/6ebad741-81a7-4b18-8b40-4876879be619.png"
    ], description: "A 2000W induction cooktop with 8 preset cooking modes, digital display, and auto-shutoff. Ideal for Indian cooking.", features: ["2000W power", "8 preset modes", "Digital display", "Auto shut-off", "Child lock"], specs: { Power: "2000W", Modes: "8 preset", Voltage: "220V", Warranty: "2 Years" }, inStock: true, badge: "new" },

  { id: "e023", name: "Mixer Grinder 750W (3 Jars)", category: "electronics", subcategory: "Home Appliances", price: 318999, originalPrice: 419999, rating: 4.7, reviewCount: 512, images: [
      "/products/7a2daaef-661d-4a51-be65-0ed6275fd765.png",
      "/products/7fa48b5e-5d0e-4d89-b2d8-362c51acd29d.png"
    ], description: "A heavy-duty 750W mixer grinder with 3 stainless steel jars. Perfect for South Indian cooking — idli batter, chutneys, and masala.", features: ["750W copper motor", "3 SS jars", "Overload protection", "4-speed control", "Centrifugal juicer"], specs: { Power: "750W", Jars: "3 (1.5L, 1L, 0.4L)", Speeds: "4 + pulse", Warranty: "2 Years" }, inStock: true, badge: "bestseller" },

  { id: "e024", name: "Electric Ceiling Fan 1200mm", category: "electronics", subcategory: "Home Appliances", price: 184999, originalPrice: 251999, rating: 4.5, reviewCount: 644, images: [
      "/products/88883b53-ffb6-4b79-9cd7-987b4c11ae9b.png",
      "/products/a61287c1-3751-4150-9d4f-ae50b6dd19c1.png"
    ], description: "An energy-efficient BEE 5-star rated ceiling fan with a powerful motor and attractive design. A must-have for Indian homes.", features: ["BEE 5-star rated", "Powerful copper motor", "Anti-dust blades", "3-speed regulator", "2-year warranty"], specs: { Sweep: "1200mm", Power: "75W", Speeds: "3", Finish: "Pearl white", Warranty: "2 Years" }, inStock: true, badge: "sale" },

  // ===== CABLES & ACCESSORIES =====
  { id: "c001", name: "HDMI Cable 2.1 (2m)", category: "electronics", subcategory: "Cables & Accessories", price: 49999, originalPrice: 83999, rating: 4.7, reviewCount: 834, images: [
      "/products/ad60d63a-51e7-463b-a121-a7624d03d084.png",
      "/products/bc6c9730-9674-4754-a3a3-6477894af8b4.png"
    ], description: "A premium HDMI 2.1 cable supporting 4K@120Hz and 8K@60Hz. Ideal for TVs, gaming consoles, and monitors. Gold-plated connectors for signal clarity.", features: ["HDMI 2.1 standard", "4K@120Hz / 8K@60Hz", "eARC support", "Gold-plated connectors", "Braided nylon sleeve"], specs: { Length: "2 metres", Standard: "HDMI 2.1", Resolution: "Up to 8K", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  { id: "c002", name: "USB-C to USB-C Cable (1m)", category: "electronics", subcategory: "Cables & Accessories", price: 28999, originalPrice: 49999, rating: 4.6, reviewCount: 1203, images: [
      "/products/d164c57a-3e1b-40ae-864e-3ffc14b2a41c.png",
      "/products/d8bb49c5-ed75-42e8-8cc6-9cc2863e5d8f.png"
    ], description: "Fast-charging USB-C to USB-C cable supporting 100W PD charging and USB 3.2 data transfer. Compatible with laptops, phones, and tablets.", features: ["100W Power Delivery", "USB 3.2 Gen 2 data", "10Gbps data speed", "Braided nylon", "Universal compatibility"], specs: { Length: "1 metre", Charging: "100W PD", Data: "10Gbps", Warranty: "1 Year" }, inStock: true, badge: "new" },

  { id: "c003", name: "USB-A to Micro USB Cable (1.5m)", category: "electronics", subcategory: "Cables & Accessories", price: 16999, originalPrice: 28999, rating: 4.4, reviewCount: 2187, images: [
      "/products/fbbf6e2b-d8bb-444b-96e6-0d6ae353c9ae.png",
      "/products/koMyzFQkPQzP6IUbr2y34E4E0R_Yulk48SfvudxLLqk4vkc5iPNd84djUrrvKpWyj3APAnDICDoRzH5QMtTzTlb5jlbR2k9yaeQHefAAMnbhoHnCsr0YsaJiQ0J556mm6BWT9Pev2QOuZnbBp2HNo850QaIx5KdiL7zLYV9Gc2fpHoreaBRwxCPpTmp6_C0p.jpg"
    ], description: "Durable Micro USB charging cable compatible with older Android phones, cameras, and accessories. Tangle-free flat design.", features: ["Flat tangle-free design", "Fast charging support", "Durable TPE jacket", "Wide compatibility", "Flexible bend points"], specs: { Length: "1.5 metres", Connector: "USB-A to Micro USB", Warranty: "1 Year" }, inStock: true },

  { id: "c004", name: "3.5mm AUX Audio Cable (2m)", category: "electronics", subcategory: "Cables & Accessories", price: 20999, originalPrice: 33999, rating: 4.5, reviewCount: 678, images: [
      "/products/lVh_4C_KZRSKREFM47TiaOjeOU9Axq5rEfE_cP2_Rb-vjEs3hRkNIgSoEAFeFDPqExS9ea8uch3NixFgP3lXCZWHqgT-bbjMEOMKmCCmvS5fwL2SRfn6BV26M7VoIose0VEzzlY_ivc3mXXWHtE2BzfwfryjNmfG9Qi-hV6YL1xaP2FIuThdKC366J8RUD_c.jpg",
      "/products/nmrqd7vw6nktqjf6Yl9d_kZcSRHUElxnxs3jAE7RHdHXyA4wre6iD5SHL8mpqeQK1LuszwZbSIh20vMCWdMywHveY02-OY9ZcuZYzaDlXqFsjFA5EiJ2zaLk-o7OQsh6msM-TkNOt7BtNsz5TCLOHJIgXsnGkALkm7WLwqLXwwCXzXZLpQo_S7t_7MAphInC.jpg"
    ], description: "A 2-metre stereo AUX cable with gold-plated 3.5mm jacks. Ideal for connecting phones to car stereos, speakers, and home audio systems.", features: ["Gold-plated 3.5mm jacks", "Stereo audio", "Nylon braided jacket", "No signal loss", "Universal fit"], specs: { Length: "2 metres", Connector: "3.5mm TRS to TRS", Audio: "Stereo", Warranty: "1 Year" }, inStock: true, badge: "sale" },

  { id: "c005", name: "Ethernet LAN Cable Cat6 (5m)", category: "electronics", subcategory: "Cables & Accessories", price: 33999, originalPrice: 54999, rating: 4.8, reviewCount: 445, images: [
      "/products/PPu0dey6wAtdICRdrgc_UzWvG4tskpYi1A8Wyw_3_AwDWT5f2M5yTvdu9w1cZ0L5e3XPaVwF5mVnfpO4PevAEOI3LaXf8UJyKyssXFO9iiWO_zbgfyJS5Y_AV5Ng5fP08pnHB5U8okHimftyB3lw0DYm5STOdbZnHpzzJH84Rc-d8m2hOb0Fg2k1ohQnYyNb.jpg",
      "/products/XMGWKrJdPgQsiHkXVcrfXKLeBnt2EGhlnL0W8xnTmg5RPrmEq8gsidN6U4O3tMa4WmrTPE4bgVacRFR_8l-Va7M-EZhNi-xFrU-TIW_wTgIs0JaoVeMCkZxiJo4B6UfR9WrJWUIfQLF7kSi9ctj22I96_RQxj208mFJ6YZeAfSo_IXQfm3H12JIAJdChtSsV.jpg"
    ], description: "Cat6 Ethernet cable delivering 1Gbps network speed. Perfect for routers, smart TVs, PCs, and gaming consoles for stable wired internet.", features: ["Cat6 standard", "1Gbps speed", "RJ45 gold-plated connectors", "Foil shielded", "5 metre length"], specs: { Length: "5 metres", Standard: "Cat6", Speed: "1Gbps", Connector: "RJ45", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  { id: "c006", name: "Lightning to USB Cable (1m)", category: "electronics", subcategory: "Cables & Accessories", price: 41999, originalPrice: 66999, rating: 4.6, reviewCount: 921, images: [
      "/products/15fb46c1-d2e2-4967-a46e-9f39bed0f53a.png",
      "/products/161e2c7a-5d0a-4a62-9917-7308eae1c628.png"
    ], description: "MFi-certified Lightning to USB cable for iPhone and iPad. Supports fast charging and data sync. Durable braided design.", features: ["MFi certified", "Fast charging", "Data sync", "Braided nylon jacket", "Reinforced connectors"], specs: { Length: "1 metre", Connector: "Lightning to USB-A", Warranty: "1 Year" }, inStock: true, badge: "trending" },

  { id: "c007", name: "USB Extension Cable 3.0 (3m)", category: "electronics", subcategory: "Cables & Accessories", price: 24999, originalPrice: 41999, rating: 4.5, reviewCount: 387, images: [
      "/products/208771d3-c938-4d68-9380-090f215bc1fd.png",
      "/products/27f402be-f305-4fba-98a1-be7ca3ffc517.png"
    ], description: "A 3-metre USB 3.0 extension cable for keyboards, mice, printers, and USB hubs. Plug-and-play with all USB-A devices.", features: ["USB 3.0 speed", "3 metre reach", "Plug and play", "Stable signal", "Works with all USB-A devices"], specs: { Length: "3 metres", Standard: "USB 3.0", Speed: "5Gbps", Warranty: "1 Year" }, inStock: true, badge: "new" },

  { id: "c008", name: "4-in-1 Multi Charging Cable (1.2m)", category: "electronics", subcategory: "Cables & Accessories", price: 49999, originalPrice: 75999, rating: 4.7, reviewCount: 1456, images: [
      "/products/2d601aba-1862-461d-8371-ca2feb92d8d5.png",
      "/products/2e306e3c-5ad3-477e-8390-cf5a9acf3959.png"
    ], description: "One cable for all devices — USB-C, Micro USB, Lightning, and USB-A connectors in a single braided cable. The only cable you need.", features: ["4 connectors in 1", "USB-C + Micro + Lightning + USB-A", "Nylon braided", "Fast charge support", "Universal compatibility"], specs: { Length: "1.2 metres", Connectors: "4 types", Charging: "Fast charge", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  { id: "c009", name: "TV Coaxial Cable (3m)", category: "electronics", subcategory: "Cables & Accessories", price: 24999, originalPrice: 37999, rating: 4.4, reviewCount: 312, images: [
      "/products/374617d7-5eeb-4a51-b7cd-3ef58db33b61.png",
      "/products/38df4d5f-569e-45ae-ad7c-b44b7feb0376.png"
    ], description: "A high-quality RG6 coaxial cable for connecting DTH antennas, cable TV boxes, and satellite dishes to televisions. Noise-free signal.", features: ["RG6 coaxial standard", "Noise-free signal", "Gold-plated F-connector", "Double shielded", "3 metre length"], specs: { Length: "3 metres", Standard: "RG6", Connector: "F-Type", Warranty: "1 Year" }, inStock: true },

  { id: "c010", name: "VGA to HDMI Adapter Cable (1.8m)", category: "electronics", subcategory: "Cables & Accessories", price: 37999, originalPrice: 58999, rating: 4.5, reviewCount: 228, images: [
      "/products/4ac52a83-4cef-44db-81b0-84f809f5dcf2.png",
      "/products/4bc13860-edec-4caf-8ea5-8c6c1f057f73.png"
    ], description: "Convert VGA output from old laptops and PCs to HDMI displays. Supports 1080p video output with separate audio input. Plug-and-play.", features: ["VGA to HDMI conversion", "1080p Full HD output", "Audio input jack", "Plug and play", "Compact design"], specs: { Length: "1.8 metres", Input: "VGA + 3.5mm audio", Output: "HDMI", Resolution: "1080p", Warranty: "1 Year" }, inStock: true, badge: "new" },
];

export const testimonials = [
  {
    id: 1,
    name: "Meenakshi Sundaram",
    role: "Interior Designer, Chennai",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    text: "Suman Agency has completely changed the way I approach client projects. The Aria Cloud Sofa arrived on time, was assembled perfectly, and the build quality is outstanding. My clients in Anna Nagar were absolutely thrilled — they keep showing it off to every guest!",
  },
  {
    id: 2,
    name: "Karthikeyan Rajan",
    role: "Software Engineer, Bengaluru",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
    text: "Bought the Lumina 4K OLED TV and the SoundArc Pro soundbar together. Watching IPL and movies on this setup feels like a proper theatre experience. The picture is absolutely mind-blowing. Worth every rupee spent — no regrets at all!",
  },
  {
    id: 3,
    name: "Anitha Krishnamurthy",
    role: "Architect, Coimbatore",
    avatar: "https://i.pravatar.cc/80?img=44",
    rating: 5,
    text: "As someone who designs homes professionally, I have very high standards for furniture. Suman Agency exceeded them all. The Haven Bed Frame and the Zen Dining Table are both exceptional in finish and durability. Highly recommend to anyone wanting genuine quality.",
  },
  {
    id: 4,
    name: "Venkatesh Iyer",
    role: "Business Owner, Hyderabad",
    avatar: "https://i.pravatar.cc/80?img=53",
    rating: 4,
    text: "Ordered the Marble Coffee Table for my new flat in Banjara Hills. The packaging was excellent and delivery was faster than expected. Everyone who visits my home asks where I bought it. Suman Agency's customer support team was also very responsive and helpful.",
  },
  {
    id: 5,
    name: "Divya Subramaniam",
    role: "Doctor, Mumbai",
    avatar: "https://i.pravatar.cc/80?img=41",
    rating: 5,
    text: "The AirPure Smart Purifier is a game changer, especially during Mumbai's monsoon season when pollution is high. My son's dust allergy has improved so much since we installed it. The app is simple to use and the auto mode works perfectly through the night.",
  },
  {
    id: 6,
    name: "Suresh Balakrishnan",
    role: "Retired Professor, Madurai",
    avatar: "https://i.pravatar.cc/80?img=57",
    rating: 5,
    text: "My son gifted me the ChronoLight Smart Lamp and I was initially hesitant about smart gadgets. But this lamp is so easy to use and the warm light in the evenings is very soothing. The build quality is solid and Suman Agency's team helped me set it up patiently over the phone.",
  },
];


export const stats = [
  { label: "Happy Customers", value: 50000, suffix: "+" },
  { label: "Premium Products", value: 1200, suffix: "+" },
  { label: "Cities Served", value: 48, suffix: "" },
  { label: "Years of Excellence", value: 15, suffix: "" },
];

export const categories = {
  furniture: ["All", "Sofas", "Bedroom", "Dining", "Chairs", "Tables", "Storage", "Office Tables", "Wooden Chairs"],
  electronics: ["All", "TVs", "Audio", "Lighting", "Smart Home", "Home Appliances", "Cables & Accessories"],
};
