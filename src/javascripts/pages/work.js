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
  // Данные
  // Путь
  const workTitlePath = document.querySelector(".M_WorkTitlePath");
  workTitlePath.innerHTML = "Галерея / " + works[indexWork].title;
  // Дата
  const date = (drawWork.date.at(-1));
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(4, 6));
  const day = date.slice(6, 8);
  const workTitleDate = document.querySelector(".A_WorkTitleDate");
  workTitleDate.innerHTML = "Обновлено" + day + months[month - 1] + year;

  const heading = document.querySelector(".heading");
  heading.innerHTML = "Работа [" + indexWork + "]";
  const author = document.querySelector(".author");
  author.innerHTML = works[indexWork].author;

  const title = document.querySelector(".title");
  title.innerHTML = works[indexWork].title;
  const description = document.querySelector(".description");
  description.innerHTML = works[indexWork].description;
  const tags = document.querySelector(".tags");
  tags.innerHTML = works[indexWork].tags;
  const link = document.querySelector(".link");
  link.innerHTML = works[indexWork].link;

  if (works[indexWork].extension == "png") {
    const image = document.querySelector(".image");
    image.src = galleryImages[indexWork];
    image.style.display = "flex";

    const video = document.querySelector(".video");
    video.style.display = "none";
  }
  if (works[indexWork].extension == "mp4") {
    const video = document.querySelector(".video");
    video.src = galleryVideos[indexWork];
    video.load();
    video.style.display = "flex";

    const image = document.querySelector(".image");
    image.style.display = "none";
  }
}

showWork()
