// Задание фильтров
// Список доступных фильтров
const filtersComplexity = [
  "filterComplexityInitial",
  "filterComplexityMiddle",
  "filterComplexityAdvanced",
];
const filtersLibrary = [
  "filterLibraryVanillajs",
  "filterLibraryP5js",
  "filterLibraryThreejs",
];
const filtersFormat = [
  "filterFormatTechnique",
  "filterFormatTask",
  "filterFormatVariation",
];
const filtersVerification = [
  "filterVerificationExpert",
  "filterVerificationAuthorial",
];
const filtersAll = [
  filtersComplexity,
  filtersLibrary,
  filtersFormat,
  filtersVerification,
];

// Какие фильтры у каких модулей
// p1m1
const setFiltersPart1Module1Tutorial1 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart1Module1Tutorial2 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart1Module1Tutorial3 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterComplexityAdvanced",
  "filterVerificationExpert",
]);
const filtersPart1Module1 = [
  setFiltersPart1Module1Tutorial1,
  setFiltersPart1Module1Tutorial2,
  setFiltersPart1Module1Tutorial3,
];
const setFiltersPart1Module1 = new Set([
  ...setFiltersPart1Module1Tutorial1,
  ...setFiltersPart1Module1Tutorial2,
  ...setFiltersPart1Module1Tutorial3,
]);
// p1m2
const setFiltersPart1Module2Tutorial1 = new Set([
  "filterComplexityInitial",
  "filterLibraryP5js",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart1Module2Tutorial2 = new Set([
  "filterComplexityInitial",
  "filterLibraryP5js",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart1Module2Tutorial3 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const filtersPart1Module2 = [
  setFiltersPart1Module2Tutorial1,
  setFiltersPart1Module2Tutorial2,
  setFiltersPart1Module2Tutorial3,
];
const setFiltersPart1Module2 = new Set([
  ...setFiltersPart1Module2Tutorial1,
  ...setFiltersPart1Module2Tutorial2,
  ...setFiltersPart1Module2Tutorial3,
]);
const filtersPart1 = [setFiltersPart1Module1, setFiltersPart1Module2];
// p2m1
const setFiltersPart2Module1Tutorial1 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart2Module1Tutorial2 = new Set([
  "filterComplexityInitial",
  "filterLibraryP5js",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart2Module1Tutorial3 = new Set([
  "filterComplexityMiddle",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const filtersPart2Module1 = [
  setFiltersPart2Module1Tutorial1,
  setFiltersPart2Module1Tutorial2,
  setFiltersPart2Module1Tutorial3,
];
const setFiltersPart2Module1 = new Set([
  ...setFiltersPart2Module1Tutorial1,
  ...setFiltersPart2Module1Tutorial2,
  ...setFiltersPart2Module1Tutorial3,
]);
// p2m2
const setFiltersPart2Module2Tutorial1 = new Set(filtersAll.flat());
const setFiltersPart2Module2Tutorial2 = new Set(filtersAll.flat());
const setFiltersPart2Module2Tutorial3 = new Set(filtersAll.flat());
const filtersPart2Module2 = [
  setFiltersPart2Module2Tutorial1,
  setFiltersPart2Module2Tutorial2,
  setFiltersPart2Module2Tutorial3,
];
const setFiltersPart2Module2 = new Set([
  ...setFiltersPart2Module2Tutorial1,
  ...setFiltersPart2Module2Tutorial2,
  ...setFiltersPart2Module2Tutorial3,
]);
// p2m3
const setFiltersPart2Module3Tutorial1 = new Set(filtersAll.flat());
const setFiltersPart2Module3Tutorial2 = new Set(filtersAll.flat());
const setFiltersPart2Module3Tutorial3 = new Set(filtersAll.flat());
const filtersPart2Module3 = [
  setFiltersPart2Module3Tutorial1,
  setFiltersPart2Module3Tutorial2,
  setFiltersPart2Module3Tutorial3,
];
const setFiltersPart2Module3 = new Set([
  ...setFiltersPart2Module3Tutorial1,
  ...setFiltersPart2Module3Tutorial2,
  ...setFiltersPart2Module3Tutorial3,
]);
const filtersPart2 = [
  setFiltersPart2Module1,
  setFiltersPart2Module2,
  setFiltersPart2Module3,
];
// p3m1
const setFiltersPart3Module1Tutorial1 = new Set(filtersAll.flat());
const setFiltersPart3Module1Tutorial2 = new Set(filtersAll.flat());
const setFiltersPart3Module1Tutorial3 = new Set(filtersAll.flat());
const filtersPart3Module1 = [
  setFiltersPart3Module1Tutorial1,
  setFiltersPart3Module1Tutorial2,
  setFiltersPart3Module1Tutorial3,
];
const setFiltersPart3Module1 = new Set([
  ...setFiltersPart3Module1Tutorial1,
  ...setFiltersPart3Module1Tutorial2,
  ...setFiltersPart3Module1Tutorial3,
]);
// p3m2
const setFiltersPart3Module2Tutorial1 = new Set(filtersAll.flat());
const setFiltersPart3Module2Tutorial2 = new Set(filtersAll.flat());
const setFiltersPart3Module2Tutorial3 = new Set(filtersAll.flat());
const filtersPart3Module2 = [
  setFiltersPart3Module2Tutorial1,
  setFiltersPart3Module2Tutorial2,
  setFiltersPart3Module2Tutorial3,
];
const setFiltersPart3Module2 = new Set([
  ...setFiltersPart3Module2Tutorial1,
  ...setFiltersPart3Module2Tutorial2,
  ...setFiltersPart3Module2Tutorial3,
]);
// p3m3
const setFiltersPart3Module3Tutorial1 = new Set(filtersAll.flat());
const setFiltersPart3Module3Tutorial2 = new Set(filtersAll.flat());
const setFiltersPart3Module3Tutorial3 = new Set(filtersAll.flat());
const filtersPart3Module3 = [
  setFiltersPart3Module3Tutorial1,
  setFiltersPart3Module3Tutorial2,
  setFiltersPart3Module3Tutorial3,
];
const setFiltersPart3Module3 = new Set([
  ...setFiltersPart3Module3Tutorial1,
  ...setFiltersPart3Module3Tutorial2,
  ...setFiltersPart3Module3Tutorial3,
]);
const filtersPart3 = [
  setFiltersPart3Module1,
  setFiltersPart3Module2,
  setFiltersPart3Module3,
];
const filtersPart = [filtersPart1, filtersPart2, filtersPart3];
// Для отрисовки
const handbookPart1Module1 = document.getElementById("handbookPart1Module1");
const handbookPart1Module2 = document.getElementById("handbookPart1Module2");
const hhandbookPart1Modules = [handbookPart1Module1, handbookPart1Module2];
const handbookPart1 = document.getElementById("handbookPart1");
const handbookPart2Module1 = document.getElementById("handbookPart2Module1");
const handbookPart2Module2 = document.getElementById("handbookPart2Module2");
const handbookPart2Module3 = document.getElementById("handbookPart2Module3");
const hhandbookPart2Modules = [
  handbookPart2Module1,
  handbookPart2Module2,
  handbookPart2Module3,
];
const handbookPart2 = document.getElementById("handbookPart2");
const handbookPart3Module1 = document.getElementById("handbookPart3Module1");
const handbookPart3Module2 = document.getElementById("handbookPart3Module2");
const handbookPart3Module3 = document.getElementById("handbookPart3Module3");
const hhandbookPart3Modules = [
  handbookPart3Module1,
  handbookPart3Module2,
  handbookPart3Module3,
];
const handbookPart3 = document.getElementById("handbookPart3");

// Фильтры слева
// Меню
let isOpenFilters = false;
const filterFiltersButton = document.querySelector(".A_FilterFiltersButton");
const filterFiltersMenu = document.querySelector(".C_FilterFiltersMenu");
const filterFiltersOpenIcon = document.querySelector(
  ".Q_FilterFiltersOpenIcon",
);
const filterFiltersCloseIcon = document.querySelector(
  ".Q_FilterFiltersCloseIcon",
);

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

filterFiltersButton.addEventListener("click", () => {
  if (isOpenFilters) {
    closeMenuFilters();
  } else {
    openMenuFilters();
  }
});

// Применение фильтров
// Кнопачки
const filterComplexityInitial = document.getElementById(
  "filterComplexityInitial",
);
const filterComplexityMiddle = document.getElementById(
  "filterComplexityMiddle",
);
const filterComplexityAdvanced = document.getElementById(
  "filterComplexityAdvanced",
);
const buttonsComplexity = [
  filterComplexityInitial,
  filterComplexityMiddle,
  filterComplexityAdvanced,
];
const filterLibraryVanillajs = document.getElementById(
  "filterLibraryVanillajs",
);
const filterLibraryP5js = document.getElementById("filterLibraryP5js");
const filterLibraryThreejs = document.getElementById("filterLibraryThreejs");
const buttonsLibrary = [
  filterLibraryVanillajs,
  filterLibraryP5js,
  filterLibraryThreejs,
];
const filterFormatTechnique = document.getElementById("filterFormatTechnique");
const filterFormatTask = document.getElementById("filterFormatTask");
const filterFormatVariation = document.getElementById("filterFormatVariation");
const buttonsFormat = [
  filterFormatTechnique,
  filterFormatTask,
  filterFormatVariation,
];
const filterVerificationExpert = document.getElementById(
  "filterVerificationExpert",
);
const filterVerificationAuthorial = document.getElementById(
  "filterVerificationAuthorial",
);
const buttonsVerification = [
  filterVerificationExpert,
  filterVerificationAuthorial,
];

// Операции над множествами
// Объединение
const union = (...sets) => new Set(sets.flatMap((set) => [...set]));
// Пересечение
const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));
// Разность
const difference = (a, b) => new Set([...a].filter((x) => !b.has(x)));

// Список фильтров
let matrFilters = [
  [false, [false, false, false]],
  [false, [false, false, false]],
  [false, [false, false, false]],
  [false, [false, false]],
];
let noneResults = false;
let matrResults = [
  [true, [true, true]],
  [true, [true, true, true]],
  [true, [true, true, true]],
];
let matrDraw = [
  [handbookPart1, hhandbookPart1Modules],
  [handbookPart2, hhandbookPart2Modules],
  [handbookPart3, hhandbookPart3Modules],
];
let allowFilters = new Set(filtersAll.flat());
let denyFilters = new Set();

const buttonsFilters = [
  buttonsComplexity,
  buttonsLibrary,
  buttonsFormat,
  buttonsVerification,
];

// Применение фильтров
buttonsFilters.forEach((buttons, indexFilter) => {
  buttons.forEach((button, indexButton) => {
    button.addEventListener("click", () => {
      let buttonCondition = !matrFilters[indexFilter][1][indexButton];
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
        matrFilters[indexFilter][0] = matrFilters[indexFilter][1].some(
          (item) => item !== false,
        );
      }

      // Операции над множеством настроек
      // Если фильтр включён
      if (matrFilters[indexFilter][0]) {
        //
        allowFilters = difference(
          allowFilters,
          new Set(filtersAll[indexFilter]),
        );
        denyFilters = union(denyFilters, new Set(filtersAll[indexFilter]));

        //
        matrFilters[indexFilter][1].forEach((button, indexButton) => {
          if (button) {
            denyFilters = difference(
              denyFilters,
              new Set([filtersAll[indexFilter][indexButton]]),
            );
          }
        });
      }
      // Если фильтр выключен
      else {
        allowFilters = union(allowFilters, new Set(filtersAll[indexFilter]));
        denyFilters = difference(denyFilters, new Set(filtersAll[indexFilter]));
      }
      console.log(
        "serch set",
        matrFilters,
        "allow",
        allowFilters,
        "deny",
        denyFilters,
      );

      // Расчёт сетов и применение фильтров TODO
      filtersPart.forEach((part, i) => {
        part.forEach((module, j) => {
          // console.log(`fits [${i}][${j}]`, module);

          // Если и разрешённый и запрещённый список
          if (
            intersection(allowFilters, module).size &&
            !intersection(denyFilters, module).size
          ) {
            matrResults[i][1][j] = true;
            matrDraw[i][1][j].style.display = "flex";
          } else {
            matrResults[i][1][j] = false;
            matrDraw[i][1][j].style.display = "none";
          }
        });
      });
      noneResults = matrResults.every((item) => item[0] === false);

      // console.log("draw matr", noneResults, matrResults);
    });
  });
});

// Окно поиска
const filterSearchBar = document.getElementById("filterSearchBar");
const filterSearchButton = document.querySelector(".Q_FilterSearchIcon");

filterSearchButton.addEventListener("click", () => {
  filterSearchBar.value = "";
  filterSearchBar.focus();
});

filterSearchBar.addEventListener("input", () => {
  filterSearchButton.style.opacity = filterSearchBar.value ? "1" : "0.5";
});

// Сортировка справа
// Меню
isOpenSorting = false;

const openSortsButton = document.querySelector(".A_FilterSortingOpenButton");
const openSortsIcon = document.querySelector(".Q_FilterSortingOpenIcon");
const closeSortsIcon = document.querySelector(".Q_FilterSortingCloseIcon");
const sortingMenu = document.querySelector(".C_FilterSortingMenu");

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

openSortsButton.addEventListener("click", () => {
  if (isOpenSorting) {
    closeMenuSorting();
  } else {
    openMenuSorting();
  }
});

// Применение сортировки
numberSorting = 0; // 0, 1, 2
const nameSort1 = document.querySelector(".A_FilterSortingByComplexityText");
const nameSort2 = document.querySelector(".A_FilterSortingByDateText");
const nameSort3 = document.querySelector(".A_FilterSortingByVerificationText");
const namesSort = [nameSort1, nameSort2, nameSort3];

const pointSort1 = document.querySelector(".Q_FilterSortingByComplexityIcon");
const pointSort2 = document.querySelector(".Q_FilterSortingByDateIcon");
const pointSort3 = document.querySelector(".Q_FilterSortingByVerificationIcon");
const pointsSort = [pointSort1, pointSort2, pointSort3];

const buttonSort1 = document.getElementById("filterSortingByComplexityButton");
const buttonSort2 = document.getElementById("filterSortingByDateButton");
const buttonSort3 = document.getElementById(
  "filterSortingByVerificationButton",
);
const buttonsSort = [buttonSort1, buttonSort2, buttonSort3];

const handbookModulesPart1 = document.getElementById("handbookModulesPart1");
const handbookModulesPart2 = document.getElementById("handbookModulesPart2");
const handbookModulesPart3 = document.getElementById("handbookModulesPart3");
const handbookModulesParts = [
  handbookModulesPart1,
  handbookModulesPart2,
  handbookModulesPart3,
];

const originalHandbookModulesPart1 = Array.from(handbookModulesPart1.children);
const originalHandbookModulesPart2 = Array.from(handbookModulesPart2.children);
const originalHandbookModulesPart3 = Array.from(handbookModulesPart3.children);
const originalHandbookModulesParts = [
  originalHandbookModulesPart1,
  originalHandbookModulesPart2,
  originalHandbookModulesPart3,
];

// Матрица переходов
const transitionSorts = [
  [
    [0, 1],
    [0, 1, 2],
    [0, 1, 2],
  ],
  [
    [1, 0],
    [2, 1, 0],
    [2, 1, 0],
  ],
  [
    [1, 0],
    [1, 2, 0],
    [2, 0, 1],
  ],
];

function applyingSorting() {
  namesSort.forEach((name) => {
    name.style.display = "none";
  });
  pointsSort.forEach((point) => {
    point.style.display = "none";
  });

  namesSort[numberSorting].style.display = "flex";
  pointsSort[numberSorting].style.display = "flex";
  console.log(`"Сортировка ${numberSorting}`);

  // Применение сортировки
  handbookModulesParts.forEach((handbookPart, jPart) => {
    handbookPart.innerHTML = "";

    transitionSorts[numberSorting][jPart].forEach((kPosition) => {
      handbookModulesParts[jPart].appendChild(
        originalHandbookModulesParts[jPart][kPosition],
      );
    });
  });
}

// Приминение вызовов сортировок к кнопкам
buttonsSort.forEach((button, iSort) => {
  button.addEventListener("click", () => {
    // Определение сортировки
    numberSorting = iSort;
    closeMenuSorting();
    applyingSorting();
  });
});

// Сброс настроек
// Самое право
const resetButton = document.querySelector(".A_FilterResetButton");
resetButton.addEventListener("click", () => {
  // Сброс фильтров
  closeMenuFilters();
  //TODO фильтров

  // Сброс сортировки
  numberSorting = 0;
  closeMenuSorting();
  applyingSorting();
});
