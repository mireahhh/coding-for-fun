import { tags, filtersName } from "../json/otherJson";
import { tagsHandbook, forEachPartModuleTutorial, toArray } from "../json/tutorialsJson";
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
  updateHeaderSearchMaxHeight();
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
let areHeaderSearchTagsOpen = false;

// Поиск
const headerRoot = document.querySelector(".S_Header");
const headerSearchField = document.getElementById("headerSearchField");
const headerSearchFieldButton = document.querySelector(".A_HeaderSearchFieldButton");
const headerSearchFieldBar = document.querySelector(".M_HeaderSearchFieldBar");
const headerSearchTags = document.querySelector(".C_HeaderSearchTags");
const headerSearchSection = document.querySelector(".S_HeaderSearch");
const headerSearchResetButton = document.querySelector(".A_NextButton");
const headerSearchTagsOpenButton = headerSearchTags?.querySelector(".W_HeaderSearchTagOpenButton");
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

const normalizedFilterLabels = new Set(Object.values(filtersName).map((value) => normalizeHeaderSearchText(value)));

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
    const tutorialFiltersList = [
      ...toArray(tutorialData.complexity),
      ...toArray(tutorialData.library),
      ...toArray(tutorialData.format),
      ...toArray(tutorialData.verification),
    ]
      .filter(Boolean)
      .map((filterValue) => normalizeHeaderSearchText(filtersName[filterValue] || filterValue));

    for (const setPart of tokenSet) {
      const isTitleMatched = titleText.includes(setPart);
      // console.log("[HeaderSearch][title]", {
      //   query: setPart,
      //   source: titleText,
      //   result: isTitleMatched
      // });

      const isTagsMatched = tagsList.some((tagText) => {
        const isTagMatched = tagText.includes(setPart);
        // console.log("[HeaderSearch][tag]", {
        //   query: setPart,
        //   source: tagText,
        //   result: isTagMatched
        // });
        return isTagMatched;
      });

      const isFilterMatched = tutorialFiltersList.some((filterText) => filterText.includes(setPart));

      if (isTitleMatched || isTagsMatched || isFilterMatched) {
        matchedTutorials.push({ tutorialData, partData, moduleData, partIndex, moduleIndex, tutorialIndex });
        break;
      }
    }
  });

  return matchedTutorials;
}

const tutorialDescriptionCache = new Map();

function buildFallbackTutorialDescription() {
  return {
    text: "Урок в разработке",
    isActive: false
  };
}

