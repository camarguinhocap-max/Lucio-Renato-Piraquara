export function parseAuthorizedIds(csv: string): Set<number> {
  return new Set(
    csv
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .map(Number)
      .filter((n) => Number.isFinite(n)),
  );
}

export function isAuthorized(csv: string, telegramId: number): boolean {
  return parseAuthorizedIds(csv).has(telegramId);
}
