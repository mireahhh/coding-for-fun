/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

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
  title: "Инструменты и среда",
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
  title: "Цвет, форма и композиция",
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
  title: "Переменные и условия",
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
  title: "Циклы: ритм и структура",
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
  title: "Массивы и объекты",
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
  library: ["filterLibraryP5js", "filterLibraryVanillajs"],
  format: ["filterFormatTechnique", "filterFormatTask"],
  verification: "filterVerificationExpert",
  date: ["20260315"],
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
  title: "Создание и удаление элементов",
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
  title: "Стили и трансформации",
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
  title: "Анимации и события",
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
  title: "Цикл отрисовки и фигуры",
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
  title: "Интерактив с мышью и клавиатурой",
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
  title: "Тайлинг и дисплейсмент",
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
  title: "Сцена, камера и рендерер",
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
  title: "Геометрии и материалы",
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
  title: "Свет и текстуры",
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
  title: "Анимация и управление камерой",
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
  title: "random() и noise()",
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
  title: "Фракталы и L-системы",
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
  title: "Мозаики и сетки",
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
  title: "Сообщества и ресурсы",
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
;// ./src/javascripts/pages/handbook.js
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = handbook_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function handbook_toConsumableArray(r) { return handbook_arrayWithoutHoles(r) || handbook_iterableToArray(r) || handbook_unsupportedIterableToArray(r) || handbook_nonIterableSpread(); }
function handbook_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function handbook_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return handbook_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? handbook_arrayLikeToArray(r, a) : void 0; } }
function handbook_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function handbook_arrayWithoutHoles(r) { if (Array.isArray(r)) return handbook_arrayLikeToArray(r); }
function handbook_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Для отрисовки
var handbookPart1Module1 = document.getElementById("handbookPart1Module1");
var handbookPart1Module2 = document.getElementById("handbookPart1Module2");
var handbookPart1Modules = [handbookPart1Module1, handbookPart1Module2];
var handbookPart1 = [document.getElementById("handbookPart1"), handbookPart1Modules];
var handbookPart2Module1 = document.getElementById("handbookPart2Module1");
var handbookPart2Module2 = document.getElementById("handbookPart2Module2");
var handbookPart2Module3 = document.getElementById("handbookPart2Module3");
var handbookPart2Modules = [handbookPart2Module1, handbookPart2Module2, handbookPart2Module3];
var handbookPart2 = [document.getElementById("handbookPart2"), handbookPart2Modules];
var handbookPart3Module1 = document.getElementById("handbookPart3Module1");
var handbookPart3Module2 = document.getElementById("handbookPart3Module2");
var handbookPart3Module3 = document.getElementById("handbookPart3Module3");
var handbookPart3Modules = [handbookPart3Module1, handbookPart3Module2, handbookPart3Module3];
var handbookPart3 = [document.getElementById("handbookPart3"), handbookPart3Modules];
var handbook = [handbookPart1, handbookPart2, handbookPart3];
var handbookNoResults = document.querySelector(".NoResultsParts");

// Фильтры слева
// Меню
var isOpenFilters = false;
var filterFiltersButton = document.querySelector(".A_FilterFiltersButton");
var filterFiltersMenu = document.querySelector(".C_FilterFiltersMenu");
var filterFiltersOpenIcon = document.querySelector(".Q_FilterFiltersOpenIcon");
var filterFiltersCloseIcon = document.querySelector(".Q_FilterFiltersCloseIcon");
function openMenuFilters() {
  isOpenFilters = true;
  filterFiltersMenu.style.display = "flex";
  filterFiltersOpenIcon.style.display = "none";
  filterFiltersCloseIcon.style.display = "flex";
}
function closeMenuFilters() {
  isOpenFilters = false;
  filterFiltersMenu.style.display = "none";
  filterFiltersOpenIcon.style.display = "flex";
  filterFiltersCloseIcon.style.display = "none";
}
filterFiltersButton.addEventListener("click", function () {
  if (isOpenFilters) {
    closeMenuFilters();
  } else {
    openMenuFilters();
  }
});

