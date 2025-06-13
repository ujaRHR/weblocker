/* Date: May 31, 2025
 * Author: Reajul Hasan Raju
 * Helper: To export settings data into a .json file
 * Source: https://github.com/ujaRHR/weblocker
 */

import { showToast } from "../../libs/toast.js";

export function exportConfigs(settings) {
  const dataStr = JSON.stringify(settings, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  
  try {
    link.href = url;
    link.download = `weblocker_settings_${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showToast(
      "Settings exported",
      "Your settings have been exported successfully."
    );
  } catch (error) {
    showToast(
      "Export Error",
      "Failed to export the settings. Please check the settings properly.",
      "error"
    );
  }
}
