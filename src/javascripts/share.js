const shareHandbookButton = document.getElementById("shareHandbookButton");

if (shareHandbookButton) {
  shareHandbookButton.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: "Coding for Fun!",
        text: "Web-учебник креативного кода\n",
        url: "https://mireahhh.github.io/coding-for-fun/index.html",
      });
      console.log("Поделились успешно");
    } catch (error) {
      console.log("Ошибка при попытке поделиться:", error);
    }
  });
}
