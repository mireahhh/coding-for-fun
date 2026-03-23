/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 428:
/***/ (() => {

var headerHandbookNavigation = document.querySelector(".O_HeaderHandbookNavigation");
var headerMenuNavigation = document.querySelector(".O_HeaderMenuNavigation");
var headerBurgerButtom = document.querySelector(".А_HeaderBurgerButtom");
var headerCrossButtom = document.querySelector(".А_HeaderCrossButtom");
var headerSearchBar = document.querySelector(".M_HeaderSearchBar");
var header = document.querySelector(".S_Header");
function syncHeaderMenuBounds() {
  if (!headerMenuNavigation || !headerBurgerButtom || !headerSearchBar || !header) return;
  var headerHandbookNavigationRect = headerHandbookNavigation.getBoundingClientRect();
  var headerRect = headerHandbookNavigation.getBoundingClientRect();
  headerMenuNavigation.style.left = headerHandbookNavigationRect.x + "px";
  headerMenuNavigation.style.top = headerRect.bottom + "px";
  headerMenuNavigation.style.width = headerHandbookNavigationRect.width + "px";
}

// Получаем высоту хедера
var headerHeight = header.offsetHeight;

// Применяем отступ к контенту
var mainContent = document.querySelector(".S_Main");
mainContent.style.paddingTop = headerHeight + "px";

// Обновляем при изменении размера окна
window.addEventListener("resize", function () {
  var newHeaderHeight = header.offsetHeight;
  mainContent.style.paddingTop = newHeaderHeight + "px";
  if (isMenuOpen) {
    syncHeaderMenuBounds();
  }
});
var isMenuOpen = false;

// Получаем высоту меню
var getMenuHeight = function getMenuHeight() {
  return headerMenuNavigation.offsetHeight;
};
headerBurgerButtom.addEventListener("click", function () {
  isMenuOpen = true;
  headerBurgerButtom.style.display = "none";
  headerCrossButtom.style.display = "flex";
  headerMenuNavigation.style.display = "flex";
  syncHeaderMenuBounds();
  var windowHeight = window.innerHeight;
  mainContent.style.paddingTop = windowHeight + "px";
});
headerCrossButtom.addEventListener("click", function () {
  isMenuOpen = false;
  headerCrossButtom.style.display = "none";
  headerBurgerButtom.style.display = "flex";
  headerMenuNavigation.style.display = "none";
  mainContent.style.paddingTop = header.offsetHeight + "px";
});
var input = document.getElementById("headerSearchBar");
var btn = document.querySelector(".Q_HeaderSearchIcon");
btn.addEventListener("click", function () {
  input.value = "";
  input.focus();
});
input.addEventListener("input", function () {
  btn.style.opacity = input.value ? "1" : "0.5";
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(428);
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_js__WEBPACK_IMPORTED_MODULE_0__);

console.log("css is entry");

})();

/******/ })()
;