// Работы - данные
import { galleryImages, galleryVideos, months, filtersName } from "../json/otherJson.js";
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
