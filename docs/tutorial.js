/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/javascripts/pages/tutorialsCodeDefaults.js
var defaultCodeByRuntime = {
  vanilla: "const app = document.getElementById(\"app\");\n\napp.innerHTML = \"\";\napp.style.width = \"100%\";\napp.style.height = \"100%\";\napp.style.display = \"flex\";\napp.style.alignItems = \"center\";\napp.style.justifyContent = \"center\";\napp.style.background = \"#F3F4F6\";\n\nconst box = document.createElement(\"div\");\nbox.textContent = \"Vanilla JS works\";\nbox.style.padding = \"16px 20px\";\nbox.style.borderRadius = \"16px\";\nbox.style.background = \"#111827\";\nbox.style.color = \"#FFFFFF\";\nbox.style.fontFamily = \"sans-serif\";\nbox.style.fontSize = \"18px\";\n\napp.appendChild(box);",
  p5: "function setup() {\n  createCanvas(windowWidth, windowHeight);\n  noStroke();\n}\n\nfunction draw() {\n  background(255);\n\n  let step = 40;\n\n  for (let y = 0; y < height; y += step) {\n    for (let x = 0; x < width; x += step) {\n      fill(20);\n      rect(x, y, step * 0.8, step * 0.8);\n    }\n  }\n}",
  three: "const width = app.clientWidth;\nconst height = app.clientHeight;\n\n// \u0441\u0446\u0435\u043D\u0430\nconst scene = new THREE.Scene();\nscene.background = new THREE.Color(0xffffff);\n\n// \u043A\u0430\u043C\u0435\u0440\u0430\nconst camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);\ncamera.position.z = 3;\n\n// \u0440\u0435\u043D\u0434\u0435\u0440\u0435\u0440\nconst renderer = new THREE.WebGLRenderer({ antialias: true });\nrenderer.setSize(width, height);\nrenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n\napp.innerHTML = \"\";\napp.appendChild(renderer.domElement);\n\n// \u043E\u0431\u044A\u0435\u043A\u0442\nconst geometry = new THREE.BoxGeometry(1, 1, 1);\nconst material = new THREE.MeshNormalMaterial();\nconst cube = new THREE.Mesh(geometry, material);\nscene.add(cube);\n\n// resize\nfunction onResize() {\n  const width = app.clientWidth;\n  const height = app.clientHeight;\n\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n  renderer.setSize(width, height);\n}\n\nwindow.addEventListener(\"resize\", onResize);\n\n// \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044F\nlet animationId;\n\nfunction animate() {\n  cube.rotation.x += 0.01;\n  cube.rotation.y += 0.02;\n\n  renderer.render(scene, camera);\n  animationId = requestAnimationFrame(animate);\n}\n\nanimate();\n\n// cleanup\nreturn () => {\n  cancelAnimationFrame(animationId);\n  window.removeEventListener(\"resize\", onResize);\n\n  geometry.dispose();\n  material.dispose();\n  renderer.dispose();\n};"
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
function getThreeHtml(code) {
  return "\n<!doctype html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    ".concat(getBaseStyles("#FFFFFF"), "\n\n    #app {\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      background: #FFFFFF;\n      position: relative;\n    }\n\n    canvas {\n      display: block;\n      width: 100%;\n      height: 100%;\n    }\n  </style>\n</head>\n<body>\n  <div id=\"app\"></div>\n\n  <script>\n    window.onerror = function(message, source, lineno, colno, error) {\n      document.body.innerHTML = \"<pre>\" + String(message) + \"</pre>\";\n      console.error(error || message);\n    };\n  </script>\n\n  <script type=\"module\">\n    import * as THREE from \"https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js\";\n\n    const app = document.getElementById(\"app\");\n\n    let renderer = null;\n    let animationId = null;\n    let cleanup = null;\n\n    try {\n      const userFunction = new Function(\"THREE\", \"app\", `\n        ").concat(code, "\n      `);\n\n      cleanup = userFunction(THREE, app);\n    } catch (error) {\n      document.body.innerHTML = \"<pre>\" + String(error) + \"</pre>\";\n      console.error(error);\n    }\n\n    window.addEventListener(\"beforeunload\", () => {\n      if (animationId) cancelAnimationFrame(animationId);\n      if (typeof cleanup === \"function\") cleanup();\n    });\n  </script>\n</body>\n</html>");
}
;// ./src/images/gallery/2.png
const _2_namespaceObject = __webpack_require__.p + "images/f931559451b0d938da54.png";
;// ./src/images/gallery/3.png
const _3_namespaceObject = __webpack_require__.p + "images/eb5b44c6a2ad5c7465bc.png";
;// ./src/images/gallery/4.png
const _4_namespaceObject = __webpack_require__.p + "images/e0bfb8dbb50b7fca5862.png";
;// ./src/images/gallery/6.png
const _6_namespaceObject = __webpack_require__.p + "images/51f1bc02fd4172a7f8c4.png";
;// ./src/images/gallery/7.png
const _7_namespaceObject = __webpack_require__.p + "images/060383b41e2b53a9d21d.png";
;// ./src/images/gallery/8.png
const _8_namespaceObject = __webpack_require__.p + "images/a0cab31651150da61521.png";
;// ./src/images/gallery/11.png
const _11_namespaceObject = __webpack_require__.p + "images/9080b9ba0b38fccfea09.png";
;// ./src/images/gallery/12.png
const _12_namespaceObject = __webpack_require__.p + "images/b25f165118498a1b314f.png";
;// ./src/images/gallery/15.png
const _15_namespaceObject = __webpack_require__.p + "images/b093e381409b7701f4f4.png";
;// ./src/images/gallery/16.png
const _16_namespaceObject = __webpack_require__.p + "images/833205226849300caacd.png";
;// ./src/images/gallery/17.png
const _17_namespaceObject = __webpack_require__.p + "images/e09246c5ff8491ff92c4.png";
;// ./src/images/gallery/19.png
const _19_namespaceObject = __webpack_require__.p + "images/f6823c14589fa59ac57b.png";
;// ./src/images/gallery/20.png
const _20_namespaceObject = __webpack_require__.p + "images/36a16585ca0139a3e3ca.png";
;// ./src/images/gallery/24.png
const _24_namespaceObject = __webpack_require__.p + "images/0316108a88707f2c636d.png";
;// ./src/images/gallery/26.png
const _26_namespaceObject = __webpack_require__.p + "images/62f5c4d0479bb774caa5.png";
;// ./src/images/gallery/28.png
const _28_namespaceObject = __webpack_require__.p + "images/d596319b025226ab24cf.png";
;// ./src/images/gallery/29.png
const _29_namespaceObject = __webpack_require__.p + "images/08e8b6660eebf141717c.png";
;// ./src/images/gallery/31.png
const _31_namespaceObject = __webpack_require__.p + "images/52c426c8e5ed3953a9d2.png";
;// ./src/images/gallery/32.png
const _32_namespaceObject = __webpack_require__.p + "images/c24c7fbfb3318a1eb5c8.png";
;// ./src/images/gallery/0.mp4
const _0_namespaceObject = __webpack_require__.p + "21e70a670f469febaf68.mp4";
;// ./src/images/gallery/1.mp4
const _1_namespaceObject = __webpack_require__.p + "653d693ae75a64cbfbfc.mp4";
;// ./src/images/gallery/5.mp4
const _5_namespaceObject = __webpack_require__.p + "7d0e8a4912e2f858b918.mp4";
;// ./src/images/gallery/9.mp4
const _9_namespaceObject = __webpack_require__.p + "0e4a219854d9d0664b9d.mp4";
;// ./src/images/gallery/10.mp4
const _10_namespaceObject = __webpack_require__.p + "8b5cc2487fe3a0ac1201.mp4";
;// ./src/images/gallery/13.mp4
const _13_namespaceObject = __webpack_require__.p + "e56d32e4a036b1182d4b.mp4";
;// ./src/images/gallery/14.mp4
const _14_namespaceObject = __webpack_require__.p + "155edf917ac386e9e355.mp4";
;// ./src/images/gallery/18.mp4
const _18_namespaceObject = __webpack_require__.p + "718dbf5f33f4fc5d9e98.mp4";
;// ./src/images/gallery/21.mp4
const _21_namespaceObject = __webpack_require__.p + "a614f9feb8e16bb1c2e5.mp4";
;// ./src/images/gallery/22.mp4
const _22_namespaceObject = __webpack_require__.p + "4671b52b84dd14c2de6f.mp4";
;// ./src/images/gallery/23.mp4
const _23_namespaceObject = __webpack_require__.p + "d57fa7ec668148fa45c7.mp4";
;// ./src/images/gallery/25.mp4
const _25_namespaceObject = __webpack_require__.p + "2d438ef83c06a465d03f.mp4";
;// ./src/images/gallery/27.mp4
const _27_namespaceObject = __webpack_require__.p + "c6b5ad76b978d3b848d0.mp4";
;// ./src/images/gallery/30.mp4
const _30_namespaceObject = __webpack_require__.p + "987726362f3de08dea36.mp4";
;// ./src/javascripts/json/otherJson.js
var months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
var filtersName = {
  "filterComplexityInitial": "Начальная",
  "filterComplexityMiddle": "Средняя",
  "filterComplexityAdvanced": "Продвинутая",
  "filterLibraryVanillajs": "Vanilla js",
  "filterLibraryP5js": "P5.js",
  "filterLibraryThreejs": "Three.js",
  "filterFormatTechnique": "Техника",
  "filterFormatTask": "Задача",
  "filterFormatVariation": "Вариация",
  "filterVerificationExpert": "Экспертная",
  "filterVerificationAuthorial": "Авторская"
};

// Задание фильтров
// Список доступных фильтров
var filtersComplexity = ["filterComplexityInitial", "filterComplexityMiddle", "filterComplexityAdvanced"];
var filtersLibrary = ["filterLibraryVanillajs", "filterLibraryP5js", "filterLibraryThreejs"];
var filtersFormat = ["filterFormatTechnique", "filterFormatTask", "filterFormatVariation"];
var filtersVerification = ["filterVerificationAuthorial", "filterVerificationExpert"];
var filtersAll = [filtersComplexity, filtersLibrary, filtersFormat, filtersVerification];

// Массивы с фонами
// Изображения



















var galleryImages = {
  2: _2_namespaceObject,
  3: _3_namespaceObject,
  4: _4_namespaceObject,
  6: _6_namespaceObject,
  7: _7_namespaceObject,
  8: _8_namespaceObject,
  11: _11_namespaceObject,
  12: _12_namespaceObject,
  15: _15_namespaceObject,
  16: _16_namespaceObject,
  17: _17_namespaceObject,
  19: _19_namespaceObject,
  20: _20_namespaceObject,
  24: _24_namespaceObject,
  26: _26_namespaceObject,
  28: _28_namespaceObject,
  29: _29_namespaceObject,
  31: _31_namespaceObject,
  32: _32_namespaceObject
};
// Видео














var galleryVideos = {
  0: _0_namespaceObject,
  1: _1_namespaceObject,
  5: _5_namespaceObject,
  9: _9_namespaceObject,
  10: _10_namespaceObject,
  13: _13_namespaceObject,
  14: _14_namespaceObject,
  18: _18_namespaceObject,
  21: _21_namespaceObject,
  22: _22_namespaceObject,
  23: _23_namespaceObject,
  25: _25_namespaceObject,
  27: _27_namespaceObject,
  30: _30_namespaceObject
};
var tags = (/* unused pure expression or super */ null && (["Генеративная графика", "Шум", "Геометрические алгоритмы", "Фракталы", "Параметрические системы", "Волны", "Рекурсия", "Случайность", "Поля векторов", "Симуляции", "Клеточные автоматы", "L-системы", "Процедурная генерация", "Паттерны", "Алгоритмическая анимация", "Частицы", "Интерактивные системы", "Аудиореактивная графика"]));
;// ./src/javascripts/json/tutorialsJson.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Какие фильтры у каких модулей
// p1m1
var tagsPart1Module1Tutorial1 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Определение креативного кода",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  textFirst: ""
};
var tagsPart1Module1Tutorial2 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260129"],
  title: "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438\xA0\u0441\u0440\u0435\u0434\u0430",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module1Tutorial3 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260213"],
  title: "\u0426\u0432\u0435\u0442, \u0444\u043E\u0440\u043C\u0430 \u0438\xA0\u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u044F",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module1 = [tagsPart1Module1Tutorial1, tagsPart1Module1Tutorial2, tagsPart1Module1Tutorial3];
