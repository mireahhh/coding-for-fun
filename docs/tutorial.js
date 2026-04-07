/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/javascripts/pages/tutorialsCodeDefaults.js
var defaultCodeByRuntime = {
  vanilla: "const app = document.getElementById(\"app\");\n\napp.innerHTML = \"\";\napp.style.width = \"100%\";\napp.style.height = \"100%\";\napp.style.display = \"flex\";\napp.style.alignItems = \"center\";\napp.style.justifyContent = \"center\";\napp.style.background = \"#F3F4F6\";\n\nconst box = document.createElement(\"div\");\nbox.textContent = \"Vanilla JS works\";\nbox.style.padding = \"16px 20px\";\nbox.style.borderRadius = \"16px\";\nbox.style.background = \"#111827\";\nbox.style.color = \"#FFFFFF\";\nbox.style.fontFamily = \"sans-serif\";\nbox.style.fontSize = \"18px\";\n\napp.appendChild(box);",
  p5: "function setup() {\n  createCanvas(windowWidth, windowHeight);\n  noStroke();\n}\n\nfunction draw() {\n  background(255);\n\n  let step = 40;\n\n  for (let y = 0; y < height; y += step) {\n    for (let x = 0; x < width; x += step) {\n      fill(20);\n      rect(x, y, step * 0.8, step * 0.8);\n    }\n  }\n}"
};
var defaultCodeById = {
  patr1module1tutorial1code1: "function setup() {\n  createCanvas(windowWidth, windowHeight); // \u0441\u043E\u0437\u0434\u0430\u0451\u043C \u0445\u043E\u043B\u0441\u0442 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u043E\u043A\u043D\u0430\n  noStroke(); // \u0443\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0431\u0432\u043E\u0434\u043A\u0443 \u0443 \u0444\u0438\u0433\u0443\u0440\n}\n\nfunction draw() {\n  background(144); // \u043E\u0447\u0438\u0449\u0430\u0435\u043C \u0444\u043E\u043D (\u0431\u0435\u043B\u044B\u0439)\n\n  let step = 40; // \u0448\u0430\u0433 \u0441\u0435\u0442\u043A\u0438 \u2014 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043C\u0435\u0436\u0434\u0443 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C\u0438\n\n  // \u0438\u0434\u0451\u043C \u043F\u043E \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u0438\n  for (let y = 0; y < height; y += step) {\n    // \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u0438 \u0438\u0434\u0451\u043C \u043F\u043E \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u0438\n    for (let x = 0; x < width; x += step) {\n      rect(x, y, step * 0.8); // \u0440\u0438\u0441\u0443\u0435\u043C \u043A\u0432\u0430\u0434\u0440\u0430\u0442 \u0447\u0443\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 \u0448\u0430\u0433\u0430\n    }\n  }\n}",
  patr1module1tutorial1code2: "function setup() {\n  createCanvas(320, 320);\n  noStroke();\n}\n\nfunction draw() {\n  background(144);\n\n  let step = 40;\n\n  for (let y = 0; y < height; y += step) {\n    for (let x = 0; x < width; x += step) {\n\n      // \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u043C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u0444\u0438\u0433\u0443\u0440\u044B\n      let size = step * random(0.3, 1);\n\n      rect(x, y, size); // \u0442\u0435\u043F\u0435\u0440\u044C \u043A\u0430\u0436\u0434\u0430\u044F \u044F\u0447\u0435\u0439\u043A\u0430 \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u043F\u043E-\u0440\u0430\u0437\u043D\u043E\u043C\u0443\n    }\n  }\n\n  noLoop();\n}",
  patr1module1tutorial1code3: "function setup() {\n  createCanvas(320, 320);\n  noStroke();\n}\n\nfunction draw() {\n  background(144);\n\n  let step = 40;\n\n  for (let y = 0; y < height; y += step) {\n    for (let x = 0; x < width; x += step) {\n\n      // \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439 \u043C\u0435\u043D\u044F\u0442\u044C \u044D\u0442\u043E:\n      let size = step;\n\n      // \u0438\u0434\u0435\u0438:\n      // size = step * (x / width);\n      // size = step * (y / height);\n      // size = step * random();\n\n      rect(x, y, size);\n    }\n  }\n\n  noLoop();\n}"
};
;// ./src/javascripts/pages/tutorialsCodeRuntimes.js
function getBaseStyles() {
  var background = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "transparent";
  return "\n    * {\n      box-sizing: border-box;\n    }\n\n    html, body {\n      margin: 0;\n      padding: 0;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      background: ".concat(background, ";\n    }\n\n    body {\n      position: relative;\n    }\n\n    pre {\n      margin: 0;\n      padding: 12px;\n      white-space: pre-wrap;\n      font-family: monospace;\n      font-size: 13px;\n      line-height: 1.4;\n      color: #B91C1C;\n    }\n  ");
}
function getEmptyHtml() {
  return "\n<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    ".concat(getBaseStyles("transparent"), "\n  </style>\n</head>\n<body></body>\n</html>");
}
function getUnknownRuntimeHtml(runtimeName) {
  return "\n<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    ".concat(getBaseStyles("#FFFFFF"), "\n  </style>\n</head>\n<body>\n  <pre>\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 runtime: ").concat(runtimeName, "</pre>\n</body>\n</html>");
}
function getVanillaHtml(code) {
  return "\n<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    ".concat(getBaseStyles("#FFFFFF"), "\n\n    #app {\n      width: 100%;\n      height: 100%;\n    }\n  </style>\n</head>\n<body>\n  <div id=\"app\"></div>\n\n  <script>\n    try {\n      ").concat(code, "\n    } catch (error) {\n      document.body.innerHTML = \"<pre>\" + String(error) + \"</pre>\";\n      console.error(error);\n    }\n  </script>\n</body>\n</html>");
}
function getP5Html(code) {
  return "\n<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    ".concat(getBaseStyles("#FFFFFF"), "\n\n    html, body {\n      margin: 0 !important;\n      padding: 0 !important;\n    }\n\n    #app {\n      width: 100%;\n      height: 100%;\n      margin: 0;\n      padding: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      overflow: hidden;\n      background: #FFFFFF;\n    }\n\n    canvas {\n      display: block;\n      max-width: 100%;\n      max-height: 100%;\n      margin: 0 !important;\n      padding: 0 !important;\n    }\n  </style>\n</head>\n<body>\n  <div id=\"app\"></div>\n\n  <script>\n    window.onerror = function(message, source, lineno, colno, error) {\n      document.body.innerHTML = \"<pre>\" + String(message) + \"</pre>\";\n      console.error(error || message);\n    };\n  </script>\n\n  <script src=\"https://cdn.jsdelivr.net/npm/p5/lib/p5.min.js\"></script>\n\n  <script>\n    try {\n      ").concat(code, "\n\n      if (typeof window.setup === \"function\") {\n        const userSetup = window.setup;\n        window.setup = function () {\n          const result = userSetup();\n\n          const canvas = document.querySelector(\"canvas\");\n          const app = document.getElementById(\"app\");\n\n          if (canvas && app && canvas.parentElement !== app) {\n            app.appendChild(canvas);\n          }\n\n          return result;\n        };\n      }\n    } catch (error) {\n      document.body.innerHTML = \"<pre>\" + String(error) + \"</pre>\";\n      console.error(error);\n    }\n  </script>\n</body>\n</html>");
}
;// ./src/javascripts/pages/tutorial.js
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


