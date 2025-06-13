/* Date: May 30, 2025
 * Author: Reajul Hasan Raju
 * Helper: To update the dashboard UI options freequenty with relavant data from settings
 * Source: https://github.com/ujaRHR/weblocker
 */

import { updateDashboard } from "./updateDashboard.js";

export function updateUI(settings) {
  document.getElementById("enableToggle").checked = settings.enabled;
  document.getElementById("redirectUrl").value = settings.redirectUrl;
  document.querySelector('input[name="redirectType"]:checked') ==
    settings.redirectType;
  document.querySelector('input[name="blockMode"]:checked') ==
    settings.blockMode;
  document.getElementById("blockedDomains").value = Array.isArray(
    settings.blockedDomains
  )
    ? settings.blockedDomains.join("\n")
    : settings.blockedDomains || "";

  document.getElementById("blockedKeywords").value = Array.isArray(
    settings.blockedKeywords
  )
    ? settings.blockedKeywords.join("\n")
    : settings.blockedKeywords || "";

  document.getElementById("whitelistedDomains").value = Array.isArray(
    settings.whitelistedDomains
  )
    ? settings.whitelistedDomains.join("\n")
    : settings.whitelistedDomains || "";

  updateDashboard(settings);
}
