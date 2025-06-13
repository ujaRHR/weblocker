/* Date: May 31, 2025
 * Author: Reajul Hasan Raju
 * Helper: To import backup data from .json file
 * Source: https://github.com/ujaRHR/weblocker
 */

import { showToast } from "../../libs/toast.js";
import { saveSettings } from "../configs/saveSettings.js";
import { loadSettings } from "../configs/loadSettings.js";
import { updateUI } from "../ui/updateUI.js";

export function importConfigs(settings) {
  document.getElementById("fileInput").click();
  document.getElementById("fileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const importedSettings = JSON.parse(e.target.result);
          settings = { ...settings, ...importedSettings };
          saveSettings(settings);

          loadSettings((loadedSettings) => {
            Object.assign(settings, loadedSettings);
            updateUI(loadedSettings);
          });

          showToast(
            "Settings Imported",
            "Your settings have been imported successfully.",
            "success"
          );
        } catch (error) {
          showToast(
            "Import Error",
            "Failed to import settings. Please check the file format.",
            "error"
          );
        }
      };
      reader.readAsText(file);
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  });
}
