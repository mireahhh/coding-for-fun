// Для отрисовки
const handbookPart1Module1 = document.getElementById("handbookPart1Module1");
const handbookPart1Module2 = document.getElementById("handbookPart1Module2");
const handbookPart1Modules = [handbookPart1Module1, handbookPart1Module2];
const handbookPart1 = [
  document.getElementById("handbookPart1"),
  handbookPart1Modules,
];

const handbookPart2Module1 = document.getElementById("handbookPart2Module1");
const handbookPart2Module2 = document.getElementById("handbookPart2Module2");
const handbookPart2Module3 = document.getElementById("handbookPart2Module3");
const handbookPart2Modules = [
  handbookPart2Module1,
  handbookPart2Module2,
  handbookPart2Module3,
];
const handbookPart2 = [
  document.getElementById("handbookPart2"),
  handbookPart2Modules,
];
const handbookPart3Module1 = document.getElementById("handbookPart3Module1");
const handbookPart3Module2 = document.getElementById("handbookPart3Module2");
const handbookPart3Module3 = document.getElementById("handbookPart3Module3");
const handbookPart3Modules = [
  handbookPart3Module1,
  handbookPart3Module2,
  handbookPart3Module3,
];
const handbookPart3 = [
  document.getElementById("handbookPart3"),
  handbookPart3Modules,
];
const handbook = [handbookPart1, handbookPart2, handbookPart3];
const handbookNoResults = document.querySelector(".NoResultsParts");

// Фильтры слева
// Меню
let isOpenFilters = false;
const filterFiltersButton = document.querySelector(".A_FilterFiltersButton");
const filterFiltersMenu = document.querySelector(".C_FilterFiltersMenu");

function openMenuFilters() {
  isOpenFilters = true;
  filterFiltersMenu.style.display = "flex";
  filterFiltersButton.classList.add("is-open");
}

function closeMenuFilters() {
  isOpenFilters = false;
  filterFiltersMenu.style.display = "none";
  filterFiltersButton.classList.remove("is-open");
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
const defMatrDraw = [
  [true, [true, true]],
  [true, [true, true, true]],
  [true, [true, true, true]],
];
const defNoResults = false;
const defApplyFilters = [new Set(), new Set(), new Set(), new Set()];

let matrDraw = structuredClone(defMatrDraw);
let matrFilters = structuredClone(defMatrFilters);
let noResults = defNoResults;
let applyFilters = structuredClone(defApplyFilters);

import { months, filtersAll } from "../json/otherJson.js";
import { tagsHandbook, getPartModules, getModuleTutorials, tutorialToFilterSet } from "../json/tutorialsJson.js";

// Сортировка и баллы
const complexityOrder = {
  filterComplexityInitial: 0,
  filterComplexityMiddle: 1,
  filterComplexityAdvanced: 2,
};

const verificationOrder = {
  filterVerificationAuthorial: 0,
  filterVerificationExpert: 1,
};

function formatDate(dateJs) {
  if (!dateJs) return "";

  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6), 10);
  const day = dateJs.slice(6, 8);

  return `${day} ${months[month - 1]} ${year}`;
}

