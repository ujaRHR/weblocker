import { makeDomainFilter } from "../utils/filters.js";

export function generateDomainRules(
  blockedDomains,
  whitelistedDomains,
  redirectUrl,
  startId = 1
) {
  const rules = [];
  const filters = blockedDomains.map(makeDomainFilter).filter(Boolean);
  const whiteFilters = whitelistedDomains.map(makeDomainFilter).filter(Boolean);

  filters.forEach((filter) => {
    if (!whiteFilters.includes(filter)) {
      rules.push({
        id: startId++,
        priority: 100,
        action: { type: "redirect", redirect: { url: redirectUrl } },
        condition: { urlFilter: filter, resourceTypes: ["main_frame"] },
      });
    }
  });

  return rules;
}