// Применение фильтров
// Кнопачки
var filterComplexityInitial = document.getElementById("filterComplexityInitial");
var filterComplexityMiddle = document.getElementById("filterComplexityMiddle");
var filterComplexityAdvanced = document.getElementById("filterComplexityAdvanced");
var buttonsComplexity = [filterComplexityInitial, filterComplexityMiddle, filterComplexityAdvanced];
var filterLibraryVanillajs = document.getElementById("filterLibraryVanillajs");
var filterLibraryP5js = document.getElementById("filterLibraryP5js");
var filterLibraryThreejs = document.getElementById("filterLibraryThreejs");
var buttonsLibrary = [filterLibraryVanillajs, filterLibraryP5js, filterLibraryThreejs];
var filterFormatTechnique = document.getElementById("filterFormatTechnique");
var filterFormatTask = document.getElementById("filterFormatTask");
var filterFormatVariation = document.getElementById("filterFormatVariation");
var buttonsFormat = [filterFormatTechnique, filterFormatTask, filterFormatVariation];
var filterVerificationExpert = document.getElementById("filterVerificationExpert");
var filterVerificationAuthorial = document.getElementById("filterVerificationAuthorial");
var buttonsVerification = [filterVerificationExpert, filterVerificationAuthorial];
// Все кнопачки
var buttonsFilters = [buttonsComplexity, buttonsLibrary, buttonsFormat, buttonsVerification];

// Операции над множествами
// Объединение
var setUnion = function setUnion() {
  for (var _len = arguments.length, sets = new Array(_len), _key = 0; _key < _len; _key++) {
    sets[_key] = arguments[_key];
  }
  return new Set(sets.flatMap(function (set) {
    return handbook_toConsumableArray(set);
  }));
};
// Пересечение
var setIntersection = function setIntersection(a, b) {
  return new Set(handbook_toConsumableArray(a).filter(function (x) {
    return b.has(x);
  }));
};
// Разность
var setDifference = function setDifference(a, b) {
  return new Set(handbook_toConsumableArray(a).filter(function (x) {
    return !b.has(x);
  }));
};

// Список фильтров
var defMatrFilters = [[false, [false, false, false]], [false, [false, false, false]], [false, [false, false, false]], [false, [false, false]]];
var defMatrDraw = [[true, [true, true]], [true, [true, true, true]], [true, [true, true, true]]];
var defNoResults = false;
var defApplyFilters = [new Set(), new Set(), new Set(), new Set()];
var matrDraw = structuredClone(defMatrDraw);
var matrFilters = structuredClone(defMatrFilters);
var noResults = defNoResults;
var applyFilters = structuredClone(defApplyFilters);



// Сортировка и баллы
var complexityOrder = {
  filterComplexityInitial: 0,
  filterComplexityMiddle: 1,
  filterComplexityAdvanced: 2
};
var verificationOrder = {
  filterVerificationAuthorial: 0,
  filterVerificationExpert: 1
};
function formatDate(dateJs) {
  if (!dateJs) return "";
  var year = dateJs.slice(0, 4);
  var month = parseInt(dateJs.slice(4, 6), 10);
  var day = dateJs.slice(6, 8);
  return "".concat(day, " ").concat(months[month - 1], " ").concat(year);
}
function getLastTutorialDate(tutorial) {
  if (!(tutorial !== null && tutorial !== void 0 && tutorial.date) || tutorial.date.length === 0) {
    return "";
  }
  return tutorial.date.at(-1);
}
function average(values) {
  if (!values.length) return 0;
  return values.reduce(function (sum, value) {
    return sum + value;
  }, 0) / values.length;
}
function handbook_tutorialToFilterSet(tutorial) {
  var toArray = function toArray(value) {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null || value === "") return [];
    return [value];
  };
  return new Set([].concat(handbook_toConsumableArray(toArray(tutorial.complexity)), handbook_toConsumableArray(toArray(tutorial.library)), handbook_toConsumableArray(toArray(tutorial.format)), handbook_toConsumableArray(toArray(tutorial.verification))));
}

// Вычисление метаданных модулей для сортировки
var handbookIntroDate = document.querySelector(".A_IntroHeadingApdate");

