import { updateRulesFromStorage } from "../rules/ruleManager.js";

export function registerListeners() {
  chrome.runtime.onInstalled.addListener(updateRulesFromStorage);
  chrome.runtime.onStartup.addListener(updateRulesFromStorage);
  chrome.storage.onChanged.addListener(updateRulesFromStorage);
}
