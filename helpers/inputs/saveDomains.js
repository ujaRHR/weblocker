/* Date: June 03, 2025
 * Author: Reajul Hasan Raju
 * Helper: To save inserted domains into chrome extension's local storage
 * Source: https://github.com/ujaRHR/weblocker
 */

import { isValidDomain } from "../../libs/domainValidator.js";
import { saveSettings } from "../configs/saveSettings.js";

export function saveDomains(settings) {
  let value = document.getElementById("blockedDomains").value;

  if (value.length >= 0) {
    value = value.replace(/^(?:(ht|f)tp(s?)\:\/\/)?/gm, "");
    const allDomains = value.split("\n").map((d) => d.trim());
    const validDomains = allDomains.filter((d) => d !== "" && isValidDomain(d));
    const invalidDomains = allDomains.filter((d) => d && !isValidDomain(d));

    settings.blockedDomains = [...new Set(validDomains)];
    saveSettings(settings);

    if (invalidDomains.length > 0) {
      const domainsWarning = document.getElementById("domainsWarning");

      domainsWarning.textContent = `Invalid domains skipped: ${invalidDomains.join(
        ", "
      )}`;
      domainsWarning.classList.remove("hidden");
    } else {
      domainsWarning.textContent = "";
      domainsWarning.classList.add("hidden");
    }
  }
}
