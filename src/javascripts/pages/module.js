// Для отрисовки
const part1module1 = document.getElementById("part1module1");
const part1module2 = document.getElementById("part1module2");
const part2module1 = document.getElementById("part2module1");
const part2module2 = document.getElementById("part2module2");
const part2module3 = document.getElementById("part2module3");
const part3module1 = document.getElementById("part3module1");
const part3module2 = document.getElementById("part3module2");
const part3module3 = document.getElementById("part3module3");
const modules = [
  part1module1,
  part1module2,
  part2module1,
  part2module2,
  part2module3,
  part3module1,
  part3module2,
  part3module3,
];

// Номер модуля
let moduleId;
modules.forEach((module, id) => {
  if (module) {
    moduleId = id;
  }
});

// Туториалы для отрисовки
const moduleTutorial1 = document.getElementById("moduleTutorial1");
const moduleTutorial2 = document.getElementById("moduleTutorial2");
const moduleTutorial3 = document.getElementById("moduleTutorial3");
const moduleTutorial4 = document.getElementById("moduleTutorial4");
const moduleTutorial5 = document.getElementById("moduleTutorial5");
const moduleTutorials = [
  moduleTutorial1,
  moduleTutorial2,
  moduleTutorial3,
  moduleTutorial4,
  moduleTutorial5,
];

const moduleNoResults = document.querySelector(".NoResultsTutorials");

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
// Все кнопачки
const buttonsFilters = [
  buttonsComplexity,
  buttonsLibrary,
  buttonsFormat,
  buttonsVerification,
];

// Операции над множествами
// Объединение
const setUnion = (...sets) => new Set(sets.flatMap((set) => [...set]));
// Пересечение
const setIntersection = (a, b) => new Set([...a].filter((x) => b.has(x)));
// Разность
const setDifference = (a, b) => new Set([...a].filter((x) => !b.has(x)));

// Список фильтров
const defMatrFilters = [
  [false, [false, false, false]],
  [false, [false, false, false]],
  [false, [false, false, false]],
  [false, [false, false]],
];
const defApplyFilters = [new Set(), new Set(), new Set(), new Set()];
let matrFilters = structuredClone(defMatrFilters);
let applyFilters = structuredClone(defApplyFilters);
import { filtersAll, filtersModules } from "../json/tutorialsJson.js";

function calcFilters() {
  applyFilters = structuredClone(defApplyFilters);

  matrFilters.forEach((filter, indexFilter) => {
    filter[1].forEach((setting, indexSetting) => {
      if (matrFilters[indexFilter][1][indexSetting]) {
        buttonsFilters[indexFilter][indexSetting].style.border =
          "1.5px dashed var(--colors-neutrals-900)";

        applyFilters[indexFilter] = setUnion(
          applyFilters[indexFilter],
          new Set([filtersAll[indexFilter][indexSetting]]),
        );
      } else {
        buttonsFilters[indexFilter][indexSetting].style.border =
          "1.5px dashed var(--colors-neutrals-200)";
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
  moduleTutorials.forEach((tutorial) => {
    if (tutorial) {
      tutorial.style.display = "flex";
    }
  });

  // Перебор модуля
  filtersModules[moduleId].forEach((filtersTutorial, indexTutorial) => {
    // Перебор фильтров
    for (const applyFilter of applyFilters) {
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
    if (moduleTutorials[indexTutorial].style.display == "flex") {
      moduleNoResults.style.display = "none";
    }
  });
}

// Добавление клика настройки
buttonsFilters.forEach((buttons, indexFilter) => {
  buttons.forEach((button, indexButton) => {
    button.addEventListener("click", () => {
      let buttonCondition = !matrFilters[indexFilter][1][indexButton];
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
        matrFilters[indexFilter][0] = matrFilters[indexFilter][1].some(
          (item) => item !== false,
        );
      }

      calcFilters();
      calcAndDrawingTutorials();
    });
  });
});

// Окно поиска
const filterSearchBar = document.getElementById("filterSearchBar");
const filterSearchButton = document.querySelector(".Q_FilterSearchIcon");

filterSearchButton.addEventListener("click", () => {
  filterSearchButton.style.opacity = "var(--official-no-interaction-opacity)";
  filterSearchBar.value = "";
});

filterSearchBar.addEventListener("input", () => {
  filterSearchButton.style.opacity = filterSearchBar.value
    ? "1"
    : "var(--official-no-interaction-opacity)";
});

// Сортировка справа
// Меню
let isOpenSorting = false;

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
let numberSorting = 0; // 0, 1, 2
const nameSort = document.querySelector(".A_FilterSortingByText");
const namesSort = ["По сложности", "По дате обновления", "По проверенности"];

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
    [0, 1, 2],
    [0, 1, 2],
  ],
  [
    [0, 1],
    [0, 1, 2],
    [0, 1, 2],
  ],
];

function applyingSorting() {
  pointsSort.forEach((point) => {
    point.style.display = "none";
  });

  nameSort.textContent = namesSort[numberSorting];
  // nameSort.innerHTML = `${namesSort[numberSorting]}`;
  pointsSort[numberSorting].style.display = "flex";
  // console.log(`"Сортировка ${numberSorting}`);

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
const resetButton1 = document.querySelector(".A_FilterResetButton");
// Скрытая снизу
const resetButton2 = document.getElementById("filterResetButton2");
const resetButtons = [resetButton1, resetButton2];

resetButtons.forEach((resetButton) => {
  if (resetButton) {
    resetButton.addEventListener("click", () => {
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
