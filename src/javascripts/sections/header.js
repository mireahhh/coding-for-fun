import { tags } from "../json/otherJson";

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

headerSearchButton.addEventListener("click", () => {
  headerSearchBar.value = "";
  updateHeaderSearchFilledFlag();
  // headerSearchBar.focus();
});

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

applyHeaderOffset();