import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeInput(value: string) {
  return value.replace(/[<>"'&]/g, (character) => {
    const map: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
      "&": "&amp;"
    };

    return map[character] ?? character;
  });
}
