const headerHandbookNavigation = document.querySelector(
  ".O_HeaderHandbookNavigation",
);
const headerMenuNavigation = document.querySelector(".O_HeaderMenuNavigation");
const headerBurgerButtom = document.querySelector(".А_HeaderBurgerButtom");
const headerCrossButtom = document.querySelector(".А_HeaderCrossButtom");
const headerSearchBar = document.querySelector(".M_HeaderSearchBar");
const header = document.querySelector(".S_Header");

function syncHeaderMenuBounds() {
  if (
    !headerMenuNavigation ||
    !headerBurgerButtom ||
    !headerSearchBar ||
    !header
  )
    return;

  const headerHandbookNavigationRect =
    headerHandbookNavigation.getBoundingClientRect();
  const headerRect = headerHandbookNavigation.getBoundingClientRect();

  headerMenuNavigation.style.left = headerHandbookNavigationRect.x + "px";
  headerMenuNavigation.style.top = headerRect.bottom + "px";
  headerMenuNavigation.style.width = headerHandbookNavigationRect.width + "px";
}

// Получаем высоту хедера
const headerHeight = header.offsetHeight;

// Применяем отступ к контенту
const mainContent = document.querySelector(".S_Main");
mainContent.style.paddingTop = headerHeight + "px";

// Обновляем при изменении размера окна
window.addEventListener("resize", () => {
  const newHeaderHeight = header.offsetHeight;
  mainContent.style.paddingTop = newHeaderHeight + "px";

  if (isMenuOpen) {
    syncHeaderMenuBounds();
  }
});

let isMenuOpen = false;

// Получаем высоту меню
const getMenuHeight = () => {
  return headerMenuNavigation.offsetHeight;
};

headerBurgerButtom.addEventListener("click", () => {
  isMenuOpen = true;
  headerBurgerButtom.style.display = "none";
  headerCrossButtom.style.display = "flex";
  headerMenuNavigation.style.display = "flex";
  syncHeaderMenuBounds();
  const windowHeight = window.innerHeight;
  mainContent.style.paddingTop = windowHeight + "px";
});

headerCrossButtom.addEventListener("click", () => {
  isMenuOpen = false;
  headerCrossButtom.style.display = "none";
  headerBurgerButtom.style.display = "flex";
  headerMenuNavigation.style.display = "none";
  mainContent.style.paddingTop = header.offsetHeight + "px";
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
