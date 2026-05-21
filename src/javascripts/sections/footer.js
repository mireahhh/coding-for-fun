const footerSubscribeBar = document.getElementById("footerSubscribeBar");
const footerSubscribeButton = document.getElementById("footerSubscribeButton");
const footerEmailAction = document.querySelector(".M_FooterEmailAction");

let isFooterEmailFilled = false;

function updateFooterEmailFilledFlag() {
  isFooterEmailFilled = Boolean(footerSubscribeBar.value.trim());

  if (isFooterEmailFilled) {
    footerEmailAction.classList.add("is-filled");
    return;
  }

  footerEmailAction.classList.remove("is-filled");
}

footerSubscribeButton.addEventListener("click", () => {
  footerSubscribeBar.value = "";
  updateFooterEmailFilledFlag();
});

footerSubscribeBar.addEventListener("input", () => {
  updateFooterEmailFilledFlag();
});

updateFooterEmailFilledFlag();