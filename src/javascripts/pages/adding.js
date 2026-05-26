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
  const minHeight = lineHeight * 3 + paddingY + borderY;
  const maxHeight = lineHeight * 5 + paddingY + borderY;

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
      const authorValue = document.getElementById("addingAuthor")?.value.trim() || "";
      const titleValue = document.getElementById("addingTitle")?.value.trim() || "";
      const descriptionValue = document.getElementById("addingDescription")?.value.trim() || "";
      const linkValue = document.getElementById("addingLink")?.value.trim() || "";

      const formData = {
        author: authorValue,
        title: titleValue,
        description: descriptionValue,
        link: linkValue,
      };

      if (!authorValue) {
        console.log("Поле «Никнейм автора» пустое.");
      }

      if (!titleValue) {
        console.log("Поле «Название работы» пустое.");
      }

      if (!descriptionValue) {
        console.log("Поле «Особенности работы» пустое.");
      }

      if (!linkValue) {
        console.log("Поле «Источник с кодом» пустое.");
        return;
      }

      if (isValidWorkUrl(linkValue)) {
        console.log("Работа отправлена (заглушка):", formData);
      } else {
        console.log("Некорректная ссылка. Проверьте поле «Источник с кодом».");
      }
    });
  }
}

initAddingLinkIcon();
initAddingDescriptionAutosize();
initAddingFormActions();