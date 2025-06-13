/* Date: June 01, 2025
 * Author: Reajul Hasan Raju
 * Helper: To load, maintain, and organize dashboard data
 * Source: https://github.com/ujaRHR/weblocker
 */

import { updateRecentActivity } from "./updateRecentActivity.js";

// Update dashboard statistics
export function updateDashboard(settings) {
  let activeRules = 0;

  const totalDomains = settings.blockedDomains.length;
  document.getElementById("domainsCount").textContent = totalDomains;

  const totalKeywords = settings.blockedKeywords.length;
  document.getElementById("keywordsCount").textContent = totalKeywords;

  const totalWhitelists = settings.whitelistedDomains.length;

  if (settings.blockMode === "smart") {
    activeRules = totalDomains + totalKeywords + totalWhitelists;
  } else {
    activeRules = totalDomains + totalWhitelists;
  }

  document.getElementById("activeRules").textContent = activeRules;

  const statusElement = document.getElementById("statusElement");
  const extensionStatus = document.getElementById("extensionStatus");
  const pingElement = document.getElementsByClassName("ping");

  const isActive = settings.enabled;

  extensionStatus.textContent = isActive ? "Active" : "Inactive";

  statusElement.classList.remove(
    "bg-green-200",
    "text-green-800",
    "bg-red-200",
    "text-red-800"
  );

  pingElement[0].classList.remove("bg-green-700", "bg-red-700");
  pingElement[1].classList.remove("bg-green-600", "bg-red-600");

  if (isActive) {
    statusElement.classList.add("bg-green-200", "text-green-800");
    pingElement[0].classList.add("bg-green-700");
    pingElement[1].classList.add("bg-green-600");
  } else {
    statusElement.classList.add("bg-red-200", "text-red-800");
    pingElement[0].classList.add("bg-red-700");
    pingElement[1].classList.add("bg-red-600");
  }

  updateRecentActivity();
}
