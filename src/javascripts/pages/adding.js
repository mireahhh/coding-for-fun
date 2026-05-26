function syncAddingLinkIconState() {
  const linkInput = document.getElementById("addingLink");
  if (!linkInput) return;

  if (linkInput.value) {
    linkInput.classList.add("is-filled");
  } else {
    linkInput.classList.remove("is-filled");
  }
}

function initAddingLinkIcon() {
  const linkInput = document.getElementById("addingLink");
  if (!linkInput) return;

  syncAddingLinkIconState();

  ["input", "change", "blur"].forEach((eventName) => {
    linkInput.addEventListener(eventName, syncAddingLinkIconState);
  });
}

function parsePxValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function syncAddingDescriptionHeight() {
  const description = document.getElementById("addingDescription");
  if (!description) return;

  const styles = window.getComputedStyle(description);
  let lineHeight = parsePxValue(styles.lineHeight);

  if (!lineHeight) {
    lineHeight = parsePxValue(styles.fontSize);
  }

  const paddingY = parsePxValue(styles.paddingTop) + parsePxValue(styles.paddingBottom);
  const borderY = parsePxValue(styles.borderTopWidth) + parsePxValue(styles.borderBottomWidth);
  const minHeight = lineHeight * 3 + paddingY + borderY;
  const maxHeight = lineHeight * 5 + paddingY + borderY;

  description.style.minHeight = `${minHeight}px`;
  description.style.maxHeight = `${maxHeight}px`;

  description.style.height = "auto";
  description.style.height = `${Math.min(description.scrollHeight, maxHeight)}px`;
}

function initAddingDescriptionAutosize() {
  const description = document.getElementById("addingDescription");
  if (!description) return;

  syncAddingDescriptionHeight();

  ["input", "change", "blur"].forEach((eventName) => {
    description.addEventListener(eventName, syncAddingDescriptionHeight);
  });

  window.addEventListener("resize", syncAddingDescriptionHeight);
}

initAddingLinkIcon();
initAddingDescriptionAutosize();