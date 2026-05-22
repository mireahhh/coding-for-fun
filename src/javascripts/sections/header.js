import { tags, filtersName } from "../json/otherJson";

// Сдвинуть на хедер
// Не лендинг ли
const isLanding = document.querySelector(".S_Header--Landing");
// Получаем высоту хедера
const headerNavigation = document.querySelector(".O_HeaderNavigation");
// Применяем отступ к контенту
const mainContent = document.querySelector(".S_Main");
const footerContent = document.querySelector(".S_Footer");

function applyHeaderOffset() {
  const headerHeight = headerNavigation.offsetHeight;
  if (isLanding) {
    const landingIntro = document.querySelector(".O_LandingIntro");
    landingIntro.style.marginTop = headerHeight + "px";
    return;
  }
  mainContent.style.paddingTop = headerHeight + "px";
  //footerContent.style.paddingTop = headerHeight + "px";
}

// Обновляем при изменении размера окна
window.addEventListener("resize", function () {
  applyHeaderOffset();
});


let isHeaderMenuOpen = false;
const headerMenuButton = document.querySelector(".O_HeaderMenuNavigation");

const headerBurgerButton = document.querySelector(".A_HeaderBurgerButton");
headerBurgerButton.addEventListener("click", () => {
  isHeaderMenuOpen = true;
  headerBurgerButton.style.display = "none";
  headerCrossButton.style.display = "flex";
  headerMenuButton.style.display = "flex";
});

const headerCrossButton = document.querySelector(".A_HeaderCrossButton");
headerCrossButton.addEventListener("click", () => {
  isHeaderMenuOpen = false;
  headerCrossButton.style.display = "none";
  headerMenuButton.style.display = "none";
  headerBurgerButton.style.display = "flex";
});

const headerSearchBar = document.getElementById("headerSearchBar");
const headerSearchButton = document.querySelector(".Q_HeaderSearchIcon");
const headerSearchCrossButton = document.querySelector(".Q_HeaderCrossButton");
const headerSearchElement = document.querySelector(".M_HeaderSearchBar");

function updateHeaderSearchPlaceholder() {
  if (!tags.length) {
    return;
  }

  const randomTagIndex = Math.floor(Math.random() * tags.length);
  headerSearchBar.placeholder = tags[randomTagIndex];
}

headerSearchBar.addEventListener("input", () => {
  updateHeaderSearchFilledFlag();
});

headerSearchBar.addEventListener("keydown", (event) => {
  if (event.key !== "Tab" || !headerSearchBar.placeholder) {
    return;
  }

  event.preventDefault();
  headerSearchBar.value = headerSearchBar.placeholder;
  headerSearchBar.focus();
  headerSearchBar.setSelectionRange(headerSearchBar.value.length, headerSearchBar.value.length);
  updateHeaderSearchFilledFlag();
});

updateHeaderSearchFilledFlag();
updateHeaderSearchPlaceholder();

