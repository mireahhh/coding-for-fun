import img0 from "../images/gallery/0.png";
import img2 from "../images/gallery/2.png";
import img3 from "../images/gallery/3.png";
import img5 from "../images/gallery/5.png";
const galleryImages = {
  0: img0,
  2: img2,
  3: img3,
  5: img5,
};

import vid1 from "../images/gallery/1.mp4";
import vid4 from "../images/gallery/4.mp4";
const galleryVideos = {
  1: vid1,
  4: vid4,
};

// Получить переменную
const indexWork = sessionStorage.getItem("indexWork");

// Работы
import { works } from "./galleryJson.js";
// Данные
const heading = document.querySelector(".heading");
heading.innerHTML = "Работа [" + indexWork + "]";
const author = document.querySelector(".author");
author.innerHTML = works[indexWork].author;
const date = document.querySelector(".date");
date.innerHTML = works[indexWork].date;
const title = document.querySelector(".title");
title.innerHTML = works[indexWork].title;
const description = document.querySelector(".description");
description.innerHTML = works[indexWork].description;
const tags = document.querySelector(".tags");
tags.innerHTML = works[indexWork].tags;
const link = document.querySelector(".link");
link.innerHTML = works[indexWork].link;
const codePreview = document.querySelector(".codePreview");
codePreview.innerHTML = works[indexWork].codePreview;

if (works[indexWork].extension == "png") {
  const image = document.querySelector(".image");
  image.src = galleryImages[indexWork];
  image.style.display = "flex";
}
if (works[indexWork].extension == "mp4") {
  const video = document.querySelector(".video");
  video.querySelector("source").src = galleryVideos[indexWork];
  video.style.display = "flex";
}

// // Удалить
// sessionStorage.removeItem("indexWork");