// Метаданные модулей:
// [partIndex][moduleIndex] -> объект с данными модуля
var moduleMeta = tagsHandbook.map(function (partModules, partIndex) {
  return partModules.map(function (moduleTutorials, moduleIndex) {
    var tutorialDates = moduleTutorials.map(function (tutorial) {
      return getLastTutorialDate(tutorial);
    }).filter(Boolean);
    var date = tutorialDates.sort().at(-1) || "";
    var dateNumber = Number(date || 0);
    var complexityValues = moduleTutorials.map(function (tutorial) {
      return complexityOrder[tutorial.complexity];
    }).filter(function (value) {
      return value !== undefined;
    });
    var verificationValues = moduleTutorials.map(function (tutorial) {
      return verificationOrder[tutorial.verification];
    }).filter(function (value) {
      return value !== undefined;
    });
    return {
      partIndex: partIndex,
      moduleIndex: moduleIndex,
      originalIndex: moduleIndex,
      tutorialCount: moduleTutorials.length,
      date: date,
      dateNumber: dateNumber,
      complexityAvg: average(complexityValues),
      verificationAvg: average(verificationValues),
      filterSet: new Set(moduleTutorials.flatMap(function (tutorial) {
        return handbook_toConsumableArray(handbook_tutorialToFilterSet(tutorial));
      }))
    };
  });
});
var partMeta = moduleMeta.map(function (partModules, partIndex) {
  var moduleDates = partModules.map(function (module) {
    return module.date;
  }).filter(Boolean);
  return {
    partIndex: partIndex,
    moduleCount: partModules.length,
    tutorialCount: partModules.reduce(function (sum, module) {
      return sum + module.tutorialCount;
    }, 0),
    date: moduleDates.sort().at(-1) || "",
    dateNumber: Number(moduleDates.sort().at(-1) || 0),
    complexityAvg: average(partModules.map(function (module) {
      return module.complexityAvg;
    })),
    verificationAvg: average(partModules.map(function (module) {
      return module.verificationAvg;
    }))
  };
});
var handbookMeta = {
  partCount: partMeta.length,
  moduleCount: moduleMeta.flat().length,
  tutorialCount: partMeta.reduce(function (sum, part) {
    return sum + part.tutorialCount;
  }, 0),
  date: partMeta.map(function (part) {
    return part.date;
  }).filter(Boolean).sort().at(-1) || "",
  dateNumber: Number(partMeta.map(function (part) {
    return part.date;
  }).filter(Boolean).sort().at(-1) || 0),
  complexityAvg: average(partMeta.map(function (part) {
    return part.complexityAvg;
  })),
  verificationAvg: average(partMeta.map(function (part) {
    return part.verificationAvg;
  }))
};

// Старый аналог filtersParts, но уже из tagsHandbook
var handbook_filtersParts = moduleMeta.map(function (partModules) {
  return partModules.map(function (module) {
    return module.filterSet;
  });
});

// Дата учебника = максимальная дата среди всех модулей
if (handbookIntroDate && handbookMeta.date) {
  handbookIntroDate.textContent = "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E ".concat(formatDate(handbookMeta.date));
}
function calcFilters() {
  applyFilters = structuredClone(defApplyFilters);
  matrDraw = structuredClone(defMatrDraw);
  matrFilters.forEach(function (filter, indexFilter) {
    filter[1].forEach(function (setting, indexSetting) {
      if (matrFilters[indexFilter][1][indexSetting]) {
        buttonsFilters[indexFilter][indexSetting].style.border = "1.5px dashed var(--colors-neutrals-900)";
        applyFilters[indexFilter] = setUnion(applyFilters[indexFilter], new Set([filtersAll[indexFilter][indexSetting]]));
      } else {
        buttonsFilters[indexFilter][indexSetting].style.border = "1.5px dashed var(--colors-neutrals-200)";
      }
      // ?deny / ?alloy
    });
  });

  // console.log("matrFilters", matrFilters, "apply", applyFilters);
}
function calcDrawParts() {
  // Рисуем полашку по умолчанию - нет результатов
  noResults = !defNoResults;
  // Перебор разделов
  handbook_filtersParts.forEach(function (filterPart, indexPart) {
    // Раздел по умолчанию - не рисуем
    matrDraw[indexPart][0] = false;

    // Перебор модуля
    filterPart.forEach(function (filtersModule, inedxModule) {
      // Модуль по умолчанию - рисуем
      matrDraw[indexPart][1][inedxModule] = true;
      //console.log(`p[${indexPart}]m[${inedxModule}]`, "filters", applyFilters);

      // Перебор фильтров
      var _iterator = _createForOfIteratorHelper(applyFilters),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var applyFilter = _step.value;
          //Если фильтр - пустой
          if (applyFilter.size == 0) {
            continue;
          }
          // Если не подошёл хотя бы 1 - не подошёл
          if (setIntersection(filtersModule, applyFilter).size == 0) {
            // Не рисуем модуль
            matrDraw[indexPart][1][inedxModule] = false;
            break;
          }
        }

        // Раздел начинам отображать если хоть 1 модуль там рисуется
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (matrDraw[indexPart][1][inedxModule]) {
        matrDraw[indexPart][0] = true;
      }
    });

    // Убираем плашку Нет результатов если хоть 1 раздел рисуется
    if (matrDraw[indexPart][0]) {
      noResults = defNoResults;
    }
  });

  // console.log("matrDraw", noResults, matrDraw);
}
function drawingParts() {
  matrDraw.forEach(function (part, indexPart) {
    // Не рисуем весь раздел
    if (!matrDraw[indexPart][0]) {
      handbook[indexPart][0].style.display = "none";
      return;
    }
    // Рисуем весь раздел
    handbook[indexPart][0].style.display = "flex";
    part.forEach(function (module, jnedxModule) {
      // Не рисуем модуль
      if (!matrDraw[indexPart][1][jnedxModule]) {
        handbook[indexPart][1][jnedxModule].style.display = "none";
        return;
      }
      // Рисуем модуль
      handbook[indexPart][1][jnedxModule].style.display = "flex";
    });
  });

  // Плашка Нет результатов
  if (noResults) {
    handbookNoResults.style.display = "flex";
  } else {
    handbookNoResults.style.display = "none";
  }
}

