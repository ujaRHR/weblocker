/* Date: June 04, 2025
 * Author: Reajul Hasan Raju
 * Helper: To display and update recent/most used activities
 * Source: https://github.com/ujaRHR/weblocker
 */

import { storage } from "../../libs/storage.js";
import { formatTime } from "../utils/time.js";

export function updateRecentActivity() {
  storage.getItem("domainStats", (res) => {
    const stats = res || {};
    const sorted = Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    const container = document.getElementById("activityList");
    container.innerHTML = "";

    if (sorted.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 text-sm">No data yet. Start browsing...</p>';
      return;
    }

    sorted.forEach(([domain, seconds], index) => {
      const item = document.createElement("div");
      item.className =
        "flex justify-between items-center py-2 px-1 rounded hover:bg-gray-200";

      item.innerHTML = `
        <div class="text-gray-800 text-sm font-medium">${
          index + 1
        }. ${domain}</div>
        <div class="font-semibold text-gray-500 text-sm">${formatTime(
          seconds
        )}</div>
      `;

      container.appendChild(item);
    });
  });
}
