import type { BotCommand } from "./bot-commands";
import { getCategoryLabel, type CategorySlug } from "./categories";
import {
  answerCallbackQuery,
  downloadFile,
  editMessageReplyMarkup,
  getFileDownloadUrl,
  sendMessage,
} from "./telegram-api";
import {
  buildCategoryKeyboard,
  buildDeleteButton,
  buildReviewChoiceKeyboard,
} from "./telegram-keyboards";
import {
  clearDraft,
  clearPendingCategory,
  loadDraft,
  saveDraft,
  setPendingCategory,
} from "./bot-pending";
import { deletePost, getPostById, insertPost, listPosts, listRecentPosts } from "./posts-db";
import { deletePhoto, PhotoTooLargeError, uploadPhoto } from "./photos-storage";
import { reviewText, textsDiffer } from "./text-review";

const CANONICAL_ORIGIN = "https://luciorenatopiraquara.com.br";

export interface BotExecutorEnv {
  DB: D1Database;
  PHOTOS: KVNamespace;
  AI: Ai;
  botToken: string;
}

async function publishPost(
  env: BotExecutorEnv,
  chatId: number,
  categoria: CategorySlug,
  texto: string,
  autorTelegramId: number,
  autorNome: string,
  photoFileId: string | null,
): Promise<void> {
  let fotoUrl: string | null = null;
  if (photoFileId) {
    try {
      const fileUrl = await getFileDownloadUrl(env.botToken, photoFileId);
      const bytes = await downloadFile(fileUrl);
      fotoUrl = await uploadPhoto(env.PHOTOS, bytes, "image/jpeg");
    } catch (error) {
      if (error instanceof PhotoTooLargeError) {
        await sendMessage(
          env.botToken,
          chatId,
          "❌ A foto é grande demais (limite 5MB). Publiquei sem foto.",
        );
      } else {
        console.error("Failed to upload photo, publishing without it", error);
        await sendMessage(
          env.botToken,
          chatId,
          "⚠️ Não consegui salvar a foto, publiquei só o texto.",
        );
      }
    }
  }

  const post = await insertPost(env.DB, { categoria, texto, fotoUrl, autorTelegramId, autorNome });
  const link = `${CANONICAL_ORIGIN}/conteudos/${categoria}/${post.id}`;
  await sendMessage(
    env.botToken,
    chatId,
    `✅ Publicado em ${getCategoryLabel(categoria)}: ${link}`,
    {
      replyMarkup: buildDeleteButton(post.id),
    },
  );
}

export async function executeBotCommand(env: BotExecutorEnv, command: BotCommand): Promise<void> {
  switch (command.type) {
    case "unauthorized":
    case "ignore":
      return;

    case "select-category": {
      await setPendingCategory(env.DB, command.telegramId, command.categoria);
      await sendMessage(
        env.botToken,
        command.chatId,
        `📝 Manda o texto de "${getCategoryLabel(command.categoria)}" (pode incluir uma foto, com o texto na legenda).`,
      );
      return;
    }

    case "no-pending-category": {
      await sendMessage(
        env.botToken,
        command.chatId,
        "Escolhe primeiro uma categoria no menu abaixo antes de mandar o texto.",
        {
          replyMarkup: buildCategoryKeyboard(),
        },
      );
      return;
    }

    case "list-recent": {
      const posts = command.categoria
        ? await listPosts(env.DB, command.categoria, 10)
        : await listRecentPosts(env.DB, 10);
      if (posts.length === 0) {
        await sendMessage(env.botToken, command.chatId, "Não tem post nenhum publicado ainda.");
        return;
      }
      for (const post of posts) {
        await sendMessage(
          env.botToken,
          command.chatId,
          `${getCategoryLabel(post.categoria)} — ${post.titulo}`,
          {
            replyMarkup: buildDeleteButton(post.id),
          },
        );
      }
      return;
    }

    case "submit-post": {
      const corrected = await reviewText(env.AI, command.text);
      if (!textsDiffer(command.text, corrected)) {
        await publishPost(
          env,
          command.chatId,
          command.categoria,
          command.text,
          command.telegramId,
          command.authorName,
          command.photoFileId,
        );
        await clearPendingCategory(env.DB, command.telegramId);
        return;
      }

      await saveDraft(env.DB, command.telegramId, {
        categoria: command.categoria,
        autorNome: command.authorName,
        textoOriginal: command.text,
        textoCorrigido: corrected,
        photoFileId: command.photoFileId,
      });
      await sendMessage(
        env.botToken,
        command.chatId,
        `Texto original:\n${command.text}\n\nTexto revisado:\n${corrected}\n\nQual usar?`,
        { replyMarkup: buildReviewChoiceKeyboard() },
      );
      return;
    }

    case "callback": {
      const { data, chatId, messageId, telegramId, callbackQueryId } = command;

      if (data.type === "delete") {
        const post = await getPostById(env.DB, data.postId);
        if (post) {
          if (post.fotoUrl) {
            await deletePhoto(env.PHOTOS, post.fotoUrl);
          }
          await deletePost(env.DB, data.postId);
        }
        await editMessageReplyMarkup(env.botToken, chatId, messageId, { inline_keyboard: [] });
        await answerCallbackQuery(env.botToken, callbackQueryId, "🗑️ Excluído");
        return;
      }

      const draft = await loadDraft(env.DB, telegramId);
      if (!draft) {
        await answerCallbackQuery(
          env.botToken,
          callbackQueryId,
          "Esse rascunho expirou, manda o texto de novo.",
        );
        return;
      }

      const finalText = data.choice === "corrected" ? draft.textoCorrigido : draft.textoOriginal;
      await publishPost(
        env,
        chatId,
        draft.categoria,
        finalText,
        telegramId,
        draft.autorNome,
        draft.photoFileId,
      );
      await clearDraft(env.DB, telegramId);
      await clearPendingCategory(env.DB, telegramId);
      await editMessageReplyMarkup(env.botToken, chatId, messageId, { inline_keyboard: [] });
      await answerCallbackQuery(env.botToken, callbackQueryId);
      return;
    }

    default: {
      const _exhaustive: never = command;
      throw new Error(`Unhandled bot command: ${JSON.stringify(_exhaustive)}`);
    }
  }
}
