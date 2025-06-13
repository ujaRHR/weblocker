import { storage } from "../../../libs/storage.js";

export function showStatus() {
  storage.getItem("weblockerSettings", (settings) => {
    if (!settings) return;

    const extStatus = document.getElementById("extensionStatus");
    const ping1 = document.getElementById("ping1");
    const ping2 = document.getElementById("ping2");

    const isEnabled = settings.enabled === true;

    extStatus.textContent = isEnabled ? "Active" : "Inactive";
    extStatus.classList.add(isEnabled ? "text-green-700" : "text-red-700");

    ping1.classList.add(isEnabled ? "bg-green-400" : "bg-red-400");
    ping2.classList.add(isEnabled ? "bg-green-500" : "bg-red-500");

    document.getElementById("blockedDomains").textContent = (
      settings.blockedDomains || []
    ).length;

    document.getElementById("blockedKeywords").textContent = (
      settings.blockedKeywords || []
    ).length;
  });
}
