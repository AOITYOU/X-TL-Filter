// ストレージ管理

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ filterEnabled: false });
});
