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

;// ./src/images/gallery/0.png
const _0_namespaceObject = __webpack_require__.p + "images/4395368c4a6574b8e4df.png";
;// ./src/images/gallery/2.png
const _2_namespaceObject = __webpack_require__.p + "images/f8ea853bc740f37351f4.png";
;// ./src/images/gallery/3.png
const _3_namespaceObject = __webpack_require__.p + "images/f8ea853bc740f37351f4.png";
;// ./src/images/gallery/5.png
const _5_namespaceObject = __webpack_require__.p + "images/4395368c4a6574b8e4df.png";
;// ./src/images/gallery/1.mp4
const _1_namespaceObject = __webpack_require__.p + "9cccdb429dcffb76b705.mp4";
;// ./src/images/gallery/4.mp4
const _4_namespaceObject = __webpack_require__.p + "9cccdb429dcffb76b705.mp4";
;// ./src/javascripts/pages/galleryJson.js
var months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
var works = [{
  id: 0,
  state: 1,
  official: "",
  date: ["20260327"],
  title: "Flower Power",
  author: "Katarina Lingat",
  complexity: "Средняя",
  library: "Vanilla js",
  verification: "Экспертная",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  description: "Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составляйте композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
  link: "https://geokash.com/flower-power/",
  codeRun: "const canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\n\nfunction drawFlower(x, y, radius, petals) {\n    for (let i = 0; i < petals; i++) {\n        ctx.beginPath();\n        ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);\n        ctx.fill();\n    }\n}\n\ndrawFlower(100, 100, 20, 6);",
  codePreview: "<canvas id=\"flowerCanvas\" width=\"400\" height=\"400\"></canvas>\n<script>\n    // \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u043A\u043E\u0434 JS \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u043A\u0430\n</script>",
  extension: "png",
  canvasPreview: ""
}, {
  id: 1,
  state: 1,
  official: "",
  date: ["20260327"],
  title: "Flower Power",
  author: "Katarina Lingat",
  complexity: "filterComplexityMiddle",
  library: "filterLibraryVanillajs",
  verification: "filterVerificationExpert",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  description: "Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составляйте композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
  link: "https://geokash.com/flower-power/",
  codeRun: "const canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\n\nfunction drawFlower(x, y, radius, petals) {\n    for (let i = 0; i < petals; i++) {\n        ctx.beginPath();\n        ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);\n        ctx.fill();\n    }\n}\n\ndrawFlower(100, 100, 20, 6);",
  codePreview: "<canvas id=\"flowerCanvas\" width=\"400\" height=\"400\"></canvas>\n<script>\n    // \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u043A\u043E\u0434 JS \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u043A\u0430\n</script>",
  extension: "mp4",
  canvasPreview: ""
}, {
  id: 2,
  state: 0,
  official: "",
  date: ["20260327"],
  title: "Flower Power",
  author: "Katarina Lingat",
  complexity: "filterComplexityMiddle",
  library: "filterLibraryVanillajs",
  verification: "filterVerificationExpert",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  description: "Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составляйте композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
  link: "https://geokash.com/flower-power/",
  codeRun: "const canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\n\nfunction drawFlower(x, y, radius, petals) {\n    for (let i = 0; i < petals; i++) {\n        ctx.beginPath();\n        ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);\n        ctx.fill();\n    }\n}\n\ndrawFlower(100, 100, 20, 6);",
  codePreview: "<canvas id=\"flowerCanvas\" width=\"400\" height=\"400\"></canvas>\n<script>\n    // \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u043A\u043E\u0434 JS \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u043A\u0430\n</script>",
  extension: "png",
  canvasPreview: ""
}, {
  id: 3,
  state: 1,
  official: "",
  date: ["20260327"],
  title: "Flower Power",
  author: "Katarina Lingat",
  complexity: "filterComplexityMiddle",
  library: "filterLibraryVanillajs",
  verification: "filterVerificationExpert",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  description: "Расслабляющее пространство, в котором вы можете взаимодействовать с окружающим миром. Выбирайте цветы, составляйте из них композиции и экспериментируйте с оттенками, создавая успокаивающую атмосферу. Цель проекта — способствовать спокойствию через взаимодействие, предоставляя пространство для творческого самовыражения и релаксации. Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составлять композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
  link: "https://geokash.com/flower-power/",
  codeRun: "const canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\n\nfunction drawFlower(x, y, radius, petals) {\n    for (let i = 0; i < petals; i++) {\n        ctx.beginPath();\n        ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);\n        ctx.fill();\n    }\n}\n\ndrawFlower(100, 100, 20, 6);",
  codePreview: "<canvas id=\"flowerCanvas\" width=\"400\" height=\"400\"></canvas>\n<script>\n    // \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u043A\u043E\u0434 JS \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u043A\u0430\n</script>",
  extension: "png",
  canvasPreview: ""
}, {
  id: 4,
  state: 1,
  official: "",
  date: ["20260327"],
  title: "Flower Power",
  author: "Katarina Lingat",
  complexity: "filterComplexityMiddle",
  library: "filterLibraryVanillajs",
  verification: "filterVerificationExpert",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  description: "Расслабляющее пространство, в котором вы можете взаимодействовать с окружающим миром. Выбирайте цветы, составляйте из них композиции и экспериментируйте с оттенками, создавая успокаивающую атмосферу. Цель проекта — способствовать спокойствию через взаимодействие, предоставляя пространство для творческого самовыражения и релаксации. Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составлять композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
  link: "https://geokash.com/flower-power/",
  codeRun: "const canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\n\nfunction drawFlower(x, y, radius, petals) {\n    for (let i = 0; i < petals; i++) {\n        ctx.beginPath();\n        ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);\n        ctx.fill();\n    }\n}\n\ndrawFlower(100, 100, 20, 6);",
  codePreview: "<canvas id=\"flowerCanvas\" width=\"400\" height=\"400\"></canvas>\n<script>\n    // \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u043A\u043E\u0434 JS \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u043A\u0430\n</script>",
  extension: "mp4",
  canvasPreview: ""
}, {
  id: 5,
  state: 0,
  official: "",
  date: ["20260327"],
  title: "Flower Power",
  author: "Katarina Lingat",
  complexity: "filterComplexityMiddle",
  library: "filterLibraryVanillajs",
  verification: "filterVerificationExpert",
  tags: ["Генеративная графика", "Паттерны", "Алгоритмическая анимация", "Интерактивные системы"],
  description: "Расслабляющее пространство, в котором вы можете взаимодействовать с окружающим миром. Выбирайте цветы, составляйте из них композиции и экспериментируйте с оттенками, создавая успокаивающую атмосферу. Цель проекта — способствовать спокойствию через взаимодействие, предоставляя пространство для творческого самовыражения и релаксации. Наслаждайтесь цветочной поляной, создавайте собственные визуальные комбинации и составлять композиции из одного цвета. В работе используется процедурная генерация случайных узоров и комбинаций цветов, а также HTML Canvas для динамического рендеринга графики.",
  link: "https://geokash.com/flower-power/",
  codeRun: "const canvas = document.querySelector('canvas');\nconst ctx = canvas.getContext('2d');\n\nfunction drawFlower(x, y, radius, petals) {\n    for (let i = 0; i < petals; i++) {\n        ctx.beginPath();\n        ctx.arc(x, y, radius, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3);\n        ctx.fill();\n    }\n}\n\ndrawFlower(100, 100, 20, 6);",
  codePreview: "<canvas id=\"flowerCanvas\" width=\"400\" height=\"400\"></canvas>\n<script>\n    // \u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u043A\u043E\u0434 JS \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u043A\u0430\n</script>",
  extension: "png",
  canvasPreview: ""
}];
;// ./src/javascripts/pages/work.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Массивы с фонами
// Изображения




