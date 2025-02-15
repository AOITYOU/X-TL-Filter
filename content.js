// キーワードを含むポストを非表示にする

let keywords = [];

// `keywords.json` を読み込む
fetch(chrome.runtime.getURL("keywords.json"))
  .then((response) => response.json())
  .then((data) => {
    keywords = data.keywords;
  })
  .catch((error) => console.error("キーワードの読み込みに失敗:", error));

function hideTweets() {
  chrome.storage.local.get("filterEnabled", (data) => {
    if (!data.filterEnabled) return;

    // タイムラインのポストを取得
    const posts = document.querySelectorAll("article");

    posts.forEach((post) => {
      const textElement = post.querySelector("div[data-testid='tweetText']");
      if (!textElement) return;

      const textContent = textElement.innerText.toLowerCase();

      // 指定されたキーワードが含まれているかチェック
      if (
        keywords.some((keyword) => textContent.includes(keyword.toLowerCase()))
      ) {
        post.style.display = "none";
      }
    });
  });
}

// 定期的にチェック（0.1秒ごと）
setInterval(hideTweets, 100);
