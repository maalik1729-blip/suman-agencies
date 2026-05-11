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
      "/products/ata_images_0132119d-bb52-489c-9c79-87b1149d0e90.jpg",
      "/products/ata_images_064f8e4c-75c5-4b7b-aa4f-b06153b74d38.jpg"
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
      "/products/ata_images_0a2bc870-3326-41d2-8acc-ca38571969e5.jpg",
      "/products/ata_images_15c6fdf6-395d-4d54-b759-773f4f55f065.jpg"
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
      "/products/ata_images_1a553fc8-9961-4ae8-ac3d-3079926141e8.jpg",
      "/products/ata_images_1af1d7cf-1f72-4a78-b515-e4e7c9fa4dbb.jpg"
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
      "/products/ata_images_1b0883eb-8d1a-44a0-8e58-00fb02ddab4e.jpg",
      "/products/ata_images_1f0fbf85-031d-42e9-9e89-e135c9768a9d.jpg"
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
      "/products/ata_images_1f2d02f0-4d1a-4610-9e11-af71df612d7e.jpg",
      "/products/ata_images_371db08c-8ec3-4f77-a765-7969b393c29c.jpg"
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
      "/products/ata_images_3a5aedb7-5344-455f-9f9d-5dc36717d02f.jpg",
      "/products/ata_images_3b6db79c-69cd-4c4d-8908-a6e7c548bd10.jpg"
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
      "/products/ata_images_3fe2968d-12d4-4764-a4d4-ce69b27cc53f.jpg",
      "/products/ata_images_42db911c-3b28-40db-b5f0-1bc23669c8f8.jpg"
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
      "/products/ata_images_473a314e-83f8-4799-9d9b-3023596fe896.jpg",
      "/products/ata_images_4a64881a-253d-4bb0-a53e-3309168454de.jpg"
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
      "/products/ata_images_4f64a51c-c636-4267-88ee-614f5a7b6396.jpg",
      "/products/ata_images_5f87bfc7-2f3e-49d5-9bea-b3e165814936.jpg"
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
      "/products/ata_images_60771f8b-de5a-4669-b3db-a8a5759a18e9.jpg",
      "/products/ata_images_618f32f1-488b-491e-b8e9-24255b40e5f8.jpg"
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
      "/products/ata_images_638819a6-173d-4693-9e3d-5f72878a740b.jpg",
      "/products/ata_images_63f9c457-889b-4e3c-b35a-a89471568c6b.jpg"
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
      "/products/ata_images_657d92c5-4135-4523-a2f8-783a43eda2c0.jpg",
      "/products/ata_images_6583edba-2daf-4565-8a09-9ae0266f661f.jpg"
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
      "/products/ata_images_6e84b6a6-d883-4011-9db8-1111b4e8caeb.jpg",
      "/products/ata_images_6ece089e-2a0a-4b48-867f-15ed6bb8f1eb.jpg"
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
      "/products/ata_images_766e5125-a0de-47ce-b095-8b7bd4260e0c.jpg",
      "/products/ata_images_76c004aa-b22e-45e4-ae23-ee0e6fc0e09d.jpg"
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
      "/products/ata_images_7791211c-1194-4f79-bbbb-b7a8153fc50f.jpg",
      "/products/ata_images_7d2edc23-0cdc-46cd-91c0-2d31b6bafdd6.jpg"
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
      "/products/ata_images_805646ec-a1a9-414f-a6e9-72fb7ad3fcf3.jpg",
      "/products/ata_images_840a79b2-4fb8-43ef-9468-d53c583bf4c1.jpg"
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
      "/products/ata_images_8af2660e-d5dd-4178-8a1d-5e5bc8cb3999.jpg",
      "/products/ata_images_9011af85-f292-4e55-aa35-90af20677830.jpg"
    ], description: "Spacious L-shaped sofa in premium velvet with solid wood legs. Perfect for large Indian living rooms and joint family setups.", features: ["Premium velvet upholstery", "Solid sheesham wood legs", "Deep seat cushions", "Easy-clean fabric", "Modular sections"], specs: { Dimensions: "300cm × 200cm × 85cm", Material: "Velvet, Sheesham", Warranty: "3 Years" }, inStock: true, badge: "bestseller", colors: ["Royal Blue", "Moss Green", "Beige"] },

  { id: "f011", name: "Compact 2-Seater Loveseat", category: "furniture", subcategory: "Sofas", price: 14500, originalPrice: 18000, rating: 4.5, reviewCount: 87, images: [
      "/products/ata_images_95051693-a23d-47f0-86cc-616f3c4f8ae1.jpg",
      "/products/ata_images_992be3eb-7d8f-46e0-a68b-884400ab6ae2.jpg"
    ], description: "A cozy 2-seater sofa perfect for small apartments and studio homes. Upholstered in durable fabric with foam-filled cushions.", features: ["Space-saving design", "Foam-filled cushions", "Fabric upholstery", "Wooden frame", "Multiple colours"], specs: { Dimensions: "150cm × 80cm × 80cm", Material: "Fabric, Wood", Warranty: "2 Years" }, inStock: true, badge: "new", colors: ["Charcoal", "Cream", "Dusty Rose"] },

  // Bedroom
  { id: "f012", name: "Teak King Size Bed", category: "furniture", subcategory: "Bedroom", price: 32000, originalPrice: 40000, rating: 4.9, reviewCount: 203, images: [
      "/products/ata_images_a783f36f-304f-4310-9cd0-4ae6c2894e78.jpg",
      "/products/ata_images_a7b6284b-d44e-4b6c-8457-6ba436594774.jpg"
    ], description: "A majestic king-size bed crafted from solid teak with a hand-carved headboard. Built for decades of use in Indian homes.", features: ["Solid teak construction", "Hand-carved headboard", "Box storage base", "Anti-termite treatment", "Glossy polish finish"], specs: { Dimensions: "200cm × 180cm × 110cm", Material: "Solid Teak", "Storage": "Box type", Warranty: "5 Years" }, inStock: true, badge: "bestseller" },

  { id: "f013", name: "Single Cot with Drawers", category: "furniture", subcategory: "Bedroom", price: 797999, originalPrice: 12000, rating: 4.6, reviewCount: 91, images: [
      "/products/ata_images_a8107166-b319-495e-aa6f-7f8f1993eedc.jpg",
      "/products/ata_images_a84817aa-beb4-4e5d-9333-68bc3b4804b8.jpg"
    ], description: "A sturdy single cot with 2 under-bed drawers for storage. Ideal for children's rooms, hostels, and compact bedrooms.", features: ["2 under-bed drawers", "Engineered wood frame", "Anti-scratch laminate", "Easy assembly", "Compact design"], specs: { Dimensions: "200cm × 90cm × 80cm", Material: "Engineered Wood", Warranty: "2 Years" }, inStock: true, badge: "new" },

  { id: "f014", name: "Dressing Table with Mirror", category: "furniture", subcategory: "Bedroom", price: 11000, originalPrice: 14000, rating: 4.7, reviewCount: 78, images: [
      "/products/ata_images_ad36fe06-f648-4bcd-bfb7-37e23509bc83.jpg",
      "/products/ata_images_b755e9a3-6e03-4a37-a0e5-defaa6f85bef.jpg"
    ], description: "An elegant dressing table with a large framed mirror, 3 drawers, and a cushioned stool. A staple for Indian bedrooms.", features: ["Large framed mirror", "3 storage drawers", "Cushioned stool included", "Solid wood frame", "Premium laminate finish"], specs: { Dimensions: "120cm × 45cm × 150cm", Material: "MDF, Laminate", Mirror: "Full-length framed", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  // Dining
  { id: "f015", name: "6-Seater Sheesham Dining Set", category: "furniture", subcategory: "Dining", price: 28000, originalPrice: 34000, rating: 4.8, reviewCount: 115, images: [
      "/products/ata_images_bb4e0319-2b7e-4cae-961b-8d9c9ac66321.jpg",
      "/products/ata_images_c205eede-9d11-4927-90bd-ce8aa2b1e0ee.jpg"
    ], description: "A complete 6-seater dining set in solid sheesham wood. Includes table and 6 cushioned chairs, perfect for Indian families.", features: ["Solid sheesham wood", "6 cushioned chairs", "Scratch-resistant top", "Natural oil finish", "Easy to clean"], specs: { Dimensions: "180cm × 90cm × 75cm", Seats: "6 people", Material: "Sheesham Wood", Warranty: "3 Years" }, inStock: true, badge: "bestseller" },

  { id: "f016", name: "Folding Dining Table", category: "furniture", subcategory: "Dining", price: 654999, originalPrice: 797999, rating: 4.4, reviewCount: 62, images: [
      "/products/ata_images_c46a8b56-0a9c-4ae6-b741-ba25c013a6f2.jpg",
      "/products/ata_images_cab02473-01ee-4d5a-a029-7d015d0ead81.jpg"
    ], description: "A space-saving folding dining table ideal for small homes and apartments. Seats 4 comfortably, folds flat for storage.", features: ["Foldable design", "Seats 4 people", "Durable laminate top", "Steel folding legs", "Lightweight & portable"], specs: { Dimensions: "120cm × 75cm × 75cm", Seats: "4 people", Material: "MDF, Steel", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Wardrobes & Storage
  { id: "f017", name: "3-Door Sliding Wardrobe", category: "furniture", subcategory: "Storage", price: 24000, originalPrice: 30000, rating: 4.7, reviewCount: 99, images: [
      "/products/ata_images_cb9f76c5-567b-4ee4-a868-5e8c93b27ec8.jpg",
      "/products/ata_images_d940a8b8-992a-45d5-84c8-6e784784061b.jpg"
    ], description: "A modern 3-door sliding wardrobe with mirror panels, multiple shelves, and a hanging section. Maximises bedroom space.", features: ["3 sliding mirror doors", "8 shelves", "Hanging rail", "Soft-close runners", "Anti-tip safety fittings"], specs: { Dimensions: "180cm × 60cm × 210cm", Doors: "3 sliding mirror", Material: "Engineered Wood", Warranty: "3 Years" }, inStock: true, badge: "trending" },

  { id: "f018", name: "Wooden TV Unit", category: "furniture", subcategory: "Storage", price: 12500, originalPrice: 16000, rating: 4.6, reviewCount: 143, images: [
      "/products/ata_images_e1874ef9-766b-4f6f-8db3-4ef55ed9a520.jpg",
      "/products/ata_images_e2250491-6f3f-4b09-ae01-eaa43db49dbe.jpg"
    ], description: "A stylish wall-mounted TV unit in walnut finish with open shelves and closed cabinets. Fits TVs up to 65 inches.", features: ["Walnut laminate finish", "2 closed cabinets", "Open display shelves", "Cable management holes", "Wall-mount brackets included"], specs: { Dimensions: "180cm × 40cm × 50cm", "TV Size": "Up to 65\"", Material: "MDF, Walnut Laminate", Warranty: "2 Years" }, inStock: true, badge: "new" },

  { id: "f019", name: "5-Tier Bookshelf", category: "furniture", subcategory: "Storage", price: 461999, originalPrice: 587999, rating: 4.5, reviewCount: 56, images: [
      "/products/ata_images_e95d25ff-749b-4ea1-ba1d-fc3c0f832f84.jpg",
      "/products/ata_images_ec4f4d4d-b11e-47a8-94f2-e356a665d2a7.jpg"
    ], description: "A tall 5-tier wooden bookshelf for living rooms, offices, and study rooms. Holds books, décor, and display items.", features: ["5 adjustable shelves", "Solid wood sides", "Anti-tip wall anchor", "Matte finish", "Easy DIY assembly"], specs: { Dimensions: "90cm × 30cm × 180cm", Shelves: "5", Material: "Engineered Wood", Warranty: "1 Year" }, inStock: true },

  // Tables
  { id: "f020", name: "Marble-Top Centre Table", category: "furniture", subcategory: "Tables", price: 15000, originalPrice: 19000, rating: 4.8, reviewCount: 77, images: [
      "/products/ata_images_fc786ca7-b875-4409-9fec-b3d350cce0e6.jpg",
      "/products/ata_images_0132119d-bb52-489c-9c79-87b1149d0e90.jpg"
    ], description: "A premium marble-top centre/coffee table with brass-finish metal legs. Adds a luxurious touch to any living room.", features: ["Natural marble top", "Brass-finish legs", "Lower shelf", "Scratch resistant", "Easy to clean"], specs: { Dimensions: "120cm × 60cm × 45cm", Top: "Natural marble", Legs: "Powder-coated steel", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  { id: "f021", name: "Nested Side Tables (Set of 3)", category: "furniture", subcategory: "Tables", price: 520999, originalPrice: 671999, rating: 4.6, reviewCount: 44, images: [
      "/products/ata_images_064f8e4c-75c5-4b7b-aa4f-b06153b74d38.jpg",
      "/products/ata_images_0a2bc870-3326-41d2-8acc-ca38571969e5.jpg"
    ], description: "A set of 3 nesting side tables in teak finish. Can be used together or separately for flexible living room arrangements.", features: ["Set of 3 tables", "Nesting design saves space", "Teak wood finish", "Round corners", "Lightweight"], specs: { Dimensions: "45/40/35cm diameter", Material: "MDF, Teak Veneer", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Chairs
  { id: "f022", name: "Rattan Cane Arm Chair", category: "furniture", subcategory: "Chairs", price: 713999, originalPrice: 10500, rating: 4.7, reviewCount: 68, images: [
      "/products/ata_images_15c6fdf6-395d-4d54-b759-773f4f55f065.jpg",
      "/products/ata_images_1a553fc8-9961-4ae8-ac3d-3079926141e8.jpg"
    ], description: "A handwoven rattan cane armchair with a cushioned seat. Adds a natural, ethnic charm to living rooms and verandahs.", features: ["Hand-woven rattan", "Cushioned fabric seat", "Solid wood frame", "Lightweight", "Indoor & outdoor use"], specs: { Dimensions: "65cm × 70cm × 90cm", Material: "Rattan, Teak", Warranty: "1 Year" }, inStock: true, badge: "trending" },

  { id: "f023", name: "Folding Wooden Chair", category: "furniture", subcategory: "Chairs", price: 234999, originalPrice: 293999, rating: 4.3, reviewCount: 112, images: [
      "/products/ata_images_1af1d7cf-1f72-4a78-b515-e4e7c9fa4dbb.jpg",
      "/products/ata_images_1b0883eb-8d1a-44a0-8e58-00fb02ddab4e.jpg"
    ], description: "A simple and sturdy folding wooden chair ideal for extra seating during functions, offices, and dining rooms.", features: ["Foldable design", "Solid wood", "Non-slip feet", "Lightweight", "Easy storage"], specs: { Dimensions: "45cm × 45cm × 85cm", Weight: "4kg", Material: "Solid Wood", Warranty: "1 Year" }, inStock: true },

  // Office Tables (more)
  { id: "f024", name: "L-Shaped Office Desk", category: "furniture", subcategory: "Office Tables", price: 22000, originalPrice: 27000, rating: 4.8, reviewCount: 55, images: [
      "/products/ata_images_1f0fbf85-031d-42e9-9e89-e135c9768a9d.jpg",
      "/products/ata_images_1f2d02f0-4d1a-4610-9e11-af71df612d7e.jpg"
    ], description: "A large L-shaped office desk perfect for dual monitor setups and home offices. Features a cable tray and 4 drawers.", features: ["L-shaped design", "4 lockable drawers", "Cable management tray", "Anti-scratch surface", "Sturdy metal legs"], specs: { Dimensions: "160cm × 140cm × 75cm", Material: "MDF, Steel", Drawers: "4", Warranty: "3 Years" }, inStock: true, badge: "bestseller" },

  // Wooden Chairs (more)
  { id: "f025", name: "Rosewood Rocking Chair", category: "furniture", subcategory: "Wooden Chairs", price: 13500, originalPrice: 17000, rating: 4.9, reviewCount: 39, images: [
      "/products/ata_images_371db08c-8ec3-4f77-a765-7969b393c29c.jpg",
      "/products/ata_images_3a5aedb7-5344-455f-9f9d-5dc36717d02f.jpg"
    ], description: "A classic rosewood rocking chair with a woven cane seat. Perfect for elders and reading corners in Indian homes.", features: ["Solid rosewood", "Woven cane seat & back", "Smooth rocking motion", "Handcrafted", "Natural polish"], specs: { Dimensions: "60cm × 90cm × 100cm", Material: "Rosewood, Cane", Warranty: "3 Years" }, inStock: true, badge: "trending" },

  // Electronics — TVs
  { id: "e010", name: "55\" 4K QLED Smart TV", category: "electronics", subcategory: "TVs", price: 52000, originalPrice: 68000, rating: 4.8, reviewCount: 189, images: [
      "/products/ata_images_3b6db79c-69cd-4c4d-8908-a6e7c548bd10.jpg",
      "/products/ata_images_3fe2968d-12d4-4764-a4d4-ce69b27cc53f.jpg"
    ], description: "A stunning 55-inch 4K QLED Smart TV with Dolby Vision, built-in Android, and voice control. Transforms any living room.", features: ["4K QLED display", "Dolby Vision & Atmos", "Android 13 built-in", "Voice remote", "Multiple HDMI ports"], specs: { "Screen Size": "55 inches", Resolution: "4K UHD", OS: "Android 13", HDMI: "3 ports", Warranty: "2 Years" }, inStock: true, badge: "bestseller" },

  { id: "e011", name: "32\" HD LED TV", category: "electronics", subcategory: "TVs", price: 16500, originalPrice: 20000, rating: 4.5, reviewCount: 231, images: [
      "/products/ata_images_42db911c-3b28-40db-b5f0-1bc23669c8f8.jpg",
      "/products/ata_images_473a314e-83f8-4799-9d9b-3023596fe896.jpg"
    ], description: "An affordable 32-inch HD LED TV with built-in Wi-Fi and streaming apps. Perfect for bedrooms and kitchens.", features: ["HD LED display", "Built-in Wi-Fi", "Netflix & YouTube", "2 HDMI ports", "Energy efficient"], specs: { "Screen Size": "32 inches", Resolution: "HD Ready", Connectivity: "Wi-Fi, Bluetooth", Warranty: "2 Years" }, inStock: true, badge: "sale" },

  // Audio
  { id: "e012", name: "5.1 Home Theatre System", category: "electronics", subcategory: "Audio", price: 18000, originalPrice: 24000, rating: 4.7, reviewCount: 88, images: [
      "/products/ata_images_4a64881a-253d-4bb0-a53e-3309168454de.jpg",
      "/products/ata_images_4f64a51c-c636-4267-88ee-614f5a7b6396.jpg"
    ], description: "A powerful 5.1 channel home theatre system with 120W output, Bluetooth, and HDMI ARC. Perfect for movie nights.", features: ["120W total output", "5.1 channel surround", "HDMI ARC", "Bluetooth & USB", "Remote control"], specs: { Power: "120W RMS", Channels: "5.1", Connectivity: "HDMI, Bluetooth, USB", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  { id: "e013", name: "Portable Bluetooth Speaker", category: "electronics", subcategory: "Audio", price: 268999, originalPrice: 377999, rating: 4.6, reviewCount: 302, images: [
      "/products/ata_images_5f87bfc7-2f3e-49d5-9bea-b3e165814936.jpg",
      "/products/ata_images_60771f8b-de5a-4669-b3db-a8a5759a18e9.jpg"
    ], description: "A compact waterproof Bluetooth speaker with 12-hour battery life and rich bass. Ideal for home, travel, and outdoors.", features: ["IPX7 waterproof", "12-hour battery", "Deep bass", "360° sound", "USB-C charging"], specs: { Battery: "12 hours", Connectivity: "Bluetooth 5.3", Rating: "IPX7", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Lighting
  { id: "e014", name: "LED Ceiling Fan with Light", category: "electronics", subcategory: "Lighting", price: 402999, originalPrice: 520999, rating: 4.7, reviewCount: 176, images: [
      "/products/ata_images_618f32f1-488b-491e-b8e9-24255b40e5f8.jpg",
      "/products/ata_images_638819a6-173d-4693-9e3d-5f72878a740b.jpg"
    ], description: "A modern ceiling fan with integrated LED light, remote control, and 3-speed settings. Energy-efficient and stylish.", features: ["Integrated LED light", "Remote control", "3-speed settings", "Energy-saving motor", "Sleek design"], specs: { Power: "50W fan + 24W light", Sweep: "1200mm", Speeds: "3", Control: "Remote", Warranty: "2 Years" }, inStock: true, badge: "bestseller" },

  { id: "e015", name: "Smart LED Strip Lights (5m)", category: "electronics", subcategory: "Lighting", price: 150999, originalPrice: 209999, rating: 4.5, reviewCount: 412, images: [
      "/products/ata_images_63f9c457-889b-4e3c-b35a-a89471568c6b.jpg",
      "/products/ata_images_657d92c5-4135-4523-a2f8-783a43eda2c0.jpg"
    ], description: "App-controlled RGB LED strip lights with 16 million colours, music sync, and voice assistant support. 5m roll.", features: ["16M colour options", "Music sync mode", "App & voice control", "Cuttable every 3 LEDs", "Self-adhesive backing"], specs: { Length: "5 metres", Control: "App, Voice", Colors: "16 million RGB", Warranty: "1 Year" }, inStock: true, badge: "trending" },

  { id: "e016", name: "Decorative Pendant Light", category: "electronics", subcategory: "Lighting", price: 293999, originalPrice: 402999, rating: 4.6, reviewCount: 58, images: [
      "/products/ata_images_6583edba-2daf-4565-8a09-9ae0266f661f.jpg",
      "/products/ata_images_6e84b6a6-d883-4011-9db8-1111b4e8caeb.jpg"
    ], description: "A handcrafted metal pendant light in a geometric cage design. Perfect above dining tables and kitchen islands.", features: ["Geometric cage design", "E27 bulb compatible", "Adjustable cord length", "Matte black finish", "Easy installation"], specs: { Material: "Iron", Bulb: "E27 (not included)", "Cord Length": "Adjustable up to 150cm", Warranty: "1 Year" }, inStock: true, badge: "new" },

  // Smart Home
  { id: "e017", name: "Smart Video Doorbell", category: "electronics", subcategory: "Smart Home", price: 436999, originalPrice: 587999, rating: 4.7, reviewCount: 94, images: [
      "/products/ata_images_6ece089e-2a0a-4b48-867f-15ed6bb8f1eb.jpg",
      "/products/ata_images_766e5125-a0de-47ce-b095-8b7bd4260e0c.jpg"
    ], description: "A Wi-Fi video doorbell with 1080p live view, motion alerts, two-way audio, and night vision. Works with Alexa & Google.", features: ["1080p live video", "Two-way audio", "Motion detection alerts", "Night vision", "Alexa & Google compatible"], specs: { Resolution: "1080p HD", Connectivity: "Wi-Fi 2.4GHz", Night: "IR night vision", Warranty: "1 Year" }, inStock: true, badge: "new" },

  { id: "e018", name: "Smart Plug (4-Pack)", category: "electronics", subcategory: "Smart Home", price: 167999, originalPrice: 234999, rating: 4.5, reviewCount: 267, images: [
      "/products/ata_images_76c004aa-b22e-45e4-ae23-ee0e6fc0e09d.jpg",
      "/products/ata_images_7791211c-1194-4f79-bbbb-b7a8153fc50f.jpg"
    ], description: "App-controlled smart plugs with energy monitoring, scheduling, and voice control. Compatible with all Indian sockets.", features: ["App & voice control", "Energy monitoring", "Schedule on/off", "Overload protection", "Compact design"], specs: { Pack: "4 plugs", Connectivity: "Wi-Fi 2.4GHz", Rating: "16A", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  // Home Appliances
  { id: "e019", name: "Tower Air Cooler (50L)", category: "electronics", subcategory: "Home Appliances", price: 797999, originalPrice: 12000, rating: 4.6, reviewCount: 183, images: [
      "/products/ata_images_7d2edc23-0cdc-46cd-91c0-2d31b6bafdd6.jpg",
      "/products/ata_images_805646ec-a1a9-414f-a6e9-72fb7ad3fcf3.jpg"
    ], description: "A powerful 50-litre tower air cooler with 4-way air deflection, remote control, and auto-fill. Perfect for Indian summers.", features: ["50L water tank", "4-way air deflection", "Remote control", "Auto-fill option", "Honeycomb cooling pads"], specs: { "Tank Capacity": "50 litres", Speeds: "3", Coverage: "Up to 400 sq.ft", Warranty: "2 Years" }, inStock: true, badge: "trending" },

  { id: "e020", name: "Inverter Split AC 1.5 Ton", category: "electronics", subcategory: "Home Appliances", price: 38000, originalPrice: 46000, rating: 4.8, reviewCount: 221, images: [
      "/products/ata_images_840a79b2-4fb8-43ef-9468-d53c583bf4c1.jpg",
      "/products/ata_images_8af2660e-d5dd-4178-8a1d-5e5bc8cb3999.jpg"
    ], description: "A 5-star rated 1.5-ton inverter split AC with auto-clean, Wi-Fi control, and turbo cool mode. Energy efficient for Indian summers.", features: ["5-star energy rating", "Wi-Fi & app control", "Auto-clean function", "Turbo cool mode", "PM 2.5 air filter"], specs: { Capacity: "1.5 Ton", "Star Rating": "5 Star", Refrigerant: "R32", Warranty: "5 Years compressor" }, inStock: true, badge: "bestseller" },

  { id: "e021", name: "Washing Machine 7kg Front Load", category: "electronics", subcategory: "Home Appliances", price: 29000, originalPrice: 36000, rating: 4.7, reviewCount: 148, images: [
      "/products/ata_images_9011af85-f292-4e55-aa35-90af20677830.jpg",
      "/products/ata_images_95051693-a23d-47f0-86cc-616f3c4f8ae1.jpg"
    ], description: "A fully automatic front-load washing machine with 15 wash programs, steam wash, and in-built heater. Built for Indian fabrics.", features: ["15 wash programs", "Steam wash", "In-built heater", "Child lock", "Quick wash 15 min"], specs: { Capacity: "7 kg", Type: "Front Load", Programs: "15", Warranty: "10 Years motor" }, inStock: true, badge: "sale" },

  { id: "e022", name: "Induction Cooktop 2000W", category: "electronics", subcategory: "Home Appliances", price: 268999, originalPrice: 377999, rating: 4.6, reviewCount: 389, images: [
      "/products/ata_images_992be3eb-7d8f-46e0-a68b-884400ab6ae2.jpg",
      "/products/ata_images_a783f36f-304f-4310-9cd0-4ae6c2894e78.jpg"
    ], description: "A 2000W induction cooktop with 8 preset cooking modes, digital display, and auto-shutoff. Ideal for Indian cooking.", features: ["2000W power", "8 preset modes", "Digital display", "Auto shut-off", "Child lock"], specs: { Power: "2000W", Modes: "8 preset", Voltage: "220V", Warranty: "2 Years" }, inStock: true, badge: "new" },

  { id: "e023", name: "Mixer Grinder 750W (3 Jars)", category: "electronics", subcategory: "Home Appliances", price: 318999, originalPrice: 419999, rating: 4.7, reviewCount: 512, images: [
      "/products/ata_images_a7b6284b-d44e-4b6c-8457-6ba436594774.jpg",
      "/products/ata_images_a8107166-b319-495e-aa6f-7f8f1993eedc.jpg"
    ], description: "A heavy-duty 750W mixer grinder with 3 stainless steel jars. Perfect for South Indian cooking — idli batter, chutneys, and masala.", features: ["750W copper motor", "3 SS jars", "Overload protection", "4-speed control", "Centrifugal juicer"], specs: { Power: "750W", Jars: "3 (1.5L, 1L, 0.4L)", Speeds: "4 + pulse", Warranty: "2 Years" }, inStock: true, badge: "bestseller" },

  { id: "e024", name: "Electric Ceiling Fan 1200mm", category: "electronics", subcategory: "Home Appliances", price: 184999, originalPrice: 251999, rating: 4.5, reviewCount: 644, images: [
      "/products/ata_images_a84817aa-beb4-4e5d-9333-68bc3b4804b8.jpg",
      "/products/ata_images_ad36fe06-f648-4bcd-bfb7-37e23509bc83.jpg"
    ], description: "An energy-efficient BEE 5-star rated ceiling fan with a powerful motor and attractive design. A must-have for Indian homes.", features: ["BEE 5-star rated", "Powerful copper motor", "Anti-dust blades", "3-speed regulator", "2-year warranty"], specs: { Sweep: "1200mm", Power: "75W", Speeds: "3", Finish: "Pearl white", Warranty: "2 Years" }, inStock: true, badge: "sale" },

  // ===== CABLES & ACCESSORIES =====
  { id: "c001", name: "HDMI Cable 2.1 (2m)", category: "electronics", subcategory: "Cables & Accessories", price: 49999, originalPrice: 83999, rating: 4.7, reviewCount: 834, images: [
      "/products/ata_images_b755e9a3-6e03-4a37-a0e5-defaa6f85bef.jpg",
      "/products/ata_images_bb4e0319-2b7e-4cae-961b-8d9c9ac66321.jpg"
    ], description: "A premium HDMI 2.1 cable supporting 4K@120Hz and 8K@60Hz. Ideal for TVs, gaming consoles, and monitors. Gold-plated connectors for signal clarity.", features: ["HDMI 2.1 standard", "4K@120Hz / 8K@60Hz", "eARC support", "Gold-plated connectors", "Braided nylon sleeve"], specs: { Length: "2 metres", Standard: "HDMI 2.1", Resolution: "Up to 8K", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  { id: "c002", name: "USB-C to USB-C Cable (1m)", category: "electronics", subcategory: "Cables & Accessories", price: 28999, originalPrice: 49999, rating: 4.6, reviewCount: 1203, images: [
      "/products/ata_images_c205eede-9d11-4927-90bd-ce8aa2b1e0ee.jpg",
      "/products/ata_images_c46a8b56-0a9c-4ae6-b741-ba25c013a6f2.jpg"
    ], description: "Fast-charging USB-C to USB-C cable supporting 100W PD charging and USB 3.2 data transfer. Compatible with laptops, phones, and tablets.", features: ["100W Power Delivery", "USB 3.2 Gen 2 data", "10Gbps data speed", "Braided nylon", "Universal compatibility"], specs: { Length: "1 metre", Charging: "100W PD", Data: "10Gbps", Warranty: "1 Year" }, inStock: true, badge: "new" },

  { id: "c003", name: "USB-A to Micro USB Cable (1.5m)", category: "electronics", subcategory: "Cables & Accessories", price: 16999, originalPrice: 28999, rating: 4.4, reviewCount: 2187, images: [
      "/products/ata_images_cab02473-01ee-4d5a-a029-7d015d0ead81.jpg",
      "/products/ata_images_cb9f76c5-567b-4ee4-a868-5e8c93b27ec8.jpg"
    ], description: "Durable Micro USB charging cable compatible with older Android phones, cameras, and accessories. Tangle-free flat design.", features: ["Flat tangle-free design", "Fast charging support", "Durable TPE jacket", "Wide compatibility", "Flexible bend points"], specs: { Length: "1.5 metres", Connector: "USB-A to Micro USB", Warranty: "1 Year" }, inStock: true },

  { id: "c004", name: "3.5mm AUX Audio Cable (2m)", category: "electronics", subcategory: "Cables & Accessories", price: 20999, originalPrice: 33999, rating: 4.5, reviewCount: 678, images: [
      "/products/ata_images_d940a8b8-992a-45d5-84c8-6e784784061b.jpg",
      "/products/ata_images_e1874ef9-766b-4f6f-8db3-4ef55ed9a520.jpg"
    ], description: "A 2-metre stereo AUX cable with gold-plated 3.5mm jacks. Ideal for connecting phones to car stereos, speakers, and home audio systems.", features: ["Gold-plated 3.5mm jacks", "Stereo audio", "Nylon braided jacket", "No signal loss", "Universal fit"], specs: { Length: "2 metres", Connector: "3.5mm TRS to TRS", Audio: "Stereo", Warranty: "1 Year" }, inStock: true, badge: "sale" },

  { id: "c005", name: "Ethernet LAN Cable Cat6 (5m)", category: "electronics", subcategory: "Cables & Accessories", price: 33999, originalPrice: 54999, rating: 4.8, reviewCount: 445, images: [
      "/products/ata_images_e2250491-6f3f-4b09-ae01-eaa43db49dbe.jpg",
      "/products/ata_images_e95d25ff-749b-4ea1-ba1d-fc3c0f832f84.jpg"
    ], description: "Cat6 Ethernet cable delivering 1Gbps network speed. Perfect for routers, smart TVs, PCs, and gaming consoles for stable wired internet.", features: ["Cat6 standard", "1Gbps speed", "RJ45 gold-plated connectors", "Foil shielded", "5 metre length"], specs: { Length: "5 metres", Standard: "Cat6", Speed: "1Gbps", Connector: "RJ45", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  { id: "c006", name: "Lightning to USB Cable (1m)", category: "electronics", subcategory: "Cables & Accessories", price: 41999, originalPrice: 66999, rating: 4.6, reviewCount: 921, images: [
      "/products/ata_images_ec4f4d4d-b11e-47a8-94f2-e356a665d2a7.jpg",
      "/products/ata_images_fc786ca7-b875-4409-9fec-b3d350cce0e6.jpg"
    ], description: "MFi-certified Lightning to USB cable for iPhone and iPad. Supports fast charging and data sync. Durable braided design.", features: ["MFi certified", "Fast charging", "Data sync", "Braided nylon jacket", "Reinforced connectors"], specs: { Length: "1 metre", Connector: "Lightning to USB-A", Warranty: "1 Year" }, inStock: true, badge: "trending" },

  { id: "c007", name: "USB Extension Cable 3.0 (3m)", category: "electronics", subcategory: "Cables & Accessories", price: 24999, originalPrice: 41999, rating: 4.5, reviewCount: 387, images: [
      "/products/ata_images_0132119d-bb52-489c-9c79-87b1149d0e90.jpg",
      "/products/ata_images_064f8e4c-75c5-4b7b-aa4f-b06153b74d38.jpg"
    ], description: "A 3-metre USB 3.0 extension cable for keyboards, mice, printers, and USB hubs. Plug-and-play with all USB-A devices.", features: ["USB 3.0 speed", "3 metre reach", "Plug and play", "Stable signal", "Works with all USB-A devices"], specs: { Length: "3 metres", Standard: "USB 3.0", Speed: "5Gbps", Warranty: "1 Year" }, inStock: true, badge: "new" },

  { id: "c008", name: "4-in-1 Multi Charging Cable (1.2m)", category: "electronics", subcategory: "Cables & Accessories", price: 49999, originalPrice: 75999, rating: 4.7, reviewCount: 1456, images: [
      "/products/ata_images_0a2bc870-3326-41d2-8acc-ca38571969e5.jpg",
      "/products/ata_images_15c6fdf6-395d-4d54-b759-773f4f55f065.jpg"
    ], description: "One cable for all devices — USB-C, Micro USB, Lightning, and USB-A connectors in a single braided cable. The only cable you need.", features: ["4 connectors in 1", "USB-C + Micro + Lightning + USB-A", "Nylon braided", "Fast charge support", "Universal compatibility"], specs: { Length: "1.2 metres", Connectors: "4 types", Charging: "Fast charge", Warranty: "1 Year" }, inStock: true, badge: "bestseller" },

  { id: "c009", name: "TV Coaxial Cable (3m)", category: "electronics", subcategory: "Cables & Accessories", price: 24999, originalPrice: 37999, rating: 4.4, reviewCount: 312, images: [
      "/products/ata_images_1a553fc8-9961-4ae8-ac3d-3079926141e8.jpg",
      "/products/ata_images_1af1d7cf-1f72-4a78-b515-e4e7c9fa4dbb.jpg"
    ], description: "A high-quality RG6 coaxial cable for connecting DTH antennas, cable TV boxes, and satellite dishes to televisions. Noise-free signal.", features: ["RG6 coaxial standard", "Noise-free signal", "Gold-plated F-connector", "Double shielded", "3 metre length"], specs: { Length: "3 metres", Standard: "RG6", Connector: "F-Type", Warranty: "1 Year" }, inStock: true },

  { id: "c010", name: "VGA to HDMI Adapter Cable (1.8m)", category: "electronics", subcategory: "Cables & Accessories", price: 37999, originalPrice: 58999, rating: 4.5, reviewCount: 228, images: [
      "/products/ata_images_1b0883eb-8d1a-44a0-8e58-00fb02ddab4e.jpg",
      "/products/ata_images_1f0fbf85-031d-42e9-9e89-e135c9768a9d.jpg"
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
