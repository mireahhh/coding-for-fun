import { defaultCodeByRuntime, defaultCodeById } from "../pages/tutorialsCodeDefaults";
import {
    getEmptyHtml,
    getUnknownRuntimeHtml,
    getVanillaHtml,
    getP5Html,
    getThreeHtml,
} from "../pages/tutorialsCodeRuntimes";

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export function highlightCode(code) {
    let html = escapeHtml(code);
    const tokens = [];

    function keep(match, className) {
        const id = `___TOKEN_${tokens.length}___`;
        tokens.push(`<span class="${className}">${match}</span>`);
        return id;
    }

    html = html.replace(/\/\/[^\n]*/g, (match) => keep(match, "code-comment"));
    html = html.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, (match) =>
        keep(match, "code-string")
    );

    html = html.replace(
        /\b(const|let|var|if|else|for|while|do|function|return|class|new|try|catch|finally|throw|switch|case|break|continue|import|from|export|default|true|false|null|undefined)\b/g,
        '<span class="code-keyword">$1</span>'
    );

    html = html.replace(
        /\b(const|let|var)\b(\s+)([A-Za-z_$][\w$]*)/g,
        '<span class="code-keyword">$1</span>$2<span class="code-variable">$3</span>'
    );

    html = html.replace(
        /\b(\d+(\.\d+)?)\b/g,
        '<span class="code-number">$1</span>'
    );

    html = html.replace(
        /\b([A-Za-z_$][\w$]*)(?=\s*\()/g,
        '<span class="code-function">$1</span>'
    );

    html = html.replace(/___TOKEN_(\d+)___/g, (_, index) => tokens[Number(index)]);

    return html;
}

function getDefaultCode(blockId, runtime) {
    return defaultCodeById[blockId] || defaultCodeByRuntime[runtime] || "";
}

function buildRuntimeHtml(runtime, code) {
    if (runtime === "vanilla") return getVanillaHtml(code);
    if (runtime === "p5") return getP5Html(code);
    if (runtime === "three") return getThreeHtml(code);

    return getUnknownRuntimeHtml(runtime);
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

async function copyCodeFromTextarea(textarea, copyButton) {
    await copyText(textarea.value, textarea);
    showCopyFeedback(copyButton);
}

export function initCodeBlocks() {
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

        function syncActiveLineHighlight() {
            const textBeforeCaret = textarea.value.slice(0, textarea.selectionStart);
            const lineIndex = textBeforeCaret.split("\n").length - 1;

            const textareaStyle = window.getComputedStyle(textarea);
            const lineHeight = parseFloat(textareaStyle.lineHeight) || 16;
            const paddingTop = parseFloat(textareaStyle.paddingTop) || 0;
            const activeLineTop = paddingTop + lineIndex * lineHeight;

            highlight.style.setProperty("--active-line-top", `${activeLineTop}px`);
            highlight.style.setProperty("--active-line-height", `${lineHeight}px`);
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
            syncActiveLineHighlight();
        });

        let isTextareaFocused = false;

        function scheduleCaretSync() {
            window.requestAnimationFrame(() => {
                syncActiveLineHighlight();
            });
        }

        textarea.addEventListener("scroll", () => {
            syncScrollOffsets();
            scheduleCaretSync();
        });

        textarea.addEventListener("focus", () => {
            isTextareaFocused = true;
            scheduleCaretSync();
        });

        textarea.addEventListener("blur", () => {
            isTextareaFocused = false;
        });

        textarea.addEventListener("click", scheduleCaretSync);
        textarea.addEventListener("keyup", scheduleCaretSync);
        textarea.addEventListener("keydown", scheduleCaretSync);
        textarea.addEventListener("mouseup", scheduleCaretSync);
        textarea.addEventListener("select", scheduleCaretSync);

        document.addEventListener("selectionchange", () => {
            if (!isTextareaFocused || document.activeElement !== textarea) return;
            scheduleCaretSync();
        });

        window.addEventListener("resize", () => {
            syncTypographyMetrics();
            syncScrollOffsets();
            scheduleCaretSync();
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
            syncActiveLineHighlight();
        });

        copyButton.addEventListener("click", async () => {
            await copyCodeFromTextarea(textarea, copyButton);
        });

        syncTypographyMetrics();
        autoResizeTextarea();
        syncHighlight();
        syncLineNumbers();
        syncActiveLineHighlight();
        clearFrame(iframe);

        if (codeBlock.dataset.autostart === "true") {
            runCode(codeBlock, iframe, textarea, runtime);
        }
    });
}

export function initTutorialCodePreviewBlocks() {
    document.querySelectorAll(".A_TutorialCopyText").forEach((block) => {
        const rawHtml = block.innerHTML;

        const normalized = rawHtml
            .split(/<br\s*\/?>/gi)
            .map((line) =>
                line
                    .replace(/\n/g, "")
                    .replace(/\t/g, "")
                    .replace(/&nbsp;/g, "\u00A0")
                    .replace(/\s+$/g, "")
            )
            .join("\n");

        block.innerHTML = highlightCode(normalized).replace(/\n/g, "<br>");
    });
}

export function initTutorialCopyButtons() {
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

initCodeBlocks();
initTutorialCodePreviewBlocks();
initTutorialCopyButtons();