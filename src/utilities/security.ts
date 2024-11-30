/**
 * Generates a cryptographically secure secret string.
 * Uses crypto.getRandomValues() to generate 32 random bytes and encodes them as base64.
 * @returns A cryptographically secure random string
 */
export function generateSecret(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
