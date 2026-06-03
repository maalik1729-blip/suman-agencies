/** A wholesale price break. `price` is the per-unit price (stored in INR) once `minQty` is reached. */
export interface BulkTier {
  minQty: number;
  price: number;
}

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
  /** Tiered wholesale pricing — ascending by minQty. Per-unit prices stored in INR. */
  bulkPricing?: BulkTier[];
}

/**
 * Resolve the effective per-unit price for a given quantity, honouring any
 * wholesale price breaks. Returns the base price when no tier applies.
 */
export function getUnitPrice(product: Product, qty: number): number {
  if (!product.bulkPricing?.length) return product.price;
  let unit = product.price;
  for (const tier of product.bulkPricing) {
    if (qty >= tier.minQty) unit = tier.price;
  }
  return unit;
}

/** Bulk SKUs are sold in fixed packs of this many units. */
export const BULK_PACK_SIZE = 100;

/** True when a product is sold as bulk packs (has wholesale tiers). */
export function isBulkProduct(product: Product): boolean {
  return !!product.bulkPricing?.length;
}

/**
 * Total line price (in INR) for a quantity of a product.
 * - Retail products: base price × quantity.
 * - Bulk products: `price`/`bulkPricing` values are the price for ONE 100-unit
 *   pack, so the total is the per-pack price × number of packs.
 */
export function getLineTotalINR(product: Product, quantity: number): number {
  if (!isBulkProduct(product)) return product.price * quantity;
  const packs = quantity / BULK_PACK_SIZE;
  return getUnitPrice(product, quantity) * packs;
}

