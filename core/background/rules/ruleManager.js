import { storage } from "../../../libs/storage.js";
import { generateDomainRules } from "./domainRules.js";
import { generateKeywordRules } from "./keywordRules.js";

const MAX_RULES = 150;

export function updateRulesFromStorage() {
  storage.getItem("weblockerSettings", (result) => {
    const {
      enabled = true,
      redirectUrl = "https://google.com",
      redirectType = "default",
      blockedDomains = [],
      blockedKeywords = [],
      whitelistedDomains = [],
      blockMode = "smart",
    } = result || {};

    if (!enabled) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from({ length: MAX_RULES }, (_, i) => i + 1),
      });
      return;
    }

    const finalRedirectUrl =
      redirectType === "custom" && redirectUrl.startsWith("http")
        ? redirectUrl
        : chrome.runtime.getURL("views/focused.html");

    let id = 1;
    const rules = [];

    // Rules for whitelisted domains
    whitelistedDomains.forEach((domain) => {
      rules.push({
        id: id++,
        priority: 200,
        action: { type: "allow" },
        condition: { urlFilter: `||${domain}^`, resourceTypes: ["main_frame"] },
      });
    });

    // Rules for blocked domains
    const domainRules = generateDomainRules(
      blockedDomains,
      whitelistedDomains,
      finalRedirectUrl,
      id
    );

    rules.push(...domainRules);
    id += domainRules.length;

    // Rules for blocked keywords
    if (blockMode === "smart") {
      const keywordRules = generateKeywordRules(
        blockedKeywords,
        finalRedirectUrl,
        id
      );

      rules.push(...keywordRules);
      id += keywordRules.length;
    }

    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: Array.from({ length: MAX_RULES }, (_, i) => i + 1),
        addRules: rules.slice(0, MAX_RULES),
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(
            "Rule update failed:",
            chrome.runtime.lastError.message
          );
        }
      }
    );
  });
}
