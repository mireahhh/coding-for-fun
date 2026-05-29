import { works } from "../json/galleryJson.js";
import { showAlert } from "../sections/alerts.js";
import { getStoredArray, setStoredArray } from "../utils/storageCache.js";
import { getWorkPayloadChecksum } from "../utils/signatures.js";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgoqdjoq";
const ADDING_FORM_FIELD_STORAGE_KEYS = {
  addingAuthor: "addingFormAuthor",
  addingTitle: "addingFormTitle",
  addingDescription: "addingFormDescription",
  addingLink: "addingFormLink",
};
const ADDING_FORM_FIELD_IDS = Object.keys(ADDING_FORM_FIELD_STORAGE_KEYS);

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

function getAddingFormFields() {
  return ADDING_FORM_FIELD_IDS.map((fieldId) => document.getElementById(fieldId)).filter(Boolean);
}

function saveAddingFormFieldValue(field) {
  const storageKey = ADDING_FORM_FIELD_STORAGE_KEYS[field.id];
  if (!storageKey) return;

  if (field.value) {
    localStorage.setItem(storageKey, field.value);
  } else {
    localStorage.removeItem(storageKey);
  }
}

function clearStoredAddingFormValues() {
  Object.values(ADDING_FORM_FIELD_STORAGE_KEYS).forEach((storageKey) => {
    localStorage.removeItem(storageKey);
  });
}

function initStoredAddingFormValues() {
  getAddingFormFields().forEach((field) => {
    const savedValue = localStorage.getItem(ADDING_FORM_FIELD_STORAGE_KEYS[field.id]);

    if (savedValue !== null) {
      field.value = savedValue;
    }

    ["input", "change"].forEach((eventName) => {
      field.addEventListener(eventName, () => {
        saveAddingFormFieldValue(field);
      });
    });
  });

  syncAddingLinkIconState();
  syncAddingDescriptionHeight();
  syncSubmitWorkButtonState();
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
  return getStoredArray(WORK_DUPLICATE_SIGNATURES_STORAGE_KEY);
}

function setStoredWorkDuplicateSignatures(nextSignatures) {
  setStoredArray(WORK_DUPLICATE_SIGNATURES_STORAGE_KEY, nextSignatures);
  window.workDuplicateSignatures = nextSignatures;
}

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

function getGalleryWorkDuplicateSignatures() {
  if (!Array.isArray(works)) return [];

  return works.map((work) =>
    createWorkDuplicateSignatures({
      author: work?.author || "",
      title: work?.title || "",
      link: work?.link || "",
    }),
  );
}

function syncSubmitWorkButtonState() {
  const submitWorkButton = document.getElementById("submitWorkButton");
  if (!submitWorkButton) return;

  const formData = collectAddingFormValues();
  const isValid = isAddingFormValid(formData);
  const isSubmitting = submitWorkButton.dataset.submitting === "true";

  submitWorkButton.classList.toggle("is-active", isValid && !isSubmitting);
  submitWorkButton.disabled = !isValid || isSubmitting;
}

function setSubmitWorkButtonSubmitting(isSubmitting) {
  const submitWorkButton = document.getElementById("submitWorkButton");
  if (!submitWorkButton) return;

  submitWorkButton.dataset.submitting = String(isSubmitting);
  submitWorkButton.textContent = isSubmitting ? "Отправляем..." : "Предложить работу";
  syncSubmitWorkButtonState();
}

async function submitAddingFormToFormspree(formData) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Formspree submit failed with status ${response.status}`);
  }
}

function initAddingFormValidation() {
  const trackedFields = getAddingFormFields();

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
  clearStoredAddingFormValues();

  syncAddingLinkIconState();
  syncAddingDescriptionHeight();
  syncSubmitWorkButtonState();
}

// Действия формы: обработчики кнопок "Сбросить" и "Предложить работу".
function initAddingFormActions() {
  const addingForm = document.getElementById("addingForm");
  const cleanFormButton = document.getElementById("cleanFormButton");
  const submitWorkButton = document.getElementById("submitWorkButton");

  if (cleanFormButton) {
    cleanFormButton.addEventListener("click", clearAddingForm);
  }

  if (addingForm) {
    addingForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = collectAddingFormValues();
      const isValid = isAddingFormValid(formData);

      if (!isValid) return;

      const signatures = createWorkDuplicateSignatures(formData);
      const existingSignatures = Array.isArray(window.workDuplicateSignatures)
        ? window.workDuplicateSignatures
        : getStoredWorkDuplicateSignatures();

      const gallerySignatures = getGalleryWorkDuplicateSignatures();
      const duplicateInGalleryBy = findDuplicateSignatureMatch(gallerySignatures, signatures);

      if (duplicateInGalleryBy) {
        showAlert(`Эта работа не&nbsp;отправлена, так как она уже есть в&nbsp;Галерее. Если это ошибка, обратитесь к&nbsp;нам, указав: ${duplicateInGalleryBy}`);
        return;
      }

      const duplicateBy = findDuplicateSignatureMatch(existingSignatures, signatures);

      if (duplicateBy) {
        showAlert(`Эта работа не&nbsp;отправлена, так как она уже была&nbsp;предложена. Если это ошибка, обратитесь к&nbsp;нам, указав: ${duplicateBy}`);
        return;
      }

      try {
        setSubmitWorkButtonSubmitting(true);
        await submitAddingFormToFormspree(formData);

        const nextSignatures = [...existingSignatures, signatures];
        setStoredWorkDuplicateSignatures(nextSignatures);

        const successMessageHtml = "Произведение отправлено на&nbsp;проверку. Если модерация будет пройдена, работа появится в&nbsp;Галерее: следи в&nbsp;соц.&nbsp;сетях!";

        showAlert(successMessageHtml);
      } catch (error) {
        console.error(error);
        showAlert("Не&nbsp;удалось отправить работу. Проверь подключение к&nbsp;Интернету и&nbsp;попробуй заполнить форму работы ещё&nbsp;раз");
      } finally {
        setSubmitWorkButtonSubmitting(false);
      }
    });
  } else if (submitWorkButton) {
    submitWorkButton.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }
}

initAddingLinkIcon();
initAddingDescriptionAutosize();
initStoredAddingFormValues();
initAddingFormValidation();
initWorkDuplicateSignaturesStore();
initAddingFormActions();