function updateDisplay() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // タブが存在しない、またはURLが許可されていない場合に備えたエラーハンドリング
    if (!tabs[0]) return;

    chrome.tabs.sendMessage(tabs[0].id, { action: "getCount" }, (response) => {
      const display = document.getElementById('result');
      
      // 接続エラーが起きた場合（ページを更新した直後など）の対策
      if (chrome.runtime.lastError) {
        display.innerText = "接続中...";
        return;
      }

      if (response && response.count !== undefined) {
        // 数字以外（「（ブログ以外）」など）が返ってきた場合も考慮
        display.innerText = typeof response.count === 'number' 
          ? response.count.toLocaleString() + " 文字" 
          : response.count;
      } else {
        display.innerText = "投稿画面ではありません";
      }
    });
  });
}

// 1. ポップアップを開いた瞬間に一度実行
updateDisplay();

// 2. その後、1000ミリ秒（1秒）ごとに繰り返し実行
setInterval(updateDisplay, 1000);