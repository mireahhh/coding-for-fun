const shareHandbookButton = document.getElementById("shareHandbookButton");
const SHARE_ORIGIN = "https://cff.adc.ac";

const getShareUrl = () => {
  const currentUrl = new URL(window.location.href);
  const shareUrl = new URL(currentUrl.pathname + currentUrl.search + currentUrl.hash, SHARE_ORIGIN);

  if (shareUrl.pathname.endsWith("/index.html")) {
    shareUrl.pathname = shareUrl.pathname.replace(/\/index\.html$/, "/");
  }

  return shareUrl.toString();
};

const runShareButtonAnimation = () => {
  shareHandbookButton.classList.remove("A_IntroShare--isSpinning");
  void shareHandbookButton.offsetWidth;
  shareHandbookButton.classList.add("A_IntroShare--isSpinning");
};

if (shareHandbookButton) {
  shareHandbookButton.addEventListener("animationend", () => {
    shareHandbookButton.classList.remove("A_IntroShare--isSpinning");
  });

  shareHandbookButton.addEventListener("click", async () => {
    runShareButtonAnimation();

    try {
      await navigator.share({
        title: "Кодить прикольно (Coding for Fun)\nВеб-учебник креативного кода",
        text: "Веб-учебник креативного кода\n",
        url: getShareUrl(),
      });
      console.log("Поделились успешно");
    } catch (error) {
      console.log("Ошибка при попытке поделиться:", error);
    }
  });
}