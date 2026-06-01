import { initCodePreviewBlocks } from "../code/code.js";
import { previewCodeById } from "../code/tutorialsCodeDefaults.js";
import { tags, galleryAllImages } from "../json/otherJson.js";

const landingCoverCarouselSettings = {
    baseSpeed: 0.000055,
    hoverTransitionDuration: 900,
    poolSize: 9,
    minScale: 0.52,
    maxScale: 1.05,
    horizontalPaddingRatio: 0.18,
};

function shuffleLandingCoverImages(images) {
    const shuffledImages = [...images];

    for (let index = shuffledImages.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledImages[index], shuffledImages[randomIndex]] = [shuffledImages[randomIndex], shuffledImages[index]];
    }

    return shuffledImages;
}

function setLandingCoverCardImage(card, { id, src }) {
    const image = card.querySelector(".A_LandingCoverIllustrationImage");

    card.href = `./pages/work.html?indexWork=${id}`;
    card.dataset.indexWork = id;
    card.setAttribute("aria-label", `Открыть работу ${Number(id) + 1}`);

    if (image) {
        image.src = src;
    }
}

function createLandingCoverCard(imageData) {
    const card = document.createElement("a");
    card.className = "A_LandingCoverIllustrationCard";

    card.addEventListener("click", () => {
        sessionStorage.setItem("indexWork", card.dataset.indexWork);
    });

    const image = document.createElement("img");
    image.className = "A_LandingCoverIllustrationImage";
    image.alt = "";
    image.loading = "eager";
    image.decoding = "async";

    card.appendChild(image);
    setLandingCoverCardImage(card, imageData);

    return card;
}

function calcLandingCoverCardMetrics(container, position) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const outsideOffset = width * landingCoverCarouselSettings.horizontalPaddingRatio;
    const x = -outsideOffset + position * (width + outsideOffset * 2);
    const centerProgress = Math.sin(Math.PI * position);
    const scale = landingCoverCarouselSettings.minScale
        + (landingCoverCarouselSettings.maxScale - landingCoverCarouselSettings.minScale) * centerProgress;
    const baseCardSize = Math.min(height * 0.98, width * 0.36);
    const edgeY = height + baseCardSize * 0.42;
    const centerY = height * 0.46;
    const y = edgeY - (edgeY - centerY) * centerProgress;

    return { x, y, scale, size: baseCardSize };
}

function updateLandingCoverCardPosition(container, card) {
    const metrics = calcLandingCoverCardMetrics(container, card.landingCoverProgress);

    card.style.setProperty("--x", `${metrics.x}px`);
    card.style.setProperty("--y", `${metrics.y}px`);
    card.style.setProperty("--path-scale", metrics.scale.toFixed(4));
    card.style.setProperty("--card-size", `${metrics.size}px`);
    card.style.zIndex = String(Math.round(metrics.scale * 1000));
    card.style.opacity = String(Math.min(1, Math.max(0.72, metrics.scale)));
}

function initLandingCoverIllustrationCarousel() {
    const container = document.querySelector(".W_LandingCoverIllustration");

    if (!container) return;

    const images = shuffleLandingCoverImages(
        Object.entries(galleryAllImages).map(([id, src]) => ({ id, src })),
    );

    if (!images.length) return;

    container.innerHTML = "";

    const poolSize = Math.min(images.length, landingCoverCarouselSettings.poolSize);
    let nextImageIndex = poolSize;

    const getNextImage = () => {
        const imageData = images[nextImageIndex % images.length];
        nextImageIndex += 1;
        return imageData;
    };

    const cards = images.slice(0, poolSize).map((imageData, index) => {
        const card = createLandingCoverCard(imageData);
        const progress = index / poolSize;

        card.landingCoverProgress = progress;
        updateLandingCoverCardPosition(container, card);
        container.appendChild(card);

        return card;
    });

    let previousTime = performance.now();
    let currentRate = 1;
    let targetRate = 1;

    const setTargetRate = (rate) => {
        targetRate = rate;
    };

    container.addEventListener("pointerenter", () => setTargetRate(0));
    container.addEventListener("pointerleave", () => setTargetRate(1));

    const render = (currentTime) => {
        const deltaTime = currentTime - previousTime;
        previousTime = currentTime;

        const rateEase = 1 - Math.exp(-deltaTime / landingCoverCarouselSettings.hoverTransitionDuration * 6);
        currentRate += (targetRate - currentRate) * rateEase;

        const progressShift = deltaTime * landingCoverCarouselSettings.baseSpeed * currentRate;

        cards.forEach((card) => {
            card.landingCoverProgress += progressShift;

            while (card.landingCoverProgress >= 1) {
                card.landingCoverProgress -= 1;
                setLandingCoverCardImage(card, getNextImage());
            }

            updateLandingCoverCardPosition(container, card);
        });

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}

function createTagItem(tag) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "U_Button U_FontB2 A_LandingCoverRunningTag";
    button.textContent = tag;
    return button;
}

