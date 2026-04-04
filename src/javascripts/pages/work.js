// Массивы с фонами
// Изображения
import img0 from "../../images/gallery/0.png";
import img2 from "../../images/gallery/2.png";
import img3 from "../../images/gallery/3.png";
import img5 from "../../images/gallery/5.png";
const galleryImages = {
  0: img0,
  2: img2,
  3: img3,
  5: img5,
};
// Видео
import vid1 from "../../images/gallery/1.mp4";
import vid4 from "../../images/gallery/4.mp4";
const galleryVideos = {
  1: vid1,
  4: vid4,
};
// Работы - данные
import { months, works } from "./galleryJson.js";

function showWork() {
  // Получить переменную id работы
  const indexWork = sessionStorage.getItem("indexWork");
  const drawWork = works[indexWork];
  // Данные
  // Путь
  const path = document.querySelector(".M_WorkPath");
  path.innerHTML = "Галерея / " + drawWork.title;
  // Дата
  const dateJs = drawWork.date.at(-1);
  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6));
  const day = dateJs.slice(6, 8);
  const date = document.querySelector(".A_WorkDate");
  date.innerHTML = "Обновлено" + day + months[month - 1] + year;
  // Картинка
  if (drawWork.extension == "png") {
    const image = document.querySelector(".A_WorkPreviewImg");
    image.src = galleryImages[indexWork];
    image.style.display = "flex";

    const video = document.querySelector(".A_WorkPreviewVideo");
    video.style.display = "none";
  }
  if (drawWork.extension == "mp4") {
    const video = document.querySelector(".A_WorkPreviewVideo");
    video.src = galleryVideos[indexWork];
    video.load();
    video.style.display = "flex";

    const image = document.querySelector(".A_WorkPreviewImg");
    image.style.display = "none";
  }
  // Текстовые поля
  const author = document.querySelector(".A_WorkMetaAuthor");
  author.innerHTML = drawWork.author;
  const title = document.querySelector(".A_WorkMetaTitle");
  title.innerHTML = drawWork.title;
  const description = document.querySelector(".A_WorkMetaDescription");
  description.innerHTML = drawWork.description;
  const link = document.querySelector(".A_WorkLink");
  link.href = drawWork.link;
  // Теги
  // Главные
  const tagsPrimaryItems = document.querySelector(".C_WorkMetaTagsPrimary").children;
  Array.from(tagsPrimaryItems).forEach((item) => {
    item.style.display = "none";
  });
  const data = {
    complexity: drawWork.complexity,
    library: drawWork.library,
    verification: drawWork.verification,
  };
  const libraries = Array.isArray(data.library)
    ? data.library
    : [data.library];
  const values = [
    data.complexity,
    ...libraries,
    data.verification,
  ].slice(0, 3);

  values.forEach((value, i) => {
    if (tagsPrimaryItems[i]) {
      tagsPrimaryItems[i].textContent = value;
      tagsPrimaryItems[i].style.display = "flex";
    }
  });
  // Второстепенные
  const tagsSecondaryItems = document.querySelector(".C_WorkMetaTagsSecondary").children;
  Array.from(tagsSecondaryItems).forEach((item) => {
    item.style.display = "none";
  });
  const secondaryTags = drawWork.tags || [];
  const valuesSecondary = secondaryTags.slice(0, tagsSecondaryItems.length);
  valuesSecondary.forEach((value, i) => {
    if (tagsSecondaryItems[i]) {
      tagsSecondaryItems[i].textContent = value;
      tagsSecondaryItems[i].style.display = "flex";
    }
  });
}

showWork()
