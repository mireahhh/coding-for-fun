/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/javascripts/pages/tutorialsJson.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Задание фильтров
// Список доступных фильтров
var filtersComplexity = ["filterComplexityInitial", "filterComplexityMiddle", "filterComplexityAdvanced"];
var filtersLibrary = ["filterLibraryVanillajs", "filterLibraryP5js", "filterLibraryThreejs"];
var filtersFormat = ["filterFormatTechnique", "filterFormatTask", "filterFormatVariation"];
var filtersVerification = ["filterVerificationExpert", "filterVerificationAuthorial"];
var filtersAll = [filtersComplexity, filtersLibrary, filtersFormat, filtersVerification];

// Какие фильтры у каких модулей
// p1m1
var setFiltersPart1Module1Tutorial1 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart1Module1Tutorial2 = new Set(["filterComplexityInitial", "filterLibraryP5js", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart1Module1Tutorial3 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterFormatTask", "filterVerificationExpert"]);
// m-t
var filtersPart1Module1 = [setFiltersPart1Module1Tutorial1, setFiltersPart1Module1Tutorial2, setFiltersPart1Module1Tutorial3];
// p-m
var setFiltersPart1Module1 = new Set([].concat(_toConsumableArray(setFiltersPart1Module1Tutorial1), _toConsumableArray(setFiltersPart1Module1Tutorial2), _toConsumableArray(setFiltersPart1Module1Tutorial3)));
// p1m2
var setFiltersPart1Module2Tutorial1 = new Set(["filterComplexityInitial", "filterLibraryP5js", "filterFormatTask", "filterVerificationExpert"]);
var setFiltersPart1Module2Tutorial2 = new Set(["filterComplexityInitial", "filterLibraryP5js", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart1Module2Tutorial3 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterFormatTask", "filterVerificationExpert"]);
// m-t
var filtersPart1Module2 = [setFiltersPart1Module2Tutorial1, setFiltersPart1Module2Tutorial2, setFiltersPart1Module2Tutorial3];
// p-m
var setFiltersPart1Module2 = new Set([].concat(_toConsumableArray(setFiltersPart1Module2Tutorial1), _toConsumableArray(setFiltersPart1Module2Tutorial2), _toConsumableArray(setFiltersPart1Module2Tutorial3)));
var filtersPart1 = [setFiltersPart1Module1, setFiltersPart1Module2];
// p2m1
var setFiltersPart2Module1Tutorial1 = new Set(["filterComplexityMiddle", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart2Module1Tutorial2 = new Set(["filterComplexityMiddle", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart2Module1Tutorial3 = new Set(["filterComplexityMiddle", "filterLibraryVanillajs", "filterFormatTask", "filterVerificationExpert"]);
// m-t
var filtersPart2Module1 = [setFiltersPart2Module1Tutorial1, setFiltersPart2Module1Tutorial2, setFiltersPart2Module1Tutorial3];
//p-m
var setFiltersPart2Module1 = new Set([].concat(_toConsumableArray(setFiltersPart2Module1Tutorial1), _toConsumableArray(setFiltersPart2Module1Tutorial2), _toConsumableArray(setFiltersPart2Module1Tutorial3)));
// p2m2
var setFiltersPart2Module2Tutorial1 = new Set(["filterComplexityMiddle", "filterLibraryP5js", "filterFormatVariation", "filterVerificationExpert"]);
var setFiltersPart2Module2Tutorial2 = new Set(["filterComplexityMiddle", "filterLibraryP5js", "filterFormatVariation", "filterVerificationExpert"]);
var setFiltersPart2Module2Tutorial3 = new Set(["filterComplexityMiddle", "filterLibraryP5js", "filterFormatTask", "filterVerificationExpert"]);
// m-t
var filtersPart2Module2 = [setFiltersPart2Module2Tutorial1, setFiltersPart2Module2Tutorial2, setFiltersPart2Module2Tutorial3];
// p-m
var setFiltersPart2Module2 = new Set([].concat(_toConsumableArray(setFiltersPart2Module2Tutorial1), _toConsumableArray(setFiltersPart2Module2Tutorial2), _toConsumableArray(setFiltersPart2Module2Tutorial3)));
// p2m3
var setFiltersPart2Module3Tutorial1 = new Set(["filterComplexityMiddle", "filterLibraryThreejs", "filterFormatTask", "filterVerificationExpert"]);
var setFiltersPart2Module3Tutorial2 = new Set(["filterComplexityMiddle", "filterLibraryThreejs", "filterFormatTask", "filterVerificationExpert"]);
var setFiltersPart2Module3Tutorial3 = new Set(["filterComplexityMiddle", "filterLibraryThreejs", "filterFormatVariation", "filterVerificationExpert"]);
// m-t
var filtersPart2Module3 = [setFiltersPart2Module3Tutorial1, setFiltersPart2Module3Tutorial2, setFiltersPart2Module3Tutorial3];
// p-m
var setFiltersPart2Module3 = new Set([].concat(_toConsumableArray(setFiltersPart2Module3Tutorial1), _toConsumableArray(setFiltersPart2Module3Tutorial2), _toConsumableArray(setFiltersPart2Module3Tutorial3)));
var filtersPart2 = [setFiltersPart2Module1, setFiltersPart2Module2, setFiltersPart2Module3];
// p3m1
var setFiltersPart3Module1Tutorial1 = new Set(["filterComplexityAdvanced", "filterLibraryP5js", "filterFormatVariation", "filterVerificationExpert"]);
var setFiltersPart3Module1Tutorial2 = new Set(["filterComplexityAdvanced", "filterLibraryThreejs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart3Module1Tutorial3 = new Set(["filterComplexityAdvanced", "filterLibraryThreejs", "filterFormatTask", "filterVerificationExpert"]);
// m-t
var filtersPart3Module1 = [setFiltersPart3Module1Tutorial1, setFiltersPart3Module1Tutorial2, setFiltersPart3Module1Tutorial3];
// p-m
var setFiltersPart3Module1 = new Set([].concat(_toConsumableArray(setFiltersPart3Module1Tutorial1), _toConsumableArray(setFiltersPart3Module1Tutorial2), _toConsumableArray(setFiltersPart3Module1Tutorial3)));
// p3m2
var setFiltersPart3Module2Tutorial1 = new Set(["filterComplexityAdvanced", "filterLibraryThreejs", "filterFormatTask", "filterVerificationExpert"]);
var setFiltersPart3Module2Tutorial2 = new Set(["filterComplexityAdvanced", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart3Module2Tutorial3 = new Set(["filterComplexityAdvanced", "filterLibraryThreejs", "filterFormatVariation", "filterVerificationExpert"]);
// m-t
var filtersPart3Module2 = [setFiltersPart3Module2Tutorial1, setFiltersPart3Module2Tutorial2, setFiltersPart3Module2Tutorial3];
// p-m
var setFiltersPart3Module2 = new Set([].concat(_toConsumableArray(setFiltersPart3Module2Tutorial1), _toConsumableArray(setFiltersPart3Module2Tutorial2), _toConsumableArray(setFiltersPart3Module2Tutorial3)));
// p3m3
var setFiltersPart3Module3Tutorial1 = new Set(["filterComplexityAdvanced", "filterLibraryP5js", "filterFormatTask", "filterVerificationExpert"]);
var setFiltersPart3Module3Tutorial2 = new Set(["filterComplexityAdvanced", "filterLibraryP5js", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart3Module3Tutorial3 = new Set(["filterComplexityAdvanced", "filterLibraryVanillajs", "filterFormatVariation", "filterVerificationExpert"]);
// m-t
var filtersPart3Module3 = [setFiltersPart3Module3Tutorial1, setFiltersPart3Module3Tutorial2, setFiltersPart3Module3Tutorial3];
// p-m
var setFiltersPart3Module3 = new Set([].concat(_toConsumableArray(setFiltersPart3Module3Tutorial1), _toConsumableArray(setFiltersPart3Module3Tutorial2), _toConsumableArray(setFiltersPart3Module3Tutorial3)));
var filtersPart3 = [setFiltersPart3Module1, setFiltersPart3Module2, setFiltersPart3Module3];

// p
var filtersParts = [filtersPart1, filtersPart2, filtersPart3];

// m
var filtersModules = [filtersPart1Module1, filtersPart1Module2, filtersPart2Module1, filtersPart2Module2, filtersPart2Module3, filtersPart3Module1, filtersPart3Module2, filtersPart3Module3];
;// ./src/javascripts/pages/module.js
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = module_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function module_toConsumableArray(r) { return module_arrayWithoutHoles(r) || module_iterableToArray(r) || module_unsupportedIterableToArray(r) || module_nonIterableSpread(); }
function module_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function module_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return module_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? module_arrayLikeToArray(r, a) : void 0; } }
function module_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function module_arrayWithoutHoles(r) { if (Array.isArray(r)) return module_arrayLikeToArray(r); }
function module_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Для отрисовки
var part1module1 = document.getElementById("part1module1");
var part1module2 = document.getElementById("part1module2");
var part2module1 = document.getElementById("part2module1");
var part2module2 = document.getElementById("part2module2");
var part2module3 = document.getElementById("part2module3");
var part3module1 = document.getElementById("part3module1");
var part3module2 = document.getElementById("part3module2");
var part3module3 = document.getElementById("part3module3");
var modules = [part1module1, part1module2, part2module1, part2module2, part2module3, part3module1, part3module2, part3module3];

// Номер модуля
var moduleId;
modules.forEach(function (module, id) {
  if (module) {
    moduleId = id;
  }
});

// Туториалы для отрисовки
var moduleTutorial1 = document.getElementById("moduleTutorial1");
var moduleTutorial2 = document.getElementById("moduleTutorial2");
var moduleTutorial3 = document.getElementById("moduleTutorial3");
var moduleTutorial4 = document.getElementById("moduleTutorial4");
var moduleTutorial5 = document.getElementById("moduleTutorial5");
var moduleTutorials = [moduleTutorial1, moduleTutorial2, moduleTutorial3, moduleTutorial4, moduleTutorial5];
var moduleNoResults = document.querySelector(".NotResultsTutorials");

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
  filtersModules[moduleId].forEach(function (filtersTutorial, indexTutorial) {
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
        console.log("fT", filtersTutorial, "aF", applyFilter);
        if (setIntersection(filtersTutorial, applyFilter).size == 0) {
          // Не рисуем туториал
          moduleTutorials[indexTutorial].style.display = "none";
          console.log("nD t", indexTutorial, "f", applyFilter);
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
var numberSorting = 0; // 0, 1, 2
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
var originalHandbookModulesPart1 = Array.from(handbookModulesPart1.children);
var originalHandbookModulesPart2 = Array.from(handbookModulesPart2.children);
var originalHandbookModulesPart3 = Array.from(handbookModulesPart3.children);
var originalHandbookModulesParts = [originalHandbookModulesPart1, originalHandbookModulesPart2, originalHandbookModulesPart3];

// Матрица переходов
var transitionSorts = [[[0, 1], [0, 1, 2], [0, 1, 2]], [[1, 0], [0, 1, 2], [0, 1, 2]], [[0, 1], [0, 1, 2], [0, 1, 2]]];
function applyingSorting() {
  pointsSort.forEach(function (point) {
    point.style.display = "none";
  });
  nameSort.textContent = namesSort[numberSorting];
  // nameSort.innerHTML = `${namesSort[numberSorting]}`;
  pointsSort[numberSorting].style.display = "flex";
  // console.log(`"Сортировка ${numberSorting}`);

  // Применение сортировки
  handbookModulesParts.forEach(function (handbookPart, jPart) {
    handbookPart.innerHTML = "";
    transitionSorts[numberSorting][jPart].forEach(function (kPosition) {
      handbookModulesParts[jPart].appendChild(originalHandbookModulesParts[jPart][kPosition]);
    });
  });
}

// Приминение вызовов сортировок к кнопкам
buttonsSort.forEach(function (button, iSort) {
  button.addEventListener("click", function () {
    // Определение сортировки
    numberSorting = iSort;
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
      closeMenuSorting();
      applyingSorting();
    });
  }
});
/******/ })()
;