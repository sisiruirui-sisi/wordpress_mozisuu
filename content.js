chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCount") {
    // ブログ投稿（post-type-post）かチェック
    const isBlog = document.body.classList.contains('post-type-post');
    
    if (isBlog) {
      const editor = document.querySelector('.editor-styles-wrapper') || document.querySelector('#content');
      const text = editor ? editor.innerText : "";
      sendResponse({ count: text.trim().length });
    } else {
      sendResponse({ count: "（ブログ以外）" });
    }
  }
  return true; 
});