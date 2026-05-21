const footerSubscribeBar = document.getElementById("footerSubscribeBar");
const footerSubscribeButton = document.getElementById("footerSubscribeButton");
const footerEmailAction = document.querySelector(".M_FooterEmailAction");

const updateFooterSubscribeButtonState = () => {
  footerEmailAction.classList.toggle("is-filled", Boolean(footerSubscribeBar.value));
};

footerSubscribeButton.addEventListener("click", () => {
  footerSubscribeBar.value = "";
  updateFooterSubscribeButtonState();
});

footerSubscribeBar.addEventListener("input", updateFooterSubscribeButtonState);

updateFooterSubscribeButtonState();
