/******/ (() => { // webpackBootstrap
// Получаем высоту хедера
var header = document.querySelector(".S_Header");
var headerHeight = header.offsetHeight;

// Применяем отступ к контенту
var mainContent = document.querySelector(".S_Main");
mainContent.style.paddingTop = headerHeight + "px";

// Обновляем при изменении размера окна
window.addEventListener("resize", function () {
  var newHeaderHeight = header.offsetHeight;
  mainContent.style.paddingTop = newHeaderHeight + "px";
});
var isHeaderMenuOpen = false;
var headerMenuButton = document.querySelector(".O_HeaderMenuNavigation");
var headerBurgerButton = document.querySelector(".А_HeaderBurgerButton");
headerBurgerButton.addEventListener("click", function () {
  isHeaderMenuOpen = true;
  headerBurgerButton.style.display = "none";
  headerCrossButton.style.display = "flex";
  headerMenuButton.style.display = "flex";
});
var headerCrossButton = document.querySelector(".А_HeaderCrossButton");
headerCrossButton.addEventListener("click", function () {
  isHeaderMenuOpen = false;
  headerCrossButton.style.display = "none";
  headerMenuButton.style.display = "none";
  headerBurgerButton.style.display = "flex";
});
var headerSearchBar = document.getElementById("headerSearchBar");
var headerSearchButton = document.querySelector(".Q_HeaderSearchIcon");
headerSearchButton.addEventListener("click", function () {
  headerSearchBar.value = "";
  headerSearchBar.focus();
});
headerSearchBar.addEventListener("input", function () {
  headerSearchButton.style.opacity = headerSearchBar.value ? "1" : "0.5";
});
/******/ })()
;