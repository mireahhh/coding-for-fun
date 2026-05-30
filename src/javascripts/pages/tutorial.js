import { copyText, highlightCode, initCodeBlocks, showCopyFeedback } from "../code/code.js";
import { defaultCodeByRuntime, defaultCodeById } from "../code/tutorialsCodeDefaults.js";

const heading = document.querySelector(".A_IntroHeadingTutorial");

const part = Number(heading.dataset.part);
const module = Number(heading.dataset.module);
const tutorial = Number(heading.dataset.tutorial);


import { months, filtersName } from "../json/otherJson.js";
import { tagsHandbook, toArray, getPartModules, getModuleTutorials } from "../json/tutorialsJson.js";

function formatTutorialDate(dateJs) {
  if (!dateJs) return "";

  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6), 10);
  const day = dateJs.slice(6, 8);

  return `${day} ${months[month - 1]} ${year}`;
}

function drawTutorialMeta() {
  const partData = tagsHandbook?.[part - 1];
  const moduleData = getPartModules(partData)?.[module - 1];
  const tutorialData = getModuleTutorials(moduleData)?.[tutorial - 1];
  if (!tutorialData) return;

  // Название вкладки
  if (tutorialData.title) {
    document.title = tutorialData.title;
  }

  // Хлебная строка
  const headingAbout = document.querySelector(".A_IntroHeadingAbout");
  if (headingAbout) {
    const partTitle = partData?.title ?? `Часть ${part}`;
    const moduleTitle = moduleData?.title ?? `Модуль ${module}`;
    const tutorialTitle = tutorialData.title ?? `Урок ${tutorial}`;
    headingAbout.textContent = `Учебник: ${partTitle} / ${moduleTitle} / ${tutorialTitle}`;
  }

  // Дата
  const headingUpdate = document.querySelector(".A_IntroHeadingApdate");
  const lastDate = tutorialData.date?.at(-1);

  if (headingUpdate && lastDate) {
    headingUpdate.textContent = `Опубликовано ${formatTutorialDate(lastDate)}`;
  }

  // Заголовок статьи
  const headingTitle = document.querySelector(".A_IntroHeadingTutorial");
  if (headingTitle && tutorialData.title) {
    headingTitle.textContent = tutorialData.title;
  }

  // Автор
  const headingAuthor = document.querySelector(".A_IntroAuthor");
  if (headingAuthor) {
    headingAuthor.innerHTML = `Автор:&nbsp;<u>${tutorialData.author ?? ""}</u>`;
    headingAuthor.href = tutorialData.link;
  }

  // Теги
  const tagsContainer = document.querySelector(".C_IntroTutorialTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = "";

    // Главные теги: complexity + library + format + verification
    const primaryKeys = [
      tutorialData.complexity,
      ...toArray(tutorialData.library),
      ...toArray(tutorialData.format),
      tutorialData.verification,
    ].filter(Boolean);

    const primaryValues = primaryKeys.map((key) => filtersName[key] ?? key);

    primaryValues.forEach((value) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "U_Button U_FontC2 A_IntroTutorialTagPrimary";
      button.textContent = value;
      tagsContainer.appendChild(button);
    });

    // Второстепенные теги: tutorialData.tags
    const secondaryValues = toArray(tutorialData.tags).filter(Boolean);

    secondaryValues.forEach((value) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "U_Button U_FontC2 A_IntroTutorialTagSecondary";
      button.textContent = value;
      tagsContainer.appendChild(button);
    });
  }
}

function fillHeaderSearchFromTutorialTag(tagText) {
  const headerSearchBar = document.getElementById("headerSearchBar");

  if (!headerSearchBar) return;

  headerSearchBar.value = tagText;
  headerSearchBar.focus();
  headerSearchBar.setSelectionRange(headerSearchBar.value.length, headerSearchBar.value.length);
  headerSearchBar.dispatchEvent(new Event("input", { bubbles: true }));
}

