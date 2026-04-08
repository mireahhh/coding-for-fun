// Массивы с фонами
// Изображения
import img2 from "../../images/gallery/2.png";
import img3 from "../../images/gallery/3.png";
import img4 from "../../images/gallery/4.png";
import img6 from "../../images/gallery/6.png";
import img7 from "../../images/gallery/7.png";
import img8 from "../../images/gallery/8.png";
import img11 from "../../images/gallery/11.png";
import img12 from "../../images/gallery/12.png";
import img15 from "../../images/gallery/15.png";
import img16 from "../../images/gallery/16.png";
import img17 from "../../images/gallery/17.png";
import img19 from "../../images/gallery/19.png";
import img20 from "../../images/gallery/20.png";
import img24 from "../../images/gallery/24.png";
import img26 from "../../images/gallery/26.png";
import img28 from "../../images/gallery/28.png";
import img29 from "../../images/gallery/29.png";
import img31 from "../../images/gallery/31.png";
import img32 from "../../images/gallery/32.png";
const galleryImages = {
  2: img2,
  3: img3,
  4: img4,
  6: img6,
  7: img7,
  8: img8,
  11: img11,
  12: img12,
  15: img15,
  16: img16,
  17: img17,
  19: img19,
  20: img20,
  24: img24,
  26: img26,
  28: img28,
  29: img29,
  31: img31,
  32: img32,
};
// Видео
import vid0 from "../../images/gallery/0.mp4";
import vid1 from "../../images/gallery/1.mp4";
import vid5 from "../../images/gallery/5.mp4";
import vid9 from "../../images/gallery/9.mp4";
import vid10 from "../../images/gallery/10.mp4";
import vid13 from "../../images/gallery/13.mp4";
import vid14 from "../../images/gallery/14.mp4";
import vid18 from "../../images/gallery/18.mp4";
import vid21 from "../../images/gallery/21.mp4";
import vid22 from "../../images/gallery/22.mp4";
import vid23 from "../../images/gallery/23.mp4";
import vid25 from "../../images/gallery/25.mp4";
import vid27 from "../../images/gallery/27.mp4";
import vid30 from "../../images/gallery/30.mp4";
const galleryVideos = {
  0: vid0,
  1: vid1,
  5: vid5,
  9: vid9,
  10: vid10,
  13: vid13,
  14: vid14,
  18: vid18,
  21: vid21,
  22: vid22,
  23: vid23,
  25: vid25,
  27: vid27,
  30: vid30,
};
// Работы - данные
import { months, filtersName } from "../json/otherJson.js";
import { works } from "../json/galleryJson.js";

function getCurrentWork() {
  let indexWork = sessionStorage.getItem("indexWork");

  if (!indexWork) {
    indexWork = 0;
  }

  return works[indexWork];
}

function formatWorkDate(dateJs) {
  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6), 10);
  const day = dateJs.slice(6, 8);

  return day + " " + months[month - 1] + " " + year;
}

function drawWorkTextData(drawWork) {
  const path = document.querySelector(".M_WorkPath");
  path.innerHTML = "Галерея / " + drawWork.title;

  const date = document.querySelector(".A_WorkDate");
  date.innerHTML = "Обновлено " + formatWorkDate(drawWork.date.at(-1));

  const author = document.querySelector(".A_WorkMetaAuthor");
  author.innerHTML = drawWork.author;

  const title = document.querySelector(".A_WorkMetaTitle");
  title.innerHTML = drawWork.title;

  const description = document.querySelector(".A_WorkMetaDescription");
  description.innerHTML = drawWork.description;

  const link = document.querySelector(".A_WorkLink");
  link.href = drawWork.link;
}

function drawWorkPreview(drawWork) {
  const image = document.querySelector(".A_WorkPreviewImg");
  const video = document.querySelector(".A_WorkPreviewVideo");

  if (drawWork.extension === "png") {
    image.src = galleryImages[drawWork.id];
    image.style.display = "flex";

    video.style.display = "none";
    video.pause();
    video.removeAttribute("src");
  } else if (drawWork.extension === "mp4") {
    video.src = galleryVideos[drawWork.id];
    video.load();
    video.style.display = "flex";

    image.style.display = "none";
    image.removeAttribute("src");
  } else {
    image.style.display = "none";
    video.style.display = "none";
  }
}

function drawWorkTags(drawWork) {
  const primaryContainer = document.querySelector(".C_WorkMetaTagsPrimary");
  const secondaryContainer = document.querySelector(".C_WorkMetaTagsSecondary");

  if (!primaryContainer || !secondaryContainer) return;

  // Очищаем контейнеры
  primaryContainer.innerHTML = "";
  secondaryContainer.innerHTML = "";

  // Основные теги
  const libraryKeys = Array.isArray(drawWork.library)
    ? drawWork.library
    : [drawWork.library];

  const primaryKeys = [
    drawWork.complexity,
    ...libraryKeys,
    drawWork.verification,
  ].filter(Boolean);

  const primaryValues = primaryKeys.map((key) => filtersName[key] ?? key);

  primaryValues.forEach((value) => {
    const li = document.createElement("li");
    li.className = "A_WorkMetaTagPrimary";
    li.textContent = value;
    primaryContainer.appendChild(li);
  });

  // Второстепенные теги
  const secondaryTags = drawWork.tags || [];

  secondaryTags.forEach((value) => {
    const li = document.createElement("li");
    li.className = "A_WorkMetaTagSecondary";
    li.textContent = value;
    secondaryContainer.appendChild(li);
  });
}

function showWork() {
  const drawWork = getCurrentWork();

  drawWorkTextData(drawWork);
  drawWorkPreview(drawWork);
  drawWorkTags(drawWork);
}

showWork()
