// Задание фильтров
// Список доступных фильтров
// ! filtersAll в Галерее - друго! Он без 1 фильтра! Поэтому собираем заново !
const filtersComplexity = ["filterComplexityInitial", "filterComplexityMiddle", "filterComplexityAdvanced"];
const filtersLibrary = ["filterLibraryVanillajs", "filterLibraryP5js", "filterLibraryThreejs"];
const filtersVerification = ["filterVerificationExpert", "filterVerificationAuthorial"];
const filtersAll = [filtersComplexity, filtersLibrary, filtersVerification];

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
const filterComplexityInitial = document.getElementById("filterComplexityInitial");
const filterComplexityMiddle = document.getElementById("filterComplexityMiddle");
const filterComplexityAdvanced = document.getElementById("filterComplexityAdvanced");
const buttonsComplexity = [filterComplexityInitial, filterComplexityMiddle, filterComplexityAdvanced];
const filterLibraryVanillajs = document.getElementById("filterLibraryVanillajs");
const filterLibraryP5js = document.getElementById("filterLibraryP5js");
const filterLibraryThreejs = document.getElementById("filterLibraryThreejs");
const buttonsLibrary = [filterLibraryVanillajs, filterLibraryP5js, filterLibraryThreejs];
const filterVerificationExpert = document.getElementById("filterVerificationExpert");
const filterVerificationAuthorial = document.getElementById("filterVerificationAuthorial");
const buttonsVerification = [filterVerificationExpert, filterVerificationAuthorial];
// Все кнопачки
const buttonsFilters = [
  buttonsComplexity,
  buttonsLibrary,
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
const defAppliedFilters = [new Set(), new Set(), new Set()];

// let matrDraw = structuredClone(defMatrDraw);
let matrFilters = structuredClone(defMatrFilters);
let appliedFilters = structuredClone(defAppliedFilters);

function calcFilters() {
  appliedFilters = structuredClone(defAppliedFilters);

  matrFilters.forEach((filter, indexFilter) => {
    filter[1].forEach((isActive, indexSetting) => {
      if (isActive) {
        buttonsFilters[indexFilter][indexSetting].classList.add("is-active");

        appliedFilters[indexFilter] = setUnion(
          appliedFilters[indexFilter],
          new Set([filtersAll[indexFilter][indexSetting]]),
        );
      } else {
        buttonsFilters[indexFilter][indexSetting].classList.remove("is-active");
      }
    });
  });

  // console.log("matrFilters", matrFilters, "appliedFilters", appliedFilters);
}

function applyFilters() {
  filteredWorks = sortedWorks.filter((work) => {
    for (const appliedFilter of appliedFilters) {
      // если группа фильтров пустая — пропускаем
      if (appliedFilter.size === 0) {
        continue;
      }

      // если работа не подходит хотя бы под одну группу — исключаем
      if (setIntersection(work.filterTags, appliedFilter).size === 0) {
        return false;
      }
    }

    return true;
  });

  calcPagenation();
}

// Добавление клика фильтра
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
      applyFilters();
      drawingWorks();
      calcPagenation();
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
let numberSorting = Number(sessionStorage.getItem("numberSortingGallery")); // 0, 1, 2
if (Number.isNaN(numberSorting)) {
  numberSorting = 1;
}

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

function applySorting() {
  pointsSort.forEach((point) => {
    point.style.display = "none";
  });

  nameSort.textContent = namesSort[numberSorting];
  pointsSort[numberSorting].style.display = "flex";

  if (numberSorting === 0) {
    // По сложности: начальная -> средняя -> продвинутая
    sortedWorks = structuredClone(galleryWorks).sort((a, b) => {
      const diff = complexityOrder[a.complexity] - complexityOrder[b.complexity];
      if (diff !== 0) return diff;

      // если сложность одинаковая — более новые выше
      return b.dateNumber - a.dateNumber;
    });
  } else if (numberSorting === 1) {
    // По дате обновления: новые сверху
    sortedWorks = structuredClone(galleryWorks).sort((a, b) => {
      return b.dateNumber - a.dateNumber;
    });
  } else if (numberSorting === 2) {
    // По проверенности: экспертная выше авторской
    sortedWorks = structuredClone(galleryWorks).sort((a, b) => {
      const diff = verificationOrder[b.verification] - verificationOrder[a.verification];
      if (diff !== 0) return diff;

      // если проверенность одинаковая — более новые выше
      return b.dateNumber - a.dateNumber;
    });
  }

  calcFilters();
  applyFilters();
  drawingWorks();
  calcPagenation();
}

// Приминение вызовов сортировок к кнопкам
buttonsSort.forEach((button, iSort) => {
  button.addEventListener("click", () => {
    // Определение сортировки
    numberSorting = iSort;
    sessionStorage.setItem("numberSortingGallery", numberSorting);
    closeMenuSorting();
    applySorting();
    drawingWorks();
  });
});

// Сброс настроек
// Самое право
const resetButton1 = document.querySelector(".A_FilterResetButton");
// Скрытая снизу
const resetButton2 = document.getElementById("filterResetButton2");
const resetButtons = [resetButton1, resetButton2];

function resetWorks() {
  closeMenuFilters();
  matrFilters = structuredClone(defMatrFilters);

  numberSorting = 1;
  sessionStorage.setItem("numberSortingGallery", numberSorting);

  closeMenuSorting();

  applySorting();
  applyFilters();
  drawingWorks();
  calcPagenation();
}

resetButtons.forEach((resetButton) => {
  if (resetButton) {
    resetButton.addEventListener("click", resetWorks);
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

// Загрузка галлереи
const galleryCapacity = 12;
import { galleryImages, galleryVideos, months } from "../json/otherJson.js";
import { works } from "../json/galleryJson.js";

const complexityOrder = {
  filterComplexityInitial: 0,
  filterComplexityMiddle: 1,
  filterComplexityAdvanced: 2,
};

const verificationOrder = {
  filterVerificationAuthorial: 0,
  filterVerificationExpert: 1,
};

const galleryWorks = works.map((work) => {
  const lastDate = work.date.at(-1);

  return {
    ...work,
    dateNumber: Number(lastDate),
    filterTags: new Set([
      work.complexity,
      ...(Array.isArray(work.library) ? work.library : [work.library]),
      work.verification,
    ]),
  };
});

let sortedWorks = structuredClone(galleryWorks);
let filteredWorks = structuredClone(sortedWorks);
let noResults = false;
const galleryCanvases = Array.from(document.querySelectorAll(".C_GalleryWorks .W_GalleryWork")).slice(
  0,
  galleryCapacity,
);
const galleryWorksSection = document.querySelector(".O_GalleryWorks");
const galleryNextSection = document.querySelector("main > section.W_Next:last-of-type");
// Пейдженация
let galleryPage = 0;
const galleryScrollBarArrowLeft = document.querySelector(".Q_GalleryScrollBarArrowLeft");
const galleryScrollBarArrowRight = document.querySelector(".Q_GalleryScrollBarArrowRight");
const galleryScrollBarNumbersContainer = document.querySelector(".C_GalleryScrollBarNumbers");
let galleryScrollBarNumbers = [];
let galleryScrollBarNumbersCountDraw = 0;

function setNoResultsState(value) {
  noResults = value;
  galleryWorksSection.classList[value ? "add" : "remove"]("is-show-no-results");
  if (galleryNextSection) {
    galleryNextSection.classList[value ? "add" : "remove"]("is-hide");
  }
}

function rebuildPaginationButtons() {
  galleryScrollBarNumbersContainer.innerHTML = "";
  galleryScrollBarNumbers = [];

  for (let pageIndex = 0; pageIndex < galleryScrollBarNumbersCountDraw; pageIndex += 1) {
    const pageButton = document.createElement("button");
    pageButton.className = "U_FontC2 U_ButtonIcon A_GalleryScrollBarNumber";
    pageButton.textContent = String(pageIndex + 1).padStart(2, "0");
    pageButton.addEventListener("click", () => {
      handleGalleryNumberClick(pageIndex);
    });

    galleryScrollBarNumbersContainer.append(pageButton);
    galleryScrollBarNumbers.push(pageButton);
  }
}

function updatePaginationUi() {
  galleryScrollBarNumbers.forEach((number, index) => {
    number.classList.toggle("is-current", index === galleryPage);
  });

  const isFirstPage = galleryPage === 0;
  const isLastPage = galleryPage >= galleryScrollBarNumbersCountDraw - 1;

  galleryScrollBarArrowLeft.classList.toggle("is-disabled", isFirstPage);
  galleryScrollBarArrowRight.classList.toggle("is-disabled", galleryScrollBarNumbersCountDraw <= 1 || isLastPage);
}
// Галерея вверх
function scrollToGallery() {
  const gallery = document.getElementById("galleryList");
  if (gallery) {
    gallery.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
// Влево
galleryScrollBarArrowLeft.addEventListener("click", () => {
  if (galleryPage == 0) {
    return;
  }
  galleryPage -= 1;
  updatePaginationUi();

  drawingWorks();
  scrollToGallery();
});
// Вправо
galleryScrollBarArrowRight.addEventListener("click", () => {
  if (galleryPage == galleryScrollBarNumbersCountDraw - 1) {
    return;
  }
  galleryPage += 1;
  updatePaginationUi();

  drawingWorks();
  scrollToGallery();
});
// Цифры
function handleGalleryNumberClick(index) {
  if (index === galleryPage) return;

  galleryPage = index;
  updatePaginationUi();

  drawingWorks();
  scrollToGallery();
}
// Пересчитать пейдженацию (после сортировки)
function calcPagenation() {
  galleryScrollBarNumbersCountDraw = Math.ceil(filteredWorks.length / galleryCapacity);
  galleryPage = 0;
  setNoResultsState(filteredWorks.length === 0);

  rebuildPaginationButtons();
  updatePaginationUi();
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
    const month = parseInt(date.slice(4, 6));
    const day = date.slice(6, 8);

    galleryCanvases[indexDrawWork].querySelector(".M_GalleryWorkDescription").innerHTML =
      drawWork.author + " /<br>" + day + " " + months[month - 1] + " " + year;
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


resetWorks();