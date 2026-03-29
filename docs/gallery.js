/******/ (() => { // webpackBootstrap
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
var filtersVerification = ["filterVerificationExpert", "filterVerificationAuthorial"];
var filtersAll = [filtersComplexity, filtersLibrary, filtersVerification];

// async function getFiltersAll(path) {
//   const response = await fetch(path);
//   const data = await response.json();

//   const { complexity, library, verification } = data.filters;

//   return [complexity, library, verification];
// }

// (async () => {
//   const filtersAll = await getFiltersAll("/json/gallery.json");
//   console.log(filtersAll);
// })();

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
var handbookNoResults = document.getElementById("handbookNoResults");

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
// const filterFormatTechnique = document.getElementById("filterFormatTechnique");
// const filterFormatTask = document.getElementById("filterFormatTask");
// const filterFormatVariation = document.getElementById("filterFormatVariation");
// const buttonsFormat = [
//   filterFormatTechnique,
//   filterFormatTask,
//   filterFormatVariation,
// ];
var filterVerificationExpert = document.getElementById("filterVerificationExpert");
var filterVerificationAuthorial = document.getElementById("filterVerificationAuthorial");
var buttonsVerification = [filterVerificationExpert, filterVerificationAuthorial];
// Все кнопачки
var buttonsFilters = [buttonsComplexity, buttonsLibrary,
// buttonsFormat,
buttonsVerification];

// Операции над множествами
// Объединение
var setUnion = function setUnion() {
  for (var _len = arguments.length, sets = new Array(_len), _key = 0; _key < _len; _key++) {
    sets[_key] = arguments[_key];
  }
  return new Set(sets.flatMap(function (set) {
    return _toConsumableArray(set);
  }));
};
// Пересечение
var setIntersection = function setIntersection(a, b) {
  return new Set(_toConsumableArray(a).filter(function (x) {
    return b.has(x);
  }));
};
// Разность
var setDifference = function setDifference(a, b) {
  return new Set(_toConsumableArray(a).filter(function (x) {
    return !b.has(x);
  }));
};

// Список фильтров
var defMatrFilters = [[false, [false, false, false]], [false, [false, false, false]], [false, [false, false]]];
// const defMatrDraw = [
//   [true, [true, true]],
//   [true, [true, true, true]],
//   [true, [true, true, true]],
// ];
var defNoResults = false;
var defApplyFilters = [new Set(), new Set(), new Set(), new Set()];

// let matrDraw = structuredClone(defMatrDraw);
var matrFilters = structuredClone(defMatrFilters);
var noResults = (/* unused pure expression or super */ null && (defNoResults));
var applyFilters = structuredClone(defApplyFilters);
function calcFilters() {
  applyFilters = structuredClone(defApplyFilters);
  // matrDraw = structuredClone(defMatrDraw);

  matrFilters.forEach(function (filter, indexFilter) {
    filter[1].forEach(function (setting, indexSetting) {
      if (matrFilters[indexFilter][1][indexSetting]) {
        buttonsFilters[indexFilter][indexSetting].style.border = "1.5px dashed var(--colors-neutrals-900)";
        applyFilters[indexFilter] = setUnion(applyFilters[indexFilter], new Set([filtersAll[indexFilter][indexSetting]]));
      } else {
        buttonsFilters[indexFilter][indexSetting].style.border = "1.5px dashed var(--colors-neutrals-200)";
      }
    });
  });
  console.log("matrFilters", matrFilters, "apply", applyFilters);
}
function calcDrawParts() {
  // Рисуем полашку по умолчанию - нет результатов
  noResults = !defNoResults;
  filtersPart.forEach(function (filterPart, indexPart) {
    // Раздел по умолчанию - не рисуем
    matrDraw[indexPart][0] = false;
    filterPart.forEach(function (filterModule, inedxModule) {
      // Модуль по умолчанию - рисуем
      matrDraw[indexPart][1][inedxModule] = true;
      //console.log(`p[${indexPart}]m[${inedxModule}]`, "filters", applyFilters);
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
          if (setIntersection(filterModule, applyFilter).size == 0) {
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
      // calcDrawParts();
      // drawingParts();
    });
  });
});

// Окно поиска
var filterSearchBar = document.getElementById("filterSearchBar");
var filterSearchButton = document.querySelector(".Q_FilterSearchIcon");
filterSearchButton.addEventListener("click", function () {
  filterSearchButton.style.opacity = "0.52";
  filterSearchBar.value = "";
});
filterSearchBar.addEventListener("input", function () {
  filterSearchButton.style.opacity = filterSearchBar.value ? "1" : "0.52";
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
var nameSort = document.querySelector(".A_FilterSortingByText");
var namesSort = (/* unused pure expression or super */ null && (["По сложности", "По дате обновления", "По проверенности"]));
var pointSort1 = document.querySelector(".Q_FilterSortingByComplexityIcon");
var pointSort2 = document.querySelector(".Q_FilterSortingByDateIcon");
var pointSort3 = document.querySelector(".Q_FilterSortingByVerificationIcon");
var pointsSort = [pointSort1, pointSort2, pointSort3];
var buttonSort1 = document.getElementById("filterSortingByComplexityButton");
var buttonSort2 = document.getElementById("filterSortingByDateButton");
var buttonSort3 = document.getElementById("filterSortingByVerificationButton");
var buttonsSort = [buttonSort1, buttonSort2, buttonSort3];

// const handbookModulesPart1 = document.getElementById("handbookModulesPart1");
// const handbookModulesPart2 = document.getElementById("handbookModulesPart2");
// const handbookModulesPart3 = document.getElementById("handbookModulesPart3");
// const handbookModulesParts = [
//   handbookModulesPart1,
//   handbookModulesPart2,
//   handbookModulesPart3,
// ];

// const originalHandbookModulesPart1 = Array.from(handbookModulesPart1.children);
// const originalHandbookModulesPart2 = Array.from(handbookModulesPart2.children);
// const originalHandbookModulesPart3 = Array.from(handbookModulesPart3.children);
// const originalHandbookModulesParts = [
//   originalHandbookModulesPart1,
//   originalHandbookModulesPart2,
//   originalHandbookModulesPart3,
// ];

// Матрица переходов
var transitionSorts = (/* unused pure expression or super */ null && ([[[0, 1], [0, 1, 2], [0, 1, 2]], [[1, 0], [0, 1, 2], [0, 1, 2]], [[0, 1], [0, 1, 2], [0, 1, 2]]]));
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
    // applyingSorting();
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
      // calcDrawParts();
      // drawingParts();

      // Сброс сортировки
      numberSorting = 0;
      closeMenuSorting();
      // applyingSorting();
    });
  }
});

// Видео и изображения
// Запуск видео при наведении
var videos = document.querySelectorAll(".A_GallaryWorkPreviewVideo");
videos.forEach(function (video) {
  video.addEventListener("mouseenter", function () {
    video.play();
  });
  video.addEventListener("mouseleave", function () {
    video.pause();
    video.currentTime = 0;
  });
});
/******/ })()
;