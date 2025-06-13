/* Date: June 09, 2025
 * Author: Reajul Hasan Raju
 * Library: To generate hashed password using SHA-256 via the Web Crypto API
 * Source: https://github.com/ujaRHR/weblocker
 */

export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashedPass = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");

  return hashedPass;
}
