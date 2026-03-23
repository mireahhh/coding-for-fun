// Получаем высоту хедера
const header = document.querySelector(".S_Header");
const headerHeight = header.offsetHeight;

// Применяем отступ к контенту
const mainContent = document.querySelector(".S_Main");
mainContent.style.paddingTop = headerHeight + "px";

// Обновляем при изменении размера окна
window.addEventListener("resize", function () {
  const newHeaderHeight = header.offsetHeight;
  mainContent.style.paddingTop = newHeaderHeight + "px";
});

let isMenuOpen = false;

const headerBurgerButtom = document.querySelector(".А_HeaderBurgerButtom");
headerBurgerButtom.addEventListener("click", () => {
  isMenuOpen = true;
  headerBurgerButtom.style.display = "none";
  headerCrossButtom.style.display = "flex";
});

const headerCrossButtom = document.querySelector(".А_HeaderCrossButtom");
headerCrossButtom.addEventListener("click", () => {
  isMenuOpen = false;
  headerCrossButtom.style.display = "none";
  headerBurgerButtom.style.display = "flex";
});

const input = document.getElementById("headerSearchBar");
const btn = document.querySelector(".Q_HeaderSearchIcon");

btn.addEventListener("click", () => {
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => {
  btn.style.opacity = input.value ? "1" : "0.5";
});
