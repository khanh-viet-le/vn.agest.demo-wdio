export function extractNumbers(text: string): number[] {
  if (!text) return [];

  // Match:
  // - optional minus sign
  // - digits with optional thousand separators
  // - optional decimal part
  const matches = text.match(/-?\d{1,3}(?:,\d{3})*(?:\.\d+)?|-?\d+(?:\.\d+)?/g);

  if (!matches) return [];

  return matches.map((value) => Number(value.replace(/,/g, "")));
}
