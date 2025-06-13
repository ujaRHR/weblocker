/* Date: May 11, 2025
 * Author: Reajul Hasan Raju
 * Main: File to implement the Popup Statistics...
 * Source: https://github.com/ujaRHR/weblocker
 */

import { showStatus } from "./features/status.js";
import { usageStats } from "./features/stats.js";
import { blockCurrentDomain } from "./features/blocking.js";

// Showing usage stats
usageStats();

// Showing extenstion status
showStatus();

document.getElementById("openDashboard").addEventListener("click", () => {
  chrome.runtime.openOptionsPage?.() ||
    window.open(chrome.runtime.getURL("index.html"));
});

// Blocking current website
blockCurrentDomain();