function createGroup(tagsArray) {
    const group = document.createElement("div");
    group.className = "C_LandingCoverRunningTagsGroup";

    tagsArray.forEach((tag) => {
        group.appendChild(createTagItem(tag));
    });

    return group;
}

const landingTagsHoverTransitionDuration = 800;

function easeInOutCubic(progress) {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function setLandingTagsAnimationRate(animation, rate) {
    if (typeof animation.updatePlaybackRate === "function") {
        animation.updatePlaybackRate(rate);
        return;
    }

    animation.playbackRate = rate;
}

function animateLandingTagsPlaybackRate(track, targetRate) {
    const animation = track.getAnimations?.()[0];
    if (!animation) return;

    if (track.landingTagsHoverAnimationFrame) {
        cancelAnimationFrame(track.landingTagsHoverAnimationFrame);
    }

    const startRate = animation.playbackRate;
    const startTime = performance.now();

    if (targetRate > 0 && animation.playState === "paused") {
        animation.play();
    }

    const tick = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / landingTagsHoverTransitionDuration, 1);
        const easedProgress = easeInOutCubic(progress);
        const nextRate = startRate + (targetRate - startRate) * easedProgress;

        setLandingTagsAnimationRate(animation, nextRate);

        if (progress < 1) {
            track.landingTagsHoverAnimationFrame = requestAnimationFrame(tick);
            return;
        }

        setLandingTagsAnimationRate(animation, targetRate);
        track.landingTagsHoverAnimationFrame = null;
    };

    track.landingTagsHoverAnimationFrame = requestAnimationFrame(tick);
}

function initLandingTagsSmoothHover(track) {
    track.addEventListener("pointerenter", () => {
        animateLandingTagsPlaybackRate(track, 0);
    });

    track.addEventListener("pointerleave", () => {
        animateLandingTagsPlaybackRate(track, 1);
    });
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

    initLandingTagsSmoothHover(track);
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

function fillHeaderSearchFromLandingTag(tagText) {
    const headerSearchBar = document.getElementById("headerSearchBar");

    if (!headerSearchBar) return;

    headerSearchBar.value = tagText;
    headerSearchBar.focus();
    headerSearchBar.setSelectionRange(headerSearchBar.value.length, headerSearchBar.value.length);
    headerSearchBar.dispatchEvent(new Event("input", { bubbles: true }));
}

function initLandingTagSearchPrefill() {
    const tagsContainer = document.querySelector(".C_LandingCoverRunningTags");

    if (!tagsContainer) return;

    tagsContainer.addEventListener("click", (event) => {
        const tagButton = event.target.closest(".A_LandingCoverRunningTag");

        if (!tagButton || !tagsContainer.contains(tagButton)) return;

        fillHeaderSearchFromLandingTag(tagButton.textContent.trim());
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
    let dotsUpdateTimeoutId = null;
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
        currentImg.style.transition = "none";
        nextImg.style.transition = "none";
        currentImg.style.transform = "translate3d(0, 0, 0)";
        nextImg.style.transform = "translate3d(100%, 0, 0)";
        nextImg.src = images[targetIndex];
        void nextImg.offsetWidth;
        currentImg.style.transition = "";
        nextImg.style.transition = "";
        currentImg.style.transform = "";
        nextImg.style.transform = "";
    };

    const showSlide = (targetIndex, { fromLeft = false } = {}) => {
        if (isAnimating || targetIndex === currentIndex) return;

        isAnimating = true;
        nextImg.src = images[targetIndex];
        nextImg.classList.toggle("is-from-left", fromLeft);
        wrapper.classList.add("is-sliding");

        window.clearTimeout(dotsUpdateTimeoutId);
        dotsUpdateTimeoutId = window.setTimeout(() => {
            currentIndex = targetIndex;
            updateDots();
        }, slideDuration / 16);

        window.setTimeout(() => {
            window.clearTimeout(dotsUpdateTimeoutId);
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

initLandingCoverIllustrationCarousel();
initLandingLinkCarousels();
initLandingTagsMarquee();
initLandingTagSearchPrefill();
initCodePreviewBlocks({
    getDefaultCode: ({ codeBlockId }) => previewCodeById[codeBlockId] || "",
});