// Добавление клика настройки
buttonsFilters.forEach(function (buttons, indexFilter) {
  buttons.forEach(function (button, indexButton) {
    button.addEventListener("click", function () {
      var buttonCondition = !matrFilters[indexFilter][1][indexButton];
      matrFilters[indexFilter][1][indexButton] = buttonCondition;

      // Вкл/Вык фильтра
      // Кнопка стала активна
      if (buttonCondition) {
        // Фильр точно включился
        matrFilters[indexFilter][0] = true;
      }
      // Кнопка стала неактивна
      else {
        // Фильтр либо отключился либо остался
        matrFilters[indexFilter][0] = matrFilters[indexFilter][1].some(function (item) {
          return item !== false;
        });
      }
      calcFilters();
      calcDrawParts();
      drawingParts();
    });
  });
});

// Окно поиска
var filterSearchBar = document.getElementById("filterSearchBar");
var filterSearchButton = document.querySelector(".Q_FilterSearchIcon");
filterSearchButton.addEventListener("click", function () {
  filterSearchButton.style.opacity = "var(--official-no-interaction-opacity)";
  filterSearchBar.value = "";
});
filterSearchBar.addEventListener("input", function () {
  filterSearchButton.style.opacity = filterSearchBar.value ? "1" : "var(--official-no-interaction-opacity)";
});

// Сортировка справа
// Меню
var isOpenSorting = false;
var openSortsButton = document.querySelector(".A_FilterSortingOpenButton");
var openSortsIcon = document.querySelector(".Q_FilterSortingOpenIcon");
var closeSortsIcon = document.querySelector(".Q_FilterSortingCloseIcon");
var sortingMenu = document.querySelector(".C_FilterSortingMenu");
function openMenuSorting() {
  isOpenSorting = true;
  sortingMenu.style.display = "flex";
  openSortsIcon.style.display = "none";
  closeSortsIcon.style.display = "flex";
}
function closeMenuSorting() {
  isOpenSorting = false;
  sortingMenu.style.display = "none";
  openSortsIcon.style.display = "flex";
  closeSortsIcon.style.display = "none";
}
openSortsButton.addEventListener("click", function () {
  if (isOpenSorting) {
    closeMenuSorting();
  } else {
    openMenuSorting();
  }
});

// Применение сортировки
var numberSorting = Number(sessionStorage.getItem("numberSortingHandbook")); // 0, 1, 2
if (Number.isNaN(numberSorting)) {
  numberSorting = 0;
}
var nameSort = document.querySelector(".A_FilterSortingByText");
var namesSort = ["По сложности", "По дате обновления", "По проверенности"];
var pointSort1 = document.querySelector(".Q_FilterSortingByComplexityIcon");
var pointSort2 = document.querySelector(".Q_FilterSortingByDateIcon");
var pointSort3 = document.querySelector(".Q_FilterSortingByVerificationIcon");
var pointsSort = [pointSort1, pointSort2, pointSort3];
var buttonSort1 = document.getElementById("filterSortingByComplexityButton");
var buttonSort2 = document.getElementById("filterSortingByDateButton");
var buttonSort3 = document.getElementById("filterSortingByVerificationButton");
var buttonsSort = [buttonSort1, buttonSort2, buttonSort3];
var handbookModulesPart1 = document.getElementById("handbookModulesPart1");
var handbookModulesPart2 = document.getElementById("handbookModulesPart2");
var handbookModulesPart3 = document.getElementById("handbookModulesPart3");
var handbookModulesParts = [handbookModulesPart1, handbookModulesPart2, handbookModulesPart3];