async function getTutorialDescriptionByPath(tutorialPath) {
  if (tutorialDescriptionCache.has(tutorialPath)) return tutorialDescriptionCache.get(tutorialPath);

  try {
    const response = await fetch(tutorialPath);
    if (!response.ok) throw new Error(`Failed to load tutorial page: ${tutorialPath}`);

    const pageMarkup = await response.text();
    const parser = new DOMParser();
    const pageDocument = parser.parseFromString(pageMarkup, "text/html");
    const tutorialText = pageDocument.querySelector(".A_TutorialText")?.textContent?.trim();
    const description = tutorialText
      ? { text: tutorialText, isActive: true }
      : buildFallbackTutorialDescription();

    tutorialDescriptionCache.set(tutorialPath, description);
    return description;
  } catch (error) {
    console.error("[HeaderSearch] Failed to read tutorial description", error);
    return buildFallbackTutorialDescription();
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

    const pointer = document.createElement("img");
    pointer.className = "U_ImgIcon M_HeaderSearchTutorialPointer";
    pointer.src = pointerIconSrc;
    pointer.alt = "Перейти к туториалу";

    const tutorialDescription = await getTutorialDescriptionByPath(tutorialPath);
    about.textContent = tutorialDescription.text;

    if (!tutorialDescription.isActive) {
      tutorialLink.classList.add("NotActiveTutorial");
      tutorialLink.removeAttribute("href");
      tutorialLink.setAttribute("aria-disabled", "true");
      tutorialLink.setAttribute("tabindex", "-1");
      pointer.alt = "Туториал недоступен";
    }

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
  const normalizedQuery = normalizeHeaderSearchText(text);
  if (!normalizedQuery) return new Set();

  if (normalizedFilterLabels.has(normalizedQuery)) {
    return new Set([normalizedQuery]);
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const tokenSet = new Set(tokens);
  // console.log(tokenSet);
  return tokenSet;
}

async function runHeaderSearch(query) {
  const tokenSet = tokenizeHeaderQuery(query);
  const matchedTutorials = getTutorialMatches(tokenSet);

  if (!tokenSet.size) {
    if (headerSearchTutorialsList) {
      headerSearchTutorialsList.innerHTML = "";
    }
    if (headerSearchTutorialsCounter) {
      headerSearchTutorialsCounter.textContent = "0";
    }
    showHeaderSearchResultsSection("no-results");
    return;
  }

  if (matchedTutorials.length) {
    await renderHeaderSearchTutorials(matchedTutorials);
    showHeaderSearchResultsSection("tutorials");
    return;
  }

  if (headerSearchTutorialsList) {
    headerSearchTutorialsList.innerHTML = "";
  }
  if (headerSearchTutorialsCounter) {
    headerSearchTutorialsCounter.textContent = "0";
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
  if (!headerSearchTags) return;

  const excludedHeaderTags = new Set(["Экспертная", "Авторская"]);
  const fragment = document.createDocumentFragment();

  tags
    .filter((value) => !excludedHeaderTags.has(value))
    .forEach((value) => {
      const button = document.createElement("button");
      button.className = "U_ButtonIcon U_FontC2 A_HeaderSearchTagSecondary";
      button.type = "button";
      button.textContent = value;
      fragment.appendChild(button);
    });

  Object.entries(filtersName)
    .filter(([, filterLabel]) => !excludedHeaderTags.has(filterLabel))
    .forEach(([filterKey, filterLabel]) => {
      const button = document.createElement("button");
      button.className = "U_ButtonIcon U_FontC2 A_HeaderSearchTagPrimary";
      button.type = "button";
      button.dataset.filterKey = filterKey;
      button.textContent = filterLabel;
      fragment.appendChild(button);
    });

  if (headerSearchTagsOpenButton) {
    headerSearchTagsOpenButton.insertAdjacentElement("afterend", fragment);
  } else {
    headerSearchTags.appendChild(fragment);
  }
  areHeaderSearchTagsRendered = true;
}

function setHeaderSearchTagsOpenState(isOpen) {
  areHeaderSearchTagsOpen = isOpen;

  if (!headerSearchTags) return;

  headerSearchTags.classList.toggle("is-open", areHeaderSearchTagsOpen);
  if (headerSearchTagsOpenButton) {
    headerSearchTagsOpenButton.classList.toggle("is-open", areHeaderSearchTagsOpen);
    headerSearchTagsOpenButton.setAttribute("aria-expanded", String(areHeaderSearchTagsOpen));
  }
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

function updateHeaderSearchMaxHeight() {
  if (!headerRoot || !headerSearchSection || !headerNavigation) return;

  const headerStyles = window.getComputedStyle(headerRoot);
  const headerPaddingTop = parseFloat(headerStyles.paddingTop) || 0;
  const headerPaddingBottom = parseFloat(headerStyles.paddingBottom) || 0;
  const navigationHeight = headerNavigation.offsetHeight;
  const menuHeight = headerMenuButton && headerMenuButton.style.display !== "none" ? headerMenuButton.offsetHeight : 0;
  const availableHeight = Math.max(window.innerHeight - navigationHeight - menuHeight - headerPaddingTop - headerPaddingBottom, 0);

  headerSearchSection.style.setProperty("--header-search-max-height", availableHeight + "px");
}

function openHeaderSearch() {
  renderHeaderSearchTagsOnce();
  setHeaderSearchOpenState(true);
  updateHeaderSearchMaxHeight();
}

function closeHeaderSearch() {
  setHeaderSearchOpenState(false);
  setHeaderSearchTagsOpenState(false);
  hideAllHeaderSearchResults();
  headerSearchSection?.style.removeProperty("--header-search-max-height");
  headerSearchBar.value = "";
  headerSearchField.value = "";
  updateHeaderSearchFilledFlag();
  updateHeaderSearchFieldFilledFlag();
  resizeHeaderSearchField();
}

function scrollHeaderSearchToTop() {
  const searchContainer = document.querySelector(".C_HeaderAll");

  if (searchContainer && typeof searchContainer.scrollTo === "function") {
    requestAnimationFrame(() => {
      searchContainer.scrollTo({ top: 0, behavior: "smooth" });
    });
    return;
  }

  if (headerSearchSection && typeof headerSearchSection.scrollIntoView === "function") {
    headerSearchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (headerRoot && typeof headerRoot.scrollTo === "function") {
    headerRoot.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function submitHeaderSearchFromInput(inputElement) {
  headerSearchBar.blur();
  headerSearchField.blur();

  const query = inputElement.value.trim();

  openHeaderSearch();
  scrollHeaderSearchToTop();

  if (inputElement === headerSearchBar) {
    headerSearchField.value = query ? query.toLocaleUpperCase("ru-RU") : "";
    headerSearchBar.value = "";
    updateHeaderSearchFilledFlag();
  } else {
    headerSearchField.value = query;
  }

  updateHeaderSearchFieldFilledFlag();
  resizeHeaderSearchField();

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

  if (button.classList.contains("W_HeaderSearchTagOpenButton")) {
    setHeaderSearchTagsOpenState(!areHeaderSearchTagsOpen);
    return;
  }


  const query = button.textContent.trim();

  openHeaderSearch();
  scrollHeaderSearchToTop();
  headerSearchField.value = query;
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
updateHeaderSearchMaxHeight();
hideAllHeaderSearchResults();
setHeaderSearchTagsOpenState(false);