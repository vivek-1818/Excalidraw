import { TEXT_HEIGHT } from "../constants";

export function getTextLines(text: string) {
  return text.split("\n");
}

export function getTextWidth(
  text: string,
  measureText?: (line: string) => number,
) {
  const lines = getTextLines(text);

  if (measureText) {
    return Math.max(...lines.map((line) => measureText(line)), 0);
  }

  return Math.max(...lines.map((line) => line.length * 11), 0);
}

export function getTextHeight(text: string) {
  return Math.max(1, getTextLines(text).length) * TEXT_HEIGHT;
}
