import { storage } from "../../../libs/storage.js";

export function blockCurrentDomain() {
  const warning = document.getElementById("blockingWarning");
  document.getElementById("blockBtn").addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab || !tab.url) {
        warning.classList.remove("hidden");
        warning.classList.add("text-red-800", "bg-red-200");
        warning.textContent = "Unable to get current tab.";
      }

      const url = new URL(tab.url);
      const domain = url.hostname;

      storage.getItem("weblockerSettings", (data) => {
        const settings = data || {
          enabled: true,
          redirectUrl: "https://google.com",
          redirectType: "default",
          blockMode: "smart",
          blockedDomains: [],
          blockedKeywords: [],
          whitelistedDomains: [],
        };

        const blockedDomains = settings.blockedDomains;

        if (blockedDomains.includes(domain)) {
          warning.classList.remove("hidden");
          warning.classList.add("text-red-800", "bg-red-200");
          warning.textContent = `${domain} is already blocked.`;
        } else {
          blockedDomains.push(domain);

          storage.setItem("weblockerSettings", settings, (res) => {
            if (res) {
              warning.classList.remove("hidden");
              warning.classList.add("text-green-800", "bg-green-200");
              warning.textContent = `Blocked "${domain}" successfully.`;
            }
          });
        }
      });
    } catch (err) {
      warning.classList.remove("hidden");
      warning.classList.add("text-red-800", "bg-red-200");
      warning.textContent = "Failed to block current website.";
    }
  });
}
