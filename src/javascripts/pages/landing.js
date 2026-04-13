import { tags } from "../json/otherJson.js";

function createTagItem(tag) {
    const li = document.createElement("li");
    li.className = "A_LandingCoverRunningTag";
    li.textContent = tag;
    return li;
}

function createGroup(tagsArray) {
    const group = document.createElement("div");
    group.className = "C_LandingCoverRunningTagsGroup";

    tagsArray.forEach((tag) => {
        group.appendChild(createTagItem(tag));
    });

    return group;
}

function buildLandingTagsMarquee() {
    const list = document.querySelector(".C_LandingCoverRunningTags");
    if (!list) return;

    list.innerHTML = "";

    const track = document.createElement("div");
    track.className = "C_LandingCoverRunningTagsTrack";

    const baseGroup = createGroup(tags);
    list.appendChild(baseGroup);

    const containerWidth = list.clientWidth;
    const baseWidth = baseGroup.scrollWidth;

    baseGroup.remove();

    if (!baseWidth || !containerWidth) return;

    let repeatedTags = [...tags];
    let currentWidth = baseWidth;

    while (currentWidth < containerWidth * 1.5) {
        repeatedTags = repeatedTags.concat(tags);
        currentWidth += baseWidth;
    }

    const firstGroup = createGroup(repeatedTags);
    const secondGroup = createGroup(repeatedTags);

    track.appendChild(firstGroup);
    track.appendChild(secondGroup);
    list.appendChild(track);

    const shiftWidth = firstGroup.scrollWidth;
    list.style.setProperty("--landing-tags-shift", `${shiftWidth}px`);

    const pxPerSecond = 80;
    const duration = shiftWidth / pxPerSecond;
    list.style.setProperty("--landing-tags-duration", `${duration}s`);
}

let landingTagsResizeTimeout = null;

function initLandingTagsMarquee() {
    buildLandingTagsMarquee();

    window.addEventListener("resize", () => {
        clearTimeout(landingTagsResizeTimeout);
        landingTagsResizeTimeout = setTimeout(() => {
            buildLandingTagsMarquee();
        }, 100);
    });
}

import history0 from "../../images/pages/landing/history0.png";
import history1 from "../../images/pages/landing/history1.png";
import history2 from "../../images/pages/landing/history2.png";

import book0 from "../../images/pages/landing/book0.png";
import book1 from "../../images/pages/landing/book1.png";
import book2 from "../../images/pages/landing/book2.png";

const data = [
    [history0, history1, history2],
    [book0, book1, book2],
];

document.querySelectorAll(".O_LandingLink").forEach((card, i) => {
    return;
  const wrapper = card.querySelector(".A_LandingLinkImageWrapper");
  if (!wrapper) return;

  const currentImg = wrapper.querySelector(".A_LandingLinkImage--current");
  const nextImg = wrapper.querySelector(".A_LandingLinkImage--next");

  const images = data[i];
  if (!images || images.length < 2) return;

  let index = 0;

  const DURATION = 800; // ← должно совпадать с CSS

  currentImg.src = images[index];
  nextImg.src = images[(index + 1) % images.length];

  const slide = () => {
    // старт анимации
    wrapper.classList.add("is-sliding");

    setTimeout(() => {
      // 1. обновляем индекс
      index = (index + 1) % images.length;

      // 2. current получает новую картинку
      currentImg.src = images[index];

      // 3. next мгновенно уводим вправо
      nextImg.style.transition = "none";
      nextImg.style.transform = "translateX(100%)";

      // форсим перерисовку
      void nextImg.offsetWidth;

      // 4. возвращаем transition
      nextImg.style.transition = "";

      // 5. задаём следующую картинку
      nextImg.src = images[(index + 1) % images.length];

      // 6. убираем класс
      wrapper.classList.remove("is-sliding");

    }, DURATION);
  };

  setInterval(slide, 3000);
});

initLandingTagsMarquee();
