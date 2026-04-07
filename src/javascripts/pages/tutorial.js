import { defaultCodeByRuntime, defaultCodeById } from "./tutorialsCodeDefaults";
import {
  getEmptyHtml,
  getUnknownRuntimeHtml,
  getVanillaHtml,
  getP5Html
} from "./tutorialsCodeRuntimes";

function getDefaultCode(blockId, runtime) {
  return defaultCodeById[blockId] || defaultCodeByRuntime[runtime] || "";
}

function buildRuntimeHtml(runtime, code) {
  if (runtime === "p5") {
    return getP5Html(code);
  }

  if (runtime === "vanilla") {
    return getVanillaHtml(code);
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

document.querySelectorAll(".O_TutorialSingleCode").forEach((codeBlock) => {
  const codeBlockId = codeBlock.id;
  const runtime = codeBlock.dataset.runtime;

  const iframe = codeBlock.querySelector(".A_TutorialSingleCodeExecutionCanvas");
  const runButton = codeBlock.querySelector(".A_TutorialSingleCodeExecutionButton");
  const resetButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonRestart");
  const copyButton = codeBlock.querySelector(".A_TutorialSingleCodeTextButtonCopy");
  const textarea = codeBlock.querySelector(".W_TutorialSingleCodeTextRun");

  if (!iframe || !runButton || !resetButton || !copyButton || !textarea) return;

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

  runButton.addEventListener("click", () => {
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

// function autoResizeTextarea(textarea) {
//   textarea.style.height = "auto";
//   textarea.style.height = textarea.scrollHeight + "px";
// }

// textarea.addEventListener("input", () => {
//   autoResizeTextarea(textarea);
// });

// autoResizeTextarea(textarea);
