const heading = document.querySelector(".A_IntroHeadingTutorial");

const part = Number(heading.dataset.part);
const module = Number(heading.dataset.module);
const tutorial = Number(heading.dataset.tutorial);

import { defaultCodeByRuntime, defaultCodeById } from "./tutorialsCodeDefaults";
import {
  getEmptyHtml,
  getUnknownRuntimeHtml,
  getVanillaHtml,
  getP5Html,
  getThreeHtml
} from "./tutorialsCodeRuntimes";

function getDefaultCode(blockId, runtime) {
  return defaultCodeById[blockId] || defaultCodeByRuntime[runtime] || "";
}

function buildRuntimeHtml(runtime, code) {
  if (runtime === "vanilla") {
    return getVanillaHtml(code);
  }

  if (runtime === "p5") {
    return getP5Html(code);
  }

  if (runtime === "three") {
    return getThreeHtml(code);
  }

  return getUnknownRuntimeHtml(runtime);
}

function showCopyFeedback(button) {
  button.classList.add("is-copied");

  setTimeout(() => {
    button.classList.remove("is-copied");
  }, 800);
}

async function copyText(text, fallbackElement = null) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    if (fallbackElement) {
      fallbackElement.focus();
      fallbackElement.select?.();
    }
    document.execCommand("copy");
  }
}

function clearFrame(iframe) {
  iframe.srcdoc = getEmptyHtml();
}

function runCode(codeBlock, iframe, textarea, runtime) {
  const code = textarea.value;
  iframe.srcdoc = buildRuntimeHtml(runtime, code);
  codeBlock.classList.add("is-running");
}

function stopCode(codeBlock, iframe) {
  clearFrame(iframe);
  codeBlock.classList.remove("is-running");
}

function resetCode(textarea, defaultCode, codeBlock, iframe) {
  textarea.value = defaultCode;
  stopCode(codeBlock, iframe);
}

async function copyCodeFromTextarea(textarea, copyButton) {
  await copyText(textarea.value, textarea);
  showCopyFeedback(copyButton);
}

function initTutorialCodeBlocks() {
  document.querySelectorAll(".O_TutorialSingleCode").forEach((codeBlock) => {
    const codeBlockId = codeBlock.id;
    const runtime = codeBlock.dataset.runtime;

    const iframe = codeBlock.querySelector(".A_TutorialSingleCodeExecutionCanvas");
    const runStopButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonRunStop");
    const resetButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonClean");
    const copyButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonCopy");
    const textarea = codeBlock.querySelector(".W_TutorialSingleCodeTextRun");

    if (!iframe || !runStopButton || !resetButton || !copyButton || !textarea) return;

    const defaultCode = getDefaultCode(codeBlockId, runtime);
    textarea.value = defaultCode;

    function autoResizeTextarea(textarea) {
      textarea.style.height = "auto";

      const minHeight = 272;
      const maxHeight = 544;
      const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

      textarea.style.height = `${nextHeight}px`;
    }

    textarea.addEventListener("input", () => {
      autoResizeTextarea(textarea);
    });

    autoResizeTextarea(textarea);

    runStopButton.addEventListener("click", () => {
      if (codeBlock.classList.contains("is-running")) {
        stopCode(codeBlock, iframe);
      } else {
        runCode(codeBlock, iframe, textarea, runtime);
      }
    });

    resetButton.addEventListener("click", () => {
      resetCode(textarea, defaultCode, codeBlock, iframe);
      autoResizeTextarea(textarea);
    });

    copyButton.addEventListener("click", async () => {
      await copyCodeFromTextarea(textarea, copyButton);
    });

    clearFrame(iframe);

    if (codeBlock.dataset.autostart === "true") {
      runCode(codeBlock, iframe, textarea, runtime);
    }
  });
}

import { months, filtersName } from "../json/otherJson.js";
import { tagsHandbook } from "../json/tutorialsJson.js";

function formatTutorialDate(dateJs) {
  if (!dateJs) return "";

  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6), 10);
  const day = dateJs.slice(6, 8);

  return `${day} ${months[month - 1]} ${year}`;
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === null || value === "") {
    return [];
  }
  return [value];
}

function drawTutorialMeta() {
  const tutorialData = tagsHandbook?.[part - 1]?.[module - 1]?.[tutorial - 1];
  if (!tutorialData) return;

  // Название вкладки
  if (tutorialData.title) {
    document.title = tutorialData.title;
  }

  // Хлебная строка
  const headingAbout = document.querySelector(".A_IntroHeadingAbout");
  if (headingAbout && tutorialData.title) {
    const baseText = headingAbout.textContent.trim();
    const cleanedBaseText = baseText.endsWith("/")
      ? `${baseText} `
      : `${baseText} / `;

    headingAbout.textContent = `${cleanedBaseText}${tutorialData.title}`;
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
      const li = document.createElement("li");
      li.className = "A_IntroTutorialTagPrimary";
      li.textContent = value;
      tagsContainer.appendChild(li);
    });

    // Второстепенные теги: tutorialData.tags
    const secondaryValues = toArray(tutorialData.tags).filter(Boolean);

    secondaryValues.forEach((value) => {
      const li = document.createElement("li");
      li.className = "A_IntroTutorialTagSecondary";
      li.textContent = value;
      tagsContainer.appendChild(li);
    });
  }
}

function initTutorialCopyButtons() {
  document.querySelectorAll(".A_TutorialCopyButton").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button
        .closest(".W_TutorialCopyItem")
        .querySelector(".A_TutorialCopyText")
        .innerText;

      await copyText(text);
      showCopyFeedback(button);
    });
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

  // Добавляем "Следующий материал" отдельно
  const nextHeading = document.getElementById("nav6");

  const allHeadings = [...tutorialHeadings];
  if (nextHeading) {
    allHeadings.push(nextHeading);
  }

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

      const currentHash = `#${currentItem.heading.id}`;
      if (location.hash !== currentHash) {
        history.replaceState(null, "", currentHash);
      }
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

// Навигация
// Динамическая по учебнику
function drawTutorialPartNavigation() {
  const navigationPart = document.querySelector(".W_TutorialNavigationPart");
  if (!navigationPart) return;

  const partData = tagsHandbook?.[part - 1];
  if (!Array.isArray(partData)) return;

  const moduleElements = navigationPart.querySelectorAll(".W_TutorialNavigationModule");

  moduleElements.forEach((moduleElement, moduleIndex) => {
    const moduleData = partData[moduleIndex];
    if (!Array.isArray(moduleData)) return;

    const moduleNumber = moduleIndex + 1;

    const moduleTitle = moduleElement.querySelector(".A_TutorialNavigationModuleTitle");

    if (moduleNumber === module) {
      moduleTitle?.classList.add("is-current");
    }

    const tutorialsList = moduleElement.querySelector(".C_TutorialNavigationTutorialsList");
    if (!tutorialsList) return;

    tutorialsList.innerHTML = "";

    moduleData.forEach((tutorialData, tutorialIndex) => {
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
  });
}

initTutorialCodeBlocks();
initTutorialCopyButtons();
drawTutorialMeta();
initTutorialPageNavigation();
drawTutorialPartNavigation();