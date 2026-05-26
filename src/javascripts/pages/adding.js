import { showAlert } from "../sections/alerts.js";

// Иконка ссылки: добавляем/убираем класс, если поле ссылки заполнено.
function syncAddingLinkIconState() {
  const linkInput = document.getElementById("addingLink");
  if (!linkInput) return;

  if (linkInput.value) {
    linkInput.classList.add("is-filled");
  } else {
    linkInput.classList.remove("is-filled");
  }
}

function initAddingLinkIcon() {
  const linkInput = document.getElementById("addingLink");
  if (!linkInput) return;

  syncAddingLinkIconState();

  ["input", "change", "blur"].forEach((eventName) => {
    linkInput.addEventListener(eventName, syncAddingLinkIconState);
  });
}

// Утилита: безопасно переводит CSS-значение (например, "20px") в число.
function parsePxValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

// Автовысота описания: держим textarea в пределах 3–5 строк.
function syncAddingDescriptionHeight() {
  const description = document.getElementById("addingDescription");
  if (!description) return;

  const styles = window.getComputedStyle(description);
  let lineHeight = parsePxValue(styles.lineHeight);

  if (!lineHeight) {
    lineHeight = parsePxValue(styles.fontSize);
  }

  const paddingY = parsePxValue(styles.paddingTop) + parsePxValue(styles.paddingBottom);
  const borderY = parsePxValue(styles.borderTopWidth) + parsePxValue(styles.borderBottomWidth);
  const minHeight = lineHeight * 5 + paddingY + borderY;
  const maxHeight = lineHeight * 7 + paddingY + borderY;

  description.style.minHeight = `${minHeight}px`;
  description.style.maxHeight = `${maxHeight}px`;

  description.style.height = "auto";
  description.style.height = `${Math.min(description.scrollHeight, maxHeight)}px`;
}

function initAddingDescriptionAutosize() {
  const description = document.getElementById("addingDescription");
  if (!description) return;

  syncAddingDescriptionHeight();

  ["input", "change", "blur"].forEach((eventName) => {
    description.addEventListener(eventName, syncAddingDescriptionHeight);
  });

  window.addEventListener("resize", syncAddingDescriptionHeight);
}

