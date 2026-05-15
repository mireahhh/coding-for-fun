const runtimeEnv = typeof process !== "undefined" ? process.env : {};

const SUPABASE_URL = "https://ouahckygrynsrziyolcx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_YGq3p7zpM59V8HOirmZNoQ_ALy8Ud-L";
const SUPABASE_TABLE = "works";

function isAddingPage() {
  return Boolean(document.getElementById("submitWorkButton"));
}

function getStatusNode() {
  return document.getElementById("addingStatus");
}

function setStatus(text, isError = false) {
  const status = getStatusNode();
  if (!status) return;

  status.textContent = text;
  status.style.color = isError ? "#ff4d4f" : "inherit";
}

function readFormValues() {
  const author = document.getElementById("addingAuthor")?.value.trim() || "";
  const title = document.getElementById("addingTitle")?.value.trim() || "";
  const link = document.getElementById("addingLink")?.value.trim() || "";
  const description = document.getElementById("addingDescription")?.value.trim() || "";

  return { author, title, link, description };
}

function validatePayload(payload) {
  if (!payload.author || !payload.title || !payload.link || !payload.description) {
    return "Заполните все поля перед отправкой.";
  }

  try {
    const url = new URL(payload.link);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "Ссылка должна начинаться с http:// или https://.";
    }
  } catch {
    return "Укажите корректную ссылку на работу.";
  }

  return "";
}

async function saveWorkForModeration(payload) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      title: payload.title,
      author: payload.author,
      link: payload.link,
      description: payload.description,
      state: false,
      official: null,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Ошибка записи в Supabase: ${details}`);
  }
}

async function submitWork() {
  const payload = readFormValues();
  const validationError = validatePayload(payload);

  if (validationError) {
    setStatus(validationError, true);
    return;
  }

  const button = document.getElementById("submitWorkButton");

  if (button) {
    button.disabled = true;
    button.textContent = "Отправляем...";
  }

  setStatus("Проверяем и отправляем работу...");

  try {
    await saveWorkForModeration(payload);
    setStatus("Готово! Работа отправлена на модерацию.");
    ["addingAuthor", "addingTitle", "addingLink", "addingDescription"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.value = "";
    });
  } catch (error) {
    setStatus(error.message || "Не удалось отправить работу.", true);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Предложить работу";
    }
  }
}


function printSupabaseSetupHint() {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) return;

  console.info(`
[adding] Как подключить Supabase:
1) В Supabase откройте Settings → API.
2) Скопируйте Project URL и anon public key.
3) Передайте их в window.__SUPABASE_URL__ и window.__SUPABASE_ANON_KEY__.
4) Создайте таблицу pending_gallery_works со столбцами: title, author, link, description, status, submitted_at.
`);
}

function initAddingForm() {
  if (!isAddingPage()) return;

  printSupabaseSetupHint();

  const submitButton = document.getElementById("submitWorkButton");
  if (!submitButton) return;

  submitButton.addEventListener("click", submitWork);
}

initAddingForm();