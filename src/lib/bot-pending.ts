import type { CategorySlug } from "./categories";

const PENDING_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function computeExpiry(nowMs: number, ttlMs: number = PENDING_TTL_MS): number {
  return nowMs + ttlMs;
}

export function isExpired(expiresAtMs: number, nowMs: number): boolean {
  return nowMs >= expiresAtMs;
}

export async function setPendingCategory(
  db: D1Database,
  telegramId: number,
  categoria: CategorySlug,
  nowMs: number = Date.now(),
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO bot_pending (telegram_id, categoria, expires_at) VALUES (?, ?, ?)
       ON CONFLICT(telegram_id) DO UPDATE SET categoria = excluded.categoria, expires_at = excluded.expires_at`,
    )
    .bind(telegramId, categoria, computeExpiry(nowMs))
    .run();
}

export async function getPendingCategory(
  db: D1Database,
  telegramId: number,
  nowMs: number = Date.now(),
): Promise<CategorySlug | null> {
  const row = await db
    .prepare(`SELECT categoria, expires_at FROM bot_pending WHERE telegram_id = ?`)
    .bind(telegramId)
    .first<{ categoria: string; expires_at: number }>();
  if (!row || isExpired(row.expires_at, nowMs)) {
    return null;
  }
  return row.categoria as CategorySlug;
}

export async function clearPendingCategory(db: D1Database, telegramId: number): Promise<void> {
  await db.prepare(`DELETE FROM bot_pending WHERE telegram_id = ?`).bind(telegramId).run();
}

export interface Draft {
  categoria: CategorySlug;
  autorNome: string;
  textoOriginal: string;
  textoCorrigido: string;
  photoFileId: string | null;
}

interface DraftRow {
  categoria: string;
  autor_nome: string;
  texto_original: string;
  texto_corrigido: string;
  photo_file_id: string | null;
  expires_at: number;
}

export async function saveDraft(
  db: D1Database,
  telegramId: number,
  draft: Draft,
  nowMs: number = Date.now(),
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO bot_draft (telegram_id, categoria, autor_nome, texto_original, texto_corrigido, photo_file_id, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(telegram_id) DO UPDATE SET
         categoria = excluded.categoria,
         autor_nome = excluded.autor_nome,
         texto_original = excluded.texto_original,
         texto_corrigido = excluded.texto_corrigido,
         photo_file_id = excluded.photo_file_id,
         expires_at = excluded.expires_at`,
    )
    .bind(
      telegramId,
      draft.categoria,
      draft.autorNome,
      draft.textoOriginal,
      draft.textoCorrigido,
      draft.photoFileId,
      computeExpiry(nowMs),
    )
    .run();
}

export async function loadDraft(db: D1Database, telegramId: number, nowMs: number = Date.now()): Promise<Draft | null> {
  const row = await db
    .prepare(
      `SELECT categoria, autor_nome, texto_original, texto_corrigido, photo_file_id, expires_at
       FROM bot_draft WHERE telegram_id = ?`,
    )
    .bind(telegramId)
    .first<DraftRow>();
  if (!row || isExpired(row.expires_at, nowMs)) return null;
  return {
    categoria: row.categoria as CategorySlug,
    autorNome: row.autor_nome,
    textoOriginal: row.texto_original,
    textoCorrigido: row.texto_corrigido,
    photoFileId: row.photo_file_id,
  };
}

export async function clearDraft(db: D1Database, telegramId: number): Promise<void> {
  await db.prepare(`DELETE FROM bot_draft WHERE telegram_id = ?`).bind(telegramId).run();
}
