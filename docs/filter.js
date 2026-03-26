/******/ (() => { // webpackBootstrap
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
var setFiltersPart1Module1Tutorial2 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart1Module1Tutorial3 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterComplexityAdvanced", "filterVerificationExpert"]);
var filtersPart1Module1 = [setFiltersPart1Module1Tutorial1, setFiltersPart1Module1Tutorial2, setFiltersPart1Module1Tutorial3];
var setFiltersPart1Module1 = new Set([].concat(_toConsumableArray(setFiltersPart1Module1Tutorial1), _toConsumableArray(setFiltersPart1Module1Tutorial2), _toConsumableArray(setFiltersPart1Module1Tutorial3)));
// p1m2
var setFiltersPart1Module2Tutorial1 = new Set(["filterComplexityInitial", "filterLibraryP5js", "filterFormatTask", "filterVerificationExpert"]);
var setFiltersPart1Module2Tutorial2 = new Set(["filterComplexityInitial", "filterLibraryP5js", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart1Module2Tutorial3 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterFormatTask", "filterVerificationExpert"]);
var filtersPart1Module2 = [setFiltersPart1Module2Tutorial1, setFiltersPart1Module2Tutorial2, setFiltersPart1Module2Tutorial3];
var setFiltersPart1Module2 = new Set([].concat(_toConsumableArray(setFiltersPart1Module2Tutorial1), _toConsumableArray(setFiltersPart1Module2Tutorial2), _toConsumableArray(setFiltersPart1Module2Tutorial3)));
var filtersPart1 = [setFiltersPart1Module1, setFiltersPart1Module2];
// p2m1
var setFiltersPart2Module1Tutorial1 = new Set(["filterComplexityInitial", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart2Module1Tutorial2 = new Set(["filterComplexityInitial", "filterLibraryP5js", "filterFormatTechnique", "filterVerificationExpert"]);
var setFiltersPart2Module1Tutorial3 = new Set(["filterComplexityMiddle", "filterLibraryVanillajs", "filterFormatTechnique", "filterVerificationExpert"]);
var filtersPart2Module1 = [setFiltersPart2Module1Tutorial1, setFiltersPart2Module1Tutorial2, setFiltersPart2Module1Tutorial3];
var setFiltersPart2Module1 = new Set([].concat(_toConsumableArray(setFiltersPart2Module1Tutorial1), _toConsumableArray(setFiltersPart2Module1Tutorial2), _toConsumableArray(setFiltersPart2Module1Tutorial3)));
// p2m2
var setFiltersPart2Module2Tutorial1 = new Set(filtersAll.flat());
var setFiltersPart2Module2Tutorial2 = new Set(filtersAll.flat());
var setFiltersPart2Module2Tutorial3 = new Set(filtersAll.flat());
var filtersPart2Module2 = [setFiltersPart2Module2Tutorial1, setFiltersPart2Module2Tutorial2, setFiltersPart2Module2Tutorial3];
var setFiltersPart2Module2 = new Set([].concat(_toConsumableArray(setFiltersPart2Module2Tutorial1), _toConsumableArray(setFiltersPart2Module2Tutorial2), _toConsumableArray(setFiltersPart2Module2Tutorial3)));
// p2m3
var setFiltersPart2Module3Tutorial1 = new Set(filtersAll.flat());
var setFiltersPart2Module3Tutorial2 = new Set(filtersAll.flat());
var setFiltersPart2Module3Tutorial3 = new Set(filtersAll.flat());
var filtersPart2Module3 = [setFiltersPart2Module3Tutorial1, setFiltersPart2Module3Tutorial2, setFiltersPart2Module3Tutorial3];
var setFiltersPart2Module3 = new Set([].concat(_toConsumableArray(setFiltersPart2Module3Tutorial1), _toConsumableArray(setFiltersPart2Module3Tutorial2), _toConsumableArray(setFiltersPart2Module3Tutorial3)));
var filtersPart2 = [setFiltersPart2Module1, setFiltersPart2Module2, setFiltersPart2Module3];
// p3m1
var setFiltersPart3Module1Tutorial1 = new Set(filtersAll.flat());
var setFiltersPart3Module1Tutorial2 = new Set(filtersAll.flat());
var setFiltersPart3Module1Tutorial3 = new Set(filtersAll.flat());
var filtersPart3Module1 = [setFiltersPart3Module1Tutorial1, setFiltersPart3Module1Tutorial2, setFiltersPart3Module1Tutorial3];
var setFiltersPart3Module1 = new Set([].concat(_toConsumableArray(setFiltersPart3Module1Tutorial1), _toConsumableArray(setFiltersPart3Module1Tutorial2), _toConsumableArray(setFiltersPart3Module1Tutorial3)));
// p3m2
var setFiltersPart3Module2Tutorial1 = new Set(filtersAll.flat());
var setFiltersPart3Module2Tutorial2 = new Set(filtersAll.flat());
var setFiltersPart3Module2Tutorial3 = new Set(filtersAll.flat());
var filtersPart3Module2 = [setFiltersPart3Module2Tutorial1, setFiltersPart3Module2Tutorial2, setFiltersPart3Module2Tutorial3];
var setFiltersPart3Module2 = new Set([].concat(_toConsumableArray(setFiltersPart3Module2Tutorial1), _toConsumableArray(setFiltersPart3Module2Tutorial2), _toConsumableArray(setFiltersPart3Module2Tutorial3)));
// p3m3
var setFiltersPart3Module3Tutorial1 = new Set(filtersAll.flat());
var setFiltersPart3Module3Tutorial2 = new Set(filtersAll.flat());
var setFiltersPart3Module3Tutorial3 = new Set(filtersAll.flat());
var filtersPart3Module3 = [setFiltersPart3Module3Tutorial1, setFiltersPart3Module3Tutorial2, setFiltersPart3Module3Tutorial3];
var setFiltersPart3Module3 = new Set([].concat(_toConsumableArray(setFiltersPart3Module3Tutorial1), _toConsumableArray(setFiltersPart3Module3Tutorial2), _toConsumableArray(setFiltersPart3Module3Tutorial3)));
var filtersPart3 = [setFiltersPart3Module1, setFiltersPart3Module2, setFiltersPart3Module3];
var filtersPart = [filtersPart1, filtersPart2, filtersPart3];
// Для отрисовки
var handbookPart1Module1 = document.getElementById("handbookPart1Module1");
var handbookPart1Module2 = document.getElementById("handbookPart1Module2");
var hhandbookPart1Modules = [handbookPart1Module1, handbookPart1Module2];
var handbookPart1 = document.getElementById("handbookPart1");
var handbookPart2Module1 = document.getElementById("handbookPart2Module1");
var handbookPart2Module2 = document.getElementById("handbookPart2Module2");
var handbookPart2Module3 = document.getElementById("handbookPart2Module3");
var hhandbookPart2Modules = [handbookPart2Module1, handbookPart2Module2, handbookPart2Module3];
var handbookPart2 = document.getElementById("handbookPart2");
var handbookPart3Module1 = document.getElementById("handbookPart3Module1");
var handbookPart3Module2 = document.getElementById("handbookPart3Module2");
var handbookPart3Module3 = document.getElementById("handbookPart3Module3");
var hhandbookPart3Modules = [handbookPart3Module1, handbookPart3Module2, handbookPart3Module3];
var handbookPart3 = document.getElementById("handbookPart3");

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

// Операции над множествами
// Объединение
var union = function union() {
  for (var _len = arguments.length, sets = new Array(_len), _key = 0; _key < _len; _key++) {
    sets[_key] = arguments[_key];
  }
  return new Set(sets.flatMap(function (set) {
    return _toConsumableArray(set);
  }));
};
// Пересечение
var intersection = function intersection(a, b) {
  return new Set(_toConsumableArray(a).filter(function (x) {
    return b.has(x);
  }));
};
// Разность
var difference = function difference(a, b) {
  return new Set(_toConsumableArray(a).filter(function (x) {
    return !b.has(x);
  }));
};

// Список фильтров
var matrFilters = [[false, [false, false, false]], [false, [false, false, false]], [false, [false, false, false]], [false, [false, false]]];
var noneResults = false;
var matrResults = [[true, [true, true]], [true, [true, true, true]], [true, [true, true, true]]];
var matrDraw = [[handbookPart1, hhandbookPart1Modules], [handbookPart2, hhandbookPart2Modules], [handbookPart3, hhandbookPart3Modules]];
var allowFilters = new Set(filtersAll.flat());
var denyFilters = new Set();
var buttonsFilters = [buttonsComplexity, buttonsLibrary, buttonsFormat, buttonsVerification];

// Применение фильтров
buttonsFilters.forEach(function (buttons, indexFilter) {
  buttons.forEach(function (button, indexButton) {
    button.addEventListener("click", function () {
      var buttonCondition = !matrFilters[indexFilter][1][indexButton];
      matrFilters[indexFilter][1][indexButton] = buttonCondition;

      // Окрашивание кнопки и Вкл/Вык фильтра
      // Кнопка стала активна
      if (buttonCondition) {
        button.style.border = "1.5px dashed var(--colors-neutrals-900)";
        // Фильр точно включился
        matrFilters[indexFilter][0] = true;
      }
      // Кнопка стала неактивна
      else {
        button.style.border = "1.5px dashed var(--colors-neutrals-200)";
        // Фильтр либо отключился либо остался
        matrFilters[indexFilter][0] = matrFilters[indexFilter][1].some(function (item) {
          return item !== false;
        });
      }

      // Операции над множеством настроек
      // Если фильтр включён
      if (matrFilters[indexFilter][0]) {
        //
        allowFilters = difference(allowFilters, new Set(filtersAll[indexFilter]));
        denyFilters = union(denyFilters, new Set(filtersAll[indexFilter]));

        //
        matrFilters[indexFilter][1].forEach(function (button, indexButton) {
          if (button) {
            denyFilters = difference(denyFilters, new Set([filtersAll[indexFilter][indexButton]]));
          }
        });
      }
      // Если фильтр выключен
      else {
        allowFilters = union(allowFilters, new Set(filtersAll[indexFilter]));
        denyFilters = difference(denyFilters, new Set(filtersAll[indexFilter]));
      }
      console.log("serch set", matrFilters, "allow", allowFilters, "deny", denyFilters);

      // Расчёт сетов и применение фильтров TODO
      filtersPart.forEach(function (part, i) {
        part.forEach(function (module, j) {
          // console.log(`fits [${i}][${j}]`, module);

          // Если и разрешённый и запрещённый список
          if (intersection(allowFilters, module).size && !intersection(denyFilters, module).size) {
            matrResults[i][1][j] = true;
            matrDraw[i][1][j].style.display = "flex";
          } else {
            matrResults[i][1][j] = false;
            matrDraw[i][1][j].style.display = "none";
          }
        });
      });
      noneResults = matrResults.every(function (item) {
        return item[0] === false;
      });

      // console.log("draw matr", noneResults, matrResults);
    });
  });
});

// Окно поиска
var filterSearchBar = document.getElementById("filterSearchBar");
var filterSearchButton = document.querySelector(".Q_FilterSearchIcon");
filterSearchButton.addEventListener("click", function () {
  filterSearchBar.value = "";
  filterSearchBar.focus();
});
filterSearchBar.addEventListener("input", function () {
  filterSearchButton.style.opacity = filterSearchBar.value ? "1" : "0.5";
});

// Сортировка справа
// Меню
isOpenSorting = false;
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
numberSorting = 0; // 0, 1, 2
var nameSort1 = document.querySelector(".A_FilterSortingByComplexityText");
var nameSort2 = document.querySelector(".A_FilterSortingByDateText");
var nameSort3 = document.querySelector(".A_FilterSortingByVerificationText");
var namesSort = [nameSort1, nameSort2, nameSort3];
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
var transitionSorts = [[[0, 1], [0, 1, 2], [0, 1, 2]], [[1, 0], [2, 1, 0], [2, 1, 0]], [[1, 0], [1, 2, 0], [2, 0, 1]]];
function applyingSorting() {
  namesSort.forEach(function (name) {
    name.style.display = "none";
  });
  pointsSort.forEach(function (point) {
    point.style.display = "none";
  });
  namesSort[numberSorting].style.display = "flex";
  pointsSort[numberSorting].style.display = "flex";
  console.log("\"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 ".concat(numberSorting));

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
var resetButton = document.querySelector(".A_FilterResetButton");
resetButton.addEventListener("click", function () {
  // Сброс фильтров
  closeMenuFilters();
  //TODO фильтров

  // Сброс сортировки
  numberSorting = 0;
  closeMenuSorting();
  applyingSorting();
});
/******/ })()
;