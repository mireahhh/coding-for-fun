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

let isHeaderSearchFilled = false;

function updateHeaderSearchFilledFlag() {
  isHeaderSearchFilled = Boolean(headerSearchBar.value.trim());

  if (isHeaderSearchFilled) {
    headerSearchElement.classList.add("is-filled");
    return;
  }

  headerSearchElement.classList.remove("is-filled");
}

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

// Поиск
const headerRoot = document.querySelector(".S_Header");
const headerSearchSection = document.querySelector(".S_HeaderSearch");
const headerSearchField = document.getElementById("headerSearchField");
const headerSearchFieldButton = document.querySelector(".A_HeaderSearchFieldButton");
const headerSearchFieldBar = document.querySelector(".M_HeaderSearchFieldBar");
const headerSearchTags = document.querySelector(".C_HeaderSearchTags");
let areHeaderSearchTagsRendered = false;

function tokenizeHeaderQuery(text) {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  const tokenSet = new Set(tokens);
  console.log("Header search query tokens set:", tokenSet);
  return tokenSet;
}

function setHeaderSearchOpenState(isOpen) {
  isHeaderSearchOpen = isOpen;
  if (!headerRoot) return;

  headerRoot.classList.toggle("is-open", isOpen);
}

function renderHeaderSearchTagsOnce() {
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

function updateHeaderSearchFieldFilledFlag() {
  if (!headerSearchField || !headerSearchFieldBar) return;

  const isFilled = Boolean(headerSearchField.value.trim());
  headerSearchFieldBar.classList.toggle("is-filled", isFilled);
}

function openHeaderSearch() {
  renderHeaderSearchTagsOnce();
  setHeaderSearchOpenState(true);
}

function closeHeaderSearch() {
  setHeaderSearchOpenState(false);
  headerSearchBar.value = "";
  updateHeaderSearchFilledFlag();
}

function submitHeaderSearchFromInput(inputElement) {
  if (!headerSearchField) return;

  const query = inputElement.value.trim();
  if (!query) return;

  openHeaderSearch();
  headerSearchField.value = query;
  updateHeaderSearchFieldFilledFlag();

  if (inputElement === headerSearchBar) {
    headerSearchBar.value = "";
    updateHeaderSearchFilledFlag();
  }

  tokenizeHeaderQuery(query);
}

headerSearchBar.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  submitHeaderSearchFromInput(headerSearchBar);
});

if (headerSearchField) {
  headerSearchField.addEventListener("input", () => {
    updateHeaderSearchFieldFilledFlag();
  });

  headerSearchField.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submitHeaderSearchFromInput(headerSearchField);
  });
}

headerSearchButton.addEventListener("click", () => {
  if (!headerSearchBar.value.trim()) {
    return;
  }

  submitHeaderSearchFromInput(headerSearchBar);
});

headerSearchCrossButton?.addEventListener("click", () => {
  closeHeaderSearch();
});

if (headerSearchFieldButton) {
  headerSearchFieldButton.addEventListener("click", () => {
    submitHeaderSearchFromInput(headerSearchField);
  });
}

if (headerSearchTags) {
  headerSearchTags.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !headerSearchField) return;

    headerSearchField.value = button.textContent.trim();
    updateHeaderSearchFieldFilledFlag();
    headerSearchField.focus();
  });
}

updateHeaderSearchFieldFilledFlag();

applyHeaderOffset();