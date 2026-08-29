import { describe, expect, it } from "vitest";
import {
  buildCategoryKeyboard,
  buildDeleteButton,
  buildReviewChoiceKeyboard,
  categoryFromButtonText,
  parseCallbackData,
} from "./telegram-keyboards";

describe("buildCategoryKeyboard", () => {
  it("has one button per category, in order", () => {
    const keyboard = buildCategoryKeyboard();
    expect(keyboard.keyboard).toEqual([
      ["📰 Notícias locais"],
      ["🏛️ Utilidade pública"],
      ["🤝 Cobertura comunitária"],
      ["📅 Agenda da cidade"],
      ["🎥 Vídeos e reels"],
      ["📱 Redes sociais ativas"],
    ]);
  });
});

describe("categoryFromButtonText", () => {
  it("resolves a button's text back to its category slug", () => {
    expect(categoryFromButtonText("📰 Notícias locais")).toBe("noticias-locais");
  });

  it("returns null for arbitrary text", () => {
    expect(categoryFromButtonText("um texto qualquer")).toBeNull();
  });
});

describe("buildDeleteButton", () => {
  it("encodes the post id in the callback data", () => {
    expect(buildDeleteButton(42)).toEqual({
      inline_keyboard: [[{ text: "🗑️ Excluir", callback_data: "delete:42" }]],
    });
  });
});

describe("buildReviewChoiceKeyboard", () => {
  it("offers corrected vs original", () => {
    expect(buildReviewChoiceKeyboard()).toEqual({
      inline_keyboard: [
        [
          { text: "✅ Usar revisado", callback_data: "review:corrected" },
          { text: "📝 Usar original", callback_data: "review:original" },
        ],
      ],
    });
  });
});

describe("parseCallbackData", () => {
  it("parses a delete callback", () => {
    expect(parseCallbackData("delete:7")).toEqual({ type: "delete", postId: 7 });
  });

  it("parses review callbacks", () => {
    expect(parseCallbackData("review:corrected")).toEqual({ type: "review", choice: "corrected" });
    expect(parseCallbackData("review:original")).toEqual({ type: "review", choice: "original" });
  });

  it("returns null for garbage or non-numeric delete ids", () => {
    expect(parseCallbackData("lixo")).toBeNull();
    expect(parseCallbackData("delete:abc")).toBeNull();
  });
});
