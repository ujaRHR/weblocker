/* Date: June 04, 2025
 * Author: Reajul Hasan Raju
 * Helper: To save inserted whitelisted domains into chrome extension's local storage
 * Source: https://github.com/ujaRHR/weblocker
 */

import { isValidDomain } from "../../libs/domainValidator.js";
import { saveSettings } from "../configs/saveSettings.js";

export function saveWhitelists(settings) {
  let value = document.getElementById("whitelistedDomains").value;

  if (value.length >= 0) {
    value = value.replace(/^(?:(ht|f)tp(s?)\:\/\/)?/gm, "");
    const allDomains = value.split("\n").map((d) => d.trim());
    const validDomains = allDomains.filter((d) => d !== "" && isValidDomain(d));
    const invalidDomains = allDomains.filter((d) => d && !isValidDomain(d));

    settings.whitelistedDomains = [...new Set(validDomains)];
    saveSettings(settings);

    if (invalidDomains.length > 0) {
      const whitelistWarning = document.getElementById("whitelistWarning");

      whitelistWarning.textContent = `Invalid domains skipped: ${invalidDomains.join(
        ", "
      )}`;
      whitelistWarning.classList.remove("hidden");
    } else {
      whitelistWarning.textContent = "";
      whitelistWarning.classList.add("hidden");
    }
  }
}
