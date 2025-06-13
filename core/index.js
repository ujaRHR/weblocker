/* Date: May 28, 2025
 * Author: Reajul Hasan Raju
 * Main: File to maintain corresponding dashboard settings
 * Source: https://github.com/ujaRHR/weblocker
 */

// Dependencies from helper and lib folder
import { storage } from "../libs/storage.js";
import { loadSettings } from "../helpers/configs/loadSettings.js";
import { saveSettings } from "../helpers/configs/saveSettings.js";
import { importConfigs } from "../helpers/configs/importConfigs.js";
import { exportConfigs } from "../helpers/configs/exportConfigs.js";
import { showToast } from "../libs/toast.js";
import { updateUI } from "../helpers/ui/updateUI.js";
import { updateDashboard } from "../helpers/ui/updateDashboard.js";
import { saveDomains } from "../helpers/inputs/saveDomains.js";
import { saveKeywords } from "../helpers/inputs/saveKeywords.js";
import { saveWhitelists } from "../helpers/inputs/saveWhitelists.js";
import { authHandler } from "../libs/authHandler.js";

// Initial settings object to store configuration
const settings = {
  enabled: true,
  redirectUrl: "https://google.com",
  redirectType: "default",
  blockMode: "smart",
  blockedDomains: [],
  blockedKeywords: [],
  whitelistedDomains: [],
};

const security = {
  enabled: false,
  auth: false,
  password: "",
  nextLogin: Date.now(),
};

let domainStats = {};

// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      updateDashboard(settings);
      const target = this.getAttribute("data-target");

      navButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      sections.forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById(target).classList.add("active");
    });
  });

  loadSettings((loadedSettings, loadedSecurity) => {
    Object.assign(settings, loadedSettings);
    Object.assign(security, loadedSecurity);
    updateUI(loadedSettings);

    // Checking Auth Status
    const loginBody = document.getElementById("loginBody");
    const mainBody = document.getElementById("mainBody");
    const logout = document.getElementById("logout");
    const setPass = document.getElementById("setPass");
    const updatePass = document.getElementById("updatePass");
    const toggleProtection = document.getElementById("toggleProtection");

    if (security.enabled) {
      toggleProtection.checked = true;
      if (security.auth && security.nextLogin > Date.now()) {
        loginBody.classList.add("hidden");
        mainBody.classList.remove("hidden");
        setPass.classList.add("hidden");
        updatePass.classList.remove("hidden");
        logout.classList.remove("hidden");
      } else {
        loginBody.classList.remove("hidden");
        mainBody.classList.add("hidden");
        setPass.classList.add("hidden");
        updatePass.classList.remove("hidden");
      }
    } else {
      if (security.password.length >= 1) {
        setPass.classList.add("hidden");
        updatePass.classList.remove("hidden");
      }
      toggleProtection.checked = false;
      loginBody.classList.add("hidden");
      mainBody.classList.remove("hidden");
      logout.classList.add("hidden");
    }
  });
});

// Save general settings
document.getElementById("saveSettings").addEventListener("click", function () {
  settings.enabled = document.getElementById("enableToggle").checked;
  settings.redirectUrl = document.getElementById("redirectUrl").value;
  settings.redirectType = document.querySelector(
    'input[name="redirectType"]:checked'
  )?.value;
  settings.blockMode = document.querySelector(
    'input[name="blockMode"]:checked'
  )?.value;

  saveSettings(settings);
});

// Save blocked domains
document.getElementById("saveDomains").addEventListener("click", function () {
  saveDomains(settings);
});

// Save blocked keywords
document.getElementById("saveKeywords").addEventListener("click", function () {
  saveKeywords(settings);
});

// Save whitelisted domains
document.getElementById("allowDomains").addEventListener("click", function () {
  saveWhitelists(settings);
});

// Clear activity
function clearActivites() {
  storage.setItem("domainStats", domainStats, (result) => {
    if (!result) {
      console.error("Error clearing activies...");
    }
  });
}

// Clear activities logs
document
  .getElementById("clearActivites")
  .addEventListener("click", function () {
    domainStats = {};
    clearActivites();
    document.getElementById("activityList").innerHTML =
      "No data yet. Start browsing...";
    showToast("Activities Cleared", "All activity logs have been cleared.");
  });

// Export settings
document
  .getElementById("exportSettings")
  .addEventListener("click", function () {
    exportConfigs(settings);
  });

// Import settings
document
  .getElementById("importSettings")
  .addEventListener("click", function () {
    importConfigs(settings);
  });

// Save Password
document.getElementById("savePassword").addEventListener("click", function () {
  authHandler.save();
});

// Reset Password
document
  .getElementById("updatePassword")
  .addEventListener("click", function () {
    authHandler.update();
  });

// login with Password
document.getElementById("loginBtn").addEventListener("click", function () {
  authHandler.login();
});

// Logout
document.getElementById("logout").addEventListener("click", function () {
  authHandler.logout(security);
});

// On click enable/disable protection
document
  .getElementById("toggleProtection")
  .addEventListener("click", function () {
    authHandler.toggle();
  });
