import { showAlert } from "./alerts.js";
import { getStoredArray, setStoredArray } from "../utils/storageCache.js";
import { createEmailSubscriptionSignature } from "../utils/signatures.js";

const footerSubscribeBar = document.getElementById("footerSubscribeBar");
const footerSubscribeForm = document.getElementById("footerSubscribeForm");
const footerSubscribeButton = document.getElementById("footerSubscribeButton");
const footerEmailAction = document.querySelector(".M_FooterEmailAction");

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgvzyjn";
const FOOTER_EMAIL_FORM_SUBJECT = "CFF - Подписка на почту";
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

function getFooterSubscribeSuccessMessage(emailValue) {
  return `Всё готово! Будем присылать на адрес новые статьи, работы и обновления. Почта: ${emailValue}`;
}

function getFooterSubscribeDuplicateMessage(emailValue) {
  return `Этот email уже использовался ранее.<br>Проверь входящие письма или введи другой адрес для подписки. Указанная почта: ${emailValue}`;
}

function getFooterSubscribeErrorMessage(emailValue) {
  return `Не получилось оформить подписку. Проверь своё подключение к Интернету и попробуй ещё раз. Указанная почта: ${emailValue}`;
}

function collectFooterEmailFormValues() {
  const emailValue = footerSubscribeBar?.value.trim() || "";

  return {
    _subject: FOOTER_EMAIL_FORM_SUBJECT,
    email: emailValue,
  };
}

async function submitFooterEmailToFormspree(formData) {
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

function setFooterSubscribeButtonSubmitting(isSubmitting) {
  if (!footerSubscribeButton) return;

  footerSubscribeButton.dataset.submitting = String(isSubmitting);

  const buttonText = footerSubscribeButton.querySelector("p");
  if (buttonText) {
    buttonText.textContent = isSubmitting ? "Отправляем..." : "Отправить";
  }

  updateFooterEmailFilledFlag();
}

async function submitFooterEmail() {
  const formData = collectFooterEmailFormValues();
  const emailValue = formData.email;

  if (!isValidEmail(emailValue) || footerSubscribeButton?.dataset.submitting === "true") return;

  const subscribedEmails = getFooterSubscribedEmails();
  const emailSignature = createEmailSubscriptionSignature(emailValue);
  const alreadySubscribed = subscribedEmails.includes(emailSignature);

  if (alreadySubscribed) {
    showAlert(getFooterSubscribeDuplicateMessage(emailValue));
  } else {
    try {
      setFooterSubscribeButtonSubmitting(true);
      await submitFooterEmailToFormspree(formData);

      const nextEmails = [...subscribedEmails, emailSignature];
      setFooterSubscribedEmails(nextEmails);
      showAlert(getFooterSubscribeSuccessMessage(emailValue));
    } catch (error) {
      console.error(error);
      showAlert(getFooterSubscribeErrorMessage(emailValue));
      return;
    } finally {
      setFooterSubscribeButtonSubmitting(false);
    }
  }

  footerSubscribeBar.value = "";
  footerSubscribeBar.blur();
  updateFooterEmailFilledFlag();
}

function updateFooterEmailFilledFlag() {
  isFooterEmailFilled = isValidEmail(footerSubscribeBar?.value.trim() || "");

  const isSubmitting = footerSubscribeButton?.dataset.submitting === "true";

  if (isFooterEmailFilled && !isSubmitting) {
    footerEmailAction?.classList.add("is-filled");
    footerSubscribeButton?.removeAttribute("disabled");
    return;
  }

  footerEmailAction?.classList.remove("is-filled");
  footerSubscribeButton?.setAttribute("disabled", "disabled");
}

if (footerSubscribeForm) {
  footerSubscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitFooterEmail();
  });
} else {
  footerSubscribeButton?.addEventListener("click", () => {
    submitFooterEmail();
  });
}

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