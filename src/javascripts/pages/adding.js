function syncAddingLinkIconState() {
  const linkInput = document.getElementById("addingLink");
  if (!linkInput) return;

  const hasValue = linkInput.value.trim().length > 0;
  pair.classList.toggle("is-filled", hasValue);
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