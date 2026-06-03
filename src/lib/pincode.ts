// Lightweight pincode → state/city lookup.
// We keep this offline (no API) and target only the prefixes the storefront
// actively serves. Tamil Nadu pincodes start 60–64. The public/postal-PIN api
// can be wired in later — this module is the single seam.

interface PincodeInfo {
  state: string;
  // Best-effort city; can be empty when ambiguous.
  city?: string;
}

const TN_RANGES: Array<{ from: number; to: number; city?: string }> = [
  { from: 627000, to: 627999, city: "Tirunelveli" },
  { from: 600000, to: 603999, city: "Chennai" },
  { from: 620000, to: 620999, city: "Tiruchirappalli" },
  { from: 625000, to: 625999, city: "Madurai" },
  { from: 641000, to: 641999, city: "Coimbatore" },
];

const STATE_BY_PREFIX: Array<{ from: number; to: number; state: string }> = [
  { from: 600000, to: 643999, state: "Tamil Nadu" },
  { from: 560000, to: 591999, state: "Karnataka" },
  { from: 670000, to: 695999, state: "Kerala" },
  { from: 500000, to: 509999, state: "Telangana" },
  { from: 510000, to: 535999, state: "Andhra Pradesh" },
];

/**
 * Returns state/city info for a 6-digit Indian pincode, or `null` if the
 * input is incomplete or unrecognised.
 */
export function lookupPincode(pincode: string): PincodeInfo | null {
  if (!/^\d{6}$/.test(pincode)) return null;
  const n = parseInt(pincode, 10);

  const tn = TN_RANGES.find((r) => n >= r.from && n <= r.to);
  if (tn) return { state: "Tamil Nadu", city: tn.city };

  const state = STATE_BY_PREFIX.find((r) => n >= r.from && n <= r.to)?.state;
  return state ? { state } : null;
}
