import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/cf-env";
import { isAuthorized } from "@/lib/telegram-auth";
import { getPendingCategory } from "@/lib/bot-pending";
import { parseUpdate, type TelegramUpdate } from "@/lib/bot-commands";
import { executeBotCommand } from "@/lib/bot-executor";

export const Route = createFileRoute("/api/telegram-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getCloudflareEnv();

        const secretHeader = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
        if (secretHeader !== env.TELEGRAM_WEBHOOK_SECRET) {
          return new Response("Unauthorized", { status: 401 });
        }

        const update = (await request.json()) as TelegramUpdate;
        const telegramId = update.message?.from?.id ?? update.callback_query?.from.id ?? null;
        const authorized = telegramId !== null && isAuthorized(env.TELEGRAM_AUTHORIZED_IDS, telegramId);

        const pendingCategoria =
          authorized && update.message && telegramId !== null ? await getPendingCategory(env.DB, telegramId) : null;

        const command = parseUpdate(update, authorized, pendingCategoria);

        await executeBotCommand({ DB: env.DB, PHOTOS: env.PHOTOS, AI: env.AI, botToken: env.TELEGRAM_BOT_TOKEN }, command);

        return new Response("ok");
      },
    },
  },
});
