import { showAlert } from "./alerts.js";
import { getStoredArray, setStoredArray } from "../utils/storageCache.js";
import { createEmailSubscriptionSignature } from "../utils/signatures.js";

const footerSubscribeBar = document.getElementById("footerSubscribeBar");
const footerSubscribeButton = document.getElementById("footerSubscribeButton");
const footerEmailAction = document.querySelector(".M_FooterEmailAction");

const SUBSCRIBED_EMAILS_STORAGE_KEY = "footerSubscribedEmailSignatures";

let isFooterEmailFilled = false;

function isValidEmail(emailValue) {
  if (!emailValue) return false;

  const normalizedEmail = String(emailValue).trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(normalizedEmail);
}

function getFooterSubscribedEmails() {
  return getStoredArray(SUBSCRIBED_EMAILS_STORAGE_KEY);
}

function setFooterSubscribedEmails(nextSignatures) {
  setStoredArray(SUBSCRIBED_EMAILS_STORAGE_KEY, nextSignatures);
}

function submitFooterEmail() {
  const emailValue = footerSubscribeBar?.value.trim() || "";

  if (!isValidEmail(emailValue)) return;

  const subscribedEmails = getFooterSubscribedEmails();
  const emailSignature = createEmailSubscriptionSignature(emailValue);
  const alreadySubscribed = subscribedEmails.includes(emailSignature);

  if (alreadySubscribed) {
    showAlert(`Почта не добавлена в подписку, почта уже подписана: ${emailValue}`);
  } else {
    const nextEmails = [...subscribedEmails, emailSignature];
    setFooterSubscribedEmails(nextEmails);
    showAlert(`Почта добавлена в подписку: ${emailValue}`);
  }

  footerSubscribeBar.value = "";
  footerSubscribeBar.blur();
  updateFooterEmailFilledFlag();
}

function updateFooterEmailFilledFlag() {
  isFooterEmailFilled = isValidEmail(footerSubscribeBar?.value.trim() || "");

  if (isFooterEmailFilled) {
    footerEmailAction?.classList.add("is-filled");
    footerSubscribeButton?.removeAttribute("disabled");
    return;
  }

  footerEmailAction?.classList.remove("is-filled");
  footerSubscribeButton?.setAttribute("disabled", "disabled");
}

footerSubscribeButton?.addEventListener("click", () => {
  submitFooterEmail();
});

footerSubscribeBar?.addEventListener("input", () => {
  updateFooterEmailFilledFlag();
});

footerSubscribeBar?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  event.preventDefault();
  submitFooterEmail();
});


// span на ширину внизу
const widthValue = document.getElementById("width-value");
const footer = document.querySelector(".S_Footer");

function updateFooterWidth() {
  if (!widthValue || !footer) return;

  widthValue.textContent = footer.offsetWidth;
}

window.addEventListener("resize", updateFooterWidth);


updateFooterWidth();
updateFooterEmailFilledFlag();