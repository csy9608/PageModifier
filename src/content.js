const DEFAULT = "option";
const CLICKED = "clicked";
const NON_CLICKED = "non-clicked";

var defaultColor = "#ffff00"; // yellow
var highlightColor = defaultColor;
var mode = null;

const addEffect = () => {
  if (mode == null) {
    return;
  }
  var selection = window.getSelection();
  if (selection.toString().length > 0) {
    var span = document.createElement("span");
    var range = selection.getRangeAt(0);

    if (mode == "highlight") {
      span.style.backgroundColor = highlightColor;
    } else {
      span.className += " " + mode;
    }
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
  colorPicker.className = DEFAULT;
  colorPicker.onchange = e => setHighlightColor(e.target.value);

  e.appendChild(colorPicker);
}

function addTextOptions(e) {
  function newOption(tag, properties) {
    var element = document.createElement(tag);
    Object.entries(properties).forEach(p => {
      element.setAttribute(p[0], p[1]);
    });
    element.className += " " + DEFAULT + " " + NON_CLICKED;
    element.onclick = onClickHandler;

    e.appendChild(element);
    options.push(element);
    return element;
  }

  function replaceClass(elem, org_str, new_str) {
    elem.className = elem.className
      .split(" ")
      .map(c => (c == org_str ? new_str : c))
      .join(" ");
  }

  function clearBackgroundColor() {
    options.forEach(o => {
      replaceClass(o, CLICKED, NON_CLICKED);
    });
  }

  function onClickHandler(elem) {
    clearBackgroundColor();
    mode = elem.target.getAttribute("mode");
    replaceClass(elem.target, NON_CLICKED, CLICKED);
  }

  var options = [];
  newOption("div", {
    class: "bold",
    mode: "bold"
  }).innerText = "B";
  newOption("div", {
    class: "italic",
    mode: "italic"
  }).innerText = "I";
  newOption("img", {
    src: chrome.runtime.getURL("images/marker32.png"),
    mode: "highlight"
  });
  newOption("div", {
    class: "underline",
    mode: "underline"
  }).innerText = "U";
}

function addOptionBox(e) {
  var container = document.createElement("div");
  container.id = "option_box";

  addTextOptions(container);
  addColorPicker(container);
  e.appendChild(container);
}

function bindEvents(e) {
  e.addEventListener("mouseup", addEffect);
}

bindEvents(document);
addOptionBox(document.body);
