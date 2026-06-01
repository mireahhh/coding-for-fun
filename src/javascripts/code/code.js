import {
    getEmptyHtml,
    getUnknownRuntimeHtml,
    getVanillaHtml,
    getP5Html,
    getThreeHtml,
} from "./codeRuntimes";

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
    html = html.replace(
        /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g,
        (match) => keep(match, "code-string"),
    );

    html = html.replace(
        /\b(const|let|var|if|else|for|while|do|function|return|class|new|try|catch|finally|throw|switch|case|break|continue|import|from|export|default|true|false|null|undefined)\b/g,
        '<span class="code-keyword">$1</span>',
    );

    html = html.replace(
        /\b(const|let|var)\b(\s+)([A-Za-z_$][\w$]*)/g,
        '<span class="code-keyword">$1</span>$2<span class="code-variable">$3</span>',
    );

    html = html.replace(
        /\b(\d+(\.\d+)?)\b/g,
        '<span class="code-number">$1</span>',
    );

    html = html.replace(
        /\b([A-Za-z_$][\w$]*)(?=\s*\()/g,
        '<span class="code-function">$1</span>',
    );

    html = html.replace(
        /___TOKEN_(\d+)___/g,
        (_, index) => tokens[Number(index)],
    );

    return html;
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

function buildLineNumbersMarkup(lineCount, digits, activeLineIndex = null) {
    const rows = [];
    for (let index = 1; index <= lineCount; index += 1) {
        const number = escapeHtml(String(index).padStart(digits, " "));
        const isActive = activeLineIndex === index - 1;
        const className = isActive
            ? "A_TutorialSingleCodeLineNumber is-active"
            : "A_TutorialSingleCodeLineNumber";
        rows.push(
            `<span class="${className}" data-line-number="${index}">${number}</span>`,
        );
    }
    return rows.join("");
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

export function showCopyFeedback(button) {
    button.classList.add("is-copied");

    setTimeout(() => {
        button.classList.remove("is-copied");
    }, 800);
}

export async function copyText(text, fallbackElement = null) {
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

function getLineRangeBySelection(value, selectionStart, selectionEnd) {
    const safeSelectionStart = Math.max(0, selectionStart || 0);
    const safeSelectionEnd = Math.max(0, selectionEnd || 0);

    const startLine = value.slice(0, safeSelectionStart).split("\n").length - 1;
    const endLine = value.slice(0, safeSelectionEnd).split("\n").length - 1;

    return {
        startLine,
        endLine,
    };
}

function toggleCommentOnSelectedLines(textarea) {
    const value = textarea.value;
    const lines = value.split("\n");
    const selectionStart = textarea.selectionStart || 0;
    const selectionEnd = textarea.selectionEnd || 0;
    const { startLine, endLine } = getLineRangeBySelection(
        value,
        selectionStart,
        selectionEnd,
    );

    const selectedLineIndexes = [];
    for (let index = startLine; index <= endLine; index += 1) {
        if (/^\s*$/.test(lines[index] || "")) continue;
        selectedLineIndexes.push(index);
    }

    if (selectedLineIndexes.length === 0) return;

    const shouldUncomment = selectedLineIndexes.every((index) =>
        /^[\t ]*\/\//.test(lines[index]),
    );
    const lineDiffByIndex = new Map();

    selectedLineIndexes.forEach((index) => {
        const line = lines[index];
        const beforeLength = line.length;

        if (shouldUncomment) {
            lines[index] = line.replace(/^([\t ]*)\/\/ ?/, "$1");
        } else {
            const indentMatch = line.match(/^[\t ]*/);
            const indent = indentMatch ? indentMatch[0] : "";
            const content = line.slice(indent.length);
            lines[index] = `${indent}// ${content}`;
        }

        lineDiffByIndex.set(index, lines[index].length - beforeLength);
    });

    function getPositionShift(position) {
        let shift = 0;
        let cursor = 0;
        for (let index = 0; index < lines.length; index += 1) {
            const originalLineLength = (value.split("\n")[index] || "").length;
            const lineStart = cursor;
            const lineEnd = lineStart + originalLineLength;
            const diff = lineDiffByIndex.get(index) || 0;

            if (position > lineEnd) {
                shift += diff;
            } else if (position > lineStart && diff !== 0) {
                const indentMatch = (value.split("\n")[index] || "").match(/^[\t ]*/);
                const indentLength = indentMatch ? indentMatch[0].length : 0;
                const markerStart = lineStart + indentLength;

                if (!shouldUncomment && position > markerStart) {
                    shift += 3;
                }

                if (shouldUncomment && position > markerStart) {
                    const removed = (value.split("\n")[index] || "").startsWith(
                        `${" ".repeat(indentLength)}// `,
                        indentLength,
                    )
                        ? 3
                        : 2;
                    shift -= removed;
                }
            }

            cursor = lineEnd + 1;
        }
        return shift;
    }

    textarea.value = lines.join("\n");
    textarea.selectionStart = Math.max(
        0,
        selectionStart + getPositionShift(selectionStart),
    );
    textarea.selectionEnd = Math.max(
        0,
        selectionEnd + getPositionShift(selectionEnd),
    );
}


function getCodeBlockRuntime(codeBlock, fallbackRuntime = "vanilla") {
    return codeBlock.dataset.runtime || fallbackRuntime;
}

function runPreviewCode(codeBlock, iframe, code, runtime) {
    iframe.srcdoc = buildRuntimeHtml(runtime, code);
    codeBlock.classList.add("is-running");
}

function stopPreviewCode(codeBlock, iframe) {
    clearFrame(iframe);
    codeBlock.classList.remove("is-running");
}

export function initCodePreviewBlocks(options = {}) {
    const {
        getInitialRuntime = (codeBlock) => getCodeBlockRuntime(codeBlock),
        getDefaultCode = () => "",
        runOnHover = true,
        stopOnLeave = false,
    } = options;

    document.querySelectorAll(".O_TutorialSingleCode--Preview").forEach((codeBlock) => {
        const codeBlockId = codeBlock.id;
        const iframe = codeBlock.querySelector(
            ".A_TutorialSingleCodeExecutionCanvas",
        );

        if (!iframe) return;

        const runtime = getInitialRuntime(codeBlock);
        const code = getDefaultCode({ codeBlock, codeBlockId, runtime });

        if (!code) return;

        codeBlock.dataset.runtime = runtime;
        clearFrame(iframe);

        const run = () => {
            runPreviewCode(codeBlock, iframe, code, runtime);
        };
        const stop = () => {
            stopPreviewCode(codeBlock, iframe);
        };

        if (codeBlock.dataset.autostart === "true") {
            run();
        }

        if (runOnHover) {
            codeBlock.addEventListener("pointerenter", run);
        }

        if (stopOnLeave || codeBlock.dataset.stopOnLeave === "true") {
            codeBlock.addEventListener("pointerleave", stop);
        }
    });
}


export function initCodeBlocks(options = {}) {
    const {
        getInitialRuntime = (codeBlock) => codeBlock.dataset.runtime || "vanilla",
        getDefaultCode = () => "",
        getEmptyCode = () => "",
        shouldStretchEditor = () => false,
        onInitBlock = null,
    } = options;

    document.querySelectorAll(".O_TutorialSingleCode").forEach((codeBlock) => {
        const codeBlockId = codeBlock.id;
        let runtime = getInitialRuntime(codeBlock);

        const iframe = codeBlock.querySelector(
            ".A_TutorialSingleCodeExecutionCanvas",
        );
        const runStopButton = codeBlock.querySelector(
            ".A_TutorialSingleCodeTextButtonRunStop",
        );
        const resetButton = codeBlock.querySelector(
            ".A_TutorialSingleCodeTextButtonClean",
        );
        const emptyButton = codeBlock.querySelector(
            ".A_TutorialSingleCodeTextButtonEmpty",
        );
        const copyButton = codeBlock.querySelector(
            ".A_TutorialSingleCodeTextButtonCopy",
        );
        const textarea = codeBlock.querySelector(".W_TutorialSingleCodeTextRun");
        const highlight = codeBlock.querySelector(
            ".A_TutorialSingleCodeTextHighlight",
        );
        const textLayers = codeBlock.querySelector(
            ".W_TutorialSingleCodeTextLayers",
        );
        const textAreaWrapper = codeBlock.querySelector(
            ".W_TutorialSingleCodeTextArea",
        );
        const textAreaBody =
            textAreaWrapper?.querySelector(".W_TutorialSingleCodeTextBody") ||
            textAreaWrapper;
        const textAreaHeader = textAreaWrapper?.querySelector(
            ".W_TutorialSingleCodeTextHeader",
        );

        if (
            !iframe ||
            !runStopButton ||
            !resetButton ||
            !copyButton ||
            !textarea ||
            !highlight ||
            !textAreaWrapper
        )
            return;

        textarea.classList.add("U_FontC2-Code");
        highlight.classList.add("U_FontC2-Code");
        textLayers?.classList.add("U_FontC2-Code");

        let lineNumbers = textAreaWrapper.querySelector(
            ".W_TutorialSingleCodeLineNumbers",
        );
        if (!lineNumbers) {
            lineNumbers = document.createElement("pre");
            lineNumbers.className = "U_FontC2-Code W_TutorialSingleCodeLineNumbers";
            lineNumbers.setAttribute("aria-hidden", "true");
            textAreaBody.prepend(lineNumbers);
        }

        lineNumbers.classList.add("U_FontC2-Code");

        function getDefaultCodeForRuntime(nextRuntime = runtime) {
            return getDefaultCode({ codeBlock, codeBlockId, runtime: nextRuntime });
        }

        function getEmptyCodeForRuntime(nextRuntime = runtime) {
            return getEmptyCode({ codeBlock, codeBlockId, runtime: nextRuntime });
        }

        textarea.value = getDefaultCodeForRuntime(runtime);
        codeBlock.dataset.runtime = runtime;

        const isEditorStretched = shouldStretchEditor({ codeBlock, codeBlockId, runtime });

        function autoResizeTextarea() {
            if (isEditorStretched) {
                textAreaWrapper.style.height = "100%";
                textarea.style.height = "100%";
                highlight.style.height = "100%";
                return;
            }

            textAreaWrapper.style.height = "auto";
            textarea.style.height = "auto";
            highlight.style.height = "auto";

            const minHeight = 272;
            const maxHeight = minHeight * 2;
            const headerHeight = textAreaHeader?.offsetHeight || 0;
            const nextHeight = Math.min(
                Math.max(textarea.scrollHeight + headerHeight, minHeight),
                maxHeight,
            );

            textAreaWrapper.style.height = `${nextHeight}px`;
            textarea.style.height = "100%";
            highlight.style.height = "100%";
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

        function getActiveLineIndex() {
            const caretPosition = textarea.selectionStart || 0;
            const textBeforeCaret = textarea.value.slice(0, caretPosition);
            return textBeforeCaret.split("\n").length - 1;
        }

        function syncLineNumberActiveState() {
            const activeLineIndex = getActiveLineIndex();
            lineNumbers
                .querySelectorAll(".A_TutorialSingleCodeLineNumber")
                .forEach((lineNode) => {
                    const lineNumber = Number(lineNode.dataset.lineNumber) - 1;
                    lineNode.classList.toggle(
                        "is-active",
                        lineNumber === activeLineIndex,
                    );
                });
        }

        function syncActiveLineHighlight() {
            const lineIndex = getActiveLineIndex();
            syncLineNumberActiveState();

            if (textarea.selectionStart !== textarea.selectionEnd) {
                highlight.style.setProperty("--active-line-height", "0px");
                return;
            }

            const textareaStyle = window.getComputedStyle(textarea);
            const lineHeight = parseFloat(textareaStyle.lineHeight) || 16;
            const paddingTop = parseFloat(textareaStyle.paddingTop) || 0;
            const scrollTop = textarea.scrollTop || 0;

            const activeLineTop = paddingTop + lineIndex * lineHeight;
            const visibleActiveLineTop = activeLineTop - scrollTop;

            highlight.style.setProperty(
                "--active-line-top",
                `${visibleActiveLineTop}px`,
            );
            highlight.style.setProperty("--active-line-height", `${lineHeight}px`);
        }

        function clearActiveLineHighlight() {
            highlight.style.setProperty("--active-line-height", "0px");
            lineNumbers
                .querySelectorAll(".A_TutorialSingleCodeLineNumber.is-active")
                .forEach((lineNode) => {
                    lineNode.classList.remove("is-active");
                });
        }

        function syncHighlight() {
            highlight.innerHTML = highlightCode(
                normalizeCodeForHighlight(textarea.value),
            );
            syncScrollOffsets();
        }

        function syncScrollOffsets() {
            const top = textarea.scrollTop;
            const left = textarea.scrollLeft;
            highlight.scrollTop = top;
            highlight.scrollLeft = left;
            lineNumbers.style.transform = `translateY(${-top}px)`;
        }

        function syncLineNumbersHeight() {
            lineNumbers.style.minHeight = `${textarea.clientHeight}px`;
            lineNumbers.style.height = `${Math.max(textarea.scrollHeight, textarea.clientHeight)}px`;
        }

        function syncLineNumbers() {
            const lineCount = getLineCount(textarea.value);
            const digits = getGutterDigits(lineCount);
            const gutterWidth = `calc(${digits}ch + var(--size-spacing-20))`;

            textAreaWrapper.style.setProperty(
                "--code-line-number-gutter-width",
                gutterWidth,
            );
            lineNumbers.innerHTML = buildLineNumbersMarkup(
                lineCount,
                digits,
                getActiveLineIndex(),
            );
            syncLineNumbersHeight();
            syncScrollOffsets();
        }

        function syncEditor() {
            autoResizeTextarea();
            syncHighlight();
            syncLineNumbers();
            syncActiveLineHighlight();
        }

        const controller = {
            codeBlock,
            iframe,
            textarea,
            getRuntime: () => runtime,
            getCode: () => textarea.value,
            setCode(nextCode, { stop = false, run = false } = {}) {
                textarea.value = nextCode;
                syncEditor();
                if (run) {
                    runCode(codeBlock, iframe, textarea, runtime);
                } else if (stop) {
                    stopCode(codeBlock, iframe);
                }

            },
            setRuntime(
                nextRuntime,
                { code = textarea.value, run = false, stop = false } = {},
            ) {
                runtime = nextRuntime;
                codeBlock.dataset.runtime = runtime;
                textarea.value = code;
                syncEditor();
                if (run) {
                    runCode(codeBlock, iframe, textarea, runtime);
                } else if (stop) {
                    stopCode(codeBlock, iframe);
                }
            },
            run() {
                runCode(codeBlock, iframe, textarea, runtime);
            },
            stop() {
                stopCode(codeBlock, iframe);
            },
            syncEditor,
            getDefaultCode: getDefaultCodeForRuntime,
            getEmptyCode: getEmptyCodeForRuntime,
        };

        onInitBlock?.(controller);

        textarea.addEventListener("input", () => {
            autoResizeTextarea();
            syncHighlight();
            syncLineNumbers();
            syncActiveLineHighlight();
        });
        function scheduleCaretSync() {
            window.requestAnimationFrame(syncActiveLineHighlight);
        }

        textarea.addEventListener("scroll", () => {
            syncScrollOffsets();
            syncActiveLineHighlight();
        });

        textarea.addEventListener("click", scheduleCaretSync);
        textarea.addEventListener("keyup", scheduleCaretSync);
        textarea.addEventListener("keydown", scheduleCaretSync);
        textarea.addEventListener("keydown", (event) => {
            if (
                event.key === "Tab" &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey
            ) {
                event.preventDefault();

                const selectionStart = textarea.selectionStart || 0;
                const selectionEnd = textarea.selectionEnd || 0;
                const value = textarea.value;
                const lineStart =
                    value.lastIndexOf("\n", Math.max(0, selectionStart - 1)) + 1;
                const lineEndSearchIndex = selectionEnd;
                let lineEnd = value.indexOf("\n", lineEndSearchIndex);
                if (lineEnd === -1) lineEnd = value.length;

                const hasSelection = selectionStart !== selectionEnd;
                const selectedBlock = value.slice(lineStart, lineEnd);
                const selectedLines = selectedBlock.split("\n");

                if (hasSelection) {
                    if (!event.shiftKey) {
                        const indentedLines = selectedLines.map((line) => `\t${line}`);
                        const updatedBlock = indentedLines.join("\n");
                        textarea.value = `${value.slice(0, lineStart)}${updatedBlock}${value.slice(lineEnd)}`;

                        const newSelectionStart = selectionStart + 1;
                        const newSelectionEnd = selectionEnd + selectedLines.length;
                        textarea.selectionStart = newSelectionStart;
                        textarea.selectionEnd = newSelectionEnd;
                    } else {
                        let removedBeforeSelectionStart = 0;
                        let removedTotal = 0;

                        const outdentedLines = selectedLines.map((line, index) => {
                            let removeLength = 0;

                            if (line.startsWith("\t")) {
                                removeLength = 1;
                            } else if (line.startsWith("  ")) {
                                removeLength = 2;
                            } else if (line.startsWith(" ")) {
                                removeLength = 1;
                            }

                            if (index === 0) {
                                removedBeforeSelectionStart = Math.min(
                                    removeLength,
                                    selectionStart - lineStart,
                                );
                            }

                            removedTotal += removeLength;
                            return line.slice(removeLength);
                        });

                        const updatedBlock = outdentedLines.join("\n");
                        textarea.value = `${value.slice(0, lineStart)}${updatedBlock}${value.slice(lineEnd)}`;

                        textarea.selectionStart = Math.max(
                            lineStart,
                            selectionStart - removedBeforeSelectionStart,
                        );
                        textarea.selectionEnd = Math.max(
                            textarea.selectionStart,
                            selectionEnd - removedTotal,
                        );
                    }
                } else if (!event.shiftKey) {
                    const tabSpaces = "\t";
                    textarea.value = `${value.slice(0, selectionStart)}${tabSpaces}${value.slice(selectionEnd)}`;

                    const nextCursorPosition = selectionStart + tabSpaces.length;
                    textarea.selectionStart = nextCursorPosition;
                    textarea.selectionEnd = nextCursorPosition;
                } else {
                    const currentLineEnd = value.indexOf("\n", selectionStart);
                    const singleLineEnd =
                        currentLineEnd === -1 ? value.length : currentLineEnd;
                    const lineText = value.slice(lineStart, singleLineEnd);

                    let removeLength = 0;
                    if (lineText.startsWith("\t")) {
                        removeLength = 1;
                    } else if (lineText.startsWith("  ")) {
                        removeLength = 2;
                    } else if (lineText.startsWith(" ")) {
                        removeLength = 1;
                    }

                    if (removeLength > 0) {
                        textarea.value = `${value.slice(0, lineStart)}${lineText.slice(removeLength)}${value.slice(singleLineEnd)}`;
                        const nextCursorPosition = Math.max(
                            lineStart,
                            selectionStart - removeLength,
                        );
                        textarea.selectionStart = nextCursorPosition;
                        textarea.selectionEnd = nextCursorPosition;
                    }
                }

                return;
            }

            const isCtrlPressed = event.ctrlKey || event.metaKey;
            if (!isCtrlPressed || event.altKey) return;

            const isCommentShortcut = event.code === "Slash" || event.key === "/";
            const isToggleShortcutByPeriod =
                event.code === "Period" ||
                event.key === "." ||
                event.key === "ю" ||
                event.key === "Ю";

            if (!isCommentShortcut && !isToggleShortcutByPeriod) return;

            event.preventDefault();
            toggleCommentOnSelectedLines(textarea);

            autoResizeTextarea();
            syncHighlight();
            syncLineNumbers();
            syncActiveLineHighlight();
        });
        textarea.addEventListener("mousemove", (event) => {
            if (event.buttons === 1) {
                scheduleCaretSync();
            }
        });
        textarea.addEventListener("mouseup", scheduleCaretSync);
        textarea.addEventListener("select", scheduleCaretSync);
        textarea.addEventListener("input", scheduleCaretSync);
        textarea.addEventListener("focus", scheduleCaretSync);
        textarea.addEventListener("blur", clearActiveLineHighlight);

        window.addEventListener("resize", () => {
            syncTypographyMetrics();
            syncLineNumbersHeight();
            syncScrollOffsets();
            syncActiveLineHighlight();
        });

        runStopButton.addEventListener("click", () => {
            if (codeBlock.classList.contains("is-running")) {
                stopCode(codeBlock, iframe);
            } else {
                runCode(codeBlock, iframe, textarea, runtime);
            }
        });

        resetButton.addEventListener("click", () => {
            const nextCode = getDefaultCodeForRuntime(runtime);
            resetCode(textarea, nextCode, codeBlock, iframe);
            syncEditor();
        });

        emptyButton?.addEventListener("click", () => {
            textarea.value = getEmptyCodeForRuntime(runtime);
            stopCode(codeBlock, iframe);
            syncEditor();
        });

        copyButton.addEventListener("click", async () => {
            await copyCodeFromTextarea(textarea, copyButton);
        });

        syncTypographyMetrics();
        syncEditor();
        clearFrame(iframe);

        if (codeBlock.dataset.autostart === "true") {
            runCode(codeBlock, iframe, textarea, runtime);
        }
    });
}