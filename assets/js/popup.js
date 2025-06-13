// Load current tab info and runtime from chrome.storage.local
document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentUrl = new URL(tab.url);
  document.getElementById("current-url").textContent = currentUrl.hostname;

  chrome.storage.local.get("weblockersettings", (result) => {
    const settings = result.weblockersettings || {};
    const started = settings.startedAt ? new Date(settings.startedAt) : null;

    if (started) {
      const diffMs = Date.now() - started.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      document.getElementById(
        "running-time"
      ).textContent = `${diffMins} minute(s)`;
    } else {
      document.getElementById("running-time").textContent = "Just started";
    }

    // Check if current URL is blocked
    const blocklist = settings.blocked || [];
    const isBlocked = blocklist.some((domain) =>
      currentUrl.hostname.includes(domain)
    );

    const statusEl = document.getElementById("block-status");
    statusEl.textContent = isBlocked ? "🚫 Blocked" : "✅ Allowed";
    statusEl.className = isBlocked
      ? "mt-1 font-medium text-red-600"
      : "mt-1 font-medium text-green-600";
  });

  // Add current URL to blocklist
  document.getElementById("block-current").addEventListener("click", () => {
    chrome.storage.local.get("weblockersettings", (result) => {
      const settings = result.weblockersettings || {};
      settings.blocked = settings.blocked || [];
      const hostname = currentUrl.hostname;

      if (!settings.blocked.includes(hostname)) {
        settings.blocked.push(hostname);
        chrome.storage.local.set({ weblockersettings: settings }, () => {
          document.getElementById("block-status").textContent = "🚫 Blocked";
          document.getElementById("block-status").className =
            "mt-1 font-medium text-red-600";
        });
      }
    });
  });

  document.getElementById("open-settings").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
});
