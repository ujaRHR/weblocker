import { makeKeywordFilter } from "../utils/filters.js";

export function generateKeywordRules(blockedKeywords, redirectUrl, startId) {
  const rules = [];
  const filters = blockedKeywords.map(makeKeywordFilter).filter(Boolean);

  filters.forEach((filter) => {
    rules.push({
      id: startId++,
      priority: 1,
      action: { type: "redirect", redirect: { url: redirectUrl } },
      condition: { urlFilter: filter, resourceTypes: ["main_frame"] },
    });
  });

  return rules;
}
