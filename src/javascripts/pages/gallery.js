import img0 from "../../images/gallery/0.png";
import img2 from "../../images/gallery/2.png";
import img3 from "../../images/gallery/3.png";
import img5 from "../../images/gallery/5.png";
const galleryImages = {
  0: img0,
  2: img2,
  3: img3,
  5: img5,
};

import vid1 from "../../images/gallery/1.mp4";
import vid4 from "../../images/gallery/4.mp4";
const galleryVideos = {
  1: vid1,
  4: vid4,
};

// Задание фильтров
// Список доступных фильтров
const filtersComplexity = ["filterComplexityInitial", "filterComplexityMiddle", "filterComplexityAdvanced"];
const filtersLibrary = ["filterLibraryVanillajs", "filterLibraryP5js", "filterLibraryThreejs"];
const filtersVerification = ["filterVerificationExpert", "filterVerificationAuthorial"];
const filtersAll = [filtersComplexity, filtersLibrary, filtersVerification];

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
const handbookPart1Module1 = document.getElementById("handbookPart1Module1");
const handbookPart1Module2 = document.getElementById("handbookPart1Module2");
const handbookPart1Modules = [handbookPart1Module1, handbookPart1Module2];
const handbookPart1 = [document.getElementById("handbookPart1"), handbookPart1Modules];

const handbookPart2Module1 = document.getElementById("handbookPart2Module1");
const handbookPart2Module2 = document.getElementById("handbookPart2Module2");
const handbookPart2Module3 = document.getElementById("handbookPart2Module3");
const handbookPart2Modules = [handbookPart2Module1, handbookPart2Module2, handbookPart2Module3];
const handbookPart2 = [document.getElementById("handbookPart2"), handbookPart2Modules];
const handbookPart3Module1 = document.getElementById("handbookPart3Module1");
const handbookPart3Module2 = document.getElementById("handbookPart3Module2");
const handbookPart3Module3 = document.getElementById("handbookPart3Module3");
const handbookPart3Modules = [handbookPart3Module1, handbookPart3Module2, handbookPart3Module3];
const handbookPart3 = [document.getElementById("handbookPart3"), handbookPart3Modules];
const handbook = [handbookPart1, handbookPart2, handbookPart3];
const handbookNoResults = document.getElementById("handbookNoResults");

// Фильтры слева
// Меню
let isOpenFilters = false;
const filterFiltersButton = document.querySelector(".A_FilterFiltersButton");
const filterFiltersMenu = document.querySelector(".C_FilterFiltersMenu");
const filterFiltersOpenIcon = document.querySelector(".Q_FilterFiltersOpenIcon");
const filterFiltersCloseIcon = document.querySelector(".Q_FilterFiltersCloseIcon");

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
const filterComplexityInitial = document.getElementById("filterComplexityInitial");
const filterComplexityMiddle = document.getElementById("filterComplexityMiddle");
const filterComplexityAdvanced = document.getElementById("filterComplexityAdvanced");
const buttonsComplexity = [filterComplexityInitial, filterComplexityMiddle, filterComplexityAdvanced];
const filterLibraryVanillajs = document.getElementById("filterLibraryVanillajs");
const filterLibraryP5js = document.getElementById("filterLibraryP5js");
const filterLibraryThreejs = document.getElementById("filterLibraryThreejs");
const buttonsLibrary = [filterLibraryVanillajs, filterLibraryP5js, filterLibraryThreejs];
// const filterFormatTechnique = document.getElementById("filterFormatTechnique");
// const filterFormatTask = document.getElementById("filterFormatTask");
// const filterFormatVariation = document.getElementById("filterFormatVariation");
// const buttonsFormat = [
//   filterFormatTechnique,
//   filterFormatTask,
//   filterFormatVariation,
// ];
const filterVerificationExpert = document.getElementById("filterVerificationExpert");
const filterVerificationAuthorial = document.getElementById("filterVerificationAuthorial");
const buttonsVerification = [filterVerificationExpert, filterVerificationAuthorial];
// Все кнопачки
const buttonsFilters = [
  buttonsComplexity,
  buttonsLibrary,
  // buttonsFormat,
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
  [false, [false, false]],
];
// const defMatrDraw = [
//   [true, [true, true]],
//   [true, [true, true, true]],
//   [true, [true, true, true]],
// ];
const defNoResults = false;
const defApplyFilters = [new Set(), new Set(), new Set()];

