// ON/OFFボタンの動作

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleFilter");

  // 現在の状態を取得
  chrome.storage.local.get("filterEnabled", (data) => {
    const isEnabled = data.filterEnabled ?? false;
    updateButton(isEnabled);
  });

  // ボタンのクリックでON/OFF切り替え
  toggleButton.addEventListener("click", () => {
    chrome.storage.local.get("filterEnabled", (data) => {
      const newState = !data.filterEnabled;
      chrome.storage.local.set({ filterEnabled: newState });
      updateButton(newState);

      // content.js に変更を通知
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => location.reload(), // ページ更新でフィルタ適用
          });
        }
      });
    });
  });

  function updateButton(isEnabled) {
    toggleButton.textContent = isEnabled ? "ON" : "OFF";
    toggleButton.classList.toggle("active", isEnabled);
  }
});
