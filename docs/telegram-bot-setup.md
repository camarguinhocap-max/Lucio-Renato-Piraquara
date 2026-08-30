# Configurando o bot de notícias no Telegram

## 1. Criar o bot

1. Abra uma conversa com **@BotFather** no Telegram.
2. Mande `/newbot`, escolha um nome de exibição e um `@username` terminado em `bot`.
3. O BotFather devolve um **token** (formato `123456:AAAA...`). Guarde — é o `TELEGRAM_BOT_TOKEN`.

## 2. Descobrir o ID do Telegram de cada pessoa autorizada

1. Cada pessoa que vai publicar abre uma conversa com **@userinfobot**.
2. Manda qualquer mensagem — ele responde com o `Id` numérico da conta.
3. Junte todos os IDs separados por vírgula — isso é o `TELEGRAM_AUTHORIZED_IDS`.

## 3. Configurar os secrets no Cloudflare

Rode, um de cada vez (cada comando pede o valor depois de Enter):

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
npx wrangler secret put TELEGRAM_AUTHORIZED_IDS
```

`TELEGRAM_WEBHOOK_SECRET` pode ser qualquer string aleatória longa (ex.: gere uma com
`openssl rand -hex 32`) — é só pra confirmar que os updates realmente vêm do Telegram.

## 4. Testar localmente (opcional)

```bash
cp .dev.vars.example .dev.vars
# edite .dev.vars com os valores reais
npx wrangler dev
```

## 5. Publicar

Um `git push` na `main` já dispara o deploy automático (Cloudflare Workers Builds já está
configurado). Confirme no dashboard do Cloudflare que o deploy terminou antes do próximo passo.

## 6. Registrar o webhook (uma vez só)

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://luciorenatopiraquara.com.br/api/telegram-webhook", "secret_token": "<TELEGRAM_WEBHOOK_SECRET>"}'
```

Espera uma resposta `{"ok":true,"result":true,"description":"Webhook was set"}`.

## 7. Testar de verdade

Abra o bot no Telegram (procure pelo `@username` escolhido no passo 1), toque numa categoria e
manda um texto de teste. Confira o link que ele devolve e apague o post de teste com o botão
🗑️ Excluir.

## Adicionar ou remover gente autorizada depois

Peça pra pessoa mandar mensagem pro @userinfobot, pegue o ID, e rode de novo:

```bash
npx wrangler secret put TELEGRAM_AUTHORIZED_IDS
```
(cole a lista completa, com o novo ID incluído — o comando substitui o valor inteiro).
