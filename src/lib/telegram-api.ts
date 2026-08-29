import type { InlineKeyboardMarkup, ReplyKeyboardMarkup } from "./telegram-keyboards";

const TELEGRAM_API_ROOT = "https://api.telegram.org";

export interface SendMessageOptions {
  replyMarkup?: ReplyKeyboardMarkup | InlineKeyboardMarkup;
}

async function callTelegramApi<T>(token: string, method: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${TELEGRAM_API_ROOT}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as { ok: boolean; result: T; description?: string };
  if (!data.ok) {
    throw new Error(`Telegram API ${method} failed: ${data.description ?? response.status}`);
  }
  return data.result;
}

export async function sendMessage(
  token: string,
  chatId: number,
  text: string,
  options: SendMessageOptions = {},
): Promise<{ message_id: number }> {
  return callTelegramApi(token, "sendMessage", {
    chat_id: chatId,
    text,
    reply_markup: options.replyMarkup,
  });
}

export async function editMessageReplyMarkup(
  token: string,
  chatId: number,
  messageId: number,
  replyMarkup: InlineKeyboardMarkup,
): Promise<void> {
  await callTelegramApi(token, "editMessageReplyMarkup", {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: replyMarkup,
  });
}

export async function answerCallbackQuery(token: string, callbackQueryId: string, text?: string): Promise<void> {
  await callTelegramApi(token, "answerCallbackQuery", { callback_query_id: callbackQueryId, text });
}

export async function getFileDownloadUrl(token: string, fileId: string): Promise<string> {
  const file = await callTelegramApi<{ file_path: string }>(token, "getFile", { file_id: fileId });
  return `${TELEGRAM_API_ROOT}/file/bot${token}/${file.file_path}`;
}

export async function downloadFile(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download Telegram file: ${response.status}`);
  }
  return response.arrayBuffer();
}
