import { tags, filtersName } from "../json/otherJson";
import { tagsHandbook, forEachPartModuleTutorial } from "../json/tutorialsJson";
import pointerIconSrc from "../../images/icons/arrow-right.svg";

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

function handleWindowResize() {
  applyHeaderOffset();
  resizeHeaderSearchField();
}

// Обновляем при изменении размера окна
window.addEventListener("resize", handleWindowResize);

// Бургер меню
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

const headerSearchTutorialsCounter = document.querySelector(".A_HeaderSearchTutorialsCounter");
const headerSearchTutorialsList = document.querySelector(".C_HeaderSearchTutorials");
const headerSearchTutorialLink = document.querySelector(".W_HeaderSearchTutorialsTitle .U_ALink");

function normalizeHeaderSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("ru-RU")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function getHeaderPathPrefix() {
  if (headerSearchTutorialLink?.getAttribute("href")) {
    const handbookHref = headerSearchTutorialLink.getAttribute("href");
    return handbookHref.replace(/pages\/handbook\.html$/, "");
  }

  const globalPathLevel = document.documentElement?.dataset?.pathLevel ?? document.body?.dataset?.pathLevel ?? 0;
  const level = Number(globalPathLevel);
  return "../".repeat(Math.max(0, level));
}

function buildTutorialPath(pathPrefix, partIndex, moduleIndex, tutorialIndex) {
  return `${pathPrefix}pages/parts/part${partIndex + 1}/module${moduleIndex + 1}/tutorial${tutorialIndex + 1}.html`;
}

function getTutorialMatches(tokenSet) {
  const matchedTutorials = [];

  forEachPartModuleTutorial(tagsHandbook, ({ tutorialData, partData, moduleData, partIndex, moduleIndex, tutorialIndex }) => {
    const titleText = normalizeHeaderSearchText(tutorialData.title);
    const tagsList = (tutorialData.tags || []).map((tagText) => normalizeHeaderSearchText(tagText));

    for (const setPart of tokenSet) {
      const isTitleMatched = titleText.includes(setPart);
      console.log("[HeaderSearch][title]", {
        query: setPart,
        source: titleText,
        result: isTitleMatched
      });

      const isTagsMatched = tagsList.some((tagText) => {
        const isTagMatched = tagText.includes(setPart);
        console.log("[HeaderSearch][tag]", {
          query: setPart,
          source: tagText,
          result: isTagMatched
        });
        return isTagMatched;
      });

      if (isTitleMatched || isTagsMatched) {
        matchedTutorials.push({ tutorialData, partData, moduleData, partIndex, moduleIndex, tutorialIndex });
        break;
      }
    }
  });

  return matchedTutorials;
}

const tutorialDescriptionCache = new Map();

async function getTutorialDescriptionByPath(tutorialPath) {
  if (tutorialDescriptionCache.has(tutorialPath)) return tutorialDescriptionCache.get(tutorialPath);

  try {
    const response = await fetch(tutorialPath);
    if (!response.ok) throw new Error(`Failed to load tutorial page: ${tutorialPath}`);

    const pageMarkup = await response.text();
    const parser = new DOMParser();
    const pageDocument = parser.parseFromString(pageMarkup, "text/html");
    const tutorialText = pageDocument.querySelector(".A_TutorialText")?.textContent?.trim();
    const description = tutorialText || "Урок в разработке";

    tutorialDescriptionCache.set(tutorialPath, description);
    return description;
  } catch (error) {
    console.error("[HeaderSearch] Failed to read tutorial description", error);
    return "Урок в разработке";
  }
}

async function renderHeaderSearchTutorials(matchedTutorials) {
  if (!headerSearchTutorialsList) return;

  const pathPrefix = getHeaderPathPrefix();
  headerSearchTutorialsList.innerHTML = "";

  const listItems = await Promise.all(matchedTutorials.map(async ({
    tutorialData, partData, moduleData, partIndex, moduleIndex, tutorialIndex }) => {
    const listItem = document.createElement("li");
    const tutorialLink = document.createElement("a");
    tutorialLink.className = "O_HeaderSearchTutorial";
    const tutorialPath = buildTutorialPath(pathPrefix, partIndex, moduleIndex, tutorialIndex);
    tutorialLink.href = tutorialPath;

    const hangle = document.createElement("div");
    hangle.className = "W_HeaderSearchTutorialHangle";

    const subtitle = document.createElement("p");
    subtitle.className = "U_FontC2 M_HeaderSearchTutorialSubtitle";
    subtitle.textContent = `${partData?.title || `Часть ${partIndex + 1}`}. ${moduleData?.title || `Модуль ${moduleIndex + 1}`}`;

    const title = document.createElement("h3");
    title.className = "U_FontH3 A_HeaderSearchTutorialTitle";
    title.textContent = tutorialData.title || `Урок ${tutorialIndex + 1}`;

    hangle.append(subtitle, title);

    const about = document.createElement("p");
    about.className = "U_FontB1 W_HeaderSearchTutorialAboute";
    about.textContent = await getTutorialDescriptionByPath(tutorialPath);

    const pointer = document.createElement("img");
    pointer.className = "U_ImgIcon M_HeaderSearchTutorialPointer";
    pointer.src = pointerIconSrc;
    pointer.alt = "Перейти к туториалу";

    tutorialLink.append(hangle, about, pointer);
    listItem.appendChild(tutorialLink);
    return listItem;
  }));

  listItems.forEach((listItem) => headerSearchTutorialsList.appendChild(listItem));

  if (headerSearchTutorialsCounter) {
    headerSearchTutorialsCounter.textContent = String(matchedTutorials.length);
  }
}

function resizeHeaderSearchField() {
  if (!headerSearchField) return;

  headerSearchField.style.height = "auto";
  const nextHeight = Math.max(headerSearchField.scrollHeight, 72);
  headerSearchField.style.height = nextHeight + "px";
}

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
  const tokens = text.trim().toLocaleLowerCase("ru-RU").split(/\s+/).filter(Boolean);
  const tokenSet = new Set(tokens);
  // console.log(tokenSet);
  return tokenSet;
}

async function runHeaderSearch(query) {
  const tokenSet = tokenizeHeaderQuery(query);
  const matchedTutorials = getTutorialMatches(tokenSet);

  if (matchedTutorials.length) {
    await renderHeaderSearchTutorials(matchedTutorials);
    showHeaderSearchResultsSection("tutorials");
    return;
  }

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
  resizeHeaderSearchField();
}

function submitHeaderSearchFromInput(inputElement) {
  headerSearchBar.blur();
  headerSearchField.blur();

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
  resizeHeaderSearchField();
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
  resizeHeaderSearchField();
  updateHeaderSearchFieldFilledFlag();
  headerSearchField.focus();
});

if (headerSearchResetButton) {
  headerSearchResetButton.addEventListener("click", () => {
    hideAllHeaderSearchResults();
    headerSearchField.value = "";
    resizeHeaderSearchField();
    updateHeaderSearchFieldFilledFlag();
    headerSearchField.focus();
  });
}

applyHeaderOffset();
handleWindowResize();
updateHeaderSearchFilledFlag();
resizeHeaderSearchField();
updateHeaderSearchFieldFilledFlag();
updateHeaderSearchCrossFlag();
hideAllHeaderSearchResults();