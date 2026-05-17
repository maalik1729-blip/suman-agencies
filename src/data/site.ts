// Site-wide config — single source of truth for brand, contact, and trust signals.
// Referenced by Header, Footer, Order Status, About, Contact, etc.

export const site = {
  /** Legal + user-facing brand name (locked decision from outputs/02 strategy). */
  brand: "Suman Tech Automation",
  /** Short tagline used in metadata and footer. */
  tagline: "Premium furniture & electronics for homes worldwide.",
  /** Proprietor on record (small Tamil Nadu proprietorship). */
  proprietor: "Prop. RAJASINGH",
  /** GSTIN — strongest trust signal for a small Indian retailer. */
  gstin: "33DVIPR5548Q1ZN",

  contact: {
    primaryEmail: "sumantechautomation@gmail.com",
    /** Secondary email — surfaced only on the Contact page, not the global footer. */
    secondaryEmail: "sumanagency4@gmail.com",
    /** Each phone is a separate tel: link. */
    phones: [
      { display: "+91 97155 90101", e164: "+919715590101" },
      { display: "+91 88382 08741", e164: "+918838208741" },
    ],
    whatsapp: "919715590101",
    address: {
      line1: "No.7/1-3, West Street, Chellathayarpuram",
      city: "Tirunelveli",
      pincode: "627808",
      state: "Tamil Nadu",
      country: "India",
    },
  },

  /**
   * Real social handles only. If a network has no live presence, leave it out —
   * the footer omits the entire social row rather than rendering `#` links.
   */
  social: [] as Array<{ network: "facebook" | "instagram" | "youtube"; href: string }>,

  /** Used for currency-aware checkout messaging. */
  homeCurrency: "INR" as const,

  /** COD threshold + fee — single source of truth for cart + checkout. */
  cod: {
    /** Orders strictly below this subtotal incur the handling fee. */
    feeThresholdINR: 999,
    /** Flat handling fee, in INR. */
    feeINR: 50,
  },

  /** Free delivery promise (must match shipping policy page copy). */
  freeDelivery: {
    region: "Worldwide",
    minOrderINR: 0,
  },

  storage: {
    /** Single canonical key (audit UI-1 — old `suman-agency-theme` is migrated). */
    theme: "suman-tech-theme",
    currency: "suman-tech-currency",
    cart: "suman-tech-cart",
    /** Per-order: orders/{id}. lastOrderId stores the most recent id for redirects. */
    lastOrderId: "suman-tech-last-order-id",
    orderPrefix: "suman-tech-order/",
  },
} as const;

export type Site = typeof site;
