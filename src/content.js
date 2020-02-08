const highlight = (color) => {
  var selection = window.getSelection();

  if (selection.toString().length > 0) {
    var span = document.createElement("span");
    var range = selection.getRangeAt(0);

    span.style.backgroundColor = color;
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }
}

function bindEvents(el) {
  el.addEventListener("mouseup", element => {
    highlight("yellow");
  });
}

bindEvents(document);
