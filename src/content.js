var defaultColor = "#ffff00";  // yellow
var highlightColor = defaultColor;

const highlight = () => {
  var selection = window.getSelection();

  if (selection.toString().length > 0) {
    var span = document.createElement("span");
    var range = selection.getRangeAt(0);

    span.style.backgroundColor = highlightColor;
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }
}

const setHighlightColor = (color) => {
  highlightColor = color;
}

function addColorPicker(e) {
  var container = document.createElement("div");
  var label = document.createElement("label");
  var colorPicker = document.createElement("input");

  label.innerText = "Color";
  colorPicker.type = "color";
  colorPicker.value = defaultColor;
  colorPicker.onchange = (e) => setHighlightColor(e.target.value);

  container.appendChild(label);
  container.appendChild(colorPicker);
  e.appendChild(container);
}

function addOptionBox(e) {
  var container = document.createElement("div");
  container.id = "option_box";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "10px";
  container.style.border = "solid 1px black";
  container.style.backgroundColor = "white";
  container.style.padding = "10px";

  addColorPicker(container)
  e.appendChild(container);
}

function bindEvents(e) {
  e.addEventListener("mouseup", element => {
    highlight();
  });
}

bindEvents(document);
addOptionBox(document.body);