function getDefaultCode(blockId, runtime) {
  return defaultCodeById[blockId] || defaultCodeByRuntime[runtime] || "";
}
function buildRuntimeHtml(runtime, code) {
  if (runtime === "p5") {
    return getP5Html(code);
  }
  if (runtime === "vanilla") {
    return getVanillaHtml(code);
  }
  return getUnknownRuntimeHtml(runtime);
}
function showCopyFeedback(button) {
  button.classList.add("is-copied");
  setTimeout(function () {
    button.classList.remove("is-copied");
  }, 800);
}
function copyText(_x) {
  return _copyText.apply(this, arguments);
}
function _copyText() {
  _copyText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(text) {
    var fallbackElement,
      _fallbackElement$sele,
      _args3 = arguments,
      _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          fallbackElement = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
          _context3.p = 1;
          _context3.n = 2;
          return navigator.clipboard.writeText(text);
        case 2:
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t = _context3.v;
          if (fallbackElement) {
            fallbackElement.focus();
            (_fallbackElement$sele = fallbackElement.select) === null || _fallbackElement$sele === void 0 || _fallbackElement$sele.call(fallbackElement);
          }
          document.execCommand("copy");
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return _copyText.apply(this, arguments);
}
function clearFrame(iframe) {
  iframe.srcdoc = getEmptyHtml();
}
function runCode(codeBlock, iframe, textarea, runtime) {
  var code = textarea.value;
  iframe.srcdoc = buildRuntimeHtml(runtime, code);
  codeBlock.classList.add("is-running");
}
function stopCode(codeBlock, iframe) {
  clearFrame(iframe);
  codeBlock.classList.remove("is-running");
}
function resetCode(textarea, defaultCode, codeBlock, iframe) {
  textarea.value = defaultCode;
  stopCode(codeBlock, iframe);
}
function copyCodeFromTextarea(_x2, _x3) {
  return _copyCodeFromTextarea.apply(this, arguments);
}
function _copyCodeFromTextarea() {
  _copyCodeFromTextarea = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(textarea, copyButton) {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return copyText(textarea.value, textarea);
        case 1:
          showCopyFeedback(copyButton);
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _copyCodeFromTextarea.apply(this, arguments);
}
document.querySelectorAll(".O_TutorialSingleCode").forEach(function (codeBlock) {
  var codeBlockId = codeBlock.id;
  var runtime = codeBlock.dataset.runtime;
  var iframe = codeBlock.querySelector(".A_TutorialSingleCodeExecutionCanvas");
  var runButton = codeBlock.querySelector(".A_TutorialSingleCodeExecutionButton");
  var resetButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonRestart");
  var copyButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonCopy");
  var textarea = codeBlock.querySelector(".W_TutorialSingleCodeTextRun");
  if (!iframe || !runButton || !resetButton || !copyButton || !textarea) return;
  var defaultCode = getDefaultCode(codeBlockId, runtime);
  textarea.value = defaultCode;
  function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    var minHeight = 272;
    var maxHeight = 544;
    var nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = "".concat(nextHeight, "px");
  }
  textarea.addEventListener("input", function () {
    autoResizeTextarea(textarea);
  });
  autoResizeTextarea(textarea);
  runButton.addEventListener("click", function () {
    if (codeBlock.classList.contains("is-running")) {
      stopCode(codeBlock, iframe);
    } else {
      runCode(codeBlock, iframe, textarea, runtime);
    }
  });
  resetButton.addEventListener("click", function () {
    resetCode(textarea, defaultCode, codeBlock, iframe);
    autoResizeTextarea(textarea);
  });
  copyButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return copyCodeFromTextarea(textarea, copyButton);
        case 1:
          return _context.a(2);
      }
    }, _callee);
  })));
  clearFrame(iframe);
  if (codeBlock.dataset.autostart === "true") {
    runCode(codeBlock, iframe, textarea, runtime);
  }
});
document.querySelectorAll(".A_TutorialCopyButton").forEach(function (button) {
  button.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var text;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          text = button.closest(".W_TutorialCopyItem").querySelector(".A_TutorialCopyText").innerText;
          _context2.n = 1;
          return copyText(text);
        case 1:
          showCopyFeedback(button);
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  })));
});

// function autoResizeTextarea(textarea) {
//   textarea.style.height = "auto";
//   textarea.style.height = textarea.scrollHeight + "px";
// }

// textarea.addEventListener("input", () => {
//   autoResizeTextarea(textarea);
// });

// autoResizeTextarea(textarea);
/******/ })()
;