/* Date: May 31, 2025
 * Author: Reajul Hasan Raju
 * Library: To validate and trim input/inserted keywords
 * Source: https://github.com/ujaRHR/weblocker
 */

export function isValidKeyword(keyword) {
  const trimmed = keyword.trim();

  // Rule checks
  const noSpaces = !/\s/.test(trimmed);
  const maxLength = trimmed.length > 0 && trimmed.length <= 50;
  const allowedChars = /^[a-zA-Z0-9-_]+$/.test(trimmed);

  return noSpaces && maxLength && allowedChars;
}