// p1 m2
var tagsPart1Module2Tutorial1 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260220"],
  title: "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0438\xA0\u0443\u0441\u043B\u043E\u0432\u0438\u044F",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module2Tutorial2 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260227"],
  title: "\u0426\u0438\u043A\u043B\u044B: \u0440\u0438\u0442\u043C \u0438\xA0\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module2Tutorial3 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260309"],
  title: "\u041C\u0430\u0441\u0441\u0438\u0432\u044B \u0438\xA0\u043E\u0431\u044A\u0435\u043A\u0442\u044B",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module2Tutorial4 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260315"],
  title: "Генерация случайности",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module2Tutorial5 = {
  complexity: "filterComplexityInitial",
  library: ["filterLibraryP5js", "filterLibraryVanillajs", "filterLibraryThreejs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260319"],
  title: "Паттерны повторов",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart1Module2 = [tagsPart1Module2Tutorial1, tagsPart1Module2Tutorial2, tagsPart1Module2Tutorial3, tagsPart1Module2Tutorial4, tagsPart1Module2Tutorial5];
var tagsPart1 = [tagsPart1Module1, tagsPart1Module2];
// p2 m1
var tagsPart2Module1Tutorial1 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260327"],
  title: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0438\xA0\u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module1Tutorial2 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260327"],
  title: "\u0421\u0442\u0438\u043B\u0438 \u0438\xA0\u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module1Tutorial3 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260327"],
  title: "\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \u0438\xA0\u0441\u043E\u0431\u044B\u0442\u0438\u044F",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module1 = [tagsPart2Module1Tutorial1, tagsPart2Module1Tutorial2, tagsPart2Module1Tutorial3];
