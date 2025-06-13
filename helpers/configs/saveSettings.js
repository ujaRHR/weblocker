/* Date: May 29, 2025
 * Author: Reajul Hasan Raju
 * Helper: To save settings data into chrome extension's local storage as object
 * Source: https://github.com/ujaRHR/weblocker
 */

import { showToast } from "../../libs/toast.js";
import { storage } from "../../libs/storage.js";
import { updateUI } from "../ui/updateUI.js";

export function saveSettings(settings) {
  storage.setItem("weblockerSettings", settings, (res) => {
    if (res) {
      showToast(
        "Settings Saved",
        "General settings have been successfully updated."
      );
      updateUI(settings);
    } else {
      console.error("Error saving settings to storage");
      showToast(
        "Failed to Save Settings",
        "Something went wrong! Refresh the page and try again.",
        "error"
      );
    }
  });
}
