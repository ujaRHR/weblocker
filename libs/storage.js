/* Date: May 29, 2025
 * Author: Reajul Hasan Raju
 * Library: To frequently access into chrome extension's local storage (get, set)
 * Source: https://github.com/ujaRHR/weblocker
 */

export const storage = {};

// Get items from Storage
storage.getItem = (keyName, callback) => {
  chrome.storage.local.get([keyName], (result) => {
    if (chrome.runtime.lastError || result[keyName] === undefined) {
      callback(null);
    } else {
      callback(result[keyName]);
    }
  });
};

// Set items to Storage
storage.setItem = (keyName, value, callback) => {
  chrome.storage.local.set({ [keyName]: value }, () => {
    if (chrome.runtime.lastError) {
      callback(false);
    } else {
      callback(true);
    }
  });
};
