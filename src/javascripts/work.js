// Получить переменную
const indexWork = sessionStorage.getItem("indexWork");
console.log("indexWork", indexWork);

const heading = document.querySelector(".Heading");
heading.innerHTML = "Работа " + indexWork;

// // Удалить
// sessionStorage.removeItem("indexWork");