// Разделение на пустые и заполненные модули
var realHandbookModulesParts = handbookModulesParts.map(function (part) {
  return Array.from(part.children).filter(function (item) {
    return item.id;
  });
});
var fillerHandbookModulesParts = handbookModulesParts.map(function (part) {
  return Array.from(part.children).filter(function (item) {
    return !item.id;
  });
});

// Вычисление сортировки
function getSortedModulesForPart(partIndex) {
  var modules = handbook_toConsumableArray(moduleMeta[partIndex]);
  if (numberSorting === 0) {
    // По сложности: initial -> middle -> advanced
    modules.sort(function (a, b) {
      var diff = a.complexityAvg - b.complexityAvg;
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 1) {
    // По дате: новые сверху
    modules.sort(function (a, b) {
      var diff = b.dateNumber - a.dateNumber;
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 2) {
    // По проверенности: экспертная выше авторской
    modules.sort(function (a, b) {
      var diff = b.verificationAvg - a.verificationAvg;
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
  }
  return modules;
}

// Применение сортировки
function applyingSorting() {
  pointsSort.forEach(function (point) {
    point.style.display = "none";
  });
  nameSort.textContent = namesSort[numberSorting];
  pointsSort[numberSorting].style.display = "flex";
  handbookModulesParts.forEach(function (handbookPart, partIndex) {
    var sortedModules = getSortedModulesForPart(partIndex);
    var fillers = fillerHandbookModulesParts[partIndex];
    handbookPart.innerHTML = "";

    // Сначала реальные модули
    sortedModules.forEach(function (module) {
      var moduleNode = handbook[partIndex][1][module.originalIndex];
      if (moduleNode) {
        handbookPart.appendChild(moduleNode);
      }
    });

    // Потом пустые плейсхолдеры
    fillers.forEach(function (filler) {
      handbookPart.appendChild(filler);
    });
  });
}

// Приминение вызовов сортировок к кнопкам
buttonsSort.forEach(function (button, iSort) {
  button.addEventListener("click", function () {
    // Определение сортировки
    numberSorting = iSort;
    sessionStorage.setItem("numberSortingHandbook", numberSorting);
    closeMenuSorting();
    applyingSorting();
  });
});

// Сброс настроек
// Самое право
var resetButton1 = document.querySelector(".A_FilterResetButton");
// Скрытая снизу
var resetButton2 = document.getElementById("filterResetButton2");
var resetButtons = [resetButton1, resetButton2];
resetButtons.forEach(function (resetButton) {
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      // Сброс фильтров
      closeMenuFilters();
      matrFilters = structuredClone(defMatrFilters);
      calcFilters();
      calcDrawParts();
      drawingParts();

      // Сброс сортировки
      numberSorting = 0;
      sessionStorage.setItem("numberSortingHandbook", numberSorting);
      closeMenuSorting();
      applyingSorting();
    });
  }
});

// Динамическое обновление даты
function drawModuleDates() {
  moduleMeta.forEach(function (partModules, partIndex) {
    partModules.forEach(function (module, moduleIndex) {
      var moduleCard = handbook[partIndex][1][moduleIndex];
      if (!moduleCard) return;
      var dateNode = moduleCard.querySelector(".A_HandbookModuleDate");
      if (!dateNode || !module.date) return;
      dateNode.textContent = formatDate(module.date);
    });
  });
}
var handbookIntroAbout = document.querySelector(".A_IntroHeadingAbout");

// Динамический счётчик
function drawContTutorials() {
  handbookIntroAbout.innerHTML = "".concat(handbookMeta.partCount, "&nbsp;\u0440\u0430\u0437\u0434\u0435\u043B\u0430, ") + "".concat(handbookMeta.moduleCount, "&nbsp;\u043C\u043E\u0434\u0443\u043B\u0435\u0439 \u0438 ") + "".concat(handbookMeta.tutorialCount, "&nbsp;\u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0442\u0443\u0442\u043E\u0440\u0438\u0430\u043B\u0430 \u0441&nbsp;\u044D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u0430\u043C\u0438");
  // console.log("pC", handbookMeta.partCount, "mC", handbookMeta.moduleCount, "tC", handbookMeta.tutorialCount);
}
calcFilters();
calcDrawParts();
applyingSorting();
drawingParts();
drawModuleDates();
// drawContTutorials();
/******/ })()
;