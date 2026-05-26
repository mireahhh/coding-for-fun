import "../sections/code.js";

const heading = document.querySelector(".A_IntroHeadingTutorial");

const part = Number(heading.dataset.part);
const module = Number(heading.dataset.module);
const tutorial = Number(heading.dataset.tutorial);


import { months, filtersName } from "../json/otherJson.js";
import { tagsHandbook, toArray, getPartModules, getModuleTutorials } from "../json/tutorialsJson.js";

function formatTutorialDate(dateJs) {
  if (!dateJs) return "";

  const year = dateJs.slice(0, 4);
  const month = parseInt(dateJs.slice(4, 6), 10);
  const day = dateJs.slice(6, 8);

  return `${day} ${months[month - 1]} ${year}`;
}

function drawTutorialMeta() {
  const partData = tagsHandbook?.[part - 1];
  const moduleData = getPartModules(partData)?.[module - 1];
  const tutorialData = getModuleTutorials(moduleData)?.[tutorial - 1];
  if (!tutorialData) return;

  // Название вкладки
  if (tutorialData.title) {
    document.title = tutorialData.title;
  }

  // Хлебная строка
  const headingAbout = document.querySelector(".A_IntroHeadingAbout");
  if (headingAbout) {
    const partTitle = partData?.title ?? `Часть ${part}`;
    const moduleTitle = moduleData?.title ?? `Модуль ${module}`;
    const tutorialTitle = tutorialData.title ?? `Урок ${tutorial}`;
    headingAbout.textContent = `Учебник: ${partTitle} / ${moduleTitle} / ${tutorialTitle}`;
  }

  // Дата
  const headingUpdate = document.querySelector(".A_IntroHeadingApdate");
  const lastDate = tutorialData.date?.at(-1);

  if (headingUpdate && lastDate) {
    headingUpdate.textContent = `Опубликовано ${formatTutorialDate(lastDate)}`;
  }

  // Заголовок статьи
  const headingTitle = document.querySelector(".A_IntroHeadingTutorial");
  if (headingTitle && tutorialData.title) {
    headingTitle.textContent = tutorialData.title;
  }

  // Автор
  const headingAuthor = document.querySelector(".A_IntroAuthor");
  if (headingAuthor) {
    headingAuthor.innerHTML = `Автор:&nbsp;<u>${tutorialData.author ?? ""}</u>`;
    headingAuthor.href = tutorialData.link;
  }

  // Теги
  const tagsContainer = document.querySelector(".C_IntroTutorialTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = "";

    // Главные теги: complexity + library + format + verification
    const primaryKeys = [
      tutorialData.complexity,
      ...toArray(tutorialData.library),
      ...toArray(tutorialData.format),
      tutorialData.verification,
    ].filter(Boolean);

    const primaryValues = primaryKeys.map((key) => filtersName[key] ?? key);

    primaryValues.forEach((value) => {
      const li = document.createElement("li");
      li.className = "A_IntroTutorialTagPrimary";
      li.textContent = value;
      tagsContainer.appendChild(li);
    });

    // Второстепенные теги: tutorialData.tags
    const secondaryValues = toArray(tutorialData.tags).filter(Boolean);

    secondaryValues.forEach((value) => {
      const li = document.createElement("li");
      li.className = "A_IntroTutorialTagSecondary";
      li.textContent = value;
      tagsContainer.appendChild(li);
    });
  }
}

