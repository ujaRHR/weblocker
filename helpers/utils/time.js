/* Date: June 04, 2025
 * Author: Reajul Hasan Raju
 * Helper: To format/convert time into m:s
 * Source: https://github.com/ujaRHR/weblocker
 */

export function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${min}m ${sec.toString().padStart(2, "0")}s`;
}
