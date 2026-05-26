import alertCrossIconSrc from "../../images/icons/alert-cross.svg";

const ALERT_LIFETIME_MS = 500000;

const alertQueue = [];
let alertRoot = null;

function ensureAlertRoot() {
  if (alertRoot) return alertRoot;

  const root = document.createElement("div");
  root.className = "C_Alerts";
  document.body.append(root);
  alertRoot = root;

  return alertRoot;
}

function updateAlertOffsets() {
  alertQueue.forEach((entry, index) => {
    entry.element.style.setProperty("--alert-index", String(index));
  });
}

function startAlertTimer(entry) {
  clearTimeout(entry.timerId);

  entry.timerId = window.setTimeout(() => {
    dismissAlert(entry, { instant: false });
  }, ALERT_LIFETIME_MS);
}

function pauseAlertTimer(entry) {
  clearTimeout(entry.timerId);
  entry.timerId = null;
}

function removeAlertEntry(entry) {
  const index = alertQueue.indexOf(entry);
  if (index >= 0) {
    alertQueue.splice(index, 1);
    updateAlertOffsets();
  }

  if (entry.element.parentNode) {
    entry.element.parentNode.removeChild(entry.element);
  }
}

function dismissAlert(entry, { instant }) {
  pauseAlertTimer(entry);

  if (entry.isClosing) return;
  entry.isClosing = true;

  if (instant) {
    removeAlertEntry(entry);
    return;
  }

  entry.element.classList.add("is-hiding");
  window.setTimeout(() => {
    removeAlertEntry(entry);
  }, 220);
}

function createAlertElement(messageHtml) {
  const element = document.createElement("article");
  element.className = "O_Alert";

  element.innerHTML = `
    <p class="U_FontB1 A_AlertDescription">${messageHtml}</p>
    <button class="U_ButtonIcon A_AlertCloseIcon" type="button" aria-label="Закрыть уведомление">
      <img class="U_ImgIconFullH" src="${alertCrossIconSrc}" alt="">
    </button>
  `;

  return element;
}

export function showAlert(messageHtml) {
  if (!messageHtml) return;

  const root = ensureAlertRoot();
  const element = createAlertElement(messageHtml);

  const entry = {
    element,
    timerId: null,
    isClosing: false,
  };

  element.addEventListener("mouseenter", () => {
    pauseAlertTimer(entry);
  });

  element.addEventListener("mouseleave", () => {
    startAlertTimer(entry);
  });

  element.querySelector(".A_AlertCloseIcon")?.addEventListener("click", () => {
    dismissAlert(entry, { instant: true });
  });

  root.append(element);
  alertQueue.push(entry);
  updateAlertOffsets();

  requestAnimationFrame(() => {
    element.classList.add("is-visible");
  });

  startAlertTimer(entry);
}

window.showAlert = showAlert;