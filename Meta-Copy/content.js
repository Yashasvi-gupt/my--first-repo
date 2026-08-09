function getPageMetaData() {
  const title = document.title || "";
  const descriptionTag = document.querySelector('meta[name="description"]');
  const description = descriptionTag ? descriptionTag.getAttribute('content') || "" : "";

  return {
    title,
    description: description || "No meta description found"
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMetaData') {
    sendResponse(getPageMetaData());
  }
});
