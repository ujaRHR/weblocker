/* Date: June 03, 2025
 * Author: Reajul Hasan Raju
 * Library: To validate and trim input/inserted domains
 * Source: https://github.com/ujaRHR/weblocker
 */

export function isValidDomain(domain) {
  // Regex pattern sourced from stackoverflow
  const pattern =
    /^(https?:\/\/)?(www\.)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}\.){3}\d{1,3})(\/[\w\-./?%&=]*)?$/;

  return pattern.test(domain.trim());
}
