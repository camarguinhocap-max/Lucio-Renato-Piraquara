# Bot do Telegram pra publicar notícias no site — Design

Data: 2026-08-29
Status: aprovado pelo usuário em chat, aguardando plano de implementação.

## Objetivo

Hoje o "Capítulo 02 — Conteúdos" do site é só uma lista estática de 6 categorias
(`src/components/sections/content.tsx`) — cards descritivos, sem nenhum post
real, sem CMS. Toda mudança de conteúdo exige editar código e fazer deploy,
algo que só o desenvolvedor consegue fazer.

Este projeto cria um jeito do Lúcio (e outras pessoas de confiança) publicarem
notícias reais no site **sem tocar em código**, usando um bot do Telegram como
interface de publicação.

## Não-objetivos (fora do escopo do v1)

- Editar um post depois de publicado (só dá pra excluir e reenviar).
- Fila de aprovação antes de publicar (é "direto no ar").
- Agendamento de publicação futura.
- Múltiplas fotos por post (só uma foto opcional).
- Painel web de administração (tudo acontece pelo bot).

## Arquitetura

```
Telegram (usuário autorizado)
        │  mensagem / callback de botão
        ▼
Webhook do bot  ──►  Worker (Cloudflare) — mesmo Worker que já serve o site
        │                    │
        │                    ├─► Cloudflare D1 (tabela `posts`)
        │                    ├─► Cloudflare Workers KV (fotos)
        │                    └─► Cloudflare Workers AI (revisão de texto)
        ▼
Confirmação/erro de volta pro Telegram

Site (TanStack Start, SSR)
        │  fetch em runtime, sem build
        ▼
API pública do Worker  GET /api/posts?categoria=...
        │                GET /api/posts/:id
        ▼
Páginas /conteudos/[categoria] e /conteudos/[categoria]/[id]
```

**Nota (29/08, durante a implementação):** trocamos R2 por Workers KV pra guardar as
fotos — o R2 exige um clique de "ativar assinatura" no painel da Cloudflare mesmo pra
usar só a camada gratuita (usa o cartão já cadastrado na conta, mesmo cobrando $0 dentro
do limite grátis), e preferimos evitar essa etapa. O Workers KV não exige nada disso, tem
camada gratuita (1GB, 100 mil leituras/dia) e aceita valores binários de até 25MB — bem
acima do limite de 5MB por foto que já tínhamos definido. O resto do desenho abaixo
continua igual, só trocando "R2" por "Workers KV" onde aparecer.

O domínio principal (`luciorenatopiraquara.com.br`) roda no mesmo Worker que
tem os bindings de D1/KV, então pode ler direto. O espelho no Lovable
(`piraquaraonline.lovable.app`) não tem esses bindings — ele busca os mesmos
dados via a API pública acima (`fetch` HTTP normal, cross-origin). Assim os
dois ficam sempre atualizados sem precisar de deploy nem de clicar "Publish"
no Lovable.

## Modelo de dados (D1)

Tabela `posts`:

| coluna | tipo | observação |
|---|---|---|
| `id` | integer, PK autoincrement | |
| `categoria` | text | um dos 6 slugs (`noticias-locais`, `utilidade-publica`, `cobertura-comunitaria`, `agenda-da-cidade`, `videos-e-reels`, `redes-sociais`) |
| `titulo` | text | derivado automaticamente das primeiras ~60 caracteres do texto |
| `texto` | text | corpo completo do post |
| `foto_url` | text, nullable | URL pública do arquivo no Workers KV, se houver foto |
| `autor_telegram_id` | integer | quem publicou |
| `autor_nome` | text | nome/username do Telegram, só pra referência interna |
| `criado_em` | timestamp | |

Fotos: guardadas no Workers KV com chave `{uuid}.jpg`, servidas via rota
pública própria do Worker (`/fotos/:key`).

## Fluxo do bot

1. Usuário autorizado abre o bot → vê teclado fixo com as 6 categorias.
2. Toca numa categoria → bot grava "aguardando texto da categoria X" pra esse
   usuário (TTL curto, ex. 10 min, numa tabela/KV simples de estado) e responde
   pedindo o texto (foto opcional, como legenda da própria mensagem).