// Навигация
// Динамическая по странице
function initTutorialPageNavigation() {
  const navList = document.querySelector(".C_TutorialNavigationPageList");
  if (!navList) return;

  const tutorialMain = document.querySelector(".O_TutorialMain");
  if (!tutorialMain) return;

  // Берём только h3 внутри урока
  const tutorialHeadings = Array.from(tutorialMain.querySelectorAll("h3[id]"));

  // // Добавляем "Следующий материал" отдельно
  // const nextHeading = document.getElementById("nav6");

  const allHeadings = [...tutorialHeadings];
  // if (nextHeading) {
  //   allHeadings.push(nextHeading);
  // }

  if (!allHeadings.length) return;

  navList.innerHTML = "";

  const navItems = allHeadings.map((heading) => {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.className = "U_ALink A_TutorialNavigationPageLink";
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();

    li.appendChild(link);
    navList.appendChild(li);

    return { heading, link };
  });

  let canSyncHashWithScroll = false;

  if (location.hash) {
    canSyncHashWithScroll = true;
  }

  function updateCurrentSection() {
    const headerOffset = 120;
    const triggerLine = window.innerHeight * 0.28;

    let currentItem = navItems[0];

    navItems.forEach((item) => {
      const rect = item.heading.getBoundingClientRect();

      if (rect.top - headerOffset <= triggerLine) {
        currentItem = item;
      }
    });

    navItems.forEach((item) => {
      item.link.classList.remove("is-current");
    });

    if (currentItem) {
      currentItem.link.classList.add("is-current");

      const currentHash = `#${currentItem.heading.id}`;
      if (canSyncHashWithScroll && location.hash !== currentHash) {
        history.replaceState(null, "", currentHash);
      }
    }
  }

  navItems.forEach((item) => {
    item.link.addEventListener("click", (e) => {
      e.preventDefault();
      canSyncHashWithScroll = true;

      const headerOffset = 120;
      const top =
        item.heading.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });

  updateCurrentSection();
  window.addEventListener(
    "scroll",
    () => {
      canSyncHashWithScroll = true;
      updateCurrentSection();
    },
    { passive: true },
  );
  window.addEventListener("resize", updateCurrentSection);
}

function initTutorialButtonUp() {
  const button = document.querySelector(".A_TutorialButtonUp");
  if (!button) return;

  const toggleVisibility = () => {
    const showFrom = Math.max(window.innerHeight * 0.45, 240);
    button.classList.toggle("is-visible", window.scrollY > showFrom);
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  window.addEventListener("resize", toggleVisibility);
}

// Навигация
// Динамическая по учебнику
function drawTutorialPartNavigation() {
  const navigationPart = document.querySelector(".W_TutorialNavigationPart");
  if (!navigationPart) return;

  const partData = tagsHandbook?.[part - 1];
  if (!partData) return;

  const partModules = getPartModules(partData);
  const partTitleElement = navigationPart.querySelector(".A_TutorialNavigationTitle");
  if (partTitleElement && partData.title) {
    partTitleElement.textContent = partData.title;
  }

  const modulesContainer = navigationPart.querySelector(".C_TutorialNavigationModules");
  if (!modulesContainer) return;

  modulesContainer.innerHTML = "";

  partModules.forEach((moduleData, moduleIndex) => {
    const moduleTutorials = getModuleTutorials(moduleData);
    if (!moduleData || !Array.isArray(moduleTutorials)) return;

    const moduleNumber = moduleIndex + 1;

    const moduleElement = document.createElement("div");
    moduleElement.className = "W_TutorialNavigationModule";
    const moduleTitle = document.createElement("a");
    moduleTitle.className = "U_FontB1 A_TutorialNavigationModuleTitle";
    moduleTitle.href = `../module${moduleNumber}.html`;
    moduleTitle.textContent = moduleData.title || `Модуль ${moduleNumber}`;
    if (moduleNumber === module) moduleTitle.classList.add("is-current");

    const tutorialsList = document.createElement("ol");
    tutorialsList.className = "U_FontF1 C_TutorialNavigationTutorialsList";

    moduleTutorials.forEach((tutorialData, tutorialIndex) => {
      const tutorialNumber = tutorialIndex + 1;

      const li = document.createElement("li");
      const link = document.createElement("a");

      link.className = "A_TutorialNavigationTutorialLink";
      link.href = `../module${moduleNumber}/tutorial${tutorialNumber}.html`;
      link.innerHTML = tutorialData?.title || `Туториал ${tutorialNumber}`;

      if (moduleNumber === module && tutorialNumber === tutorial) {
        link.classList.add("is-current");
      }

      li.appendChild(link);
      tutorialsList.appendChild(li);
    });
    moduleElement.append(moduleTitle, tutorialsList);
    modulesContainer.appendChild(moduleElement);
  });
}


drawTutorialMeta();
initTutorialPageNavigation();
drawTutorialPartNavigation();
initTutorialButtonUp();