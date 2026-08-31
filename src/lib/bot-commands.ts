import {
  categoryFromButtonText,
  parseCallbackData,
  type ParsedCallbackData,
} from "./telegram-keyboards";
import { isCategorySlug, type CategorySlug } from "./categories";

export interface TelegramUpdate {
  message?: {
    message_id: number;
    chat: { id: number };
    from?: { id: number; first_name?: string; username?: string };
    text?: string;
    caption?: string;
    photo?: { file_id: string }[];
  };
  callback_query?: {
    id: string;
    from: { id: number };
    message?: { chat: { id: number }; message_id: number };
    data?: string;
  };
}

export type BotCommand =
  | { type: "unauthorized" }
  | { type: "ignore" }
  | { type: "show-menu"; chatId: number }
  | { type: "select-category"; chatId: number; telegramId: number; categoria: CategorySlug }
  | { type: "no-pending-category"; chatId: number }
  | {
      type: "submit-post";
      chatId: number;
      telegramId: number;
      authorName: string;
      categoria: CategorySlug;
      text: string;
      photoFileId: string | null;
    }
  | { type: "list-recent"; chatId: number; categoria: CategorySlug | null }
  | {
      type: "callback";
      callbackQueryId: string;
      chatId: number;
      messageId: number;
      telegramId: number;
      data: ParsedCallbackData;
    };

function authorNameFrom(from?: { first_name?: string; username?: string }): string {
  if (!from) return "desconhecido";
  return from.first_name ?? from.username ?? "desconhecido";
}

export function parseUpdate(
  update: TelegramUpdate,
  authorized: boolean,
  pendingCategoria: CategorySlug | null,
): BotCommand {
  if (!authorized) {
    return { type: "unauthorized" };
  }

  if (update.callback_query) {
    const cq = update.callback_query;
    if (!cq.data || !cq.message) return { type: "ignore" };
    const parsed = parseCallbackData(cq.data);
    if (!parsed) return { type: "ignore" };
    return {
      type: "callback",
      callbackQueryId: cq.id,
      chatId: cq.message.chat.id,
      messageId: cq.message.message_id,
      telegramId: cq.from.id,
      data: parsed,
    };
  }

  const message = update.message;
  if (!message || !message.from) return { type: "ignore" };

  const text = message.text ?? message.caption ?? "";

  if (text.startsWith("/start") || text.startsWith("/menu")) {
    return { type: "show-menu", chatId: message.chat.id };
  }

  if (text.startsWith("/ultimos")) {
    const parts = text.trim().split(/\s+/);
    const categoriaArg = parts[1];
    const categoria = categoriaArg && isCategorySlug(categoriaArg) ? categoriaArg : null;
    return { type: "list-recent", chatId: message.chat.id, categoria };
  }

  const categoriaFromButton = categoryFromButtonText(text);
  if (categoriaFromButton) {
    return {
      type: "select-category",
      chatId: message.chat.id,
      telegramId: message.from.id,
      categoria: categoriaFromButton,
    };
  }

  if (!pendingCategoria) {
    return { type: "no-pending-category", chatId: message.chat.id };
  }

  if (!text.trim()) {
    return { type: "ignore" };
  }

  return {
    type: "submit-post",
    chatId: message.chat.id,
    telegramId: message.from.id,
    authorName: authorNameFrom(message.from),
    categoria: pendingCategoria,
    text: text.trim(),
    photoFileId: message.photo?.at(-1)?.file_id ?? null,
  };
}