function getLastTutorialDate(tutorial) {
  if (!tutorial?.date || tutorial.date.length === 0) {
    return "";
  }
  return tutorial.date.at(-1);
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

// Вычисление метаданных модулей для сортировки
const handbookIntroDate = document.querySelector(".A_IntroHeadingApdate");

// Метаданные модулей:
// [partIndex][moduleIndex] -> объект с данными модуля
const moduleMeta = tagsHandbook.map((partData, partIndex) => {
  return getPartModules(partData).map((moduleData, moduleIndex) => {
    const moduleTutorials = getModuleTutorials(moduleData);
    const tutorialDates = moduleTutorials
      .map((tutorial) => getLastTutorialDate(tutorial))
      .filter(Boolean);

    const date = tutorialDates.sort().at(-1) || "";
    const dateNumber = Number(date || 0);

    const complexityValues = moduleTutorials
      .map((tutorial) => complexityOrder[tutorial.complexity])
      .filter((value) => value !== undefined);

    const verificationValues = moduleTutorials
      .map((tutorial) => verificationOrder[tutorial.verification])
      .filter((value) => value !== undefined);

    return {
      partIndex,
      moduleIndex,
      originalIndex: moduleIndex,
      tutorialCount: moduleTutorials.length,
      date,
      dateNumber,
      complexityAvg: average(complexityValues),
      verificationAvg: average(verificationValues),
      filterSet: new Set(
        moduleTutorials.flatMap((tutorial) => [...tutorialToFilterSet(tutorial)])
      ),
    };
  });
});

const partMeta = moduleMeta.map((partModules, partIndex) => {
  const moduleDates = partModules
    .map((module) => module.date)
    .filter(Boolean);

  return {
    partIndex,
    moduleCount: partModules.length,
    tutorialCount: partModules.reduce(
      (sum, module) => sum + module.tutorialCount,
      0,
    ),
    date: moduleDates.sort().at(-1) || "",
    dateNumber: Number(moduleDates.sort().at(-1) || 0),
    complexityAvg: average(partModules.map((module) => module.complexityAvg)),
    verificationAvg: average(
      partModules.map((module) => module.verificationAvg),
    ),
  };
});

const handbookMeta = {
  partCount: partMeta.length,
  moduleCount: moduleMeta.flat().length,
  tutorialCount: partMeta.reduce((sum, part) => sum + part.tutorialCount, 0),
  date: partMeta
    .map((part) => part.date)
    .filter(Boolean)
    .sort()
    .at(-1) || "",
  dateNumber: Number(
    partMeta
      .map((part) => part.date)
      .filter(Boolean)
      .sort()
      .at(-1) || 0,
  ),
  complexityAvg: average(partMeta.map((part) => part.complexityAvg)),
  verificationAvg: average(partMeta.map((part) => part.verificationAvg)),
};

// Старый аналог filtersParts, но уже из tagsHandbook
const filtersParts = moduleMeta.map((partModules) => {
  return partModules.map((module) => module.filterSet);
});

// Дата учебника = максимальная дата среди всех модулей
if (handbookIntroDate && handbookMeta.date) {
  handbookIntroDate.textContent = `Обновлено ${formatDate(handbookMeta.date)}`;
}

function calcFilters() {
  applyFilters = structuredClone(defApplyFilters);
  matrDraw = structuredClone(defMatrDraw);

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

function calcDrawParts() {
  // Рисуем полашку по умолчанию - нет результатов
  noResults = !defNoResults;
  // Перебор разделов
  filtersParts.forEach((filterPart, indexPart) => {
    // Раздел по умолчанию - не рисуем
    matrDraw[indexPart][0] = false;

    // Перебор модуля
    filterPart.forEach((filtersModule, inedxModule) => {
      // Модуль по умолчанию - рисуем
      matrDraw[indexPart][1][inedxModule] = true;
      //console.log(`p[${indexPart}]m[${inedxModule}]`, "filters", applyFilters);

      // Перебор фильтров
      for (const applyFilter of applyFilters) {
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
  matrDraw.forEach((part, indexPart) => {
    // Не рисуем весь раздел
    if (!matrDraw[indexPart][0]) {
      handbook[indexPart][0].style.display = "none";
      return;
    }
    // Рисуем весь раздел
    handbook[indexPart][0].style.display = "flex";
    part.forEach((module, jnedxModule) => {
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
      calcDrawParts();
      drawingParts();
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
  filterSearchButton.style.opacity = filterSearchBar.value ? "1" : "var(--official-no-interaction-opacity)";
});

// Сортировка справа
// Меню
let isOpenSorting = false;

const openSortsButton = document.querySelector(".A_FilterSortingOpenButton");
const sortingMenu = document.querySelector(".C_FilterSortingMenu");

function openMenuSorting() {
  isOpenSorting = true;
  sortingMenu.style.display = "flex";
  openSortsButton.classList.add("is-open");
}

function closeMenuSorting() {
  isOpenSorting = false;
  sortingMenu.style.display = "none";
  openSortsButton.classList.remove("is-open");
}

openSortsButton.addEventListener("click", () => {
  if (isOpenSorting) {
    closeMenuSorting();
  } else {
    openMenuSorting();
  }
});

// Применение сортировки
let numberSorting = Number(sessionStorage.getItem("numberSortingHandbook")); // 0, 1, 2
if (Number.isNaN(numberSorting)) {
  numberSorting = 0;
}

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

// Разделение на пустые и заполненные модули
const realHandbookModulesParts = handbookModulesParts.map((part) =>
  Array.from(part.children).filter((item) => item.id)
);
const fillerHandbookModulesParts = handbookModulesParts.map((part) =>
  Array.from(part.children).filter((item) => !item.id)
);

// Вычисление сортировки
function getSortedModulesForPart(partIndex) {
  const modules = [...moduleMeta[partIndex]];

  if (numberSorting === 0) {
    // По сложности: initial -> middle -> advanced
    modules.sort((a, b) => {
      const diff = a.complexityAvg - b.complexityAvg;
      if (diff !== 0) return diff;

      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 1) {
    // По дате: новые сверху
    modules.sort((a, b) => {
      const diff = b.dateNumber - a.dateNumber;
      if (diff !== 0) return diff;

      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 2) {
    // По проверенности: экспертная выше авторской
    modules.sort((a, b) => {
      const diff = b.verificationAvg - a.verificationAvg;
      if (diff !== 0) return diff;

      return a.originalIndex - b.originalIndex;
    });
  }

  return modules;
}

// Применение сортировки
function applyingSorting() {
  pointsSort.forEach((point) => {
    point.style.display = "none";
  });

  nameSort.textContent = namesSort[numberSorting];
  pointsSort[numberSorting].style.display = "flex";

  handbookModulesParts.forEach((handbookPart, partIndex) => {
    const sortedModules = getSortedModulesForPart(partIndex);
    const fillers = fillerHandbookModulesParts[partIndex];

    handbookPart.innerHTML = "";

    // Сначала реальные модули
    sortedModules.forEach((module) => {
      const moduleNode = handbook[partIndex][1][module.originalIndex];
      if (moduleNode) {
        handbookPart.appendChild(moduleNode);
      }
    });

    // Потом пустые плейсхолдеры
    fillers.forEach((filler) => {
      handbookPart.appendChild(filler);
    });
  });
}

// Приминение вызовов сортировок к кнопкам
buttonsSort.forEach((button, iSort) => {
  button.addEventListener("click", () => {
    // Определение сортировки
    numberSorting = iSort;
    sessionStorage.setItem("numberSortingHandbook", numberSorting);
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
      sessionStorage.setItem("numberSortingHandbook", numberSorting);
      closeMenuSorting();
      applyingSorting();
    });
  }
});

// Динамическое обновление даты
function drawModuleDates() {
  moduleMeta.forEach((partModules, partIndex) => {
    partModules.forEach((module, moduleIndex) => {
      const moduleCard = handbook[partIndex][1][moduleIndex];
      if (!moduleCard) return;

      const dateNode = moduleCard.querySelector(".A_HandbookModuleDate");
      if (!dateNode || !module.date) return;

      dateNode.textContent = formatDate(module.date);
    });
  });
}

const handbookIntroAbout = document.querySelector(".A_IntroHeadingAbout");

// Динамический счётчик
function drawContTutorials() {
  handbookIntroAbout.innerHTML =
    `${handbookMeta.partCount}&nbsp;раздела, ` +
    `${handbookMeta.moduleCount}&nbsp;модулей и ` +
    `${handbookMeta.tutorialCount}&nbsp;интерактивных туториала с&nbsp;экспериментами`;
  // console.log("pC", handbookMeta.partCount, "mC", handbookMeta.moduleCount, "tC", handbookMeta.tutorialCount);
}

function showWidth() {
  const widthValue = document.getElementById("width-value");
  if (!widthValue) return;

  widthValue.textContent = window.innerWidth;
}

showWidth();
window.addEventListener("resize", showWidth);

calcFilters();
calcDrawParts();
applyingSorting();
drawingParts();
drawModuleDates();
drawContTutorials();