// Проверка ссылки: принимаем только корректные http/https URL.
function isValidWorkUrl(urlValue) {
  if (!urlValue) return false;

  try {
    const parsedUrl = new URL(urlValue);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function collectAddingFormValues() {
  const authorValue = document.getElementById("addingAuthor")?.value.trim() || "";
  const titleValue = document.getElementById("addingTitle")?.value.trim() || "";
  const descriptionValue = document.getElementById("addingDescription")?.value.trim() || "";
  const linkValue = document.getElementById("addingLink")?.value.trim() || "";

  return {
    author: authorValue,
    title: titleValue,
    description: descriptionValue,
    link: linkValue,
  };
}

function isAddingFormValid(formData) {
  return (
    Boolean(formData.author) &&
    Boolean(formData.title) &&
    Boolean(formData.description) &&
    isValidWorkUrl(formData.link)
  );
}

// Контрольная сумма: склеиваем 4 значения в строку и считаем детерминированный хэш.
function getWorkPayloadChecksum(payloadString) {
  let normalized = payloadString;

  if (normalized.length % 2 === 1) {
    normalized += "m";
  }

  let sum = 0n;
  const overflowGuard = 1000000000000000000n;

  for (let index = 0; index < normalized.length; index += 2) {
    const leftCode = BigInt(normalized.charCodeAt(index));
    const rightCode = BigInt(normalized.charCodeAt(index + 1));
    const mul = leftCode * rightCode;
    const div = rightCode === 0n ? 0n : leftCode / rightCode;
    sum = (sum + mul + div) % overflowGuard;
  }

  while (sum !== 0n && sum % 10n === 0n) {
    sum /= 10n;
  }

  const checksum = sum % 100000000n;
  return checksum.toString().padStart(8, "0");
}

function createWorkDuplicateSignatures(formData) {
  return {
    at: `AT-${getWorkPayloadChecksum(`${String(formData.author)}${String(formData.title)}`)}`,
    al: `AL-${getWorkPayloadChecksum(`${String(formData.author)}${String(formData.link)}`)}`,
    tl: `TL-${getWorkPayloadChecksum(`${String(formData.title)}${String(formData.link)}`)}`,
    l: `L-${getWorkPayloadChecksum(String(formData.link))}`,
  };
}

const WORK_DUPLICATE_SIGNATURES_STORAGE_KEY = "workDuplicateSignatures";
// const LEGACY_WORK_CHECKSUMS_STORAGE_KEY = "workChecksums";

function getStoredWorkDuplicateSignatures() {
  try {
    const storedValue = localStorage.getItem(WORK_DUPLICATE_SIGNATURES_STORAGE_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function setStoredWorkDuplicateSignatures(nextSignatures) {
  localStorage.setItem(WORK_DUPLICATE_SIGNATURES_STORAGE_KEY, JSON.stringify(nextSignatures));
  window.workDuplicateSignatures = nextSignatures;
}

// // ВРЕМЕННО: очистка старой базы дубликатов.
// // Удалить после первого запуска с новой схемой хранения.
// function clearLegacyWorkChecksumsStoreOnce() {
//   const oldStoreValue = localStorage.getItem(LEGACY_WORK_CHECKSUMS_STORAGE_KEY);
//   if (oldStoreValue !== null) {
//     localStorage.removeItem(LEGACY_WORK_CHECKSUMS_STORAGE_KEY);
//     console.log("Legacy-база workChecksums очищена.");
//   }
// }

function initWorkDuplicateSignaturesStore() {
  window.workDuplicateSignatures = getStoredWorkDuplicateSignatures();
}

function findDuplicateSignatureMatch(existingSignatures, newSignatures) {
  // Приоритет совпадений: сначала ссылка, затем комбинированные сигнатуры.
  const signatureOrder = ["l", "al", "tl", "at"];

  for (const signatureType of signatureOrder) {
    const hasDuplicate = existingSignatures.some((existingSignature) => existingSignature?.[signatureType] === newSignatures[signatureType]);
    if (hasDuplicate) {
      return newSignatures[signatureType];
    }
  }

  return null;
}

function syncSubmitWorkButtonState() {
  const submitWorkButton = document.getElementById("submitWorkButton");
  if (!submitWorkButton) return;

  const formData = collectAddingFormValues();
  const isValid = isAddingFormValid(formData);

  submitWorkButton.classList.toggle("is-active", isValid);
  submitWorkButton.disabled = !isValid;
}

function initAddingFormValidation() {
  const trackedFieldIds = ["addingAuthor", "addingTitle", "addingDescription", "addingLink"];
  const trackedFields = trackedFieldIds
    .map((fieldId) => document.getElementById(fieldId))
    .filter(Boolean);

  if (!trackedFields.length) return;

  trackedFields.forEach((field) => {
    ["input", "change", "blur"].forEach((eventName) => {
      field.addEventListener(eventName, syncSubmitWorkButtonState);
    });
  });

  syncSubmitWorkButtonState();
}

// Очистка формы: сбрасываем все поля и пересчитываем UI-состояния.
function clearAddingForm() {
  const authorInput = document.getElementById("addingAuthor");
  const titleInput = document.getElementById("addingTitle");
  const descriptionInput = document.getElementById("addingDescription");
  const linkInput = document.getElementById("addingLink");

  [authorInput, titleInput, descriptionInput, linkInput].forEach((field) => {
    if (field) field.value = "";
  });

  syncAddingLinkIconState();
  syncAddingDescriptionHeight();
  syncSubmitWorkButtonState();
}

// Действия формы: обработчики кнопок "Сбросить" и "Предложить работу".
function initAddingFormActions() {
  const cleanFormButton = document.getElementById("cleanFormButton");
  const submitWorkButton = document.getElementById("submitWorkButton");

  if (cleanFormButton) {
    cleanFormButton.addEventListener("click", clearAddingForm);
  }

  if (submitWorkButton) {
    submitWorkButton.addEventListener("click", () => {
      const formData = collectAddingFormValues();
      const isValid = isAddingFormValid(formData);

      if (isValid) {
        const signatures = createWorkDuplicateSignatures(formData);
        const existingSignatures = Array.isArray(window.workDuplicateSignatures)
          ? window.workDuplicateSignatures
          : getStoredWorkDuplicateSignatures();
        const duplicateBy = findDuplicateSignatureMatch(existingSignatures, signatures);

        if (duplicateBy) {
          console.log(`Эта работа уже предложена. Совпадение: ${duplicateBy}`);
          return;
        }

        const nextSignatures = [...existingSignatures, signatures];
        setStoredWorkDuplicateSignatures(nextSignatures);

        const successMessageHtml = "Произведение отправлено на&nbsp;проверку. Если модерация будет пройдена, работа появится в&nbsp;Галерее: следи в&nbsp;соц.&nbsp;сетях!";

        showAlert(successMessageHtml);
        console.log("Работа отправлена (заглушка):", { ...formData, signatures });
      }
    });
  }
}

initAddingLinkIcon();
initAddingDescriptionAutosize();
initAddingFormValidation();
initWorkDuplicateSignaturesStore();
initAddingFormActions();