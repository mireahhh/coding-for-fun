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

initAddingLinkIcon();