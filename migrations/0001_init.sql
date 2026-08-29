-- migrations/0001_init.sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  categoria TEXT NOT NULL,
  titulo TEXT NOT NULL,
  texto TEXT NOT NULL,
  foto_url TEXT,
  autor_telegram_id INTEGER NOT NULL,
  autor_nome TEXT NOT NULL,
  criado_em INTEGER NOT NULL
);

CREATE INDEX idx_posts_categoria_criado_em ON posts (categoria, criado_em DESC);

CREATE TABLE bot_pending (
  telegram_id INTEGER PRIMARY KEY,
  categoria TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE bot_draft (
  telegram_id INTEGER PRIMARY KEY,
  categoria TEXT NOT NULL,
  autor_nome TEXT NOT NULL,
  texto_original TEXT NOT NULL,
  texto_corrigido TEXT NOT NULL,
  photo_file_id TEXT,
  expires_at INTEGER NOT NULL
);