3. Próxima mensagem de texto (ou foto+legenda) desse usuário é tratada como o
   conteúdo do post:
   a. Texto é enviado pra Cloudflare Workers AI pedindo revisão gramatical/
      ortográfica, preservando o sentido.
   b. Se o texto revisado for igual ao original → publica direto.
   c. Se for diferente → bot manda os dois textos e dois botões inline
      ("Usar revisado" / "Usar original"); só publica depois da escolha.
4. Ao publicar: sobe a foto pro Workers KV (se houver), grava a linha no D1, responde
   "✅ Publicado em {categoria}: {link}" com um botão inline **🗑️ Excluir**
   anexado (carrega o `id` do post no `callback_data`).
5. Comando `/ultimos` — lista os últimos N posts (todas categorias ou, se
   enviado como `/ultimos noticias-locais`, filtrado), cada um com seu próprio
   botão **🗑️ Excluir**.
6. Callback de exclusão: verifica se quem clicou é o mesmo autor ou está na
   lista de autorizados, apaga a linha do D1 e o arquivo do Workers KV (se houver),
   edita a mensagem confirmando "🗑️ Excluído".

## Autorização

Lista de IDs numéricos do Telegram (não @username, que pode mudar) guardada
como secret do Worker (`TELEGRAM_AUTHORIZED_IDS`, string separada por vírgula).
Mensagem de quem não está na lista é ignorada silenciosamente — o bot não
revela que existe, nem responde erro. Adicionar/remover gente é só atualizar
esse secret (o desenvolvedor faz isso, é um comando só).

## Erros e casos de borda

- Mensagem chega sem categoria selecionada / TTL expirado → bot pede pra
  escolher a categoria de novo antes.
- Foto maior que o limite (Telegram já limita a ~20MB; vamos impor limite
  menor, ~5MB, adequado pra web) → avisa erro, nada é publicado pela metade.
- Falha ao gravar no D1 ou subir a foto no Workers KV → bot avisa "deu erro, tenta de
  novo", nunca finge que publicou sem ter publicado.
- Falha da chamada à Workers AI (timeout, etc.) → publica o texto original
  sem revisão, sem travar o fluxo (revisão é um "nice to have", não pode ser
  ponto único de falha).

## Integração com o site

- `content.tsx`: os 6 cards passam a ser `<Link>` pra `/conteudos/[categoria]`
  em vez de só texto estático.
- Nova rota `/conteudos/$categoria` — lista os posts da categoria (mais
  recente primeiro), busca via `fetch` server-side na API pública.
- Nova rota `/conteudos/$categoria/$id` — página de post individual, com
  meta tags/OG e JSON-LD `NewsArticle` (bom pra SEO e pra Search Console
  indexar cada notícia).
- Nova rota de API no Worker: `GET /api/posts` (com querystring `categoria`
  opcional) e `GET /api/posts/:id` — JSON público, somente leitura, sem auth
  (dado já é público no site de qualquer forma).

## Testes / rollout

Sem ambiente de staging separado (evita duplicar D1/KV/bot só pra isso).
Testes acontecem no bot real, contra os dados reais — qualquer post de teste
é removido na hora com o botão 🗑️ Excluir ou via `/ultimos`.

## Guia de configuração (entregue junto com a implementação)

1. Criar o bot no Telegram via **@BotFather** (`/newbot`), guardar o token.
2. Cada pessoa autorizada manda uma mensagem pro bot **@userinfobot** pra
   descobrir o próprio ID numérico do Telegram.
3. Desenvolvedor configura os secrets no Cloudflare (`wrangler secret put`):
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_AUTHORIZED_IDS`.
4. Desenvolvedor registra o webhook do bot apontando pro Worker (um comando
   `curl` único, feito uma vez).
5. Desenvolvedor cria o binding D1 e Workers KV no `wrangler.jsonc` e roda a migration
   inicial da tabela `posts`.

## Próximos passos (v2, não agora)

- Editar post publicado.
- Fila de aprovação opcional.
- Múltiplas fotos / galeria.
- Agendamento de publicação.