// Тема
const themeButtons = document.querySelectorAll(".M_HeaderChangeThemeButton, .A_HeaderMenuChangeThemeButton");
const root = document.documentElement;
const THEME_STORAGE_KEY = "theme";
const THEMES = {
  light: "light",
  dark: "dark"
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme && THEMES[savedTheme] ? savedTheme : THEMES.light;

applyTheme(initialTheme);

if (themeButtons.length) {
  themeButtons.forEach((themeButton) => {
    themeButton.addEventListener("click", () => {
      const currentTheme = root.dataset.theme === THEMES.dark ? THEMES.dark : THEMES.light;
      const newTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;

      applyTheme(newTheme);
    });
  });
}

function applyTheme(theme) {
  const nextTheme = THEMES[theme] ? theme : THEMES.light;

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  root.dataset.theme = nextTheme;

  themeButtons.forEach((themeButton) => {
    themeButton.classList.toggle("is-dark", nextTheme === THEMES.dark);
  });
}

let isHeaderSearchOpen = false;
let isHeaderSearchBarFilled = false;
let isHeaderSearchFieldFilled = false;
let isHeaderSearchCrossVisible = false;

// Поиск
const headerRoot = document.querySelector(".S_Header");
const headerSearchField = document.getElementById("headerSearchField");
const headerSearchFieldButton = document.querySelector(".A_HeaderSearchFieldButton");
const headerSearchFieldBar = document.querySelector(".M_HeaderSearchFieldBar");
const headerSearchTags = document.querySelector(".C_HeaderSearchTags");
const headerSearchSection = document.querySelector(".S_HeaderSearch");
const headerSearchResetButton = document.querySelector(".A_NextButton");
let areHeaderSearchTagsRendered = false;

function hideAllHeaderSearchResults() {
  headerSearchSection?.classList.add("is-close-all-results");
}

function showHeaderSearchResultsSection(targetSection) {
  if (!headerSearchSection) return;

  headerSearchSection.classList.remove("is-close-all-results", "is-show-no-results", "is-show-tutorials", "is-show-works", "is-show-both");

  if (targetSection === "no-results") {
    headerSearchSection.classList.add("is-show-no-results");
    return;
  }

  if (targetSection === "tutorials") {
    headerSearchSection.classList.add("is-show-tutorials");
    return;
  }

  if (targetSection === "works") {
    headerSearchSection.classList.add("is-show-works");
    return;
  }

  if (targetSection === "both") {
    headerSearchSection.classList.add("is-show-both");
  }
}

function tokenizeHeaderQuery(text) {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  const tokenSet = new Set(tokens);
  console.log(tokenSet);
  return tokenSet;
}

function runHeaderSearch(query) {
  tokenizeHeaderQuery(query);
  showHeaderSearchResultsSection("no-results");
}

function updateHeaderSearchCrossFlag() {
  isHeaderSearchCrossVisible = isHeaderSearchOpen && !isHeaderSearchBarFilled;

  if (isHeaderSearchCrossVisible) {
    headerSearchElement.classList.add("is-cross-visible");
    return;
  }

  headerSearchElement.classList.remove("is-cross-visible");
}

function setHeaderSearchOpenState(isOpen) {
  isHeaderSearchOpen = isOpen;
  if (isOpen) {
    headerRoot.classList.add("is-open-search");
  } else {
    headerRoot.classList.remove("is-open-search");
  }
  updateHeaderSearchCrossFlag();
}

function renderHeaderSearchTagsOnce() {
  if (areHeaderSearchTagsRendered) return;

  headerSearchTags.innerHTML = "";

  const excludedHeaderTags = new Set(["Экспертная", "Авторская"]);

  tags
    .filter((value) => !excludedHeaderTags.has(value))
    .forEach((value) => {
      const button = document.createElement("button");
      button.className = "U_ButtonIcon U_FontC2 A_HeaderSearchTagSecondary";
      button.type = "button";
      button.textContent = value;
      headerSearchTags.appendChild(button);
    });

  Object.values(filtersName)
    .filter((value) => !excludedHeaderTags.has(value))
    .forEach((value) => {
      const button = document.createElement("button");
      button.className = "U_ButtonIcon U_FontC2 A_HeaderSearchTagPrimary";
      button.type = "button";
      button.textContent = value;
      headerSearchTags.appendChild(button);
    });

  areHeaderSearchTagsRendered = true;
}

function updateHeaderSearchFilledFlag() {
  isHeaderSearchBarFilled = Boolean(headerSearchBar.value.trim());
  if (isHeaderSearchBarFilled) {
    headerSearchElement.classList.add("is-filled");
  } else {
    headerSearchElement.classList.remove("is-filled");
  }

  updateHeaderSearchCrossFlag();
}

function updateHeaderSearchFieldFilledFlag() {
  isHeaderSearchFieldFilled = Boolean(headerSearchField.value.trim());
  if (isHeaderSearchFieldFilled) {
    headerSearchFieldBar.classList.add("is-filled");
  } else {
    headerSearchFieldBar.classList.remove("is-filled");
  }
}

function openHeaderSearch() {
  renderHeaderSearchTagsOnce();
  setHeaderSearchOpenState(true);
}

function closeHeaderSearch() {
  setHeaderSearchOpenState(false);
  hideAllHeaderSearchResults();
  headerSearchBar.value = "";
  headerSearchField.value = "";
  updateHeaderSearchFilledFlag();
  updateHeaderSearchFieldFilledFlag();
}

function submitHeaderSearchFromInput(inputElement) {
  const query = inputElement.value.trim();
  if (!query) return;

  openHeaderSearch();
  headerSearchField.value = query;
  updateHeaderSearchFieldFilledFlag();

  if (inputElement === headerSearchBar) {
    headerSearchBar.value = "";
    updateHeaderSearchFilledFlag();
  }

  runHeaderSearch(query);
}

headerSearchBar.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  submitHeaderSearchFromInput(headerSearchBar);
});

headerSearchField.addEventListener("input", () => {
  updateHeaderSearchFieldFilledFlag();
  updateHeaderSearchCrossFlag();
});

headerSearchField.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  submitHeaderSearchFromInput(headerSearchField);
});

headerSearchButton.addEventListener("click", () => {
  submitHeaderSearchFromInput(headerSearchBar);
});

headerSearchCrossButton.addEventListener("click", () => {
  closeHeaderSearch();
});

headerSearchFieldButton.addEventListener("click", () => {
  submitHeaderSearchFromInput(headerSearchField);
});

headerSearchTags.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  headerSearchField.value = button.textContent.trim();
  updateHeaderSearchFieldFilledFlag();
  headerSearchField.focus();
});

if (headerSearchResetButton) {
  headerSearchResetButton.addEventListener("click", () => {
    hideAllHeaderSearchResults();
    headerSearchField.value = "";
    updateHeaderSearchFieldFilledFlag();
    headerSearchField.focus();
  });
}

updateHeaderSearchFilledFlag();
updateHeaderSearchFieldFilledFlag();
updateHeaderSearchCrossFlag();
hideAllHeaderSearchResults();
