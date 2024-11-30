/**
 * Generates a 6 alphabetic character ID. There is no guarantee of uniqueness.
 * @returns The generated short ID.
 */
export function shortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}