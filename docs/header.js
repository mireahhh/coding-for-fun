/******/ (() => { // webpackBootstrap
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
/******/ })()
;