/******/ (() => { // webpackBootstrap
// Получить переменную
var indexWork = sessionStorage.getItem("indexWork");
console.log("indexWork", indexWork);
var heading = document.querySelector(".Heading");
heading.innerHTML = "Работа " + indexWork;

// // Удалить
// sessionStorage.removeItem("indexWork");
/******/ })()
;