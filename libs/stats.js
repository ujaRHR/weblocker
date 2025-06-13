/* Date: June 06, 2025
 * Author: Reajul Hasan Raju
 * Library: To store stats of recent/most visited websites
 * Source: https://github.com/ujaRHR/weblocker
 */

import { storage } from "./storage.js";

let currentDomain = null;
let startTime = null;

function getDomainFromUrl(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function updateStats(domain, timeSpent) {
  storage.getItem("domainStats", (res) => {
    const stats = res || {};
    stats[domain] = (stats[domain] || 0) + timeSpent;

    storage.setItem("domainStats", stats, (res) => {
      if (!res) {
        console.log("Failed to set domainStats -_- ");
      }
    });
  });
}

function handleTabChange(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (chrome.runtime.lastError || !tab || !tab.url) return;

    const domain = getDomainFromUrl(tab.url);
    const now = Date.now();

    if (currentDomain && startTime) {
      const duration = Math.floor((now - startTime) / 1000);
      updateStats(currentDomain, duration);
    }

    currentDomain = domain;
    startTime = now;
  });
}

function handleWindowBlur() {
  if (currentDomain && startTime) {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    updateStats(currentDomain, duration);
  }

  currentDomain = null;
  startTime = null;
}

// Browser Tab Listener
chrome.tabs.onActivated.addListener(handleTabChange);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleTabChange({ tabId: tab.id });
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    handleWindowBlur();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) handleTabChange({ tabId: tabs[0].id });
    });
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) handleTabChange({ tabId: tabs[0].id });
  });
});

chrome.runtime.onSuspend.addListener(handleWindowBlur);
