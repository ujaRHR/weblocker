/* Date: June 03, 2025
 * Author: Reajul Hasan Raju
 * Helper: To save inserted keywords into chrome extension's local storage
 * Source: https://github.com/ujaRHR/weblocker
 */

import { isValidKeyword } from "../../libs/keywordValidator.js";
import { saveSettings } from "../configs/saveSettings.js";

export function saveKeywords(settings) {
  const keywordsWarning = document.getElementById("keywordsWarning");
  const value = document.getElementById("blockedKeywords").value;

  if (value.trim().length >= 0) {
    const allKeywords = value
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k !== "");

    const validKeywords = [...new Set(allKeywords.filter(isValidKeyword))];
    const invalidKeywords = allKeywords.filter((k) => !isValidKeyword(k));

    settings.blockedKeywords = validKeywords;
    saveSettings(settings);

    if (invalidKeywords.length > 0) {
      keywordsWarning.textContent = `Invalid keywords skipped: ${invalidKeywords.join(
        ", "
      )}`;
      keywordsWarning.classList.remove("hidden");
    } else {
      keywordsWarning.textContent = "";
      keywordsWarning.classList.add("hidden");
    }
  }
}
