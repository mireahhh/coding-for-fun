// Сдвинуть на хедер
// Не лендинг ли
const isLanding = document.querySelector(".S_Header--Landing");
// Получаем высоту хедера
const header = document.querySelector(".S_Header");
// Применяем отступ к контенту
const mainContent = document.querySelector(".S_Main");
const footerContent = document.querySelector(".S_Footer");
//Функция 
function applyHeaderOffset() {
  const headerHeight = header.offsetHeight;
  if (isLanding) {
    const landingIntro = document.querySelector(".O_LandingIntro");
    landingIntro.style.marginTop = headerHeight + "px";
    return;
  }
  mainContent.style.paddingTop = headerHeight + "px";
  //footerContent.style.paddingTop = headerHeight + "px";
}

// Обновляем при изменении размера окна
window.addEventListener("resize", function () {
  applyHeaderOffset();
});


let isHeaderMenuOpen = false;
const headerMenuButton = document.querySelector(".O_HeaderMenuNavigation");

const headerBurgerButton = document.querySelector(".A_HeaderBurgerButton");
headerBurgerButton.addEventListener("click", () => {
  isHeaderMenuOpen = true;
  headerBurgerButton.style.display = "none";
  headerCrossButton.style.display = "flex";
  headerMenuButton.style.display = "flex";
});

const headerCrossButton = document.querySelector(".A_HeaderCrossButton");
headerCrossButton.addEventListener("click", () => {
  isHeaderMenuOpen = false;
  headerCrossButton.style.display = "none";
  headerMenuButton.style.display = "none";
  headerBurgerButton.style.display = "flex";
});

const headerSearchBar = document.getElementById("headerSearchBar");
const headerSearchButton = document.querySelector(".Q_HeaderSearchIcon");

headerSearchButton.addEventListener("click", () => {
  headerSearchButton.style.opacity = "0.52";
  headerSearchBar.value = "";
  // headerSearchBar.focus();
});

headerSearchBar.addEventListener("input", () => {
  headerSearchButton.style.opacity = headerSearchBar.value ? "1" : "0.52";
});

// Тема
const themeButton = document.querySelector(".M_HeaderChangeThemeButton")
const root = document.documentElement

const savedTheme = localStorage.getItem("theme") || "light"

applyTheme(savedTheme)

themeButton.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light"
  const newTheme = currentTheme === "light" ? "dark" : "light"

  applyTheme(newTheme)

  console.log("Текущая тема:", newTheme)
})

function applyTheme(theme) {
  localStorage.setItem("theme", theme)

  root.dataset.theme = theme

  themeButton.classList.toggle("is-dark", theme === "dark")
}

applyHeaderOffset();