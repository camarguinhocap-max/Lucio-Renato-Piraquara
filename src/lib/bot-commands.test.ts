import { describe, expect, it } from "vitest";
import { parseUpdate, type TelegramUpdate } from "./bot-commands";

function messageUpdate(overrides: Partial<NonNullable<TelegramUpdate["message"]>> = {}): TelegramUpdate {
  return {
    message: {
      message_id: 1,
      chat: { id: 111 },
      from: { id: 42, first_name: "Lúcio" },
      text: "",
      ...overrides,
    },
  };
}

describe("parseUpdate", () => {
  it("returns unauthorized when the sender is not on the allowlist", () => {
    expect(parseUpdate(messageUpdate({ text: "oi" }), false, null)).toEqual({ type: "unauthorized" });
  });

  it("ignores updates with neither a message nor a callback_query", () => {
    expect(parseUpdate({}, true, null)).toEqual({ type: "ignore" });
  });

  it("recognizes a category button tap", () => {
    const update = messageUpdate({ text: "📰 Notícias locais" });
    expect(parseUpdate(update, true, null)).toEqual({
      type: "select-category",
      chatId: 111,
      telegramId: 42,
      categoria: "noticias-locais",
    });
  });

  it("asks to pick a category when there's no pending one and no button tap", () => {
    const update = messageUpdate({ text: "um texto qualquer" });
    expect(parseUpdate(update, true, null)).toEqual({ type: "no-pending-category", chatId: 111 });
  });

  it("treats free text as a post submission when a category is pending", () => {
    const update = messageUpdate({ text: "Prefeitura abre inscrições" });
    expect(parseUpdate(update, true, "noticias-locais")).toEqual({
      type: "submit-post",
      chatId: 111,
      telegramId: 42,
      authorName: "Lúcio",
      categoria: "noticias-locais",
      text: "Prefeitura abre inscrições",
      photoFileId: null,
    });
  });

  it("uses the caption and the largest photo when a photo is sent", () => {
    const update = messageUpdate({
      text: undefined,
      caption: "Foto da obra",
      photo: [{ file_id: "small" }, { file_id: "large" }],
    });
    expect(parseUpdate(update, true, "noticias-locais")).toEqual({
      type: "submit-post",
      chatId: 111,
      telegramId: 42,
      authorName: "Lúcio",
      categoria: "noticias-locais",
      text: "Foto da obra",
      photoFileId: "large",
    });
  });

  it("ignores empty text/caption even with a pending category", () => {
    expect(parseUpdate(messageUpdate({ text: "   " }), true, "noticias-locais")).toEqual({ type: "ignore" });
  });

  it("parses /ultimos with no category filter", () => {
    expect(parseUpdate(messageUpdate({ text: "/ultimos" }), true, null)).toEqual({
      type: "list-recent",
      chatId: 111,
      categoria: null,
    });
  });

  it("parses /ultimos with a valid category filter", () => {
    expect(parseUpdate(messageUpdate({ text: "/ultimos noticias-locais" }), true, null)).toEqual({
      type: "list-recent",
      chatId: 111,
      categoria: "noticias-locais",
    });
  });

  it("treats /ultimos with an unknown category argument as unfiltered", () => {
    expect(parseUpdate(messageUpdate({ text: "/ultimos categoria-invalida" }), true, null)).toEqual({
      type: "list-recent",
      chatId: 111,
      categoria: null,
    });
  });

  it("parses a delete callback", () => {
    const update: TelegramUpdate = {
      callback_query: { id: "cq1", from: { id: 42 }, message: { chat: { id: 111 }, message_id: 5 }, data: "delete:7" },
    };
    expect(parseUpdate(update, true, null)).toEqual({
      type: "callback",
      callbackQueryId: "cq1",
      chatId: 111,
      messageId: 5,
      telegramId: 42,
      data: { type: "delete", postId: 7 },
    });
  });

  it("parses a review-choice callback", () => {
    const update: TelegramUpdate = {
      callback_query: {
        id: "cq2",
        from: { id: 42 },
        message: { chat: { id: 111 }, message_id: 6 },
        data: "review:corrected",
      },
    };
    expect(parseUpdate(update, true, null)).toEqual({
      type: "callback",
      callbackQueryId: "cq2",
      chatId: 111,
      messageId: 6,
      telegramId: 42,
      data: { type: "review", choice: "corrected" },
    });
  });

  it("ignores a callback with unrecognized data", () => {
    const update: TelegramUpdate = {
      callback_query: { id: "cq3", from: { id: 42 }, message: { chat: { id: 111 }, message_id: 7 }, data: "lixo" },
    };
    expect(parseUpdate(update, true, null)).toEqual({ type: "ignore" });
  });
});
