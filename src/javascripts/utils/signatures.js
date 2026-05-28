// Контрольная сумма: склеиваем 4 значения в строку и считаем детерминированный хэш.
export function getWorkPayloadChecksum(payloadString) {
  let normalized = String(payloadString || "");

  if (normalized.length % 2 === 1) {
    normalized += "m";
  }

  let sum = 0n;
  const overflowGuard = 1000000000000000000n;

  for (let index = 0; index < normalized.length; index += 2) {
    const leftCode = BigInt(normalized.charCodeAt(index));
    const rightCode = BigInt(normalized.charCodeAt(index + 1));
    const mul = leftCode * rightCode;
    const div = rightCode === 0n ? 0n : leftCode / rightCode;
    sum = (sum + mul + div) % overflowGuard;
  }

  while (sum !== 0n && sum % 10n === 0n) {
    sum /= 10n;
  }

  const checksum = sum % 100000000n;
  return checksum.toString().padStart(8, "0");
}

export function createEmailSubscriptionSignature(email) {
  return `E-${getWorkPayloadChecksum(String(email || "").toLowerCase())}`;
}