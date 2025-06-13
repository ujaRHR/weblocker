import { storage } from "../../../libs/storage.js";
import { formatTime } from "../../../helpers/utils/time.js";

export function usageStats() {
  storage.getItem("domainStats", (domainStats) => {
    if (domainStats && Object.keys(domainStats).length > 0) {
      const topDomains = Object.entries(domainStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const maxTime = topDomains[0]?.[1] ?? 1;
      const usageRows = document.querySelectorAll(".usageRow");

      usageRows.forEach((row, i) => {
        const data = topDomains[i];

        if (data) {
          const [domain, time] = data;
          const widthPercent = Math.round((time / maxTime) * 100);

          row.querySelector(".domains").textContent = domain;
          row.querySelector(".timeSpent").textContent = formatTime(time);
          row.querySelector(".widthPercent").style.width = `${widthPercent}%`;
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    } else {
      document.getElementById("usageSummary").innerHTML =
        "No data yet. Start browsing...";
    }
  });
}
