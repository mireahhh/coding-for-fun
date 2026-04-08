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
;// ./src/javascripts/pages/module.js
var _tagsHandbook, _tagsHandbook2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || module_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = module_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function module_toConsumableArray(r) { return module_arrayWithoutHoles(r) || module_iterableToArray(r) || module_unsupportedIterableToArray(r) || module_nonIterableSpread(); }
function module_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function module_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return module_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? module_arrayLikeToArray(r, a) : void 0; } }
function module_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function module_arrayWithoutHoles(r) { if (Array.isArray(r)) return module_arrayLikeToArray(r); }
function module_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var heading = document.querySelector(".A_IntroHeading");
if (!heading) {
  throw new Error("Не найден .A_IntroHeading");
}
var part = Number(heading.dataset.part);
var module_module = Number(heading.dataset.module);

// Туториалы для отрисовки
var moduleTutorial1 = document.getElementById("moduleTutorial1");
var moduleTutorial2 = document.getElementById("moduleTutorial2");
var moduleTutorial3 = document.getElementById("moduleTutorial3");
var moduleTutorial4 = document.getElementById("moduleTutorial4");
var moduleTutorial5 = document.getElementById("moduleTutorial5");
var moduleTutorials = [moduleTutorial1, moduleTutorial2, moduleTutorial3, moduleTutorial4, moduleTutorial5];
var moduleNoResults = document.querySelector(".NoResultsTutorials");

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
    return module_toConsumableArray(set);
  }));
};
// Пересечение
var setIntersection = function setIntersection(a, b) {
  return new Set(module_toConsumableArray(a).filter(function (x) {
    return b.has(x);
  }));
};
// Разность
var setDifference = function setDifference(a, b) {
  return new Set(module_toConsumableArray(a).filter(function (x) {
    return !b.has(x);
  }));
};

// Список фильтров
var defMatrFilters = [[false, [false, false, false]], [false, [false, false, false]], [false, [false, false, false]], [false, [false, false]]];
var defApplyFilters = [new Set(), new Set(), new Set(), new Set()];
var matrFilters = structuredClone(defMatrFilters);
var applyFilters = structuredClone(defApplyFilters);



// helpers
var module_toArray = function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === null || value === "") {
    return [];
  }
  return [value];
};
var module_tutorialToFilterSet = function tutorialToFilterSet(tutorial) {
  return new Set([].concat(module_toConsumableArray(module_toArray(tutorial.complexity)), module_toConsumableArray(module_toArray(tutorial.library)), module_toConsumableArray(module_toArray(tutorial.format)), module_toConsumableArray(module_toArray(tutorial.verification))));
};

// туториалы текущего модуля
var currentModuleTutorials = (_tagsHandbook = tagsHandbook === null || tagsHandbook === void 0 || (_tagsHandbook2 = tagsHandbook[part - 1]) === null || _tagsHandbook2 === void 0 ? void 0 : _tagsHandbook2[module_module - 1]) !== null && _tagsHandbook !== void 0 ? _tagsHandbook : [];

// переводим в старую структуру
var currentModuleFilters = currentModuleTutorials.map(function (tutorial) {
  return module_tutorialToFilterSet(tutorial);
});

// Формат даты из "20251227" -> "27 декабря 2025"
function formatTutorialDate(dateJs) {
  if (!dateJs) return "";
  var year = dateJs.slice(0, 4);
  var month = parseInt(dateJs.slice(4, 6), 10);
  var day = dateJs.slice(6, 8);
  return "".concat(day, " ").concat(months[month - 1], " ").concat(year);
}

// Последняя дата статьи
function getLastTutorialDate(tutorial) {
  if (!(tutorial !== null && tutorial !== void 0 && tutorial.date) || tutorial.date.length === 0) {
    return "";
  }
  return tutorial.date.at(-1);
}

// Один tutorial -> список подписей тегов
// Используем всё, кроме date/title/author/tags:
// complexity + library + format + verification
function getTutorialTagValues(tutorial) {
  var libraryKeys = Array.isArray(tutorial.library) ? tutorial.library : tutorial.library ? [tutorial.library] : [];
  var formatKeys = Array.isArray(tutorial.format) ? tutorial.format : tutorial.format ? [tutorial.format] : [];
  var rawKeys = [tutorial.complexity].concat(module_toConsumableArray(libraryKeys), module_toConsumableArray(formatKeys), [tutorial.verification]).filter(Boolean);
  return rawKeys.map(function (key) {
    var _filtersName$key;
    return (_filtersName$key = filtersName[key]) !== null && _filtersName$key !== void 0 ? _filtersName$key : key;
  });
}

// Перерисовка тегов карточки статьи
function drawTutorialTags(tutorial, tagsContainer) {
  if (!tagsContainer) return;
  tagsContainer.innerHTML = "";
  var tagValues = getTutorialTagValues(tutorial);
  tagValues.forEach(function (value) {
    var li = document.createElement("li");
    li.className = "A_ModuleTutorialTag";
    li.textContent = value;
    tagsContainer.appendChild(li);
  });
}

