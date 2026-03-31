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
const _0_namespaceObject = __webpack_require__.p + "images/f8ea853bc740f37351f4.png";
;// ./src/images/gallery/2.png
const _2_namespaceObject = __webpack_require__.p + "images/4395368c4a6574b8e4df.png";
;// ./src/images/gallery/3.png
const _3_namespaceObject = __webpack_require__.p + "images/f8ea853bc740f37351f4.png";
;// ./src/images/gallery/5.png
const _5_namespaceObject = __webpack_require__.p + "images/4395368c4a6574b8e4df.png";
;// ./src/images/gallery/1.mp4
const _1_namespaceObject = __webpack_require__.p + "9cccdb429dcffb76b705.mp4";
;// ./src/images/gallery/4.mp4
const _4_namespaceObject = __webpack_require__.p + "9cccdb429dcffb76b705.mp4";
;// ./src/javascripts/galleryJson.js
var works = [{
  id: 0,
  state: 1,
  official: "",
  date: 20260327,
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
  id: 1,
  state: 1,
  official: "",
  date: 20260327,
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
  id: 2,
  state: 0,
  official: "",
  date: 20260327,
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
  id: 3,
  state: 1,
  official: "",
  date: 20260327,
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
  date: 20260327,
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
  date: 20260327,
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
;// ./src/javascripts/work.js




var galleryImages = {
  0: _0_namespaceObject,
  2: _2_namespaceObject,
  3: _3_namespaceObject,
  5: _5_namespaceObject
};


var galleryVideos = {
  1: _1_namespaceObject,
  4: _4_namespaceObject
};

// Получить переменную
var indexWork = sessionStorage.getItem("indexWork");

// Работы

// Данные
var heading = document.querySelector(".heading");
heading.innerHTML = "Работа [" + indexWork + "]";
var author = document.querySelector(".author");
author.innerHTML = works[indexWork].author;
var date = document.querySelector(".date");
date.innerHTML = works[indexWork].date;
var title = document.querySelector(".title");
title.innerHTML = works[indexWork].title;
var description = document.querySelector(".description");
description.innerHTML = works[indexWork].description;
var tags = document.querySelector(".tags");
tags.innerHTML = works[indexWork].tags;
var work_link = document.querySelector(".link");
work_link.innerHTML = works[indexWork].link;
var codePreview = document.querySelector(".codePreview");
codePreview.innerHTML = works[indexWork].codePreview;
if (works[indexWork].extension == "png") {
  var work_image = document.querySelector(".image");
  work_image.src = galleryImages[indexWork];
  work_image.style.display = "flex";
}
if (works[indexWork].extension == "mp4") {
  var video = document.querySelector(".video");
  video.querySelector("source").src = galleryVideos[indexWork];
  video.style.display = "flex";
}

// // Удалить
// sessionStorage.removeItem("indexWork");
/******/ })()
;