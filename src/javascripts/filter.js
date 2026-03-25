//filters
let isOpenFilters = false;
const filterFiltersButton = document.querySelector(".A_FilterFiltersButton");
const filterFiltersMenu = document.querySelector(".C_FilterFiltersMenu");
const filterFiltersOpenIcon = document.querySelector(
  ".Q_FilterFiltersOpenIcon",
);
const filterFiltersCloseIcon = document.querySelector(
  ".Q_FilterFiltersCloseIcon",
);

filterFiltersButton.addEventListener("click", () => {
  //now is open ==> close
  if (isOpenFilters) {
    isOpenFilters = false;
    filterFiltersMenu.style.display = "none";
    filterFiltersOpenIcon.style.display = "flex";
    filterFiltersCloseIcon.style.display = "none";
  } else {
    isOpenFilters = true;
    filterFiltersMenu.style.display = "flex";
    filterFiltersOpenIcon.style.display = "none";
    filterFiltersCloseIcon.style.display = "flex";
  }
});

//filterSearchBar
const filterSearchBar = document.getElementById("filterSearchBar");
const filterSearchButton = document.querySelector(".Q_FilterSearchIcon");

filterSearchButton.addEventListener("click", () => {
  filterSearchBar.value = "";
  filterSearchBar.focus();
});

filterSearchBar.addEventListener("input", () => {
  filterSearchButton.style.opacity = filterSearchBar.value ? "1" : "0.5";
});

//sorting
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

numberSorting = 0; // 0, 1, 2
//name sort head
const nameSort0 = document.querySelector(".A_FilterSortingByComplexityText");
const nameSort1 = document.querySelector(".A_FilterSortingByDateText");
const nameSort2 = document.querySelector(".A_FilterSortingByVerificationText");
const namesSort = [nameSort0, nameSort1, nameSort2];

//print sort point
const pointSort0 = document.querySelector(".Q_FilterSortingByComplexityIcon");
const pointSort1 = document.querySelector(".Q_FilterSortingByDateIcon");
const pointSort2 = document.querySelector(".Q_FilterSortingByVerificationIcon");
const pointsSort = [pointSort0, pointSort1, pointSort2];

//button selest sort
const buttonSort0 = document.getElementById("filterSortingByComplexityButton");
const buttonSort1 = document.getElementById("filterSortingByDateButton");
const buttonSort2 = document.getElementById(
  "filterSortingByVerificationButton",
);
const buttonsSort = [buttonSort0, buttonSort1, buttonSort2];

buttonsSort.forEach((button, index) => {
  button.addEventListener("click", () => {
    numberSorting = index;
    closeMenuSorting();

    namesSort.forEach((name) => {
      name.style.display = "none";
    });
    pointsSort.forEach((point) => {
      point.style.display = "none";
    });

    namesSort[numberSorting].style.display = "flex";
    pointsSort[numberSorting].style.display = "flex";
    console.log("Текущая сортировка:", numberSorting);
  });
});