// Главная функция отрисовки данных модуля
function drawModuleMeta() {
  var _tagsHandbook3;
  if (!heading) return;
  var moduleTutorialsData = tagsHandbook === null || tagsHandbook === void 0 || (_tagsHandbook3 = tagsHandbook[part - 1]) === null || _tagsHandbook3 === void 0 ? void 0 : _tagsHandbook3[module_module - 1];
  if (!moduleTutorialsData || !Array.isArray(moduleTutorialsData)) return;

  // 1) Обновляем дату модуля
  var moduleDateEl = document.querySelector(".A_IntroHeadingApdate");
  if (moduleDateEl) {
    var lastModuleDate = moduleTutorialsData.map(function (tutorial) {
      return getLastTutorialDate(tutorial);
    }).filter(Boolean).sort().at(-1);
    if (lastModuleDate) {
      moduleDateEl.textContent = "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E ".concat(formatTutorialDate(lastModuleDate));
    }
  }

  // 2) Обновляем карточки статей
  var tutorialCards = document.querySelectorAll(".C_ModuleTutorials .W_ModuleTutorial:not(#noResultsTutorials)");
  tutorialCards.forEach(function (card, index) {
    var tutorial = moduleTutorialsData[index];
    if (!tutorial) return;
    var subtitle = card.querySelector(".A_ModuleTutorialsubtitle");
    var title = card.querySelector(".A_ModuleTutorialTitle");
    var tagsContainer = card.querySelector(".C_ModuleTutorialTags");
    var tutorialDate = getLastTutorialDate(tutorial);
    var formattedDate = tutorialDate ? formatTutorialDate(tutorialDate) : "";

    // author / date
    if (subtitle) {
      if (tutorial.author && formattedDate) {
        subtitle.textContent = "".concat(tutorial.author, " / ").concat(formattedDate);
      } else if (tutorial.author) {
        subtitle.textContent = tutorial.author;
      } else if (formattedDate) {
        subtitle.textContent = formattedDate;
      } else {
        subtitle.textContent = "";
      }
    }

    // title
    if (title) {
      var _tutorial$title;
      title.textContent = (_tutorial$title = tutorial.title) !== null && _tutorial$title !== void 0 ? _tutorial$title : "";
    }

    // tags
    drawTutorialTags(tutorial, tagsContainer);
  });
}
function loadTutorialFirstText(_x, _x2) {
  return _loadTutorialFirstText.apply(this, arguments);
}
function _loadTutorialFirstText() {
  _loadTutorialFirstText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(moduleNumber, tutorialIndex) {
    var tutorialNumber, tutorialPath, response, html, parser, doc, firstText, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          tutorialNumber = tutorialIndex + 1;
          tutorialPath = "./module".concat(moduleNumber, "/tutorial").concat(tutorialNumber, ".html");
          _context.p = 1;
          _context.n = 2;
          return fetch(tutorialPath);
        case 2:
          response = _context.v;
          if (response.ok) {
            _context.n = 3;
            break;
          }
          throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C ".concat(tutorialPath));
        case 3:
          _context.n = 4;
          return response.text();
        case 4:
          html = _context.v;
          parser = new DOMParser();
          doc = parser.parseFromString(html, "text/html");
          firstText = doc.getElementById("TutorialTextFirst");
          if (firstText) {
            _context.n = 5;
            break;
          }
          return _context.a(2, "");
        case 5:
          return _context.a(2, firstText.innerHTML.trim());
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.error("Ошибка загрузки текста туториала:", _t);
          return _context.a(2, "");
      }
    }, _callee, null, [[1, 6]]);
  }));
  return _loadTutorialFirstText.apply(this, arguments);
}
function drawTutorialDescriptions() {
  return _drawTutorialDescriptions.apply(this, arguments);
}
function _drawTutorialDescriptions() {
  _drawTutorialDescriptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var heading, moduleNumber, tutorialCards, _iterator2, _step2, _step2$value, index, card, description, tutorialText, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          heading = document.querySelector(".A_IntroHeading");
          if (heading) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          moduleNumber = Number(heading.dataset.module);
          tutorialCards = document.querySelectorAll(".C_ModuleTutorials .W_ModuleTutorial:not(#noResultsTutorials)");
          _iterator2 = _createForOfIteratorHelper(Array.from(tutorialCards).entries());
          _context2.p = 2;
          _iterator2.s();
        case 3:
          if ((_step2 = _iterator2.n()).done) {
            _context2.n = 7;
            break;
          }
          _step2$value = _slicedToArray(_step2.value, 2), index = _step2$value[0], card = _step2$value[1];
          description = card.querySelector(".A_ModuleTutorialDescription");
          if (description) {
            _context2.n = 4;
            break;
          }
          return _context2.a(3, 6);
        case 4:
          _context2.n = 5;
          return loadTutorialFirstText(moduleNumber, index);
        case 5:
          tutorialText = _context2.v;
          if (tutorialText) {
            description.innerHTML = tutorialText;
          }
        case 6:
          _context2.n = 3;
          break;
        case 7:
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t2 = _context2.v;
          _iterator2.e(_t2);
        case 9:
          _context2.p = 9;
          _iterator2.f();
          return _context2.f(9);
        case 10:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 8, 9, 10]]);
  }));
  return _drawTutorialDescriptions.apply(this, arguments);
}
var complexityOrder = {
  filterComplexityInitial: 0,
  filterComplexityMiddle: 1,
  filterComplexityAdvanced: 2
};
var verificationOrder = {
  filterVerificationAuthorial: 0,
  filterVerificationExpert: 1
};
var tutorialMeta = currentModuleTutorials.map(function (tutorial, index) {
  var _complexityOrder$tuto, _verificationOrder$tu;
  var lastDate = getLastTutorialDate(tutorial);
  return {
    originalIndex: index,
    date: lastDate,
    dateNumber: Number(lastDate || 0),
    complexityValue: (_complexityOrder$tuto = complexityOrder[tutorial.complexity]) !== null && _complexityOrder$tuto !== void 0 ? _complexityOrder$tuto : 0,
    verificationValue: (_verificationOrder$tu = verificationOrder[tutorial.verification]) !== null && _verificationOrder$tu !== void 0 ? _verificationOrder$tu : 0
  };
});
function calcFilters() {
  applyFilters = structuredClone(defApplyFilters);
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
function calcAndDrawingTutorials() {
  // Плашка Нет результатов, по умолчанию рисуем
  moduleNoResults.style.display = "flex";
  // Все туториалы модуля, по умолчанию рисуем
  moduleTutorials.forEach(function (tutorial) {
    if (tutorial) {
      tutorial.style.display = "flex";
    }
  });

  // Перебор модуля
  currentModuleFilters.forEach(function (filtersTutorial, indexTutorial) {
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
        // console.log("fT", filtersTutorial, "aF", applyFilter);
        if (setIntersection(filtersTutorial, applyFilter).size == 0) {
          // Не рисуем туториал
          moduleTutorials[indexTutorial].style.display = "none";
          // console.log("nD t", indexTutorial, "f", applyFilter);
          break;
        }
      }
      // Если нашли хоть 1 результат - убираем плашку
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (moduleTutorials[indexTutorial].style.display == "flex") {
      moduleNoResults.style.display = "none";
    }
  });
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
      calcAndDrawingTutorials();
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
function getSortedTutorials() {
  var tutorials = module_toConsumableArray(tutorialMeta);
  if (numberSorting === 0) {
    tutorials.sort(function (a, b) {
      var diff = a.complexityValue - b.complexityValue;
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 1) {
    tutorials.sort(function (a, b) {
      var diff = b.dateNumber - a.dateNumber;
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 2) {
    tutorials.sort(function (a, b) {
      var diff = b.verificationValue - a.verificationValue;
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
  }
  return tutorials;
}
function applyingSorting() {
  pointsSort.forEach(function (point) {
    point.style.display = "none";
  });
  nameSort.textContent = namesSort[numberSorting];
  pointsSort[numberSorting].style.display = "flex";
  var tutorialsContainer = document.querySelector(".C_ModuleTutorials");
  if (!tutorialsContainer) return;
  var noResultsCard = document.getElementById("noResultsTutorials");
  var sortedTutorials = getSortedTutorials();
  sortedTutorials.forEach(function (tutorial) {
    var tutorialNode = moduleTutorials[tutorial.originalIndex];
    if (tutorialNode) {
      tutorialsContainer.appendChild(tutorialNode);
    }
  });
  if (noResultsCard) {
    tutorialsContainer.appendChild(noResultsCard);
  }
}

// Нажатие кнопок сортировки
buttonsSort.forEach(function (button, iSort) {
  button.addEventListener("click", function () {
    numberSorting = iSort;
    sessionStorage.setItem("numberSortingHandbook", numberSorting);
    closeMenuSorting();
    applyingSorting();
  });
});

// Сброс настроек
var resetButton = document.querySelector(".A_FilterResetButton");
if (resetButton) {
  resetButton.addEventListener("click", function () {
    closeMenuFilters();
    matrFilters = structuredClone(defMatrFilters);
    calcFilters();
    calcAndDrawingTutorials();
    numberSorting = 0;
    sessionStorage.setItem("numberSortingHandbook", numberSorting);
    closeMenuSorting();
    applyingSorting();
  });
}
drawModuleMeta();
drawTutorialDescriptions();
calcFilters();
applyingSorting();
calcAndDrawingTutorials();
/******/ })()
;