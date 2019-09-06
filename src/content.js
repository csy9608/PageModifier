highlights = [];

function bindEvents(el) {
  el.addEventListener("mouseup", element => {
    var selection = window.getSelection();
    var content = selection.toString();
    for (var i = 0; i < selection.rangeCount; i++) {
      selection.getRangeAt(i).surroundContents(getHighligheter());
      if (content.length > 0) {
        chrome.runtime.sendMessage({ cmd: "add", data: content }, function(
          response
        ) {
          console.log(response);
        });
      }
    }
  });
}

function getHighligheter() {
  var span = document.createElement("span");
  span.className = "selection";
  span.style.backgroundColor = "yellow";
  return span;
}
bindEvents(document);
