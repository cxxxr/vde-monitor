export const normalizeCommandLines = (text: string): string[] => {
  const normalized = text.replace(/\r\n/g, "\n");
  return normalized
    .split("\n")
    .map((line) => line.toLowerCase().replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0);
};

export const compileDangerPatterns = (patterns: string[]): RegExp[] => {
  return patterns.map((pattern) => new RegExp(pattern, "i"));
};

export const isDangerousCommand = (text: string, patterns: RegExp[]): boolean => {
  const lines = normalizeCommandLines(text);
  return lines.some((line) => patterns.some((pattern) => pattern.test(line)));
};
