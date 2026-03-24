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
var headerMenuButtom = document.querySelector(".O_HeaderMenuNavigation");
var isMenuOpen = false;
var headerBurgerButtom = document.querySelector(".А_HeaderBurgerButtom");
headerBurgerButtom.addEventListener("click", function () {
  isMenuOpen = true;
  headerBurgerButtom.style.display = "none";
  headerCrossButtom.style.display = "flex";
  headerMenuButtom.style.display = "flex";
});
var headerCrossButtom = document.querySelector(".А_HeaderCrossButtom");
headerCrossButtom.addEventListener("click", function () {
  isMenuOpen = false;
  headerCrossButtom.style.display = "none";
  headerMenuButtom.style.display = "none";
  headerBurgerButtom.style.display = "flex";
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