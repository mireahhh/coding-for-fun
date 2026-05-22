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
  if (!headerSearchBar || !tags.length) {
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
let areHeaderSearchTagsRendered = false;

function tokenizeHeaderQuery(text) {
  console.log("[HeaderSearch] tokenizeHeaderQuery:start", text);
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  const tokenSet = new Set(tokens);
  console.log("Header search query tokens set:", tokenSet);
  return tokenSet;
}

function runHeaderSearch(query) {
  console.log("[HeaderSearch] runHeaderSearch:start", query);
  tokenizeHeaderQuery(query);
}

function updateHeaderSearchCrossFlag() {
  console.log("[HeaderSearch] updateHeaderSearchCrossFlag:start", {
    isHeaderSearchOpen,
    isHeaderSearchBarFilled
  });

  isHeaderSearchCrossVisible = isHeaderSearchOpen && !isHeaderSearchBarFilled;

  if (!headerSearchElement) return;
  if (isHeaderSearchCrossVisible) {
    headerSearchElement.classList.add("is-cross-visible");
    return;
  }

  headerSearchElement.classList.remove("is-cross-visible");
}

function setHeaderSearchOpenState(isOpen) {
  console.log("[HeaderSearch] setHeaderSearchOpenState:start", isOpen);
  isHeaderSearchOpen = isOpen;
  if (headerRoot) {
    if (isOpen) {
      headerRoot.classList.add("is-open-search");
    } else {
      headerRoot.classList.remove("is-open-search");
    }
  }
  updateHeaderSearchCrossFlag();
}

function renderHeaderSearchTagsOnce() {
  console.log("[HeaderSearch] renderHeaderSearchTagsOnce:start", { areHeaderSearchTagsRendered });
  if (!headerSearchTags || areHeaderSearchTagsRendered) return;

  headerSearchTags.innerHTML = "";

  Object.values(filtersName).forEach((value) => {
    const button = document.createElement("button");
    button.className = "U_ButtonIcon U_FontC2 A_HeaderSearchTagPrimary";
    button.type = "button";
    button.textContent = value;
    headerSearchTags.appendChild(button);
  });

  tags.forEach((value) => {
    const button = document.createElement("button");
    button.className = "U_ButtonIcon U_FontC2 A_HeaderSearchTagSecondary";
    button.type = "button";
    button.textContent = value;
    headerSearchTags.appendChild(button);
  });

  areHeaderSearchTagsRendered = true;
}

function updateHeaderSearchFilledFlag() {
  console.log("[HeaderSearch] updateHeaderSearchFilledFlag:start");
  if (!headerSearchBar || !headerSearchElement) return;

  isHeaderSearchBarFilled = Boolean(headerSearchBar.value.trim());
  if (isHeaderSearchBarFilled) {
    headerSearchElement.classList.add("is-filled");
  } else {
    headerSearchElement.classList.remove("is-filled");
  }

  updateHeaderSearchCrossFlag();
}

function updateHeaderSearchFieldFilledFlag() {
  console.log("[HeaderSearch] updateHeaderSearchFieldFilledFlag:start");
  if (!headerSearchField || !headerSearchFieldBar) return;

  isHeaderSearchFieldFilled = Boolean(headerSearchField.value.trim());
  if (isHeaderSearchFieldFilled) {
    headerSearchFieldBar.classList.add("is-filled");
  } else {
    headerSearchFieldBar.classList.remove("is-filled");
  }
}

function openHeaderSearch() {
  console.log("[HeaderSearch] openHeaderSearch:start");
  renderHeaderSearchTagsOnce();
  setHeaderSearchOpenState(true);
}

function closeHeaderSearch() {
  console.log("[HeaderSearch] closeHeaderSearch:start");
  setHeaderSearchOpenState(false);
  headerSearchBar.value = "";
  updateHeaderSearchFilledFlag();
}

function submitHeaderSearchFromInput(inputElement) {
  console.log("[HeaderSearch] submitHeaderSearchFromInput:start", inputElement?.id);
  if (!headerSearchField || !inputElement) return;

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

if (headerSearchField) {
  headerSearchField.addEventListener("input", () => {
    console.log("[HeaderSearch] headerSearchField:input");
    updateHeaderSearchFieldFilledFlag();
    updateHeaderSearchCrossFlag();
  });

  headerSearchField.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submitHeaderSearchFromInput(headerSearchField);
  });
}

headerSearchButton.addEventListener("click", () => {
  console.log("[HeaderSearch] headerSearchButton:click");
  submitHeaderSearchFromInput(headerSearchBar);
});

headerSearchCrossButton?.addEventListener("click", () => {
  console.log("[HeaderSearch] headerSearchCrossButton:click");
  closeHeaderSearch();
});

if (headerSearchFieldButton) {
  headerSearchFieldButton.addEventListener("click", () => {
    console.log("[HeaderSearch] headerSearchFieldButton:click");
    submitHeaderSearchFromInput(headerSearchField);
  });
}

if (headerSearchTags) {
  headerSearchTags.addEventListener("click", (event) => {
    console.log("[HeaderSearch] headerSearchTags:click");
    const button = event.target.closest("button");
    if (!button || !headerSearchField) return;

    headerSearchField.value = button.textContent.trim();
    updateHeaderSearchFieldFilledFlag();
    headerSearchField.focus();
  });
}

updateHeaderSearchFilledFlag();
updateHeaderSearchFieldFilledFlag();
updateHeaderSearchCrossFlag();