var galleryImages = {
  0: _0_namespaceObject,
  2: _2_namespaceObject,
  3: _3_namespaceObject,
  5: _5_namespaceObject
};
// Видео


var galleryVideos = {
  1: _1_namespaceObject,
  4: _4_namespaceObject
};
// Работы - данные

function showWork() {
  // Получить переменную id работы
  var indexWork = sessionStorage.getItem("indexWork");
  var drawWork = works[indexWork];
  // Данные
  // Путь
  var path = document.querySelector(".M_WorkPath");
  path.innerHTML = "Галерея / " + drawWork.title;
  // Дата
  var dateJs = drawWork.date.at(-1);
  var year = dateJs.slice(0, 4);
  var month = parseInt(dateJs.slice(4, 6));
  var day = dateJs.slice(6, 8);
  var date = document.querySelector(".A_WorkDate");
  date.innerHTML = "Обновлено" + day + months[month - 1] + year;
  // Картинка
  if (drawWork.extension == "png") {
    var image = document.querySelector(".A_WorkPreviewImg");
    image.src = galleryImages[indexWork];
    image.style.display = "flex";
    var video = document.querySelector(".A_WorkPreviewVideo");
    video.style.display = "none";
  }
  if (drawWork.extension == "mp4") {
    var _video = document.querySelector(".A_WorkPreviewVideo");
    _video.src = galleryVideos[indexWork];
    _video.load();
    _video.style.display = "flex";
    var _image = document.querySelector(".A_WorkPreviewImg");
    _image.style.display = "none";
  }
  // Текстовые поля
  var author = document.querySelector(".A_WorkMetaAuthor");
  author.innerHTML = drawWork.author;
  var title = document.querySelector(".A_WorkMetaTitle");
  title.innerHTML = drawWork.title;
  var description = document.querySelector(".A_WorkMetaDescription");
  description.innerHTML = drawWork.description;
  var link = document.querySelector(".A_WorkLink");
  link.href = drawWork.link;
  // Теги
  // Главные
  var tagsPrimaryItems = document.querySelector(".C_WorkMetaTagsPrimary").children;
  Array.from(tagsPrimaryItems).forEach(function (item) {
    item.style.display = "none";
  });
  var data = {
    complexity: drawWork.complexity,
    library: drawWork.library,
    verification: drawWork.verification
  };
  var libraries = Array.isArray(data.library) ? data.library : [data.library];
  var values = [data.complexity].concat(_toConsumableArray(libraries), [data.verification]).slice(0, 3);
  values.forEach(function (value, i) {
    if (tagsPrimaryItems[i]) {
      tagsPrimaryItems[i].textContent = value;
      tagsPrimaryItems[i].style.display = "flex";
    }
  });
  // Второстепенные
  var tagsSecondaryItems = document.querySelector(".C_WorkMetaTagsSecondary").children;
  Array.from(tagsSecondaryItems).forEach(function (item) {
    item.style.display = "none";
  });
  var secondaryTags = drawWork.tags || [];
  var valuesSecondary = secondaryTags.slice(0, tagsSecondaryItems.length);
  valuesSecondary.forEach(function (value, i) {
    if (tagsSecondaryItems[i]) {
      tagsSecondaryItems[i].textContent = value;
      tagsSecondaryItems[i].style.display = "flex";
    }
  });
}
showWork();
/******/ })()
;