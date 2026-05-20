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

function getLineCount(textValue) {
  if (textValue === "") return 1;

  return textValue.split("\n").length;
}

function getGutterDigits(lineCount) {
  return Math.max(2, String(lineCount).length);
}

function buildLineNumbersMarkup(lineCount, digits) {
  const rows = [];
  for (let index = 1; index <= lineCount; index += 1) {
    rows.push(String(index).padStart(digits, " "));
  }
  return rows.join("\n");
}

function normalizeCodeForHighlight(code) {
  if (code === "") return "​";

  return code
    .split("\n")
    .map((line) => (line === "" ? "​" : line))
    .join("\n");
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
    const highlight = codeBlock.querySelector(".A_TutorialSingleCodeTextHighlight");
    const textAreaWrapper = codeBlock.querySelector(".W_TutorialSingleCodeTextArea");

    if (!iframe || !runStopButton || !resetButton || !copyButton || !textarea || !highlight || !textAreaWrapper) return;

    let lineNumbers = textAreaWrapper.querySelector(".A_TutorialSingleCodeLineNumbers");
    if (!lineNumbers) {
      lineNumbers = document.createElement("pre");
      lineNumbers.className = "U_FontC2-Code A_TutorialSingleCodeLineNumbers";
      lineNumbers.setAttribute("aria-hidden", "true");
      textAreaWrapper.prepend(lineNumbers);
    }

    const defaultCode = getDefaultCode(codeBlockId, runtime);
    textarea.value = defaultCode;

    function autoResizeTextarea() {
      textarea.style.height = "auto";
      highlight.style.height = "auto";

      const minHeight = 272;
      const maxHeight = minHeight * 2;
      const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

      textarea.style.height = `${nextHeight}px`;
      highlight.style.height = `${nextHeight}px`;
    }

    function syncTypographyMetrics() {
      const textareaStyle = window.getComputedStyle(textarea);
      const props = [
        "font",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "fontStyle",
        "lineHeight",
        "letterSpacing",
        "tabSize",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
      ];

      props.forEach((prop) => {
        const value = textareaStyle[prop];
        highlight.style[prop] = value;
        lineNumbers.style[prop] = value;
      });

      lineNumbers.style.paddingRight = "var(--code-line-number-gutter-padding)";
      lineNumbers.style.paddingLeft = "var(--code-line-number-gutter-padding)";
    }

    function syncHighlight() {
      highlight.innerHTML = highlightCode(normalizeCodeForHighlight(textarea.value));
      syncScrollOffsets();
    }

    function syncScrollOffsets() {
      const top = textarea.scrollTop;
      const left = textarea.scrollLeft;
      highlight.scrollTop = top;
      highlight.scrollLeft = left;
      lineNumbers.style.transform = `translateY(${-top}px)`;
    }

    function syncLineNumbers() {
      const lineCount = getLineCount(textarea.value);
      const digits = getGutterDigits(lineCount);
      const gutterWidth = `calc(${digits}ch + var(--size-spacing-20))`;

      textAreaWrapper.style.setProperty("--code-line-number-gutter-width", gutterWidth);
      lineNumbers.textContent = buildLineNumbersMarkup(lineCount, digits);
      syncScrollOffsets();
    }

    textarea.addEventListener("input", () => {
      autoResizeTextarea();
      syncHighlight();
      syncLineNumbers();
    });

    textarea.addEventListener("scroll", () => {
      syncScrollOffsets();
    });

    window.addEventListener("resize", () => {
      syncTypographyMetrics();
      syncScrollOffsets();
    });

    runStopButton.addEventListener("click", () => {
      if (codeBlock.classList.contains("is-running")) {
        stopCode(codeBlock, iframe);
      } else {
        runCode(codeBlock, iframe, textarea, runtime);
      }
    });

    resetButton.addEventListener("click", () => {
      resetCode(textarea, defaultCode, codeBlock, iframe);
      autoResizeTextarea();
      syncHighlight();
      syncLineNumbers();
    });

    copyButton.addEventListener("click", async () => {
      await copyCodeFromTextarea(textarea, copyButton);
    });

    syncTypographyMetrics();
    autoResizeTextarea();
    syncHighlight();
    syncLineNumbers();
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

  let canSyncHashWithScroll = false;

  if (location.hash) {
    canSyncHashWithScroll = true;
  }

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
      if (canSyncHashWithScroll && location.hash !== currentHash) {
        history.replaceState(null, "", currentHash);
      }
    }
  }

  navItems.forEach((item) => {
    item.link.addEventListener("click", (e) => {
      e.preventDefault();
      canSyncHashWithScroll = true;

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
  window.addEventListener(
    "scroll",
    () => {
      canSyncHashWithScroll = true;
      updateCurrentSection();
    },
    { passive: true },
  );
  window.addEventListener("resize", updateCurrentSection);
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

// Подсветка кода
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightCode(code) {
  let html = escapeHtml(code);
  const tokens = [];

  function keep(match, className) {
    const id = `___TOKEN_${tokens.length}___`;
    tokens.push(`<span class="${className}">${match}</span>`);
    return id;
  }

  // 1. Комментарии и строки прячем первыми — у них высший приоритет
  html = html.replace(/\/\/[^\n]*/g, (match) => keep(match, "code-comment"));
  html = html.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, (match) =>
    keep(match, "code-string")
  );

  // 2. Ключевые слова
  html = html.replace(
    /\b(const|let|var|if|else|for|while|do|function|return|class|new|try|catch|finally|throw|switch|case|break|continue|import|from|export|default|true|false|null|undefined)\b/g,
    '<span class="code-keyword">$1</span>'
  );

  // 3. Переменные после const/let/var
  html = html.replace(
    /\b(const|let|var)\b(\s+)([A-Za-z_$][\w$]*)/g,
    '<span class="code-keyword">$1</span>$2<span class="code-variable">$3</span>'
  );

  // 4. Числа
  html = html.replace(
    /\b(\d+(\.\d+)?)\b/g,
    '<span class="code-number">$1</span>'
  );

  // 5. Функции
  html = html.replace(
    /\b([A-Za-z_$][\w$]*)(?=\s*\()/g,
    '<span class="code-function">$1</span>'
  );

  // 6. Возвращаем строки и комментарии назад
  html = html.replace(/___TOKEN_(\d+)___/g, (_, index) => tokens[Number(index)]);

  return html;
}

// Подстветка статичного кода
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
          .replace(/\s+$/g, "") // убираем только хвост
      )
      .join("\n");

    block.innerHTML = highlightCode(normalized).replace(/\n/g, "<br>");
  });
}

initTutorialCodePreviewBlocks()
initTutorialCodeBlocks();
initTutorialCopyButtons();
drawTutorialMeta();
initTutorialPageNavigation();
drawTutorialPartNavigation();
initTutorialButtonUp();