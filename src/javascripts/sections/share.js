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

if (shareHandbookButton) {
  shareHandbookButton.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: "Coding for Fun!\nКодить – прикольно!",
        text: "Web-учебник креативного кода\n",
        url: getShareUrl(),
      });
      console.log("Поделились успешно");
    } catch (error) {
      console.log("Ошибка при попытке поделиться:", error);
    }
  });
}

" — – − - ";
