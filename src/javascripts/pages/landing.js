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

const landingLinkCarousels = [
    [history0, history1, history2],
    [book0, book1, book2],
];

function initLandingLinkCarousel(card, images) {
    const wrapper = card.querySelector(".A_LandingLinkImageWrapper");
    const currentImg = wrapper?.querySelector(".A_LandingLinkImage--current");
    const nextImg = wrapper?.querySelector(".A_LandingLinkImage--next");
    const dotsContainer = card.querySelector(".C_LandingLinkDots");

    if (!wrapper || !currentImg || !nextImg || !images || images.length < 2) return;

    const slideDuration = 800;
    const autoplayDelay = 3000;
    const swipeDistance = 40;

    let currentIndex = 0;
    let timerId = null;
    let isAnimating = false;
    let pointerStartX = 0;
    let pointerStartY = 0;

    currentImg.src = images[currentIndex];
    nextImg.src = images[(currentIndex + 1) % images.length];

    const dots = images.map((_, index) => {
        const dot = document.createElement("button");
        dot.className = "A_LandingLinkDot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Показать слайд ${index + 1}`);
        dotsContainer?.appendChild(dot);
        return dot;
    });

    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle("is-active", index === currentIndex);
            dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
        });
    };

    const resetNextImage = (targetIndex) => {
        nextImg.classList.remove("is-from-left");
        nextImg.style.transition = "none";
        nextImg.style.transform = "translateX(100%)";
        nextImg.src = images[targetIndex];
        void nextImg.offsetWidth;
        nextImg.style.transition = "";
        nextImg.style.transform = "";
    };

    const showSlide = (targetIndex, { fromLeft = false } = {}) => {
        if (isAnimating || targetIndex === currentIndex) return;

        isAnimating = true;
        nextImg.src = images[targetIndex];
        nextImg.classList.toggle("is-from-left", fromLeft);
        wrapper.classList.add("is-sliding");

        window.setTimeout(() => {
            currentIndex = targetIndex;
            currentImg.src = images[currentIndex];
            wrapper.classList.remove("is-sliding");
            resetNextImage((currentIndex + 1) % images.length);
            updateDots();
            isAnimating = false;
        }, slideDuration);
    };

    const nextSlide = () => {
        showSlide((currentIndex + 1) % images.length);
    };

    const previousSlide = () => {
        showSlide((currentIndex - 1 + images.length) % images.length, { fromLeft: true });
    };

    const startAutoplay = () => {
        window.clearInterval(timerId);
        timerId = window.setInterval(nextSlide, autoplayDelay);
    };

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            const fromLeft = index < currentIndex;
            showSlide(index, { fromLeft });
            startAutoplay();
        });
    });

    wrapper.addEventListener("pointerdown", (event) => {
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
    });

    wrapper.addEventListener("pointerup", (event) => {
        const deltaX = event.clientX - pointerStartX;
        const deltaY = event.clientY - pointerStartY;

        if (Math.abs(deltaX) < swipeDistance || Math.abs(deltaX) < Math.abs(deltaY)) return;

        if (deltaX < 0) {
            nextSlide();
        } else {
            previousSlide();
        }

        startAutoplay();
    });

    wrapper.addEventListener("dragstart", (event) => event.preventDefault());

    updateDots();
    startAutoplay();
}

function initLandingLinkCarousels() {
    document.querySelectorAll(".O_LandingLink").forEach((card, index) => {
        initLandingLinkCarousel(card, landingLinkCarousels[index]);
    });
}

initLandingLinkCarousels();
initLandingTagsMarquee();