// let matrDraw = structuredClone(defMatrDraw);
let matrFilters = structuredClone(defMatrFilters);
let noResults = defNoResults;
let applyFilters = structuredClone(defApplyFilters);

function calcFilters() {
  applyFilters = structuredClone(defApplyFilters);
  // matrDraw = structuredClone(defMatrDraw);

  matrFilters.forEach((filter, indexFilter) => {
    filter[1].forEach((setting, indexSetting) => {
      if (matrFilters[indexFilter][1][indexSetting]) {
        buttonsFilters[indexFilter][indexSetting].style.border = "1.5px dashed var(--colors-neutrals-900)";

        applyFilters[indexFilter] = setUnion(
          applyFilters[indexFilter],
          new Set([filtersAll[indexFilter][indexSetting]]),
        );
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
  filtersPart.forEach((filterPart, indexPart) => {
    // Раздел по умолчанию - не рисуем
    matrDraw[indexPart][0] = false;

    filterPart.forEach((filterModule, inedxModule) => {
      // Модуль по умолчанию - рисуем
      matrDraw[indexPart][1][inedxModule] = true;
      //console.log(`p[${indexPart}]m[${inedxModule}]`, "filters", applyFilters);

      for (const applyFilter of applyFilters) {
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
        matrFilters[indexFilter][0] = matrFilters[indexFilter][1].some((item) => item !== false);
      }

      calcFilters();
      // calcDrawParts();
      // drawingParts();
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
const buttonSort3 = document.getElementById("filterSortingByVerificationButton");
const buttonsSort = [buttonSort1, buttonSort2, buttonSort3];

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
      handbookModulesParts[jPart].appendChild(originalHandbookModulesParts[jPart][kPosition]);
    });
  });
}

// Приминение вызовов сортировок к кнопкам
buttonsSort.forEach((button, iSort) => {
  button.addEventListener("click", () => {
    // Определение сортировки
    numberSorting = iSort;
    closeMenuSorting();
    // applyingSorting();
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
const videos = document.querySelectorAll(".A_GalleryWorkPreviewVideo");

videos.forEach((video) => {
  let playPromise = null;

  video.addEventListener("mouseenter", () => {
    playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // игнорируем ошибку (например, autoplay restrictions)
      });
    }
  });

  video.addEventListener("mouseleave", () => {
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
          // video.currentTime = 0;
          // video.load();
        })
        .catch(() => {
          // если play не успел — просто безопасно сбрасываем
          video.pause();
          // video.currentTime = 0;
          // video.load();
        });
    } else {
      video.pause();
      // video.currentTime = 0;
      // video.load();
    }
  });
});

// galleryCanvases.forEach((card) => {
//   const preview = card.querySelector(".A_GalleryWorkPreview");
//   const video = card.querySelector(".A_GalleryWorkPreviewVideo");

//   preview.addEventListener("mouseenter", () => {
//     if (video.style.display !== "none") {
//       video.play().catch(() => {});
//     }
//   });

//   preview.addEventListener("mouseleave", () => {
//     if (video.style.display !== "none") {
//       video.pause();
//       video.currentTime = 0;
//     }
//   });
// });

// Загрузка галлереи
const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
const galleryCapacity = 20;
import { works } from "./galleryJson.js";
const galleryWorks = structuredClone(works);
let filteredWorks = structuredClone(galleryWorks);
const galleryCanvases = Array.from(document.querySelectorAll(".C_GalleryWorks .W_GalleryWork")).slice(
  0,
  galleryCapacity,
);
// Пейдженация
let galleryPage = 0;
const galleryScrollBarArrowLeft = document.querySelector(".Q_GalleryScrollBarArrowLeft");
const galleryScrollBarArrowRight = document.querySelector(".Q_GalleryScrollBarArrowRight");
const galleryScrollBarNumbers = Array.from(document.querySelectorAll(".A_GalleryScrollBarNumbers .U_ButtonIcon"));
const galleryScrollBarNumbersCount = galleryScrollBarNumbers.length;
let galleryScrollBarNumbersCountDraw = galleryScrollBarNumbersCount;

galleryScrollBarArrowLeft.addEventListener("click", () => {
  if (galleryPage - 1 == 0) {
    galleryScrollBarArrowLeft.style.opacity = "var(--official-no-interaction-opacity)";
  }
  if (galleryPage == 0) {
    return;
  }
  galleryScrollBarArrowRight.style.opacity = "1";
  galleryScrollBarNumbers[galleryPage].style.opacity = "var(--official-no-interaction-opacity)";
  galleryScrollBarNumbers[galleryPage].style.border = "none";
  galleryPage -= 1;
  galleryScrollBarNumbers[galleryPage].style.opacity = "1";
  galleryScrollBarNumbers[galleryPage].style.border = "1.5px dashed var(--colors-neutrals-900)";

  drawingWorks();
});

galleryScrollBarArrowRight.addEventListener("click", () => {
  if (galleryPage + 1 == galleryScrollBarNumbersCountDraw - 1) {
    galleryScrollBarArrowRight.style.opacity = "var(--official-no-interaction-opacity)";
  }
  if (galleryPage == galleryScrollBarNumbersCountDraw - 1) {
    return;
  }
  galleryScrollBarArrowLeft.style.opacity = "1";
  galleryScrollBarNumbers[galleryPage].style.opacity = "var(--official-no-interaction-opacity)";
  galleryScrollBarNumbers[galleryPage].style.border = "none";
  galleryPage += 1;
  galleryScrollBarNumbers[galleryPage].style.opacity = "1";
  galleryScrollBarNumbers[galleryPage].style.border = "1.5px dashed var(--colors-neutrals-900)";

  drawingWorks();
});

function calcPagenation() {
  galleryScrollBarNumbersCountDraw = Math.ceil(filteredWorks.length / galleryCapacity);
  galleryScrollBarNumbers.forEach((number) => {
    number.style.opacity = "var(--official-no-interaction-opacity)";
    number.style.border = "none";
  });
  galleryScrollBarNumbers[galleryPage].style.opacity = "1";
  galleryScrollBarNumbers[galleryPage].style.border = "1.5px dashed var(--colors-neutrals-900)";
  // TODO
  // let end = false;
  // galleryScrollBarNumbers[0].style.border = "1.5px dashed var(--colors-neutrals-900)";
  // galleryScrollBarNumbers[0].style.opacity = "1";
  // galleryScrollBarNumbers.forEach((number, index) => {
  //   if (index == 0) {
  //     return;
  //   }
  //   if
  //   number.style.opacity = "var(--official-no-interaction-opacity)";
  // });
}

// Сохранение номера работы
galleryCanvases.forEach((galleryWork, indexGalleryWork) => {
  galleryWork.querySelector(".A_GalleryWorkPreview").addEventListener("click", () => {
    // Сохранить переменную
    let id = filteredWorks[galleryPage * galleryCapacity + indexGalleryWork].id;
    sessionStorage.setItem("indexWork", id);
    // sessionStorage.setItem(
    //   "formData",
    //   JSON.stringify({ name: "John", email: "john@mail.com" }),
    // );
  });
});

// Очистка холста галереи
function setNoneGalleryCanvases() {
  galleryCanvases.forEach((canvas) => {
    canvas.style.display = "none";
    canvas.querySelector(".A_GalleryWorkPreviewImg").style.display = "none";
    canvas.querySelector(".A_GalleryWorkPreviewVideo").style.display = "none";
  });
}

// Отрисовка работы
async function drawingWorks() {
  setNoneGalleryCanvases();
  const drawWorks = structuredClone(
    filteredWorks.slice(galleryCapacity * galleryPage, galleryCapacity * galleryPage + galleryCapacity),
  );

  drawWorks.forEach((drawWork, indexDrawWork) => {
    let id = drawWork.id;
    const date = (drawWork.date.at(-1));
    const year = date.slice(0, 4);
    const month = parseInt(date.slice(5, 6));
    const day = date.slice(7, 8);

    galleryCanvases[indexDrawWork].querySelector(".M_GalleryWorkDescription").innerHTML =
      drawWork.author + " /<br>" + day + " " + months[month] + " " + year;
    galleryCanvases[indexDrawWork].querySelector(".A_GalleryWorkName").innerHTML = drawWork.title;

    if (drawWork.extension == "png") {
      const img = galleryCanvases[indexDrawWork].querySelector(".A_GalleryWorkPreviewImg");
      img.src = galleryImages[drawWork.id];
      img.style.display = "flex";
    } else if (drawWork.extension == "mp4") {
      const video = galleryCanvases[indexDrawWork].querySelector(".A_GalleryWorkPreviewVideo");
      video.src = galleryVideos[drawWork.id];
      video.load();
      video.style.display = "flex";
    } else {
      console.log("non", drawWork.id);
    }

    galleryCanvases[indexDrawWork].style.display = "flex";
  });
}

calcPagenation();
drawingWorks();
