chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });

  chrome.windows.create({
    url: "popup.html",
    type: "panel",
    width: 300,
    height: 200
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );

    if (request.cmd == "add") {
      chrome.runtime.sendMessage({ cmd: "new", data: request.data }, function(
        response
      ) {
        console.log(response);
      });
      sendResponse({ farewell: "goodbye" });
    }
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