// p2 m2
var tagsPart2Module2Tutorial1 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0426\u0438\u043A\u043B \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0438 \u0438\xA0\u0444\u0438\u0433\u0443\u0440\u044B",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module2Tutorial2 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432 \u0441\xA0\u043C\u044B\u0448\u044C\u044E \u0438\xA0\u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u043E\u0439",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module2Tutorial3 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0422\u0430\u0439\u043B\u0438\u043D\u0433 \u0438\xA0\u0434\u0438\u0441\u043F\u043B\u0435\u0439\u0441\u043C\u0435\u043D\u0442",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module2Tutorial4 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Эффекты движения",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module2Tutorial5 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Рисование шумом",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module2 = [tagsPart2Module2Tutorial1, tagsPart2Module2Tutorial2, tagsPart2Module2Tutorial3, tagsPart2Module2Tutorial4, tagsPart2Module2Tutorial5];
// p2 m3
var tagsPart2Module3Tutorial1 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0421\u0446\u0435\u043D\u0430, \u043A\u0430\u043C\u0435\u0440\u0430 \u0438\xA0\u0440\u0435\u043D\u0434\u0435\u0440\u0435\u0440",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module3Tutorial2 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0438 \u0438\xA0\u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module3Tutorial3 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0421\u0432\u0435\u0442 \u0438\xA0\u0442\u0435\u043A\u0441\u0442\u0443\u0440\u044B",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module3Tutorial4 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F \u0438\xA0\u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u043C\u0435\u0440\u043E\u0439",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module3Tutorial5 = {
  complexity: "filterComplexityMiddle",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Импорт моделей",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart2Module3 = [tagsPart2Module3Tutorial1, tagsPart2Module3Tutorial2, tagsPart2Module3Tutorial3, tagsPart2Module3Tutorial4, tagsPart2Module3Tutorial5];
