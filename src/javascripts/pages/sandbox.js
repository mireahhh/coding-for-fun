import { initCodeBlocks } from "../code/code.js";
import {
  defaultCodeByRuntime,
  sandboxCodeByRuntime,
  sandboxCodeById,
  sandboxEmptyCodeByRuntime,
} from "../code/tutorialsCodeDefaults.js";

const sandboxDefaultRuntime = "vanilla";
const sandboxRuntimeOrder = ["vanilla", "p5", "three"];
const sandboxStates = new Set();
let isBeforeUnloadInitialized = false;

function getSandboxCode(runtime, sandboxCodeId = "", sandboxCodeNumber = "") {
  if (sandboxCodeId && sandboxCodeById[sandboxCodeId]) {
    return sandboxCodeById[sandboxCodeId];
  }

  const sandboxCode = sandboxCodeByRuntime[runtime];

  if (typeof sandboxCode === "string") {
    return sandboxCode;
  }

  const sandboxCodes = Array.isArray(sandboxCode) ? sandboxCode : [];
  const requestedCodeNumber = Number(sandboxCodeNumber);
  const requestedCodeIndex =
    Number.isInteger(requestedCodeNumber) && requestedCodeNumber > 0
      ? requestedCodeNumber - 1
      : 0;

  return (
    sandboxCodes[requestedCodeIndex] ||
    sandboxCodes[0] ||
    defaultCodeByRuntime[runtime] ||
    ""
  );
}

function getSandboxDefaultCode({ codeBlock, codeBlockId, runtime }) {
  const sandboxCodeId = codeBlock.dataset.sandboxCodeId || codeBlockId || "";
  const sandboxCodeNumber = codeBlock.dataset.sandboxCodeNumber || "";

  return getSandboxCode(runtime, sandboxCodeId, sandboxCodeNumber);
}

function getSandboxEmptyCode(runtime) {
  return sandboxEmptyCodeByRuntime[runtime] || "";
}

function isSandboxStandardCode(code, defaultCode, emptyCode) {
  return code === defaultCode || code === emptyCode;
}

function syncLibraryButtons(buttons, runtime) {
  buttons.forEach((button) => {
    button.classList.toggle("is-current", button.dataset.runtime === runtime);
  });
}

function initBeforeUnload() {
  if (isBeforeUnloadInitialized) return;

  window.addEventListener("beforeunload", (event) => {
    const hasUnsavedChanges = Array.from(sandboxStates).some((state) =>
      state.hasUnsavedChanges(),
    );

    if (!hasUnsavedChanges) return;

    event.preventDefault();
    event.returnValue = "";
  });

  isBeforeUnloadInitialized = true;
}

function initSandboxCodeBlock(controller) {
  const { codeBlock, textarea } = controller;
  const libraryButtons = Array.from(
    codeBlock.querySelectorAll(".A_TutorialSingleCodeTextHeaderLibraryButton"),
  );
  const codeByRuntimeDraft = {};

  function saveCurrentCode() {
    codeByRuntimeDraft[controller.getRuntime()] = textarea.value;
  }

  function getCodeForRuntime(runtime) {
    if (Object.prototype.hasOwnProperty.call(codeByRuntimeDraft, runtime)) {
      return codeByRuntimeDraft[runtime];
    }

    return controller.getDefaultCode(runtime);
  }

  function hasUnsavedChanges() {
    saveCurrentCode();

    return sandboxRuntimeOrder.some((runtime) => {
      const code = getCodeForRuntime(runtime);

      return !isSandboxStandardCode(
        code,
        controller.getDefaultCode(runtime),
        getSandboxEmptyCode(runtime),
      );
    });
  }

  syncLibraryButtons(libraryButtons, controller.getRuntime());
  initBeforeUnload();
  sandboxStates.add({ hasUnsavedChanges });

  libraryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextRuntime = button.dataset.runtime;
      if (!nextRuntime || nextRuntime === controller.getRuntime()) return;

      saveCurrentCode();
      controller.setRuntime(nextRuntime, {
        code: getCodeForRuntime(nextRuntime),
        run: codeBlock.dataset.autostart === "true",
        stop: codeBlock.dataset.autostart !== "true",
      });
      syncLibraryButtons(libraryButtons, nextRuntime);
    });
  });
}

initCodeBlocks({
  getInitialRuntime: () => sandboxDefaultRuntime,
  getDefaultCode: getSandboxDefaultCode,
  getEmptyCode: ({ runtime }) => getSandboxEmptyCode(runtime),
  shouldStretchEditor: ({ codeBlock }) =>
    codeBlock.classList.contains("O_TutorialSingleCode--Sandbox"),
  onInitBlock: initSandboxCodeBlock,
});