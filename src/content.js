var defaultColor = "#ffff00"; // yellow
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
};

const setHighlightColor = color => {
  highlightColor = color;
};

function addColorPicker(e) {
  var colorPicker = document.createElement("input");

  colorPicker.type = "color";
  colorPicker.value = defaultColor;
  colorPicker.style.width = "30px";
  colorPicker.onchange = e => setHighlightColor(e.target.value);

  e.appendChild(colorPicker);
}

function addTextOptions(e) {
  var boldEffect = document.createElement("div");
  var italicEffect = document.createElement("div");
  var highlightEffect = document.createElement("img");
  var underlineEffect = document.createElement("div");

  boldEffect.innerText = "B";
  boldEffect.style.fontWeight = "bold";
  boldEffect.style.fontSize = "15px";

  italicEffect.innerText = "I";
  italicEffect.style.fontStyle = "italic";
  italicEffect.style.fontSize = "15px";

  highlightEffect.src = chrome.runtime.getURL("images/marker32.png");
  highlightEffect.style.width = "18px";
  highlightEffect.style.height = "18px";

  underlineEffect.innerText = "U";
  underlineEffect.style.fontSize = "15px";
  underlineEffect.style.textDecoration = "underline";

  e.appendChild(boldEffect);
  e.appendChild(italicEffect);
  e.appendChild(underlineEffect);
  e.appendChild(highlightEffect);
}

function addOptionBox(e) {
  var container = document.createElement("div");
  container.id = "option_box";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "10px";
  container.style.border = "solid 1px black";
  container.style.backgroundColor = "white";
  container.style.paddingTop = "5px";
  container.style.paddingBottom = "5px";
  container.style.display = "flex";
  container.style.justifyContent = "space-evenly";
  container.style.width = "150px";

  addTextOptions(container);
  addColorPicker(container);
  e.appendChild(container);
}

function bindEvents(e) {
  e.addEventListener("mouseup", element => {
    highlight();
  });
}

bindEvents(document);
addOptionBox(document.body);