var tagsPart2 = [tagsPart2Module1, tagsPart2Module2, tagsPart2Module3];
// p3 m1
var tagsPart3Module1Tutorial1 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "random() \u0438\xA0noise()",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module1Tutorial2 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Контроль повторяемости",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module1Tutorial3 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Распределения рандомных величин",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module1Tutorial4 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Шумовые текстуры",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module1 = [tagsPart3Module1Tutorial1, tagsPart3Module1Tutorial2, tagsPart3Module1Tutorial3, tagsPart3Module1Tutorial4];
// p3 m2
var tagsPart3Module2Tutorial1 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Рекурсия",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module2Tutorial2 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0424\u0440\u0430\u043A\u0442\u0430\u043B\u044B \u0438\xA0L-\u0441\u0438\u0441\u0442\u0435\u043C\u044B",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module2Tutorial3 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u041C\u043E\u0437\u0430\u0438\u043A\u0438 \u0438\xA0\u0441\u0435\u0442\u043A\u0438",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module2Tutorial4 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Векторные поля",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module2Tutorial5 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Диаграммы Вороного",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module2 = [tagsPart3Module2Tutorial1, tagsPart3Module2Tutorial2, tagsPart3Module2Tutorial3, tagsPart3Module2Tutorial4, tagsPart3Module2Tutorial5];
// p3 m3
var tagsPart3Module3Tutorial1 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Сторонние библиотеки",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module3Tutorial2 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "Применение шейдеров",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module3Tutorial3 = {
  complexity: "filterComplexityAdvanced",
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20251227"],
  title: "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430 \u0438\xA0\u0440\u0435\u0441\u0443\u0440\u0441\u044B",
  author: "digitalnaya",
  link: "https://web.telegram.org/k/#@digitalnaya",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"]
};
var tagsPart3Module3 = [tagsPart3Module3Tutorial1, tagsPart3Module3Tutorial2, tagsPart3Module3Tutorial3];
var tagsPart3 = [tagsPart3Module1, tagsPart3Module2, tagsPart3Module3];
var tagsHandbook = [tagsPart1, tagsPart2, tagsPart3];

