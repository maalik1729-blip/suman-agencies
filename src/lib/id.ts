// Tiny URL-safe ID generator (~nanoid). Used for order IDs.
// Audit C-10: replaces `LUX-${Date.now().slice(-6)}` which had trivial collisions.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford base32 (no I/L/O/U)

export function shortId(length = 8): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    let out = "";
    for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
    return out;
  }
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return out;
}

export function orderId(): string {
  return `STA-${shortId(8)}`;
}
