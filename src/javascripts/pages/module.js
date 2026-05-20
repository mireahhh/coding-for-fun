const heading = document.querySelector(".A_IntroHeading");
if (!heading) {
  throw new Error("Не найден .A_IntroHeading");
}

const part = Number(heading.dataset.part);
const module = Number(heading.dataset.module);

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
import { months, filtersName, filtersAll } from "../json/otherJson.js";
import { tagsHandbook } from "../json/tutorialsJson.js";

// helpers
const toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === null || value === "") {
    return [];
  }
  return [value];
};

const tutorialToFilterSet = (tutorial) => {
  return new Set([
    ...toArray(tutorial.complexity),
    ...toArray(tutorial.library),
    ...toArray(tutorial.format),
    ...toArray(tutorial.verification),
  ]);
};

// туториалы текущего модуля
const currentModuleTutorials = tagsHandbook?.[part - 1]?.[module - 1] ?? [];

// переводим в старую структуру
const currentModuleFilters = currentModuleTutorials.map((tutorial) =>
  tutorialToFilterSet(tutorial),
);

// Формат даты из "20251227" -> "27 декабря 2025"
function formatTutorialDate(dateJs) {
  if (!dateJs) return "";

  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6), 10);
  const day = dateJs.slice(6, 8);

  return `${day} ${months[month - 1]} ${year}`;
}

// Последняя дата статьи
function getLastTutorialDate(tutorial) {
  if (!tutorial?.date || tutorial.date.length === 0) {
    return "";
  }
  return tutorial.date.at(-1);
}

// Один tutorial -> список подписей тегов
// Используем всё, кроме date/title/author/tags:
// complexity + library + format + verification
function getTutorialTagValues(tutorial) {
  const libraryKeys = Array.isArray(tutorial.library)
    ? tutorial.library
    : tutorial.library
      ? [tutorial.library]
      : [];

  const formatKeys = Array.isArray(tutorial.format)
    ? tutorial.format
    : tutorial.format
      ? [tutorial.format]
      : [];

  const rawKeys = [
    tutorial.complexity,
    ...libraryKeys,
    ...formatKeys,
    tutorial.verification,
  ].filter(Boolean);

  return rawKeys.map((key) => filtersName[key] ?? key);
}

// Перерисовка тегов карточки статьи
function drawTutorialTags(tutorial, tagsContainer) {
  if (!tagsContainer) return;

  tagsContainer.innerHTML = "";

  const tagValues = getTutorialTagValues(tutorial);

  tagValues.forEach((value) => {
    const li = document.createElement("li");
    li.className = "A_ModuleTutorialTag";
    li.textContent = value;
    tagsContainer.appendChild(li);
  });
}