// helpers
var toArray = function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === null || value === "") {
    return [];
  }
  return [value];
};

// tutorial -> Set фильтров
var tutorialToFilterSet = function tutorialToFilterSet(tutorial) {
  return new Set([].concat(_toConsumableArray(toArray(tutorial.complexity)), _toConsumableArray(toArray(tutorial.library)), _toConsumableArray(toArray(tutorial.format)), _toConsumableArray(toArray(tutorial.verification))));
};

// module -> Array<Set>
var moduleToTutorialSets = function moduleToTutorialSets(moduleTutorials) {
  return moduleTutorials.map(function (tutorial) {
    return tutorialToFilterSet(tutorial);
  });
};

// module -> Set
var moduleToModuleSet = function moduleToModuleSet(moduleTutorials) {
  var tutorialSets = moduleToTutorialSets(moduleTutorials);
  return new Set(tutorialSets.flatMap(function (tutorialSet) {
    return _toConsumableArray(tutorialSet);
  }));
};

// part -> Array<Set модулей>
var partToModuleSets = function partToModuleSets(partModules) {
  return partModules.map(function (moduleTutorials) {
    return moduleToModuleSet(moduleTutorials);
  });
};
var filtersModules = tagsHandbook.flatMap(function (partModules) {
  return partModules.map(function (moduleTutorials) {
    return moduleToTutorialSets(moduleTutorials);
  });
});
var filtersParts = tagsHandbook.map(function (partModules) {
  return partToModuleSets(partModules);
});
;// ./src/javascripts/pages/tutorial.js
function tutorial_toConsumableArray(r) { return tutorial_arrayWithoutHoles(r) || tutorial_iterableToArray(r) || tutorial_unsupportedIterableToArray(r) || tutorial_nonIterableSpread(); }
function tutorial_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function tutorial_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return tutorial_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? tutorial_arrayLikeToArray(r, a) : void 0; } }
function tutorial_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function tutorial_arrayWithoutHoles(r) { if (Array.isArray(r)) return tutorial_arrayLikeToArray(r); }
function tutorial_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var heading = document.querySelector(".A_IntroHeadingTutorial");
var part = Number(heading.dataset.part);
var tutorial_module = Number(heading.dataset.module);
var tutorial = Number(heading.dataset.tutorial);


