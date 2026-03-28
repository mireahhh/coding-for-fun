const footerSubscribeBar = document.getElementById("footerSubscribeBar");
const footerSubscribeButton = document.getElementById("footerSubscribeButton");

footerSubscribeButton.addEventListener("click", () => {
    footerSubscribeButton.style.opacity = "0.52";
  footerSubscribeBar.value = "";
});

footerSubscribeBar.addEventListener("input", () => {
  footerSubscribeButton.style.opacity = footerSubscribeBar.value ? "1" : "0.52";
});
