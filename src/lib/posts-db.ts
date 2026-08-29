import type { CategorySlug } from "./categories";

export interface Post {
  id: number;
  categoria: CategorySlug;
  titulo: string;
  texto: string;
  fotoUrl: string | null;
  autorTelegramId: number;
  autorNome: string;
  criadoEm: number;
}

export interface NewPost {
  categoria: CategorySlug;
  texto: string;
  fotoUrl: string | null;
  autorTelegramId: number;
  autorNome: string;
}

const TITLE_MAX_LENGTH = 60;

export function deriveTitle(texto: string): string {
  const normalized = texto.trim().replace(/\s+/g, " ");
  if (normalized.length <= TITLE_MAX_LENGTH) {
    return normalized;
  }
  const truncated = normalized.slice(0, TITLE_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  const cut = lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated;
  return `${cut}…`;
}

interface PostRow {
  id: number;
  categoria: string;
  titulo: string;
  texto: string;
  foto_url: string | null;
  autor_telegram_id: number;
  autor_nome: string;
  criado_em: number;
}

function rowToPost(row: PostRow): Post {
  return {
    id: row.id,
    categoria: row.categoria as CategorySlug,
    titulo: row.titulo,
    texto: row.texto,
    fotoUrl: row.foto_url,
    autorTelegramId: row.autor_telegram_id,
    autorNome: row.autor_nome,
    criadoEm: row.criado_em,
  };
}

const POST_COLUMNS =
  "id, categoria, titulo, texto, foto_url, autor_telegram_id, autor_nome, criado_em";

export async function insertPost(db: D1Database, post: NewPost): Promise<Post> {
  const titulo = deriveTitle(post.texto);
  const criadoEm = Date.now();
  const row = await db
    .prepare(
      `INSERT INTO posts (categoria, titulo, texto, foto_url, autor_telegram_id, autor_nome, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       RETURNING ${POST_COLUMNS}`,
    )
    .bind(post.categoria, titulo, post.texto, post.fotoUrl, post.autorTelegramId, post.autorNome, criadoEm)
    .first<PostRow>();

  if (!row) {
    throw new Error("Failed to insert post: no row returned");
  }
  return rowToPost(row);
}

export async function listPosts(db: D1Database, categoria: CategorySlug, limit = 20): Promise<Post[]> {
  const { results } = await db
    .prepare(`SELECT ${POST_COLUMNS} FROM posts WHERE categoria = ? ORDER BY criado_em DESC LIMIT ?`)
    .bind(categoria, limit)
    .all<PostRow>();
  return results.map(rowToPost);
}

export async function listRecentPosts(db: D1Database, limit = 10): Promise<Post[]> {
  const { results } = await db
    .prepare(`SELECT ${POST_COLUMNS} FROM posts ORDER BY criado_em DESC LIMIT ?`)
    .bind(limit)
    .all<PostRow>();
  return results.map(rowToPost);
}

export async function getPostById(db: D1Database, id: number): Promise<Post | null> {
  const row = await db.prepare(`SELECT ${POST_COLUMNS} FROM posts WHERE id = ?`).bind(id).first<PostRow>();
  return row ? rowToPost(row) : null;
}

export async function deletePost(db: D1Database, id: number): Promise<boolean> {
  const result = await db.prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
  return result.meta.changes > 0;
}