function getDefaultCode(blockId, runtime) {
  return defaultCodeById[blockId] || defaultCodeByRuntime[runtime] || "";
}
function buildRuntimeHtml(runtime, code) {
  if (runtime === "vanilla") {
    return getVanillaHtml(code);
  }
  if (runtime === "p5") {
    return getP5Html(code);
  }
  if (runtime === "three") {
    return getThreeHtml(code);
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
function initTutorialCodeBlocks() {
  document.querySelectorAll(".O_TutorialSingleCode").forEach(function (codeBlock) {
    var codeBlockId = codeBlock.id;
    var runtime = codeBlock.dataset.runtime;
    var iframe = codeBlock.querySelector(".A_TutorialSingleCodeExecutionCanvas");
    var runStopButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonRunStop");
    var resetButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonClean");
    var copyButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonCopy");
    var textarea = codeBlock.querySelector(".W_TutorialSingleCodeTextRun");
    if (!iframe || !runStopButton || !resetButton || !copyButton || !textarea) return;
    var defaultCode = getDefaultCode(codeBlockId, runtime);
    textarea.value = defaultCode;
    function autoResizeTextarea(textarea) {
      textarea.style.height = "auto";
      var minHeight = 272;
      var maxHeight = minHeight * 2;
      var nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = "".concat(nextHeight, "px");
    }
    textarea.addEventListener("input", function () {
      autoResizeTextarea(textarea);
    });
    autoResizeTextarea(textarea);
    runStopButton.addEventListener("click", function () {
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
}


function formatTutorialDate(dateJs) {
  if (!dateJs) return "";
  var year = dateJs.slice(0, 4);
  var month = parseInt(dateJs.slice(4, 6), 10);
  var day = dateJs.slice(6, 8);
  return "".concat(day, " ").concat(months[month - 1], " ").concat(year);
}
function tutorial_toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === null || value === "") {
    return [];
  }
  return [value];
}
function drawTutorialMeta() {
  var _tagsHandbook, _tutorialData$date;
  var tutorialData = tagsHandbook === null || tagsHandbook === void 0 || (_tagsHandbook = tagsHandbook[part - 1]) === null || _tagsHandbook === void 0 || (_tagsHandbook = _tagsHandbook[tutorial_module - 1]) === null || _tagsHandbook === void 0 ? void 0 : _tagsHandbook[tutorial - 1];
  if (!tutorialData) return;

  // Название вкладки
  if (tutorialData.title) {
    document.title = tutorialData.title;
  }

  // Хлебная строка
  var headingAbout = document.querySelector(".A_IntroHeadingAbout");
  if (headingAbout && tutorialData.title) {
    var baseText = headingAbout.textContent.trim();
    var cleanedBaseText = baseText.endsWith("/") ? "".concat(baseText, " ") : "".concat(baseText, " / ");
    headingAbout.textContent = "".concat(cleanedBaseText).concat(tutorialData.title);
  }

  // Дата
  var headingUpdate = document.querySelector(".A_IntroHeadingApdate");
  var lastDate = (_tutorialData$date = tutorialData.date) === null || _tutorialData$date === void 0 ? void 0 : _tutorialData$date.at(-1);
  if (headingUpdate && lastDate) {
    headingUpdate.textContent = "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E ".concat(formatTutorialDate(lastDate));
  }

  // Заголовок статьи
  var headingTitle = document.querySelector(".A_IntroHeadingTutorial");
  if (headingTitle && tutorialData.title) {
    headingTitle.textContent = tutorialData.title;
  }

  // Автор
  var headingAuthor = document.querySelector(".A_IntroAuthor");
  if (headingAuthor) {
    var _tutorialData$author;
    headingAuthor.innerHTML = "\u0410\u0432\u0442\u043E\u0440:&nbsp;<u>".concat((_tutorialData$author = tutorialData.author) !== null && _tutorialData$author !== void 0 ? _tutorialData$author : "", "</u>");
    headingAuthor.href = tutorialData.link;
  }

  // Теги
  var tagsContainer = document.querySelector(".C_IntroTutorialTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = "";

    // Главные теги: complexity + library + format + verification
    var primaryKeys = [tutorialData.complexity].concat(tutorial_toConsumableArray(tutorial_toArray(tutorialData.library)), tutorial_toConsumableArray(tutorial_toArray(tutorialData.format)), [tutorialData.verification]).filter(Boolean);
    var primaryValues = primaryKeys.map(function (key) {
      var _filtersName$key;
      return (_filtersName$key = filtersName[key]) !== null && _filtersName$key !== void 0 ? _filtersName$key : key;
    });
    primaryValues.forEach(function (value) {
      var li = document.createElement("li");
      li.className = "A_IntroTutorialTagPrimary";
      li.textContent = value;
      tagsContainer.appendChild(li);
    });

    // Второстепенные теги: tutorialData.tags
    var secondaryValues = tutorial_toArray(tutorialData.tags).filter(Boolean);
    secondaryValues.forEach(function (value) {
      var li = document.createElement("li");
      li.className = "A_IntroTutorialTagSecondary";
      li.textContent = value;
      tagsContainer.appendChild(li);
    });
  }
}
function initTutorialCopyButtons() {
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
}

// Навигация
// Динамическая по странице
function initTutorialPageNavigation() {
  var navList = document.querySelector(".C_TutorialNavigationPageList");
  if (!navList) return;
  var tutorialMain = document.querySelector(".O_TutorialMain");
  if (!tutorialMain) return;

  // Берём только h3 внутри урока
  var tutorialHeadings = Array.from(tutorialMain.querySelectorAll("h3[id]"));

  // Добавляем "Следующий материал" отдельно
  var nextHeading = document.getElementById("nav6");
  var allHeadings = [].concat(tutorialHeadings);
  if (nextHeading) {
    allHeadings.push(nextHeading);
  }
  if (!allHeadings.length) return;
  navList.innerHTML = "";
  var navItems = allHeadings.map(function (heading) {
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.className = "U_ALink A_TutorialNavigationPageLink";
    link.href = "#".concat(heading.id);
    link.textContent = heading.textContent.trim();
    li.appendChild(link);
    navList.appendChild(li);
    return {
      heading: heading,
      link: link
    };
  });
  function updateCurrentSection() {
    var headerOffset = 120;
    var triggerLine = window.innerHeight * 0.28;
    var currentItem = navItems[0];
    navItems.forEach(function (item) {
      var rect = item.heading.getBoundingClientRect();
      if (rect.top - headerOffset <= triggerLine) {
        currentItem = item;
      }
    });
    navItems.forEach(function (item) {
      item.link.classList.remove("is-current");
    });
    if (currentItem) {
      currentItem.link.classList.add("is-current");
      var currentHash = "#".concat(currentItem.heading.id);
      if (location.hash !== currentHash) {
        history.replaceState(null, "", currentHash);
      }
    }
  }
  navItems.forEach(function (item) {
    item.link.addEventListener("click", function (e) {
      e.preventDefault();
      var headerOffset = 120;
      var top = item.heading.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    });
  });
  updateCurrentSection();
  window.addEventListener("scroll", updateCurrentSection, {
    passive: true
  });
  window.addEventListener("resize", updateCurrentSection);
}

// Навигация
// Динамическая по учебнику
function drawTutorialPartNavigation() {
  var navigationPart = document.querySelector(".W_TutorialNavigationPart");
  if (!navigationPart) return;
  var partData = tagsHandbook === null || tagsHandbook === void 0 ? void 0 : tagsHandbook[part - 1];
  if (!Array.isArray(partData)) return;
  var moduleElements = navigationPart.querySelectorAll(".W_TutorialNavigationModule");
  moduleElements.forEach(function (moduleElement, moduleIndex) {
    var moduleData = partData[moduleIndex];
    if (!Array.isArray(moduleData)) return;
    var moduleNumber = moduleIndex + 1;
    var moduleTitle = moduleElement.querySelector(".A_TutorialNavigationModuleTitle");
    if (moduleNumber === tutorial_module) {
      moduleTitle === null || moduleTitle === void 0 || moduleTitle.classList.add("is-current");
    }
    var tutorialsList = moduleElement.querySelector(".C_TutorialNavigationTutorialsList");
    if (!tutorialsList) return;
    tutorialsList.innerHTML = "";
    moduleData.forEach(function (tutorialData, tutorialIndex) {
      var tutorialNumber = tutorialIndex + 1;
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.className = "A_TutorialNavigationTutorialLink";
      link.href = "../module".concat(moduleNumber, "/tutorial").concat(tutorialNumber, ".html");
      link.innerHTML = (tutorialData === null || tutorialData === void 0 ? void 0 : tutorialData.title) || "\u0422\u0443\u0442\u043E\u0440\u0438\u0430\u043B ".concat(tutorialNumber);
      if (moduleNumber === tutorial_module && tutorialNumber === tutorial) {
        link.classList.add("is-current");
      }
      li.appendChild(link);
      tutorialsList.appendChild(li);
    });
  });
}
initTutorialCodeBlocks();
initTutorialCopyButtons();
drawTutorialMeta();
initTutorialPageNavigation();
drawTutorialPartNavigation();
/******/ })()
;