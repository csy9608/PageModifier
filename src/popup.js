let textbox = document.getElementById("highlighted_texts");
let saveBtn = document.getElementById("save_btn");
let resetBtn = document.getElementById("reset_btn");
let titleBtn = document.getElementById("title_btn");
let contentBtn = document.getElementById("content_btn");
var records = {};

saveBtn.addEventListener("click", () => {
  exportText(textbox.value);
});
resetBtn.addEventListener("click", () => {
  textbox.value = "";
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "popup") {
    var content = request.data ? request.data.content : null;
    var idx = request.data ? request.data.idx : null;
    var type = request.data ? request.data.type : null;

    if (request.cmd == "add") {
      records[idx] = { content: content, type: 0 };
    } else if (request.cmd == "update") {
      records[idx].type = type;
    } else if (request.cmd == "delete") {
      console.log(idx);
      delete records[idx];
    }
    textbox.value = formatRecords(records);
    sendResponse({ farewell: "goodbye" });
  }
});

function formatRecords(records_) {
  var formated = "";
  for (var i = 0; i < Object.keys(records).length; i++) {
    var content = records_[i].content;
    var type = records_[i].type;

    if (type == 0) {
      formated += "[" + content + "]";
    } else if (type == 1) {
      formated += "- " + content;
    } else {
      formated += content;
    }
    formated += "\n";
  }
  return formated;
}

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