export const products: Product[] = [
  // --- FURNITURE: SOFAS ---
  {
    id: "f021",
    name: "3 Seater Wooden Sofa Set",
    category: "furniture",
    subcategory: "Sofas",
    price: 34999,
    rating: 4.5,
    reviewCount: 420,
    images: ["/products/product-35.jpeg"],
    description: "A sturdy and elegant 3-seater sofa set built with a solid wood frame and comfortable fabric-cushioned seating. Ideal for living rooms that need a balance of traditional craftsmanship and modern style. Easy to maintain and built to last.",
    features: ["Solid wood frame", "Comfortable fabric cushions", "3 seater design", "Durable finish", "Easy assembly"],
    specs: { Configuration: "3 Seater", Material: "Solid Wood", Upholstery: "Fabric", Warranty: "1 Year" },
    inStock: true,
  },

  {
    id: "f005",
    name: "Modern Velvet 3+2 Sofa Set",
    category: "furniture",
    subcategory: "Sofas",
    price: 54999,
    rating: 4.7,
    reviewCount: 278,
    images: ["/products/product-08.jpeg"],
    description: "A bold contemporary 3+2 sofa set upholstered in premium channel-stitched velvet, raised on sleek black tapered metal legs. High-density foam seating ensures lasting comfort, while the stain-resistant fabric makes it practical for everyday use.",
    features: ["Channel-stitched velvet", "Black tapered legs", "High-density foam", "3+2 seater", "Stain-resistant fabric"],
    specs: { Configuration: "3+2 Seater", Material: "Velvet, Metal legs", Style: "Contemporary", Warranty: "2 Years" },
    inStock: true,
    colors: ["Forest Green", "Navy Blue", "Dusty Pink"],
  },
  {
    id: "f007",
    name: "Sheesham Wood 5-Seater Sofa Set with Table",
    category: "furniture",
    subcategory: "Sofas",
    price: 41899,
    rating: 4.9,
    reviewCount: 308,
    images: ["/products/product-13.jpeg"],
    description: "A premium 5-seater (3+1+1) sofa set crafted entirely from solid sheesham wood, paired with a matching centre table. The natural honey-oil finish highlights the rich wood grain, while thick padded cushions ensure long-lasting comfort.",
    features: ["Solid sheesham wood", "3+1+1 configuration", "Centre table included", "Natural oil finish", "Thick cushioned seats"],
    specs: { Configuration: "3+1+1 + Centre Table", Material: "Solid Sheesham", Finish: "Natural honey", Warranty: "3 Years" },
    inStock: true,
    materials: ["Sheesham Wood"],
  },

  // --- FURNITURE: BEDROOM ---
  {
    id: "f002",
    name: "Metal Folding Single Cot",
    category: "furniture",
    subcategory: "Bedroom",
    price: 12500,
    rating: 4.4,
    reviewCount: 632,
    images: ["/products/product-03.jpeg"],
    description: "A compact and practical foldable single cot with a powder-coated steel frame and a leatherette padded top. Folds flat for storage and is easy to move around — perfect for guest rooms, hostels, and small spaces. Supports up to 150 kg.",
    features: ["Powder-coated steel frame", "Foldable & portable", "Leatherette cushion top", "Supports up to 150kg", "Easy assembly"],
    specs: { Size: "Single (6x3 ft)", Material: "MS Steel", Finish: "Powder coat", "Weight Capacity": "150kg", Warranty: "1 Year" },
    inStock: true,
  },
  {
    id: "f012",
    name: "Kids Storage Bed / Day Bed",
    category: "furniture",
    subcategory: "Bedroom",
    price: 21999,
    rating: 4.7,
    reviewCount: 154,
    images: ["/products/product-22.jpeg"],
    description: "A versatile kids' single day bed crafted in teak and white finish engineered wood. Features two under-seat storage drawers for toys and books, and doubles as a sofa during the day. Thoughtfully designed with child safety in mind.",
    features: ["Under-seat storage drawers", "Teak & white finish", "Doubles as sofa", "Child-safe design", "Includes bolster pillows"],
    specs: { Size: "Single (6x3 ft)", Material: "Teak + MDF", Storage: "2 drawers", "Age Group": "4-14 years", Warranty: "2 Years" },
    inStock: true,
    colors: ["Teak & White"],
  },
  {
    id: "f020",
    name: "Wakefit Taurus Engineered Wood Queen Hydraulic Bed",
    category: "furniture",
    subcategory: "Bedroom",
    price: 34199,
    rating: 4.6,
    reviewCount: 910,
    images: ["/products/product-34.jpeg"],
    description: "The Wakefit Taurus queen-size bed is built with high-quality engineered wood and finished in a rich Columbian Walnut tone. The hydraulic gas-lift mechanism opens up generous storage space beneath the mattress — perfect for bedding, pillows, and seasonal items.",
    features: ["Queen size", "Hydraulic storage system", "Premium Columbian Walnut finish", "Engineered wood construction", "Easy lift mechanism"],
    specs: { Size: "Queen", Material: "Engineered Wood", Storage: "Hydraulic", Finish: "Columbian Walnut", Warranty: "3 Years" },
    inStock: true,
  },
  {
    id: "f022",
    name: "Perfect Homes Rio Three Folding Travel Mattress",
    category: "furniture",
    subcategory: "Bedroom",
    price: 22900,
    rating: 4.3,
    reviewCount: 290,
    images: ["/products/product-36.jpeg"],
    description: "A lightweight, tri-fold foam mattress that's easy to carry and simple to store. Made with high-resilience foam for comfortable sleep, and covered in a removable, washable fabric. Great for travel, camping, or guest use.",
    features: ["Tri-fold design for easy storage", "High-resilience foam", "Lightweight & portable", "Removable washable cover", "Multi-purpose use"],
    specs: { Type: "Folding Mattress", Material: "HR Foam", Folds: "3", Use: "Travel/Guest", Warranty: "1 Year" },
    inStock: true,
  },

  // --- FURNITURE: DINING ---
  {
    id: "f014",
    name: "Sheesham 4-Seater Dining Set",
    category: "furniture",
    subcategory: "Dining",
    price: 59900,
    rating: 4.8,
    reviewCount: 231,
    images: ["/products/product-25.jpeg"],
    description: "A solid sheesham wood 4-seater square dining set in a warm walnut grain finish. Comes with 4 cushioned chairs that are comfortable for extended meals. The scratch-resistant tabletop is easy to clean and maintain — ideal for compact dining rooms.",
    features: ["Solid sheesham wood", "Square dining table", "4 cushioned chairs", "Walnut grain finish", "Scratch-resistant top"],
    specs: { Seats: "4 persons", "Table Size": "90cm x 90cm", Material: "Solid Sheesham", Finish: "Walnut", Warranty: "3 Years" },
    inStock: true,
    materials: ["Sheesham Wood"],
  },

  // --- FURNITURE: CHAIRS ---
  {
    id: "f003",
    name: "Wooden Dining Chair with Cushion",
    category: "furniture",
    subcategory: "Wooden Chairs",
    price: 15999,
    rating: 4.6,
    reviewCount: 187,
    images: ["/products/product-05.jpeg"],
    description: "A well-finished solid wood dining chair with a cushioned leatherette seat and a curved backrest for ergonomic support. Anti-scratch feet protect your floors. Available in warm walnut brown and honey oak finishes.",
    features: ["Solid wood frame", "Padded leatherette seat", "Curved ergonomic backrest", "Anti-scratch feet", "Available in sets"],
    specs: { Material: "Solid Wood", Upholstery: "Leatherette", "Seat Height": "45cm", Weight: "6kg", Warranty: "1 Year" },
    inStock: true,
    colors: ["Walnut Brown", "Honey Oak"],
  },
  {
    id: "f008",
    name: "Sheesham Dining Chair (Set of 2)",
    category: "furniture",
    subcategory: "Wooden Chairs",
    price: 17599,
    rating: 4.7,
    reviewCount: 196,
    images: ["/products/product-15.jpeg"],
    description: "A set of 2 solid sheesham wood dining chairs with a slatted backrest and smooth lacquer finish. Robust and suitable for daily use, these chairs pair well with any wooden or glass dining table.",
    features: ["Solid sheesham wood", "Slatted backrest design", "Lacquer finish", "Set of 2", "Scratch-resistant"],
    specs: { Material: "Solid Sheesham", "Seat Height": "44cm", Weight: "7kg each", Finish: "Walnut lacquer", Warranty: "1 Year" },
    inStock: true,
  },
  {
    id: "f013",
    name: "Carved Teak Wood Rocking Chair",
    category: "furniture",
    subcategory: "Wooden Chairs",
    price: 59990,
    rating: 4.9,
    reviewCount: 89,
    images: ["/products/product-24.jpeg"],
    description: "A majestic hand-carved solid teak wood rocking chair with intricate wheel-spoke detailing and a woven cane backrest. Finished in natural teak polish, this chair is a timeless heirloom piece that adds grandeur to any room.",
    features: ["Solid teak wood", "Hand-carved details", "Wheel-spoke rocking base", "Woven cane backrest", "Natural teak polish"],
    specs: { Material: "Solid Teak Wood", Style: "Traditional carved", Finish: "Natural teak polish", Weight: "22kg", Warranty: "5 Years" },
    inStock: true,
    materials: ["Teak Wood"],
  },
  {
    id: "f016",
    name: "Wooden & Iron Rocking Chair",
    category: "furniture",
    subcategory: "Wooden Chairs",
    price: 14999,
    rating: 4.5,
    reviewCount: 312,
    images: ["/products/product-28.jpeg"],
    description: "A handcrafted rocking chair combining a sturdy curved iron frame with solid wood slatted seat and back. The weather-resistant coating and vintage aesthetic make it suitable for both indoor and outdoor use.",
    features: ["Solid wood slatted seat", "Curved iron frame", "Smooth rocking motion", "Weather-resistant coating", "Vintage design"],
    specs: { Material: "Solid Wood + Iron", Style: "Vintage", Finish: "Natural wood + Black iron", Weight: "15kg", Warranty: "1 Year" },
    inStock: true,
    materials: ["Wood", "Iron"],
  },
  {
    id: "f009",
    name: "Cane Rattan Armchair with Cushion",
    category: "furniture",
    subcategory: "Chairs",
    price: 26499,
    rating: 4.6,
    reviewCount: 143,
    images: ["/products/product-16.jpeg"],
    description: "A handcrafted natural cane and rattan armchair paired with a thick paisley-print cushion. Lightweight, eco-friendly, and easy to move, it's well-suited for balconies, reading corners, or bohemian-style interiors.",
    features: ["Handcrafted rattan", "Thick cushioned seat", "Lightweight & portable", "Eco-friendly material", "Paisley cushion cover"],
    specs: { Material: "Natural Cane/Rattan", "Seat Height": "40cm", Weight: "5kg", Cushion: "Removable cover", Warranty: "1 Year" },
    inStock: true,
  },
  {
    id: "f017",
    name: "Ergonomic Mesh Office Chair with Headrest",
    category: "furniture",
    subcategory: "Chairs",
    price: 23999,
    rating: 4.8,
    reviewCount: 845,
    images: ["/products/product-29.jpeg"],
    description: "A premium ergonomic office chair designed for long working hours. Features a breathable mesh back to prevent heat build-up, an adjustable headrest, lumbar support, and height-adjustable armrests — all mounted on a heavy-duty swivel base.",
    features: ["Breathable mesh back", "Adjustable headrest", "Built-in lumbar support", "Adjustable armrests", "Heavy-duty swivel base"],
    specs: { Material: "Mesh + Nylon", Mechanism: "Tilt & Lock", "Weight Capacity": "120kg", Warranty: "3 Years" },
    inStock: true,
    colors: ["Black"],
  },

  // --- FURNITURE: TABLES & DESKS ---
  {
    id: "f006",
    name: "Computer Study Desk with Shelves",
    category: "furniture",
    subcategory: "Office Tables",
    price: 27899,
    rating: 4.5,
    reviewCount: 523,
    images: ["/products/product-09.jpeg"],
    description: "A compact home-office and study desk in a walnut finish with a pull-out keyboard tray, one lockable drawer, and two open side shelves for books and accessories. Easy to assemble and practical for small spaces.",
    features: ["Keyboard tray", "1 lockable drawer", "2 open side shelves", "Walnut finish", "Easy assembly"],
    specs: { Dimensions: "90cm x 50cm x 75cm", Material: "Engineered Wood", Finish: "Walnut", Drawers: "1 lockable", Warranty: "1 Year" },
    inStock: true,
  },
  {
    id: "f019",
    name: "Homes Dalton Engineered Wood Study Table",
    category: "furniture",
    subcategory: "Office Tables",
    price: 36999,
    rating: 4.5,
    reviewCount: 341,
    images: ["/products/product-30.jpeg"],
    description: "A modern engineered wood study desk in walnut and white finish featuring a tall hutch with two closed cabinet doors and open display shelves. Provides ample storage for books, files, and stationery on a spacious tabletop.",
    features: ["Tall hutch extension", "Two closed cabinets", "Open display shelves", "Walnut and white finish", "Spacious tabletop"],
    specs: { Dimensions: "120cm x 60cm x 150cm", Material: "Engineered Wood", Finish: "Walnut + White", Storage: "2 Cabinets", Warranty: "1 Year" },
    inStock: true,
    colors: ["Walnut", "White"],
  },
  {
    id: "f011",
    name: "Foldable Laptop Bed Table",
    category: "furniture",
    subcategory: "Tables",
    price: 2400,
    rating: 4.5,
    reviewCount: 3187,
    images: ["/products/product-18.jpeg"],
    description: "A multi-purpose foldable laptop table with adjustable height legs, a tablet slot, a cup holder, side pen holders, and a small side drawer. Lightweight and convenient for working or studying from your bed or sofa.",
    features: ["Foldable legs", "Tablet/phone slot", "Cup holder", "Side drawer", "Pen & accessory holders"],
    specs: { Dimensions: "60cm x 40cm", Material: "MDF + Steel legs", "Max Load": "15kg", Warranty: "1 Year" },
    inStock: true,
  },
  {
    id: "f015",
    name: "Dark Wood Foldable Laptop Bed Table",
    category: "furniture",
    subcategory: "Tables",
    price: 3490,
    rating: 4.3,
    reviewCount: 1245,
    images: ["/products/product-26.jpeg"],
    description: "A dark wood grain finish foldable laptop and bed table with a built-in tablet stand and cup holder. The foldable steel legs allow flat storage when not in use. Anti-slip padding keeps it stable on any surface.",
    features: ["Dark wood grain finish", "Tablet/phone slot", "Cup holder", "Foldable steel legs", "Anti-slip padding"],
    specs: { Dimensions: "60cm x 40cm", Material: "MDF + Steel", "Max Load": "15kg", Warranty: "1 Year" },
    inStock: true,
    colors: ["Dark Wood"],
  },
  {
    id: "f018",
    name: "MDF Foldable Study Desk",
    category: "furniture",
    subcategory: "Office Tables",
    price: 9999,
    rating: 4.4,
    reviewCount: 521,
    images: ["/products/product-27.webp"],
    description: "A minimalist foldable study desk with a dark brown MDF top and a sturdy powder-coated metal frame. Folds completely flat for space-saving storage and requires no assembly. Ideal for small rooms, rental flats, or student housing.",
    features: ["Foldable metal frame", "Dark brown MDF top", "Space-saving design", "No assembly required", "Anti-slip leg caps"],
    specs: { Dimensions: "90cm x 60cm", Material: "MDF + Steel", Finish: "Dark Brown", Warranty: "1 Year" },
    inStock: true,
    colors: ["Dark Brown"],
  },

  // --- FURNITURE: STORAGE ---
  {
    id: "f010",
    name: "2-Door Wooden Wardrobe",
    category: "furniture",
    subcategory: "Storage",
    price: 39999,
    rating: 4.6,
    reviewCount: 267,
    images: ["/products/product-17.jpeg"],
    description: "A spacious 2-door wardrobe in walnut finish engineered wood with a central locking system, a hanging rail, and four shelves for folded clothing. Soft-close hinges ensure smooth, quiet operation every day.",
    features: ["2 hinged doors", "Central locking system", "Hanging rail + 4 shelves", "Walnut finish", "Soft-close hinges"],
    specs: { Dimensions: "90cm x 52cm x 200cm", Material: "Engineered Wood", Doors: "2 hinged", Finish: "Walnut", Warranty: "2 Years" },
    inStock: true,
  },

  // --- ELECTRONICS: HOME APPLIANCES ---


  // --- ELECTRONICS: CABLES & ACCESSORIES ---
  {
    id: "e001",
    name: "USB A to B Printer Cable 1.5m (Pack of 100) — Bulk Wholesale Lot, USB 2.0 Gold-Plated",
    category: "electronics",
    subcategory: "Cables & Accessories",
    price: 34459,
    rating: 4.3,
    reviewCount: 1820,
    images: ["/products/product-02.jpeg"],
    description: "Bulk wholesale carton of 100 USB 2.0 A-Male to B-Male printer cables — ideal for IT resellers, system integrators, computer service centres, schools, and offices that buy in volume. Each 1.5m cable features gold-plated connectors, twisted-pair copper conductors, and braided + foil shielding for stable, error-free data transfer to printers, scanners, and USB-B devices. Individually poly-bagged and packed in a single master carton of 100 for easy stock-keeping and redistribution. Price shown is per pack of 100 units, with automatic slab discounts on larger orders.",
    features: [
      "Wholesale pack of 100 units — sold as one master carton",
      "USB 2.0 certified (480 Mbps) A-Male to B-Male",
      "24K gold-plated corrosion-resistant connectors",
      "Dual braided + foil shielding cuts EMI/RFI interference",
      "Bare copper conductors for low-loss signal transfer",
      "Flexible 1.5m PVC jacket rated for daily plug/unplug use",
      "Individually poly-bagged; ideal for resale & redistribution",
    ],
    specs: {
      "Pack Size": "100 units (1 master carton)",
      "Sold As": "Bulk wholesale lot",
      Type: "USB A (Male) to USB B (Male)",
      Length: "1.5 metres",
      Standard: "USB 2.0 (480 Mbps)",
      Connector: "Gold-plated",
      Conductor: "Bare copper",
      Shielding: "Braided + foil",
      "Country of Origin": "India",
      Warranty: "6 Months (seller warranty)",
    },
    inStock: true,
    bulkPricing: [
      { minQty: 200, price: 33023 },
      { minQty: 300, price: 32449 },
      { minQty: 500, price: 31588 },
    ],
  },
  {
    id: "e009",
    name: "Micro HDMI to HDMI Cable 2m (Pack of 100) — Bulk Wholesale Lot, 4K Gold-Plated",
    category: "electronics",
    subcategory: "Cables & Accessories",
    price: 37331,
    rating: 4.6,
    reviewCount: 987,
    images: ["/products/product-20.jpeg"],
    description: "Wholesale carton of 100 Micro HDMI to Standard HDMI cables, built for AV installers, electronics retailers, camera/DSLR dealers, and event-rental companies ordering in bulk. Each 2-metre cable supports crisp video up to 4K@30Hz and is finished with gold-plated connectors and a tangle-resistant braided nylon jacket. Connects cameras, tablets, and smartphones directly to TVs, monitors, and projectors. Supplied as a single master pack of 100, individually sleeved for clean resale. Listed price is per pack of 100, with slab discounts auto-applied on multi-pack orders.",
    features: [
      "Wholesale pack of 100 units — single master carton",
      "Supports 4K@30Hz, Full HD 1080p & 3D passthrough",
      "Gold-plated Micro HDMI (Type D) to HDMI (Type A)",
      "Triple-shielded with braided nylon outer jacket",
      "Audio Return + high-speed data channel support",
      "Plug-and-play; no drivers or setup required",
      "Individually sleeved for retail & redistribution",
    ],
    specs: {
      "Pack Size": "100 units (1 master carton)",
      "Sold As": "Bulk wholesale lot",
      Type: "Micro HDMI (Type D) to HDMI (Type A)",
      Length: "2 metres",
      Resolution: "Up to 4K@30Hz",
      Connector: "Gold-plated",
      Jacket: "Braided nylon",
      "Country of Origin": "India",
      Warranty: "1 Year (seller warranty)",
    },
    inStock: true,
    bulkPricing: [
      { minQty: 200, price: 36182 },
      { minQty: 300, price: 35608 },
      { minQty: 500, price: 35034 },
    ],
  },
  {
    id: "e011",
    name: "VGA Extension Cable 10m M-M (Pack of 100) — Bulk Wholesale Lot, Ferrite Shielded",
    category: "electronics",
    subcategory: "Cables & Accessories",
    price: 40202,
    rating: 4.2,
    reviewCount: 543,
    images: ["/products/product-23.jpeg"],
    description: "Bulk carton of 100 long-run 10-metre VGA male-to-male extension cables, designed for AV contractors, classroom and auditorium fit-outs, conference-room integrators, and projector-rental firms. Dual ferrite cores suppress noise over long distances, while moulded screw-lock connectors keep the connection secure and wobble-free. Sold as one master pack of 100 — the listed price is per pack, with automatic slab pricing on larger volume orders.",
    features: [
      "Wholesale pack of 100 units — single master carton",
      "Long 10-metre run for ceiling projectors & wall ports",
      "Male-to-male 15-pin HD D-Sub connectors",
      "Dual ferrite cores reduce long-distance signal noise",
      "Thumb-screw lock connectors prevent accidental unplug",
      "Triple-shielded cable body for stable HD signal",
      "Bulk-packed for AV projects & redistribution",
    ],
    specs: {
      "Pack Size": "100 units (1 master carton)",
      "Sold As": "Bulk wholesale lot",
      Type: "VGA Male to Male (M-M)",
      Length: "10 metres",
      Resolution: "Up to 1080p @ 60Hz",
      Connector: "15-pin D-Sub, screw-lock",
      "Noise Suppression": "Dual ferrite cores",
      "Country of Origin": "India",
      Warranty: "6 Months (seller warranty)",
    },
    inStock: true,
    bulkPricing: [
      { minQty: 200, price: 38767 },
      { minQty: 300, price: 37905 },
      { minQty: 500, price: 37331 },
    ],
  },
  {
    id: "e013",
    name: "Premium VGA Cable 3m M-M (Pack of 100) — Bulk Wholesale Lot, Triple-Shielded Blue",
    category: "electronics",
    subcategory: "Cables & Accessories",
    price: 43074,
    rating: 4.4,
    reviewCount: 1250,
    images: ["/products/product-19.jpeg"],
    description: "Wholesale carton of 100 premium 3-metre VGA male-to-male cables with durable blue moulded screw-lock connectors. A go-to bulk SKU for computer assemblers, refurbishers, monitor dealers, and corporate IT rollouts. The triple-shielded build delivers a stable high-definition signal and withstands repeated daily connection cycles. Supplied as one master pack of 100 — listed price is per pack, with slab discounts auto-applied as order volume grows.",
    features: [
      "Wholesale pack of 100 units — single master carton",
      "Premium triple-shielded build for clean HD signal",
      "Blue moulded thumb-screw lock connectors",
      "Male-to-male 15-pin HD D-Sub, 3-metre length",
      "Reinforced strain relief for daily plug/unplug",
      "Great fit for monitors, projectors & KVM setups",
      "Bulk-packed for assembly lines & resale",
    ],
    specs: {
      "Pack Size": "100 units (1 master carton)",
      "Sold As": "Bulk wholesale lot",
      Type: "VGA Male to Male (M-M)",
      Length: "3 metres",
      Resolution: "Up to 1080p @ 60Hz",
      Connector: "15-pin D-Sub, blue screw-lock",
      Shielding: "Triple shielded",
      "Country of Origin": "India",
      Warranty: "1 Year (seller warranty)",
    },
    inStock: true,
    bulkPricing: [
      { minQty: 200, price: 41638 },
      { minQty: 300, price: 40777 },
      { minQty: 500, price: 40202 },
    ],
  },
  {
    id: "e014",
    name: "Computer Power Cable 1.5m IEC C13 (Pack of 100) — Bulk Wholesale Lot, ISI Certified",
    category: "electronics",
    subcategory: "Cables & Accessories",
    price: 42117,
    rating: 4.5,
    reviewCount: 890,
    images: ["/products/product-32.jpeg"],
    description: "Bulk carton of 100 standard 3-pin Indian power cables with IEC C13 ('kettle plug') connectors — a high-turnover essential for computer dealers, service centres, SMPS and UPS suppliers, and office IT departments. Each 1.5m cable uses a heavy-duty 250V-rated PVC jacket and is ISI certified for electrical safety. Fits desktop PCs, monitors, printers, SMPS units, and most power supplies. Sold as one master pack of 100 — listed price is per pack, with automatic slab discounts on larger orders.",
    features: [
      "Wholesale pack of 100 units — single master carton",
      "3-pin Indian mains plug to IEC C13 connector",
      "ISI certified for electrical safety",
      "Heavy-duty PVC jacket rated for 250V",
      "Pure copper conductors for safe current flow",
      "Universal fit: PC, monitor, SMPS, UPS, printer",
      "Bulk-packed for service centres & resale",
    ],
    specs: {
      "Pack Size": "100 units (1 master carton)",
      "Sold As": "Bulk wholesale lot",
      "Plug Type": "3-pin (India) to IEC C13",
      Length: "1.5 metres",
      Voltage: "250V AC",
      "Current Rating": "6A",
      Certification: "ISI",
      "Country of Origin": "India",
      Warranty: "6 Months (seller warranty)",
    },
    inStock: true,
    bulkPricing: [
      { minQty: 200, price: 40681 },
      { minQty: 300, price: 39724 },
      { minQty: 500, price: 38766 },
    ],
  },

  // --- ELECTRONICS: NETWORKING ---
  {
    id: "e002",
    name: "Cat6 Ethernet LAN Cable 5m RJ45 (Pack of 100) — Bulk Wholesale Lot, 1Gbps Blue",
    category: "electronics",
    subcategory: "Networking",
    price: 42595,
    rating: 4.5,
    reviewCount: 3410,
    images: ["/products/product-04.jpeg"],
    description: "Wholesale carton of 100 Cat6 RJ45 patch cables — the workhorse SKU for network installers, ISPs, structured-cabling contractors, gaming cafés, and office LAN deployments. Each 5-metre cable delivers reliable speeds up to 1 Gbps with gold-plated contacts, snagless moulded boots, and a PVC-jacketed body for consistent performance on routers, switches, consoles, and desktops. Supplied as one master pack of 100 — listed price is per pack, with slab discounts auto-applied on multi-pack orders.",
    features: [
      "Wholesale pack of 100 units — single master carton",
      "Cat6 standard, speeds up to 1 Gbps / 250 MHz",
      "Gold-plated RJ45 contacts resist corrosion",
      "Snagless moulded boots protect the locking clip",
      "Pure-copper conductors for stable PoE & data",
      "Factory-tested patch leads, 5-metre length",
      "Bulk-packed for cabling projects & resale",
    ],
    specs: {
      "Pack Size": "100 units (1 master carton)",
      "Sold As": "Bulk wholesale lot",
      Category: "Cat6 (250 MHz)",
      Speed: "Up to 1 Gbps",
      Length: "5 metres",
      Connector: "RJ45, gold-plated, snagless",
      Conductor: "Bare copper",
      "Country of Origin": "India",
      Warranty: "1 Year (seller warranty)",
    },
    inStock: true,
    bulkPricing: [
      { minQty: 200, price: 41160 },
      { minQty: 300, price: 40202 },
      { minQty: 500, price: 39245 },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Meenakshi Sundaram",
    role: "Interior Designer, Chennai",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    text: "Suman Tech Automation has completely changed the way I approach client projects. The sofa set arrived on time, was assembled perfectly, and the build quality is outstanding. My clients in Anna Nagar were absolutely thrilled!",
  },
  {
    id: 2,
    name: "Karthikeyan Rajan",
    role: "Software Engineer, Bengaluru",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
    text: "Bought the Samsung Bespoke AC and the BLDC ceiling fan together. Energy bills dropped significantly. The delivery and installation was smooth and professional!",
  },
  {
    id: 3,
    name: "Anitha Krishnamurthy",
    role: "Architect, Coimbatore",
    avatar: "https://i.pravatar.cc/80?img=44",
    rating: 5,
    text: "As someone who designs homes professionally, I have very high standards. The sheesham dining set and the rocking chair are both exceptional in finish and durability.",
  },
  {
    id: 4,
    name: "Venkatesh Iyer",
    role: "Business Owner, Hyderabad",
    avatar: "https://i.pravatar.cc/80?img=53",
    rating: 4,
    text: "Ordered the wardrobe and study desk for my new flat. Packaging was excellent and delivery was faster than expected. Great customer support too.",
  },
  {
    id: 5,
    name: "Divya Subramaniam",
    role: "Doctor, Mumbai",
    avatar: "https://i.pravatar.cc/80?img=41",
    rating: 5,
    text: "The foldable laptop table is perfect for WFH. Sturdy, well-made, and arrived quickly. Very happy with the purchase!",
  },
  {
    id: 6,
    name: "Suresh Balakrishnan",
    role: "Retired Professor, Madurai",
    avatar: "https://i.pravatar.cc/80?img=57",
    rating: 5,
    text: "The cane armchair on my balcony is my favourite spot now. Very comfortable and the quality is excellent for the price.",
  },
];

export const stats = [
  { label: "Happy Customers", value: 10000, suffix: "+" },
  { label: "Premium Products", value: 300, suffix: "+" },
  { label: "Cities Served", value: 48, suffix: "" },
  { label: "Years of Excellence", value: 6, suffix: "" },
];

export const categories = {
  furniture: ["All", "Sofas", "Bedroom", "Dining", "Chairs", "Tables", "Storage", "Office Tables", "Wooden Chairs"],
  electronics: ["All", "Home Appliances", "Cables & Accessories", "Networking"],
};
