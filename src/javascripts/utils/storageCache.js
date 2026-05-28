export function getStoredArray(storageKey) {
  if (!storageKey) return [];

  try {
    const rawValue = localStorage.getItem(storageKey);
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function setStoredArray(storageKey, nextValue) {
  if (!storageKey) return;

  const safeValue = Array.isArray(nextValue) ? nextValue : [];
  localStorage.setItem(storageKey, JSON.stringify(safeValue));
}