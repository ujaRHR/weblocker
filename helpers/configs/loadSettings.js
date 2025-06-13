/* Date: June 02, 2025
 * Author: Reajul Hasan Raju
 * Helper: To load settings data from chrome extension's local storage
 * Source: https://github.com/ujaRHR/weblocker
 */

import { storage } from "../../libs/storage.js";
import { updateUI } from "../ui/updateUI.js";
import {
  disableUrlInput,
  switchDescription,
} from "../inputs/generalSettings.js";

export function loadSettings(callback) {
  storage.getItem("weblockerSettings", (settingsData) => {
    const settings = settingsData || {
      enabled: true,
      redirectUrl: "https://google.com",
      redirectType: "default",
      blockMode: "smart",
      blockedDomains: [],
      blockedKeywords: [],
      whitelistedDomains: [],
    };

    storage.getItem("security", (securityData) => {
      const security = securityData || {
        enabled: false,
        auth: false,
        password: "",
        nextLogin: Date.now(),
      };

      updateUI(settings);
      disableUrlInput(settings);
      switchDescription(settings);

      if (callback) {
        callback(settings, security);
      }
    });
  });
}