function initTutorialTagSearchPrefill() {
  const tagsContainer = document.querySelector(".C_IntroTutorialTags");

  if (!tagsContainer) return;

  tagsContainer.addEventListener("click", (event) => {
    const tagButton = event.target.closest(".A_IntroTutorialTagPrimary, .A_IntroTutorialTagSecondary");

    if (!tagButton || !tagsContainer.contains(tagButton)) return;

    fillHeaderSearchFromTutorialTag(tagButton.textContent.trim());
  });
}

// Навигация
// Динамическая по странице
function initTutorialPageNavigation() {
  const navList = document.querySelector(".C_TutorialNavigationPageList");
  if (!navList) return;

  const tutorialMain = document.querySelector(".O_TutorialMain");
  if (!tutorialMain) return;

  // Берём только h3 внутри урока
  const tutorialHeadings = Array.from(tutorialMain.querySelectorAll("h3[id]"));

  // // Добавляем "Следующий материал" отдельно
  // const nextHeading = document.getElementById("nav6");

  const allHeadings = [...tutorialHeadings];
  // if (nextHeading) {
  //   allHeadings.push(nextHeading);
  // }

  if (!allHeadings.length) return;

  navList.innerHTML = "";

  const navItems = allHeadings.map((heading) => {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.className = "U_ALink A_TutorialNavigationPageLink";
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();

    li.appendChild(link);
    navList.appendChild(li);

    return { heading, link };
  });

  function updateCurrentSection() {
    const headerOffset = 120;
    const triggerLine = window.innerHeight * 0.28;

    let currentItem = navItems[0];

    navItems.forEach((item) => {
      const rect = item.heading.getBoundingClientRect();

      if (rect.top - headerOffset <= triggerLine) {
        currentItem = item;
      }
    });

    navItems.forEach((item) => {
      item.link.classList.remove("is-current");
    });

    if (currentItem) {
      currentItem.link.classList.add("is-current");
    }
  }

  navItems.forEach((item) => {
    item.link.addEventListener("click", (e) => {
      e.preventDefault();

      const headerOffset = 120;
      const top =
        item.heading.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });

  updateCurrentSection();
  window.addEventListener("scroll", updateCurrentSection, { passive: true });
  window.addEventListener("resize", updateCurrentSection);
}

function showTutorialShareFeedback(button) {
  button.classList.add("is-copied");

  setTimeout(() => {
    button.classList.remove("is-copied");
  }, 800);
}

const TUTORIAL_SHARE_ORIGIN = "https://cff.adc.ac";

function getTutorialAnchorUrl(anchorId) {
  const currentUrl = new URL(window.location.href);
  const shareUrl = new URL(currentUrl.pathname + currentUrl.search, TUTORIAL_SHARE_ORIGIN);

  shareUrl.hash = anchorId;

  if (shareUrl.pathname.endsWith("/index.html")) {
    shareUrl.pathname = shareUrl.pathname.replace(/\/index\.html$/, "/");
  }

  return shareUrl.toString();
}

async function copyTutorialAnchorLink(link) {
  try {
    await navigator.clipboard.writeText(link);
  } catch (error) {
    const textarea = document.createElement("textarea");

    textarea.value = link;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

function initTutorialAnchorShareButtons() {
  const tutorialMain = document.querySelector(".O_TutorialMain");
  if (!tutorialMain) return;

  tutorialMain.addEventListener("click", async (event) => {
    const button = event.target.closest(".A_TutorialTitle .U_ButtonIcon");

    if (!button || !tutorialMain.contains(button)) return;

    const title = button.closest(".A_TutorialTitle[id]");
    if (!title) return;

    event.preventDefault();
    event.stopPropagation();

    await copyTutorialAnchorLink(getTutorialAnchorUrl(title.id));
    showTutorialShareFeedback(button);
  });
}

function initTutorialButtonUp() {
  const button = document.querySelector(".A_TutorialButtonUp");
  if (!button) return;

  const toggleVisibility = () => {
    const showFrom = Math.max(window.innerHeight * 0.45, 240);
    button.classList.toggle("is-visible", window.scrollY > showFrom);
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  window.addEventListener("resize", toggleVisibility);
}

// Навигация
// Динамическая по учебнику
function drawTutorialPartNavigation() {
  const navigationPart = document.querySelector(".W_TutorialNavigationPart");
  if (!navigationPart) return;

  const partData = tagsHandbook?.[part - 1];
  if (!partData) return;

  const partModules = getPartModules(partData);
  const partTitleElement = navigationPart.querySelector(".A_TutorialNavigationTitle");
  if (partTitleElement && partData.title) {
    partTitleElement.textContent = partData.title;
  }

  const modulesContainer = navigationPart.querySelector(".C_TutorialNavigationModules");
  if (!modulesContainer) return;

  modulesContainer.innerHTML = "";

  partModules.forEach((moduleData, moduleIndex) => {
    const moduleTutorials = getModuleTutorials(moduleData);
    if (!moduleData || !Array.isArray(moduleTutorials)) return;

    const moduleNumber = moduleIndex + 1;

    const moduleElement = document.createElement("div");
    moduleElement.className = "W_TutorialNavigationModule";
    const moduleTitle = document.createElement("a");
    moduleTitle.className = "U_FontB1 A_TutorialNavigationModuleTitle";
    moduleTitle.href = `../module${moduleNumber}.html`;
    moduleTitle.textContent = moduleData.title || `Модуль ${moduleNumber}`;
    if (moduleNumber === module) moduleTitle.classList.add("is-current");

    const tutorialsList = document.createElement("ol");
    tutorialsList.className = "U_FontF1 C_TutorialNavigationTutorialsList";

    moduleTutorials.forEach((tutorialData, tutorialIndex) => {
      const tutorialNumber = tutorialIndex + 1;

      const li = document.createElement("li");
      const link = document.createElement("a");

      link.className = "A_TutorialNavigationTutorialLink";
      link.href = `../module${moduleNumber}/tutorial${tutorialNumber}.html`;
      link.innerHTML = tutorialData?.title || `Туториал ${tutorialNumber}`;

      if (moduleNumber === module && tutorialNumber === tutorial) {
        link.classList.add("is-current");
      }

      li.appendChild(link);
      tutorialsList.appendChild(li);
    });
    moduleElement.append(moduleTitle, tutorialsList);
    modulesContainer.appendChild(moduleElement);
  });
}

function initTutorialCodePreviewBlocks() {
  document.querySelectorAll(".A_TutorialCopyText").forEach((block) => {
    const rawHtml = block.innerHTML;

    const normalized = rawHtml
      .split(/<br\s*\/?>/gi)
      .map((line) =>
        line
          .replace(/\n/g, "")
          .replace(/\t/g, "")
          .replace(/&nbsp;/g, "\u00A0")
          .replace(/\s+$/g, ""),
      )
      .join("\n");

    block.innerHTML = highlightCode(normalized).replace(/\n/g, "<br>");
  });
}

function initTutorialCopyButtons() {
  document.querySelectorAll(".A_TutorialCopyButton").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button
        .closest(".W_TutorialCopyItem")
        .querySelector(".A_TutorialCopyText").innerText;

      await copyText(text);
      showCopyFeedback(button);
    });
  });
}


initCodeBlocks({
  getDefaultCode: ({ codeBlockId, runtime }) =>
    defaultCodeById[codeBlockId] || defaultCodeByRuntime[runtime] || "",
});
initTutorialCodePreviewBlocks();
initTutorialCopyButtons();

drawTutorialMeta();
initTutorialTagSearchPrefill();
initTutorialPageNavigation();
initTutorialAnchorShareButtons();
drawTutorialPartNavigation();
initTutorialButtonUp();