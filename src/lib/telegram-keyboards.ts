import { CATEGORIES, type CategorySlug } from "./categories";

export interface ReplyKeyboardMarkup {
  keyboard: string[][];
  resize_keyboard: true;
}

function buttonTextFor(category: (typeof CATEGORIES)[number]): string {
  return `${category.emoji} ${category.label}`;
}

export function buildCategoryKeyboard(): ReplyKeyboardMarkup {
  return {
    keyboard: CATEGORIES.map((category) => [buttonTextFor(category)]),
    resize_keyboard: true,
  };
}

export function categoryFromButtonText(text: string): CategorySlug | null {
  const match = CATEGORIES.find((category) => buttonTextFor(category) === text);
  return match ? match.slug : null;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: { text: string; callback_data: string }[][];
}

export function buildDeleteButton(postId: number): InlineKeyboardMarkup {
  return { inline_keyboard: [[{ text: "🗑️ Excluir", callback_data: `delete:${postId}` }]] };
}

export function buildReviewChoiceKeyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "✅ Usar revisado", callback_data: "review:corrected" },
        { text: "📝 Usar original", callback_data: "review:original" },
      ],
    ],
  };
}

export type ParsedCallbackData =
  | { type: "delete"; postId: number }
  | { type: "review"; choice: "corrected" | "original" };

export function parseCallbackData(data: string): ParsedCallbackData | null {
  if (data.startsWith("delete:")) {
    const postId = Number(data.slice("delete:".length));
    return Number.isFinite(postId) ? { type: "delete", postId } : null;
  }
  if (data === "review:corrected") return { type: "review", choice: "corrected" };
  if (data === "review:original") return { type: "review", choice: "original" };
  return null;
}