// Главная функция отрисовки данных модуля
function drawModuleMeta() {
  if (!heading) return;

  const moduleTutorialsData = tagsHandbook?.[part - 1]?.[module - 1];
  if (!moduleTutorialsData || !Array.isArray(moduleTutorialsData)) return;

  // 1) Обновляем дату модуля
  const moduleDateEl = document.querySelector(".A_IntroHeadingApdate");
  if (moduleDateEl) {
    const lastModuleDate = moduleTutorialsData
      .map((tutorial) => getLastTutorialDate(tutorial))
      .filter(Boolean)
      .sort()
      .at(-1);

    if (lastModuleDate) {
      moduleDateEl.textContent = `Обновлено ${formatTutorialDate(lastModuleDate)}`;
    }
  }

  // 2) Обновляем карточки статей
  const tutorialCards = document.querySelectorAll(
    ".C_ModuleTutorials .O_ModuleTutorial .W_ModuleTutorial:not(#noResultsTutorials)"
  );

  tutorialCards.forEach((card, index) => {
    const tutorial = moduleTutorialsData[index];
    if (!tutorial) return;

    const subtitle = card.querySelector(".A_ModuleTutorialSubtitle");
    const title = card.querySelector(".A_ModuleTutorialTitle");
    const tagsContainer = card.querySelector(".C_ModuleTutorialTags");

    const tutorialDate = getLastTutorialDate(tutorial);
    const formattedDate = tutorialDate
      ? formatTutorialDate(tutorialDate)
      : "";

    // author / date
    if (subtitle) {
      if (tutorial.author && formattedDate) {
        subtitle.textContent = `${tutorial.author} / ${formattedDate}`;
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
      title.textContent = tutorial.title ?? "";
    }

    // tags
    drawTutorialTags(tutorial, tagsContainer);
  });
}

async function loadTutorialFirstText(moduleNumber, tutorialIndex) {
  const tutorialNumber = tutorialIndex + 1;
  const tutorialPath = `./module${moduleNumber}/tutorial${tutorialNumber}.html`;

  try {
    const response = await fetch(tutorialPath);

    if (!response.ok) {
      throw new Error(`Не удалось загрузить ${tutorialPath}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // const firstText = doc.getElementById("TutorialTextFirst");
    const firstText = doc.querySelector(".A_TutorialText");

    if (!firstText) {
      return "";
    }

    return firstText.innerHTML.trim();
  } catch (error) {
    console.error("Ошибка загрузки текста туториала:", error);
    return "";
  }
}

async function drawTutorialDescriptions() {
  const heading = document.querySelector(".A_IntroHeading");
  if (!heading) return;

  const moduleNumber = Number(heading.dataset.module);

  const tutorialCards = document.querySelectorAll(
    ".C_ModuleTutorials .O_ModuleTutorial .W_ModuleTutorial:not(#noResultsTutorials)"
  );

  for (const [index, card] of Array.from(tutorialCards).entries()) {
    const description = card.querySelector(".A_ModuleTutorialDescription");
    if (!description) continue;

    const tutorialText = await loadTutorialFirstText(moduleNumber, index);

    if (tutorialText) {
      description.innerHTML = tutorialText;
    }
  }
}

const complexityOrder = {
  filterComplexityInitial: 0,
  filterComplexityMiddle: 1,
  filterComplexityAdvanced: 2,
};

const verificationOrder = {
  filterVerificationAuthorial: 0,
  filterVerificationExpert: 1,
};

const tutorialMeta = currentModuleTutorials.map((tutorial, index) => {
  const lastDate = getLastTutorialDate(tutorial);

  return {
    originalIndex: index,
    date: lastDate,
    dateNumber: Number(lastDate || 0),
    complexityValue: complexityOrder[tutorial.complexity] ?? 0,
    verificationValue: verificationOrder[tutorial.verification] ?? 0,
  };
});

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
  currentModuleFilters.forEach((filtersTutorial, indexTutorial) => {
    // Перебор фильтров
    for (const applyFilter of applyFilters) {
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

function getSortedTutorials() {
  const tutorials = [...tutorialMeta];

  if (numberSorting === 0) {
    tutorials.sort((a, b) => {
      const diff = a.complexityValue - b.complexityValue;
      if (diff !== 0) return diff;

      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 1) {
    tutorials.sort((a, b) => {
      const diff = b.dateNumber - a.dateNumber;
      if (diff !== 0) return diff;

      return a.originalIndex - b.originalIndex;
    });
  } else if (numberSorting === 2) {
    tutorials.sort((a, b) => {
      const diff = b.verificationValue - a.verificationValue;
      if (diff !== 0) return diff;

      return a.originalIndex - b.originalIndex;
    });
  }

  return tutorials;
}

function applyingSorting() {
  pointsSort.forEach((point) => {
    point.style.display = "none";
  });

  nameSort.textContent = namesSort[numberSorting];
  pointsSort[numberSorting].style.display = "flex";

  const tutorialsContainer = document.querySelector(".C_ModuleTutorials");
  if (!tutorialsContainer) return;

  const noResultsCard = document.getElementById("noResultsTutorials");

  const sortedTutorials = getSortedTutorials();

  sortedTutorials.forEach((tutorial) => {
    const tutorialNode = moduleTutorials[tutorial.originalIndex];
    if (tutorialNode) {
      tutorialsContainer.appendChild(tutorialNode);
    }
  });

  if (noResultsCard) {
    tutorialsContainer.appendChild(noResultsCard);
  }
}

// Нажатие кнопок сортировки
buttonsSort.forEach((button, iSort) => {
  button.addEventListener("click", () => {
    numberSorting = iSort;
    sessionStorage.setItem("numberSortingHandbook", numberSorting);
    closeMenuSorting();
    applyingSorting();
  });
});

// Сброс настроек
const resetButton = document.querySelector(".A_FilterResetButton");

if (resetButton) {
  resetButton.addEventListener("click", () => {
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