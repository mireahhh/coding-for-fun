let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    console.log("Меню открыто");
  } else {
    console.log("Меню закрыто");
  }
}

const burgerButton = document.querySelector(".А_HeaderBurgerMenu");

if (burgerButton) {
  burgerButton.addEventListener("click", toggleMenu);
}
