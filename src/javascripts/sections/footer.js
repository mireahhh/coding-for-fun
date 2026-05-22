const footerSubscribeBar = document.getElementById("footerSubscribeBar");
const footerSubscribeButton = document.getElementById("footerSubscribeButton");
const footerEmailAction = document.querySelector(".M_FooterEmailAction");

let isFooterEmailFilled = false;

function submitFooterEmail() {
  console.log(footerSubscribeBar.value);
  footerSubscribeBar.value = "";
  updateFooterEmailFilledFlag();
}

function updateFooterEmailFilledFlag() {
  isFooterEmailFilled = Boolean(footerSubscribeBar.value.trim());

  if (isFooterEmailFilled) {
    footerEmailAction.classList.add("is-filled");
    return;
  }

  footerEmailAction.classList.remove("is-filled");
}

footerSubscribeButton.addEventListener("click", () => {
  submitFooterEmail();
});

footerSubscribeBar.addEventListener("input", () => {
  updateFooterEmailFilledFlag();
});

footerSubscribeBar.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  event.preventDefault();
  submitFooterEmail();
});

updateFooterEmailFilledFlag();