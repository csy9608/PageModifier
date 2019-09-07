var highlights = {};

function bindEvents(el) {
  var idx = 0;

  el.addEventListener("mouseup", element => {
    var selection = window.getSelection();
    var content = selection.toString();

    if (content.length > 0) {
      var span = getHighligheter(idx);
      var range = selection.getRangeAt(0);

      var exists = false;
      for (var j = 0; j < Object.keys(highlights).length; j++) {
        var same_start = range.compareBoundaryPoints(
          Range.START_TO_START,
          highlights[j]
        );
        var same_end = range.compareBoundaryPoints(
          Range.END_TO_END,
          highlights[j]
        );
        if (same_start >= 0 && same_end <= 0) {
          exists = true;
        }
      }

      if (!exists) {
        span.appendChild(range.extractContents());
        range.insertNode(span);

        if (content.length > 0) {
          chrome.runtime.sendMessage(
            {
              message: "background",
              cmd: "add",
              data: { idx: idx, content: content }
            },
            function(response) {
              console.log(response);
            }
          );
          highlights[idx] = range;
          idx += 1;
        }
      }
    }
  });
}

const highlightLabel = () => {
  var label = document.createElement("span");
  label.style.background = "red";
  // label.style.fontSize = "15px";
  label.style.color = "white";
  label.style.display = "inline";
  label.style.marginRight = "5px";
  return label;
};

const highlightBlock = () => {
  var span = document.createElement("span");
  span.title = "content sample";
  span.className = "selection";
  span.style.backgroundColor = "yellow";
  span.style.whiteSpace = "nowrap";
  span.style.border = "1px solid red";
  return span;
};

function getHighligheter(idx) {
  labels = ["T", "C"];
  label_idx = 0;

  var span = highlightBlock();
  var label = highlightLabel();
  label.innerText = labels[label_idx];
  span.appendChild(label);

  span.addEventListener("click", () => {
    label_idx = (label_idx + 1) % labels.length;
    label.innerText = labels[label_idx];
    chrome.runtime.sendMessage(
      {
        message: "background",
        cmd: "update",
        data: { idx: idx, type: label_idx }
      },
      function(response) {
        console.log(response);
      }
    );

    span.addEventListener("dblclick", () => {
      // var children = span.childNodes;
      // for (var i = 0; i < children.length; i++) {
      //   span.parentNode.appendChild(children[i]);
      // }
      span.style.background = "";
      span.style.border = "";

      label.remove();
      delete highlights[idx];

      chrome.runtime.sendMessage(
        {
          message: "background",
          cmd: "delete",
          data: { idx: idx }
        },
        function(response) {
          console.log(response);
        }
      );
    });
  });

  return span;
}
bindEvents(document);
