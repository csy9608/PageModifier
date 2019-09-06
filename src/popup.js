let textbox = document.getElementById("highlighted_texts");
let saveBtn = document.getElementById("save_btn");
let resetBtn = document.getElementById("reset_btn");

saveBtn.addEventListener("click", () => {
  exportText(textbox.value);
});
resetBtn.addEventListener("click", () => {
  textbox.value = "";
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.cmd == "new") {
    textbox.value =
      (textbox.value.length > 1 ? textbox.value + "\n" : "") +
      "* " +
      request.data;
    sendResponse({ farewell: "goodbye" });
  }
});

function exportText(texts) {
  var source =
    "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(texts);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = "document.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}
